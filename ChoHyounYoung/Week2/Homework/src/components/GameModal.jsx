import { useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';

export default function GameModal({ open = false, onClose, levelLabel, playTime, storageError }) {
  const dialogRef = useRef(null);
  const titleId = useId();
  const descriptionId = useId();

  // showModal은 배경 조작을 막고 키보드 포커스를 모달 안에 유지한다.
  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      if (previousFocus?.isConnected && !previousFocus.disabled) previousFocus.focus();
    };
  }, [open]);

  if (!open) return null;

  // JSX는 GamePage에서 사용하지만 실제 DOM은 body 아래에 배치한다.
  return createPortal(
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      className="fixed inset-0 m-auto w-[calc(100%-32px)] max-w-sm rounded-2xl border-0 bg-white p-8 text-center text-slate-900 shadow-xl backdrop:bg-black/40"
    >
      <h2 id={titleId} className="text-2xl font-bold">게임 완료!</h2>
      <p className="mt-3 text-sm text-slate-500">{levelLabel}</p>
      <p id={descriptionId} className="mt-2 text-3xl font-bold text-emerald-700">
        {playTime.toFixed(2)}초
      </p>
      {storageError && (
        <p role="alert" className="mt-4 text-sm text-red-600">기록을 저장하지 못했어요.</p>
      )}
      <button
        type="button"
        autoFocus
        onClick={onClose}
        className="mt-6 h-11 w-full rounded-lg bg-emerald-200 font-semibold transition-colors hover:bg-emerald-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
      >
        확인
      </button>
    </dialog>,
    document.body,
  );
}
