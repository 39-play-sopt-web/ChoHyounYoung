import { Link } from 'react-router-dom';
import styled from 'styled-components';

export function HomePage() {
  return (
    <Main>
      <Card>
        <Eyebrow>PLAY SOPT WEB</Eyebrow>
        <h1>SOPT 게시판</h1>
        <p>프로젝트 세팅이 완료됐어요.</p>
        <Link to="/auth">회원 코드 발급 시작하기</Link>
      </Card>
    </Main>
  );
}

const Main = styled.main`
  display: grid;
  min-height: 100vh;
  padding: 24px;
  place-items: center;
`;

const Card = styled.section`
  width: min(100%, 480px);
  padding: 48px;
  text-align: center;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.large};
  box-shadow: 0 16px 48px rgb(24 24 35 / 8%);

  h1 { margin: 8px 0 12px; font-size: 40px; }
  p { margin: 0 0 32px; color: ${({ theme }) => theme.colors.textMuted}; }
  a {
    display: inline-block;
    padding: 14px 20px;
    color: white;
    background: ${({ theme }) => theme.colors.primary};
    border-radius: ${({ theme }) => theme.radius.medium};
    transition: background-color 180ms ease;
  }
  a:hover { background: ${({ theme }) => theme.colors.primaryHover}; }
`;

const Eyebrow = styled.strong`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 13px;
  letter-spacing: 0.12em;
`;
