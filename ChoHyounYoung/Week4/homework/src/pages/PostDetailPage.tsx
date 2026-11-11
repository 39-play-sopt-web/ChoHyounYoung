import { useEffect, useState, type FormEvent } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { deletePost, updatePost } from '@/api/board';
import { POST_LIMITS, queryKeys } from '@/constants/board';
import { usePost } from '@/hooks/usePosts';
import { formatPostDate } from '@/lib/date';
import { getErrorMessage } from '@/lib/error';
import { getLengthError } from '@/lib/validation';
import { Button, ButtonRow, ErrorText, Field, FieldMeta, FormGroup, Label, Page, Status, Textarea } from '@/styles/shared';

export function PostDetailPage() {
  const { postId } = useParams();
  const parsedId = Number(postId);
  // 숫자가 아닌 주소로 들어오면 요청을 보내지 않고 잘못된 주소로 처리한다.
  const id = Number.isSafeInteger(parsedId) && parsedId > 0 ? parsedId : null;
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const postQuery = usePost(id);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (!postQuery.data) return;
    // 상세 조회가 끝난 뒤 서버 값을 수정 input의 초기값으로 사용한다.
    setTitle(postQuery.data.title);
    setContent(postQuery.data.content);
  }, [postQuery.data]);

  const updateMutation = useMutation({
    mutationFn: () => updatePost(id!, { title: title.trim(), content: content.trim() }),
    onSuccess: () => {
      // 상세만 갱신하면 목록에는 예전 제목이 남기 때문에 두 쿼리를 함께 무효화한다.
      void Promise.all([
        queryClient.invalidateQueries({ queryKey: queryKeys.posts.all }),
        queryClient.invalidateQueries({ queryKey: queryKeys.posts.detail(id!) }),
      ]).then(() => {
        alert('게시글이 수정되었습니다.');
        setIsEditing(false);
      });
    },
    onError: (error) => alert(getErrorMessage(error)),
  });
  const deleteMutation = useMutation({
    mutationFn: () => deletePost(id!),
    onSuccess: () => {
      // 삭제된 카드를 목록에서 바로 없애기 위해 목록 쿼리를 다시 불러온다.
      void queryClient.invalidateQueries({ queryKey: queryKeys.posts.all }).then(() => {
        alert('게시글이 삭제되었습니다.');
        void navigate('/');
      });
    },
    onError: (error) => alert(getErrorMessage(error)),
  });

  const startEditing = () => {
    if (!postQuery.data) return;
    setTitle(postQuery.data.title);
    setContent(postQuery.data.content);
    setIsEditing(true);
  };
  const cancelEditing = () => {
    // 취소 후 다시 수정할 때 방금 취소한 입력이 남지 않도록 서버 값으로 되돌린다.
    if (postQuery.data) {
      setTitle(postQuery.data.title);
      setContent(postQuery.data.content);
    }
    setIsEditing(false);
  };
  const titleError = getLengthError('제목', title, POST_LIMITS.title);
  const contentError = getLengthError('본문', content, POST_LIMITS.content);
  const canUpdate = Boolean(title.trim() && content.trim() && !titleError && !contentError);
  const handleUpdate = (event: FormEvent) => {
    event.preventDefault();
    if (canUpdate) updateMutation.mutate();
  };
  const handleDelete = () => {
    if (window.confirm('게시글을 삭제할까요?')) deleteMutation.mutate();
  };

  if (id === null) return <Page><Status>잘못된 게시글 주소입니다.<br /><Button onClick={() => { void navigate('/'); }}>목록으로</Button></Status></Page>;
  if (postQuery.isPending) return <Page><Status>게시글을 불러오는 중...</Status></Page>;
  if (postQuery.isError || !postQuery.data) return <Page><Status>{postQuery.isError ? getErrorMessage(postQuery.error) : '게시글이 없습니다.'}<br /><Button onClick={() => { void navigate('/'); }}>목록으로</Button></Status></Page>;

  const post = postQuery.data;
  return (
    <Page>
      <BackButton onClick={() => { void navigate('/'); }}>← 목록으로</BackButton>
      <Card>
        {isEditing ? (
          <form onSubmit={handleUpdate}>
            <FormGroup><Label htmlFor="edit-title">제목</Label><Field id="edit-title" value={title} aria-invalid={Boolean(titleError)} onChange={(event) => setTitle(event.target.value)} /><FieldMeta>{titleError ? <ErrorText>{titleError}</ErrorText> : <span />}<span>{title.length} / {POST_LIMITS.title}</span></FieldMeta></FormGroup>
            <FormGroup><Label htmlFor="edit-content">본문</Label><Textarea id="edit-content" value={content} aria-invalid={Boolean(contentError)} onChange={(event) => setContent(event.target.value)} /><FieldMeta>{contentError ? <ErrorText>{contentError}</ErrorText> : <span />}<span>{content.length} / {POST_LIMITS.content}</span></FieldMeta></FormGroup>
            <ButtonRow><Button type="button" onClick={cancelEditing}>취소</Button><Button $variant="primary" disabled={!canUpdate || updateMutation.isPending}>수정 완료</Button></ButtonRow>
          </form>
        ) : (
          <><h1>{post.title}</h1><Meta><strong>{post.author}</strong><time dateTime={post.createdAt}>{formatPostDate(post.createdAt)}</time></Meta><Content>{post.content}</Content><Divider /><ButtonRow><Button onClick={startEditing}>수정</Button><Button $variant="danger" disabled={deleteMutation.isPending} onClick={handleDelete}>삭제</Button></ButtonRow></>
        )}
      </Card>
    </Page>
  );
}

const BackButton = styled(Button)`margin-bottom:${({theme})=>theme.spacing[5]};`;
const Card = styled.article`padding:${({theme})=>theme.spacing[8]};background:${({theme})=>theme.colors.surface};border-radius:16px;box-shadow:${({theme})=>theme.shadow.card};h1{margin:0 0 ${({theme})=>theme.spacing[3]};font:${({theme})=>theme.typography.heading}}@media(max-width:600px){padding:${({theme})=>theme.spacing[5]}}`;
const Meta = styled.div`display:flex;gap:${({theme})=>theme.spacing[3]};color:${({theme})=>theme.colors.textTertiary};font:${({theme})=>theme.typography.caption};strong{color:${({theme})=>theme.colors.primary}}`;
const Content = styled.p`min-height:100px;margin:${({theme})=>theme.spacing[8]} 0;color:${({theme})=>theme.colors.textSecondary};font:${({theme})=>theme.typography.body};white-space:pre-wrap;overflow-wrap:anywhere;`;
const Divider = styled.hr`height:1px;border:0;background:${({theme})=>theme.colors.border};`;
