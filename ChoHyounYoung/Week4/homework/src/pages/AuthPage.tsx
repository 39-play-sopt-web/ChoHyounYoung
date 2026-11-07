import { Link } from 'react-router-dom';
import styled from 'styled-components';

export function AuthPage() {
  return (
    <Main>
      <h1>회원 코드 발급</h1>
      <p>다음 단계에서 API와 발급 폼을 연결할 예정입니다.</p>
      <Link to="/">돌아가기</Link>
    </Main>
  );
}

const Main = styled.main`
  max-width: 720px;
  margin: 0 auto;
  padding: 80px 24px;

  p { color: ${({ theme }) => theme.colors.textMuted}; }
  a { color: ${({ theme }) => theme.colors.primary}; }
`;
