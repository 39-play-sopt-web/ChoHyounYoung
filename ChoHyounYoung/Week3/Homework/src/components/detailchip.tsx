type DetailChipProps = {
  label: string
}

function DetailChip({ label }: DetailChipProps) {
  return (
    <span className="inline-flex h-[27px] items-center justify-center rounded-[30px] bg-surface-accent px-2.5 font-['Inter',sans-serif] text-[11px] font-normal text-accent">
      {label}
    </span>
  )
}

export default DetailChip
