import { useEffect, useRef, useState } from 'react';

export default function NumberTile({ number, onClick, disabled = false }) {
  const [isFlashing, setIsFlashing] = useState(false);
  const flashTimerRef = useRef(null);

  // 타일이 사라지면 예약된 효과 종료 작업도 정리한다.
  useEffect(() => () => clearTimeout(flashTimerRef.current), []);

  const handleClick = (event) => {
    // 부모가 오답으로 판단하면 밝아지는 효과도 실행하지 않는다.
    if (onClick?.(event) === false) return;

    // 정답 클릭 직후 잠깐 밝게 표시하고, 이후에는 기본 색상으로 돌아간다.
    clearTimeout(flashTimerRef.current);
    setIsFlashing(true);
    flashTimerRef.current = setTimeout(() => setIsFlashing(false), 180);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      // 크기는 부모 grid가 결정한다. active는 누르는 동안, isFlashing은 클릭 직후의 효과다.
      className={`flex h-full w-full min-w-0 items-center justify-center rounded-xl text-tile font-bold text-tile-ink shadow-sm transition-[background-color,box-shadow,transform] duration-150 ease-out enabled:hover:-translate-y-0.5 enabled:hover:shadow-md enabled:active:translate-y-0 enabled:active:scale-95 enabled:active:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-focus disabled:cursor-default motion-reduce:transition-none motion-reduce:transform-none ${isFlashing ? 'bg-surface' : 'bg-accent-soft enabled:hover:bg-accent'}`}
    >
      {number}
    </button>
  );
}
