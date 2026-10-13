import { NavLink } from 'react-router-dom';

function Header({ time = 0 }) {
  return (
    <header className="flex h-16 items-center justify-between border-b px-8">
      <h1 className="text-lg font-bold">🔢 숫자 클릭 게임</h1>

      <nav>
        <ul className="flex gap-8">
          <li>
            <NavLink
              to="/game"
              className={({ isActive }) =>
                isActive ? 'rounded-lg bg-emerald-200 px-4 py-2' : 'px-4 py-2'
              }
            >
              게임
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/ranking"
              className={({ isActive }) =>
                isActive ? 'rounded-lg bg-emerald-200 px-4 py-2' : 'px-4 py-2'
              }
            >
              랭킹
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="flex shrink-0 items-center gap-4">
        <div className="relative">
          <select
            aria-label="게임 레벨 선택"
            defaultValue="1"
            className="h-10 w-36 cursor-pointer appearance-none rounded-md border border-gray-300 bg-white pl-3 pr-9 text-sm text-gray-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
          >
            <option value="1">Level 1 (3×3)</option>
            <option value="2">Level 2 (4×4)</option>
            <option value="3">Level 3 (5×5)</option>
          </select>
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>

        <span className="rounded-md bg-emerald-200 px-4 py-2 font-bold">
          {time.toFixed(2)}초
        </span>
      </div>
    </header>
  );
}

export default Header;
