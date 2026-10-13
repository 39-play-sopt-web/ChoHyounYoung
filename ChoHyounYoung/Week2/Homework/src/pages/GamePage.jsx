import { useRef, useState } from 'react';
import NumberTile from '../components/NumberTile.jsx';
import { GAME_LEVELS } from '../constants/game.js';
import { shuffle } from '../utils/shuffle.js';

export default function GamePage({ level }) {
  // App에서 전달받은 레벨의 규칙으로 숫자 범위와 grid 크기를 결정한다.
  const rule = GAME_LEVELS[level];
  // 모든 숫자를 초기화할 때 한 번 섞고, 클릭 후에도 숫자와 위치를 유지한다.
  const [game, setGame] = useState(() => ({
    numbers: shuffle(Array.from({ length: rule.tileCount }, (_, index) => rule.firstNumber + index)),
    nextNumber: rule.firstNumber,
  }));
  // 빠른 연속 클릭에서도 다음 렌더링을 기다리지 않고 최신 진행 상태를 확인한다.
  const gameRef = useRef(game);
  const { numbers, nextNumber } = game;
  const isFinished = nextNumber > rule.lastNumber;

  const handleNumberClick = (index) => {
    const current = gameRef.current;
    const number = current.numbers[index];
    if (number !== current.nextNumber) return false;

    // 숫자 배열은 유지하고 다음 숫자만 증가시킨다. 이미 맞힌 숫자는 nextNumber보다 작다.
    const updated = { ...current, nextNumber: current.nextNumber + 1 };
    gameRef.current = updated;
    setGame(updated);
    return true;
  };

  return (
    <div className="min-h-[calc(100dvh-64px)] bg-[#F0FAF7] text-slate-900">
      <main className="mx-auto flex w-full max-w-xl flex-col items-center px-4 py-12 sm:py-16">
        <h2 className="sr-only">숫자 클릭 게임</h2>

        <div className="mb-6 flex min-h-9 items-center gap-3" aria-live="polite">
          {!isFinished && (
            <>
              <span className="text-slate-500">다음 숫자</span>
              <strong className="text-3xl font-bold text-emerald-900">{nextNumber}</strong>
              <span className="text-sm text-slate-500">({nextNumber} / {rule.lastNumber})</span>
            </>
          )}
        </div>

        {/* 보드 크기는 최대 460px. 행과 열을 같은 개수로 나눠 타일을 정사각형으로 만든다. */}
        <div
          className="grid aspect-square w-full max-w-[460px] gap-3"
          style={{
            gridTemplateColumns: `repeat(${rule.gridSize}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${rule.gridSize}, minmax(0, 1fr))`,
          }}
        >
          {numbers.map((number, index) => (
            // 숫자의 위치는 고정이고, 완료 여부만 다음 숫자를 기준으로 계산한다.
            <NumberTile
              key={index}
              number={number}
              completed={number < nextNumber}
              disabled={number < nextNumber || isFinished}
              onClick={() => handleNumberClick(index)}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
