function Header() {
  return (
    <header className="flex h-[55px] w-full items-center overflow-hidden border-b border-header-border bg-header px-5">
      <div className="text-left font-['Inter',sans-serif] text-lg leading-6 font-extrabold text-text-primary">
        <span>PLAY SOPT </span>
        <span className="text-accent">MOVIE</span>
      </div>
    </header>
  )
}

export default Header
