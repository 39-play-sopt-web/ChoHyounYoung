import LevelSelect from './LevelSelect.jsx';
import { NavLink, useLocation } from 'react-router-dom';

/* 배치 메모
 * flex는 자식을 기본적으로 가로 배치하고, justify-between은 사이 공간을 균등하게 나눈다.
 * 좌우 내용의 너비가 다르면 중앙 메뉴가 치우칠 수 있어서 같은 너비의 grid 3칸을 사용했다.
 * justify-self는 grid 칸 안의 위치, items-center는 기본 가로 flex에서 세로 정렬이다.
 * 기본 간격 단위는 0.25rem: 보통 h-10은 40px, w-20은 80px, px-4는 좌우 16px씩이다.
 * 모든 숫자가 이 단위는 아니다. grid-cols-3은 열 개수이고 border-2는 2px이다.
 */
function Header({ time = 0, level, onLevelChange }) {
  // URL을 기준으로 메뉴를 표시하면 새로고침과 뒤로 가기에도 상태가 맞는다.
  // 메뉴를 별도 state로 저장하면 /ranking에서 새로고침할 때 기본값 game으로 돌아갈 수 있다.
  const { pathname } = useLocation();
  const isGamePage = pathname === '/game';
  const isRankingPage = pathname === '/ranking';

  return (
    <header className="grid h-16 grid-cols-3 items-center px-8">
      <h1 className="justify-self-start text-lg font-bold">
        🔢 숫자 클릭 게임
      </h1>

      <nav aria-label="메인 메뉴" className="relative justify-self-center">
        {/* relative인 nav를 기준으로 absolute 배경을 겹쳐 놓는다.
            translate-x-full은 배경 자신의 너비(80px)만큼 이동한다는 뜻이다.
            메뉴 너비도 80px로 맞추고 gap을 없애야 정확하게 한 칸 이동한다.
            transition-transform은 이동을, duration-300은 전환 시간 0.3초를 지정한다.
            배경은 장식이므로 aria-hidden과 pointer-events-none을 적용한다. */}
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute left-0 top-0 h-10 w-20 rounded-md bg-emerald-200 transition-transform duration-300 ease-in-out motion-reduce:transition-none ${isRankingPage ? 'translate-x-full' : 'translate-x-0'}`}
        />
        <ul className="relative flex">
          <li>
            <NavLink
              to="/game"
              className="inline-flex h-10 w-20 items-center justify-center rounded-md transition-colors duration-200 hover:text-emerald-700 motion-reduce:transition-none"
            >
              게임
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/ranking"
              className="inline-flex h-10 w-20 items-center justify-center rounded-md transition-colors duration-200 hover:text-emerald-700 motion-reduce:transition-none"
            >
              랭킹
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* 조건 && JSX: 게임 경로일 때만 렌더링한다. 오른쪽 칸이 비어도 nav는 중앙에 남는다. */}
      {isGamePage && (
        <div className="flex items-center justify-self-end gap-4">
          <LevelSelect level={level} onLevelChange={onLevelChange} />

          {/* tabular-nums는 숫자마다 같은 너비를 사용한다. w-28로 박스 너비도 고정해 떨림을 막는다.
              h-10으로 메뉴와 높이를 맞추고, shrink-0과 nowrap으로 숫자 줄바꿈을 막는다.
              전체 Header의 작은 화면 배치는 별도 반응형 처리가 필요하다. */}
          <span className="inline-flex h-10 w-28 shrink-0 items-center justify-center whitespace-nowrap rounded-md bg-emerald-200 px-2 font-bold tabular-nums">
            {/* 소수점 두 자리로 표시한다. 실제 시간 측정 로직은 아직 연결하지 않았다. */}
            {time.toFixed(2)}초
          </span>
        </div>
      )}
    </header>
  );
}

export default Header;
