type DetailCardProps = {
  label: string
  value: string
}

function DetailCard({ label, value }: DetailCardProps) {
  return (
    <div className="min-h-[89px] w-full rounded-[10px] bg-border p-4 font-['Inter',sans-serif]">
      <p className="text-[11px] leading-4 font-normal text-text-secondary">{label}</p>
      <p className="mt-1.5 text-[13px] leading-[18px] font-medium break-words whitespace-pre-line text-text-primary">
        {value}
      </p>
    </div>
  )
}

export default DetailCard
