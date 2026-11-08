import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { issueAuthorizationCode } from '@/api/board';
import { getErrorMessage } from '@/lib/error';
import { authStorage, type Part } from '@/lib/storage';
import { Button, ErrorText } from '@/styles/shared';

export function AuthPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [part, setPart] = useState<Part | ''>('');
  const returnPath = (location.state as { from?: string } | null)?.from ?? '/';

  // 코드 발급은 서버 데이터를 바꾸는 요청이라 useQuery가 아닌 useMutation을 사용했다.
  const issueCode = useMutation({
    mutationFn: issueAuthorizationCode,
    onSuccess: (authorizationCode) => {
      if (!part) return;
      // 새로고침해도 인증이 유지되어야 해서 발급 코드와 파트를 함께 저장한다.
      authStorage.setCode(authorizationCode);
      authStorage.setPart(part);
      void navigate(returnPath, { replace: true });
    },
  });

  return (
    <Wrap>
      <Box>
        <h1>회원 코드 발급</h1>
        <p>파트를 선택하고 PLAY SOPT 게시판을 시작해 보세요.</p>
        <Row>
          <Select aria-label="파트 선택" value={part} onChange={(event) => setPart(event.target.value as Part | '')}>
            <option value="">파트를 선택하세요</option>
            <option value="WEB">WEB</option>
            <option value="iOS">iOS</option>
            <option value="ANDROID">ANDROID</option>
          </Select>
          <Button $variant="primary" disabled={!part || issueCode.isPending} onClick={() => part && issueCode.mutate(part)}>
            코드 발급
          </Button>
        </Row>
        {issueCode.isError && <Message role="alert">{getErrorMessage(issueCode.error)}</Message>}
        <FullButton type="button" onClick={() => { void navigate('/'); }}>게시판 목록 보기</FullButton>
      </Box>
    </Wrap>
  );
}

const Wrap = styled.main`display:grid;min-height:100vh;padding:${({theme})=>theme.spacing[6]};place-items:center;`;
const Box = styled.section`width:min(100%,370px);h1{margin:0 0 ${({theme})=>theme.spacing[3]};font:${({theme})=>theme.typography.display};letter-spacing:-.05em}p{margin:0 0 ${({theme})=>theme.spacing[6]};color:${({theme})=>theme.colors.textSecondary};font:${({theme})=>theme.typography.label}}`;
const Row = styled.div`display:flex;gap:${({theme})=>theme.spacing[3]};`;
const Select = styled.select`min-width:0;flex:1;height:44px;padding:0 ${({theme})=>theme.spacing[3]};border:1px solid ${({theme})=>theme.colors.border};border-radius:${({theme})=>theme.radius.medium};background:${({theme})=>theme.colors.surface};&:focus{border-color:${({theme})=>theme.colors.primary}}`;
const FullButton = styled(Button)`width:100%;margin-top:${({theme})=>theme.spacing[4]};`;
const Message = styled(ErrorText)`display:block;margin-top:${({theme})=>theme.spacing[3]};font:${({theme})=>theme.typography.caption};`;
