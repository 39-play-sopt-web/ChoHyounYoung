import { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { authStorage } from '@/lib/storage';

export function RequireAuth() {
  const location = useLocation();
  const isAuthenticated = Boolean(authStorage.getCode());

  // 주소를 직접 입력해 들어오는 경우도 막아야 해서 버튼 클릭이 아니라 라우트에서 검사한다.
  // 원래 가려던 주소를 state에 남겨 코드 발급 후 그 화면으로 돌아갈 수 있게 했다.
  useEffect(() => {
    if (!isAuthenticated) alert('회원 코드를 먼저 발급받아 주세요.');
  }, [isAuthenticated]);

  return isAuthenticated
    ? <Outlet />
    : <Navigate to="/auth" replace state={{ from: location.pathname }} />;
}
