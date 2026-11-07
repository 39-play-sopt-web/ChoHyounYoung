import { NavLink, useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import styled from 'styled-components';
import { authStorage } from '@/lib/storage';

export function Header() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const part = authStorage.getPart();

  const handleLogout = () => {
    authStorage.clear();
    // 다른 코드로 다시 들어왔을 때 이전 게시글이 잠깐 보이지 않도록 캐시도 같이 비운다.
    queryClient.clear();
    void navigate('/auth');
  };

  return (
    <Bar>
      <Left><Brand to="/">PLAY SOPT <span>BOARD</span></Brand>{part && <Badge>{part} 파트</Badge>}</Left>
      <Nav aria-label="주요 메뉴">
        <NavLink to="/" end>게시글 목록</NavLink>
        <NavLink to="/write">글쓰기</NavLink>
        <button type="button" onClick={handleLogout}>로그아웃</button>
      </Nav>
    </Bar>
  );
}

const Bar = styled.header`display:flex;align-items:center;justify-content:space-between;min-height:66px;padding:0 ${({theme})=>theme.spacing[8]};gap:${({theme})=>theme.spacing[5]};border-bottom:1px solid ${({theme})=>theme.colors.headerBorder};@media(max-width:600px){padding:${({theme})=>theme.spacing[4]};}`;
const Left = styled.div`display:flex;align-items:center;gap:${({theme})=>theme.spacing[4]};`;
const Brand = styled(NavLink)`font-size:20px;font-weight:800;letter-spacing:-.04em;white-space:nowrap;span{color:${({theme})=>theme.colors.primary}}@media(max-width:600px){font-size:16px;}`;
const Badge = styled.span`padding:6px 10px;border:1px solid ${({theme})=>theme.colors.border};border-radius:${({theme})=>theme.radius.round};color:${({theme})=>theme.colors.primary};font:${({theme})=>theme.typography.caption};white-space:nowrap;`;
const Nav = styled.nav`display:flex;align-items:center;gap:${({theme})=>theme.spacing[6]};a,button{padding:${({theme})=>theme.spacing[2]} 0;border:0;color:${({theme})=>theme.colors.textSecondary};background:none;font:${({theme})=>theme.typography.label}}.active,a:hover,button:hover{color:${({theme})=>theme.colors.primary}}@media(max-width:600px){gap:${({theme})=>theme.spacing[3]};a,button{font-size:11px}}`;
