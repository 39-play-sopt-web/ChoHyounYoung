export default function GameModal({ open = false, onClose, children }) {
  if (!open) return null;

  return (
    <dialog open aria-label="게임 안내" className="fixed inset-0 m-auto rounded-xl border border-slate-200 bg-white p-6 shadow-lg">
      {children}
      <button type="button" onClick={onClose} className="mt-4 rounded-lg bg-slate-900 px-4 py-2 text-white">
        닫기
      </button>
    </dialog>
  );
}
