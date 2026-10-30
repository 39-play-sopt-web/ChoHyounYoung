type DetailCardProps = {
  label: string
  value: string
}

function DetailCard({ label, value }: DetailCardProps) {
  return (
    <div className="min-h-24 w-full rounded-[10px] bg-border p-4 font-['Inter',sans-serif] text-xs">
      <p className="font-normal text-text-secondary">{label}</p>
      <p className="mt-1.5 font-medium break-words whitespace-pre-line text-text-primary">
        {value}
      </p>
    </div>
  )
}

export default DetailCard
