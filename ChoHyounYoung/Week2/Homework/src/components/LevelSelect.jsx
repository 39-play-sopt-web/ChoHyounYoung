import { useEffect, useId, useRef, useState } from 'react';
import { DEFAULT_LEVEL, LEVEL_OPTIONS } from '../constants/game.js';

const LEVELS = LEVEL_OPTIONS.map((option) => option.label);

export default function LevelSelect() {
  // selectedIndex는 확정된 레벨, activeIndex는 마우스나 방향키로 가리키는 후보이다.
  // 후보 이동만으로 선택값이 바뀌지 않도록 두 상태를 분리한다.
  const defaultIndex = LEVEL_OPTIONS.findIndex((option) => option.value === DEFAULT_LEVEL);
  const [selectedIndex, setSelectedIndex] = useState(defaultIndex);
  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  const [isOpen, setIsOpen] = useState(false);
  // ref로 실제 DOM에 접근한다. 컨테이너는 바깥 클릭 판별, 버튼은 포커스 복귀에 사용한다.
  const containerRef = useRef(null);
  const buttonRef = useRef(null);
  // 여러 드롭다운이 생겨도 ID가 겹치지 않도록 React가 고유 ID를 생성한다.
  const listId = useId();

  // 목록 바깥을 누르면 닫고, 이벤트는 목록이 열려 있을 때만 등록한다.
  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (event) => {
      if (!containerRef.current?.contains(event.target)) setIsOpen(false);
    };

    document.addEventListener('pointerdown', handleOutsideClick);
    // 닫히거나 컴포넌트가 사라지면 등록한 이벤트를 정리한다.
    return () => document.removeEventListener('pointerdown', handleOutsideClick);
  }, [isOpen]);

  const selectLevel = (index) => {
    // 같은 레벨을 다시 눌러도 닫힌다. 초록색은 포커스 대신 isOpen에 연결했다.
    setSelectedIndex(index);
    setIsOpen(false);
    buttonRef.current?.focus();
  };

  // 포커스는 버튼에 유지하고 방향키로 선택 후보를 이동한다.
  const handleKeyDown = (event) => {
    if (event.key === 'Escape' || event.key === 'Tab') {
      // Tab 기본 동작은 막지 않아 다음 요소로 이동할 수 있게 한다.
      setIsOpen(false);
      if (event.key === 'Escape') event.preventDefault();
      return;
    }

    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      if (!isOpen) {
        setActiveIndex(selectedIndex);
        setIsOpen(true);
      } else {
        const direction = event.key === 'ArrowDown' ? 1 : -1;
        // 나머지 연산으로 마지막 다음은 처음, 처음 이전은 마지막으로 순환한다.
        setActiveIndex((index) => (index + direction + LEVELS.length) % LEVELS.length);
      }
    } else if (isOpen && (event.key === 'Home' || event.key === 'End')) {
      event.preventDefault();
      setActiveIndex(event.key === 'Home' ? 0 : LEVELS.length - 1);
    } else if (isOpen && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      selectLevel(activeIndex);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative shrink-0"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsOpen(false);
      }}
    >
      {/* 기본 select의 목록 위치는 운영체제가 정하므로 버튼과 목록으로 직접 구성했다.
          aria-expanded는 열림 상태, controls는 연결된 목록, activedescendant는 현재 후보를 알린다.
          초록 테두리는 목록이 열린 동안만 표시하고 닫히면 0.2초 동안 투명해진다.
          키보드 포커스는 focus-visible의 회색 outline으로 별도 표시한다. */}
      <button
        ref={buttonRef}
        type="button"
        role="combobox"
        aria-label="게임 레벨 선택"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listId}
        aria-activedescendant={isOpen ? `${listId}-${activeIndex}` : undefined}
        onKeyDown={handleKeyDown}
        onClick={() => {
          setActiveIndex(selectedIndex);
          setIsOpen((open) => !open);
        }}
        className={`flex h-10 w-34 cursor-pointer items-center justify-between rounded-md border bg-gray-50 px-3 text-sm text-gray-900 transition-[border-color,box-shadow] duration-200 ease-out motion-reduce:transition-none focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400 ${isOpen ? 'border-emerald-500 ring-2 ring-emerald-200' : 'border-transparent ring-2 ring-transparent'}`}
      >
        <span>{LEVELS[selectedIndex]}</span>
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 shrink-0 text-gray-500">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {/* relative 컨테이너를 기준으로 top-full은 버튼 바로 아래, mt-1은 4px 간격이다.
          absolute라 목록이 열려도 주변 레이아웃을 밀지 않고, z-20으로 본문 위에 표시한다. */}
      {isOpen && (
        <ul id={listId} role="listbox" aria-label="레벨" className="absolute left-0 top-full z-20 mt-1 w-full rounded-md border border-gray-200 bg-white p-1 shadow-lg">
          {LEVELS.map((label, index) => (
            // pointerdown 기본 동작을 막아 항목을 누를 때 버튼의 포커스가 먼저 사라지지 않게 한다.
            <li
              key={label}
              id={`${listId}-${index}`}
              role="option"
              aria-selected={selectedIndex === index}
              onPointerMove={() => setActiveIndex(index)}
              onPointerDown={(event) => event.preventDefault()}
              onClick={() => selectLevel(index)}
              className={`cursor-pointer rounded px-2 py-2 text-sm ${activeIndex === index ? 'bg-emerald-100 text-emerald-900' : 'text-gray-900'}`}
            >
              {label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
