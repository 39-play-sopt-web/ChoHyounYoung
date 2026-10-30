import { useEffect, useRef, useState } from 'react';
import GameModal from '../components/GameModal.jsx';
import NumberTile from '../components/NumberTile.jsx';
import { GAME_LEVELS } from '../constants/game.js';
import { advanceGame, createInitialGame } from '../utils/game.js';
import { saveRankingRecord } from '../utils/ranking.js';

export default function GamePage({ level, onTimeChange }) {
  // App에서 전달받은 레벨의 규칙으로 숫자 범위와 grid 크기를 결정한다.
  const rule = GAME_LEVELS[level];
  // useState 초기화 함수는 일반적인 재렌더링에서는 다시 실행되지 않는다.
  const [game, setGame] = useState(() => createInitialGame(rule));
  // 빠른 연속 클릭에서도 다음 렌더링을 기다리지 않고 최신 진행 상태를 확인한다.
  const gameRef = useRef(game);
  const { numbers, nextNumber } = game;
  const isFinished = nextNumber > rule.lastNumber;
  // 마지막 클릭 후에도 진행 표시가 18/18처럼 남도록 표시값만 제한한다.
  const displayedNumber = Math.min(nextNumber, rule.lastNumber);
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
    const initialGame = createInitialGame(rule);
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
      onTimeChange(Math.floor((performance.now() - startTimeRef.current) / 10) / 100);
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
    const updated = advanceGame(current, index, rule);
    if (updated === current) return false;
    gameRef.current = updated;

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
      const record = { playedAt: new Date().toISOString(), level, playTime: elapsed };
      setStorageError(!saveRankingRecord(record));
    }

    setGame(updated);
    return true;
  };

  return (
    <div className="min-h-[calc(100dvh-64px)] bg-page text-ink">
      <main className="mx-auto flex w-full max-w-xl flex-col items-center px-4 py-12 sm:py-16">
        <h2 className="sr-only">숫자 클릭 게임</h2>

        <div className="mb-6 flex min-h-9 items-center gap-3" aria-live="polite">
          <span className="text-muted">다음 숫자</span>
          <strong className="text-number font-bold text-accent-ink">{displayedNumber}</strong>
          <span className="text-caption text-muted">({displayedNumber} / {rule.lastNumber})</span>
        </div>

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
              <div key={index} aria-hidden="true" className="rounded-xl border border-line" />
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
