export default function NumberTile({ number, onClick, disabled = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="aspect-square rounded-lg bg-slate-100 text-xl font-semibold hover:bg-slate-200 disabled:opacity-50"
    >
      {number}
    </button>
  );
}
