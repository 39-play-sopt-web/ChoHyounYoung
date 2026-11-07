import { useState, type FormEvent } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { createPost } from '@/api/board';
import { POST_LIMITS, queryKeys } from '@/constants/board';
import { getErrorMessage } from '@/lib/error';
import { getLengthError } from '@/lib/validation';
import { Button, ButtonRow, ErrorText, Field, FieldMeta, FormGroup, Heading, Label, Page, Textarea } from '@/styles/shared';

type WriteStep = 'title' | 'content' | 'author';
const steps: WriteStep[] = ['title', 'content', 'author'];

export function WritePage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [step, setStep] = useState<WriteStep>('title');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');

  // 주소는 그대로 두고 현재 단계만 바꿔서, 이전 단계의 입력값을 잃지 않게 했다.
  const titleError = getLengthError('제목', title, POST_LIMITS.title);
  const contentError = getLengthError('본문', content, POST_LIMITS.content);
  const authorError = getLengthError('작성자', author, POST_LIMITS.author);
  const currentValue = { title, content, author }[step];
  const currentError = { title: titleError, content: contentError, author: authorError }[step];
  // 공백만 입력하거나 최대 글자 수를 넘긴 경우에는 다음 단계로 갈 수 없다.
  const canContinue = Boolean(currentValue.trim() && !currentError);

  const createMutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.posts.all }).then(() => {
        alert(`${author.trim()}님의 게시글이 작성되었습니다.`);
        void navigate('/');
      });
    },
    onError: (error) => alert(getErrorMessage(error)),
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canContinue) return;

    // 같은 URL 안에서 단계만 이동하고, 마지막 단계에서만 실제 작성 요청을 보낸다.
    const currentIndex = steps.indexOf(step);
    if (step !== 'author') setStep(steps[currentIndex + 1]);
    else createMutation.mutate({ title: title.trim(), content: content.trim(), author: author.trim() });
  };

  return (
    <Page>
      <Heading>게시글 작성</Heading>
      <Progress aria-label="작성 단계">{steps.map((item, index) => <span key={item} data-active={item === step}>{index + 1}</span>)}</Progress>
      <form onSubmit={handleSubmit}>
        {step === 'title' && <FormGroup><Label htmlFor="title">제목</Label><Field id="title" autoFocus value={title} aria-invalid={Boolean(titleError)} placeholder="제목을 입력하세요" onChange={(event) => setTitle(event.target.value)} /><FieldMeta>{titleError ? <ErrorText role="alert">{titleError}</ErrorText> : <span /> }<span>{title.length} / {POST_LIMITS.title}</span></FieldMeta></FormGroup>}
        {step === 'content' && <FormGroup><Label htmlFor="content">본문</Label><Textarea id="content" autoFocus value={content} aria-invalid={Boolean(contentError)} placeholder="본문을 입력하세요" onChange={(event) => setContent(event.target.value)} /><FieldMeta>{contentError ? <ErrorText role="alert">{contentError}</ErrorText> : <span /> }<span>{content.length} / {POST_LIMITS.content}</span></FieldMeta></FormGroup>}
        {step === 'author' && <FormGroup><Label htmlFor="author">작성자</Label><Field id="author" autoFocus value={author} aria-invalid={Boolean(authorError)} placeholder="작성자를 입력하세요" onChange={(event) => setAuthor(event.target.value)} /><FieldMeta>{authorError ? <ErrorText role="alert">{authorError}</ErrorText> : <span /> }<span>{author.length} / {POST_LIMITS.author}</span></FieldMeta></FormGroup>}
        <ButtonRow>
          <Button type="button" onClick={() => { void navigate('/'); }}>목록으로</Button>
          {step !== 'title' && <Button type="button" onClick={() => setStep(steps[steps.indexOf(step) - 1])}>이전</Button>}
          <Button $variant="primary" disabled={!canContinue || createMutation.isPending}>
            {step === 'author' ? createMutation.isPending ? '작성 중...' : '작성' : '다음'}
          </Button>
        </ButtonRow>
      </form>
    </Page>
  );
}

const Progress = styled.div`display:flex;gap:${({theme})=>theme.spacing[2]};margin-bottom:${({theme})=>theme.spacing[8]};span{display:grid;width:28px;height:28px;color:${({theme})=>theme.colors.textTertiary};border:1px solid ${({theme})=>theme.colors.border};border-radius:${({theme})=>theme.radius.round};font:${({theme})=>theme.typography.caption};place-items:center}span[data-active='true']{color:${({theme})=>theme.colors.onPrimary};border-color:${({theme})=>theme.colors.primary};background:${({theme})=>theme.colors.primary}}`;
