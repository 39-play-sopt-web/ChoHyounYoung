type StarSelectProps = {
  label: string;
  onClick: () => void;
  isSelected?: boolean;
};

function StarSelect({
  label,
  onClick,
  isSelected = false,
}: StarSelectProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isSelected}
     
      className={`flex h-[30px] shrink-0 items-center justify-center overflow-hidden rounded-[30px] px-[15px] text-center font-['Inter',sans-serif] text-[11px] leading-[14px] font-medium transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
        isSelected
          ? 'bg-accent text-black'
          : 'bg-filter text-text-secondary'
      }`}
    >
      {label}
    </button>
  );
}

export default StarSelect;
