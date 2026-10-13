import { useEffect, useRef, useState } from 'react';

export default function NumberTile({ number, onClick, disabled = false }) {
  const [isFlashing, setIsFlashing] = useState(false);
  const flashTimerRef = useRef(null);

  // 타일이 사라지면 예약된 효과 종료 작업도 정리한다.
  useEffect(() => () => clearTimeout(flashTimerRef.current), []);

  const handleClick = (event) => {
    // 클릭 후에도 잠깐 밝게 유지한다. 연속 클릭하면 마지막 클릭부터 시간을 다시 센다.
    clearTimeout(flashTimerRef.current);
    setIsFlashing(true);
    flashTimerRef.current = setTimeout(() => setIsFlashing(false), 180);

    // 숫자 순서 판정은 부모에서 처리하고, 타일은 클릭만 전달한다.
    onClick?.(event);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      // 크기는 부모 grid가 결정한다. active는 누르는 동안, isFlashing은 클릭 직후의 효과다.
      className={`flex h-full w-full min-w-0 items-center justify-center rounded-xl text-2xl font-bold text-emerald-950 shadow-sm transition-[background-color,box-shadow,transform] duration-150 ease-out enabled:hover:-translate-y-0.5 enabled:hover:shadow-md enabled:active:translate-y-0 enabled:active:scale-95 enabled:active:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:cursor-default disabled:opacity-40 motion-reduce:transition-none motion-reduce:transform-none ${isFlashing ? 'bg-white' : 'bg-emerald-100 enabled:hover:bg-emerald-200'}`}
    >
      {number}
    </button>
  );
}
