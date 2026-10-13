import { useEffect, useRef, useState } from 'react';
import GameModal from '../components/GameModal.jsx';
import NumberTile from '../components/NumberTile.jsx';
import { GAME_LEVELS, RANKING_STORAGE_KEY } from '../constants/game.js';
import { shuffle } from '../utils/shuffle.js';
import { getStorage, setStorage } from '../utils/storage.js';

export default function GamePage({ level, onTimeChange }) {
  // App에서 전달받은 레벨의 규칙으로 숫자 범위와 grid 크기를 결정한다.
  const rule = GAME_LEVELS[level];
  // 초기 배치와 후반 숫자 순서를 각각 섞어 초기화한다.
  const createInitialGame = () => ({
    numbers: shuffle(Array.from({ length: rule.tileCount }, (_, index) => rule.firstNumber + index)),
    replacements: shuffle(Array.from(
      { length: rule.lastNumber - rule.initialMaxNumber },
      (_, index) => rule.initialMaxNumber + 1 + index,
    )),
    replacementIndex: 0,
    nextNumber: rule.firstNumber,
  });
  const [game, setGame] = useState(createInitialGame);
  // 빠른 연속 클릭에서도 다음 렌더링을 기다리지 않고 최신 진행 상태를 확인한다.
  const gameRef = useRef(game);
  const { numbers, nextNumber } = game;
  const isFinished = nextNumber > rule.lastNumber;
  const startTimeRef = useRef(null);
  const frameRef = useRef(null);
  const [isRunning, setIsRunning] = useState(false);
  const [storageError, setStorageError] = useState(false);
  const [resultTime, setResultTime] = useState(null);
  const [round, setRound] = useState(0);

  // 확인 후 같은 레벨로 초기화한다. 이미 저장된 랭킹 기록은 유지한다.
  const resetGame = () => {
    cancelAnimationFrame(frameRef.current);
    setIsRunning(false);
    startTimeRef.current = null;
    const initialGame = createInitialGame();
    gameRef.current = initialGame;
    setGame(initialGame);
    setResultTime(null);
    setStorageError(false);
    setRound((value) => value + 1);
    onTimeChange(0);
  };

  // 시작 시각과 현재 시각의 차이를 측정해 렌더링 지연에 따른 오차를 줄인다.
  useEffect(() => {
    if (!isRunning) return;
    const updateTime = () => {
      onTimeChange((performance.now() - startTimeRef.current) / 1000);
      frameRef.current = requestAnimationFrame(updateTime);
    };
    frameRef.current = requestAnimationFrame(updateTime);
    return () => cancelAnimationFrame(frameRef.current);
  }, [isRunning, onTimeChange]);

  // 레벨 변경이나 페이지 이동 시 타이머 표시를 초기화한다.
  useEffect(() => {
    onTimeChange(0);
    return () => onTimeChange(0);
  }, [onTimeChange]);

  const handleNumberClick = (index) => {
    const current = gameRef.current;
    const number = current.numbers[index];
    if (number !== current.nextNumber) return false;

    if (number === rule.firstNumber) {
      startTimeRef.current = performance.now();
      setIsRunning(true);
    }

    if (number === rule.lastNumber) {
      const elapsed = (performance.now() - startTimeRef.current) / 1000;
      cancelAnimationFrame(frameRef.current);
      setIsRunning(false);
      onTimeChange(elapsed);
      setResultTime(elapsed);

      // 종료 이벤트에서 한 번만 저장한다. 기존 기록은 유지하고 새 기록을 추가한다.
      const stored = getStorage(RANKING_STORAGE_KEY, []);
      const records = Array.isArray(stored) ? stored : [];
      const record = { playedAt: new Date().toISOString(), level, playTime: elapsed };
      setStorageError(!setStorage(RANKING_STORAGE_KEY, [...records, record]));
    }

    // 앞 절반은 후반 숫자로 교체하고, 후반 숫자를 맞힌 칸은 렌더링 시 빈 칸으로 표시한다.
    const shouldReplace = number <= rule.initialMaxNumber;
    const updated = {
      ...current,
      numbers: shouldReplace
        ? current.numbers.map((value, tileIndex) => (
          tileIndex === index ? current.replacements[current.replacementIndex] : value
        ))
        : current.numbers,
      replacementIndex: current.replacementIndex + (shouldReplace ? 1 : 0),
      nextNumber: current.nextNumber + 1,
    };
    gameRef.current = updated;
    setGame(updated);
    return true;
  };

  return (
    <div className="min-h-[calc(100dvh-64px)] bg-[#F0FAF7] text-slate-900">
      <main className="mx-auto flex w-full max-w-xl flex-col items-center px-4 py-12 sm:py-16">
        <h2 className="sr-only">숫자 클릭 게임</h2>

        <div className="mb-6 flex min-h-9 items-center gap-3" aria-live="polite">
          <span className="text-slate-500">다음 숫자</span>
          <strong className="text-3xl font-bold text-emerald-900">{Math.min(nextNumber, rule.lastNumber)}</strong>
          <span className="text-sm text-slate-500">({Math.min(nextNumber, rule.lastNumber)} / {rule.lastNumber})</span>
        </div>

        {storageError && (
          <p role="alert" className="mb-4 text-sm text-red-600">기록을 저장하지 못했어요. 브라우저 저장 공간을 확인해주세요.</p>
        )}

        {/* 보드 크기는 최대 460px. 행과 열을 같은 개수로 나눠 타일을 정사각형으로 만든다. */}
        <div
          key={round}
          className="grid aspect-square w-full max-w-[460px] gap-3"
          style={{
            gridTemplateColumns: `repeat(${rule.gridSize}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${rule.gridSize}, minmax(0, 1fr))`,
          }}
        >
          {numbers.map((number, index) => (
            // 빈 칸을 남겨 다른 숫자의 위치가 당겨지지 않게 한다.
            number < nextNumber ? (
              <div key={index} aria-hidden="true" className="rounded-xl border border-slate-200" />
            ) : (
              <NumberTile
                key={index}
                number={number}
                disabled={isFinished}
                onClick={() => handleNumberClick(index)}
              />
            )
          ))}
        </div>
      </main>
      <GameModal
        open={resultTime !== null}
        onClose={resetGame}
        levelLabel={rule.label}
        playTime={resultTime ?? 0}
        storageError={storageError}
      />
    </div>
  );
}
