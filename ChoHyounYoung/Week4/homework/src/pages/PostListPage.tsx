import { useState, type FormEvent } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { usePosts } from '@/hooks/usePosts';
import { formatPostDate } from '@/lib/date';
import { getErrorMessage } from '@/lib/error';
import { getSearchError } from '@/lib/validation';
import { Button, ErrorText, Field, FieldMeta, Page, Status } from '@/styles/shared';

export function PostListPage() {
  const [input, setInput] = useState('');
  const [keyword, setKeyword] = useState('');
  const searchError = getSearchError(input);
  const postsQuery = usePosts(keyword);
  // 무한 쿼리는 페이지별 배열이라 카드로 그리기 전에 한 배열로 합친다.
  const posts = postsQuery.data?.pages.flatMap((page) => page.posts) ?? [];
  const loadMoreRef = useIntersectionObserver(
    () => void postsQuery.fetchNextPage(),
    // 다음 페이지가 있고 현재 요청 중이 아닐 때만 감시해 중복 요청을 막는다.
    Boolean(postsQuery.hasNextPage && !postsQuery.isFetchingNextPage),
  );

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextKeyword = input.trim();
    // 입력할 때마다 요청하지 않고 검색 버튼을 누른 시점의 값만 쿼리 키에 반영한다.
    // 입력창을 전부 지웠을 때는 바로 전체 목록으로 돌아간다.
    if (!getSearchError(nextKeyword)) setKeyword(nextKeyword);
  };

  return (
    <Page>
      <SearchForm onSubmit={handleSearch}>
        <div>
          <Field aria-label="제목 검색" aria-invalid={Boolean(searchError)} placeholder="제목으로 검색" value={input}
            onChange={(event) => { const value = event.target.value; setInput(value); if (!value.trim()) setKeyword(''); }} />
          {searchError && <FieldMeta><ErrorText role="alert">{searchError}</ErrorText></FieldMeta>}
        </div>
        <Button $variant="primary" disabled={!input.trim() || Boolean(searchError)}>검색</Button>
      </SearchForm>

      {postsQuery.isPending && <Status>게시글을 불러오는 중...</Status>}
      {postsQuery.isError && <Status>{getErrorMessage(postsQuery.error)}<br /><Button onClick={() => void postsQuery.refetch()}>다시 시도</Button></Status>}
      {!postsQuery.isPending && !postsQuery.isError && posts.length === 0 && <Status>{keyword ? '검색 결과가 없습니다.' : '아직 작성된 게시글이 없습니다.'}</Status>}
      {posts.length > 0 && <List>{posts.map((post) => <CardLink key={post.id} to={`/posts/${post.id}`}><h2>{post.title}</h2><p>{post.content}</p><Meta><strong>{post.author}</strong><time dateTime={post.createdAt}>{formatPostDate(post.createdAt)}</time></Meta></CardLink>)}</List>}
      <LoadMore ref={loadMoreRef} aria-hidden="true">{postsQuery.isFetchingNextPage && '게시글을 더 불러오는 중...'}</LoadMore>
    </Page>
  );
}

const SearchForm = styled.form`display:grid;grid-template-columns:1fr auto;align-items:start;gap:${({theme})=>theme.spacing[2]};margin-bottom:${({theme})=>theme.spacing[6]};`;
const List = styled.section`display:flex;flex-direction:column;gap:${({theme})=>theme.spacing[3]};`;
const CardLink = styled(Link)`display:block;padding:${({theme})=>theme.spacing[5]} ${({theme})=>theme.spacing[6]};background:${({theme})=>theme.colors.surface};border:1px solid transparent;border-radius:${({theme})=>theme.radius.large};h2{margin:0 0 ${({theme})=>theme.spacing[2]};font:${({theme})=>theme.typography.title}}p{margin:0 0 ${({theme})=>theme.spacing[3]};color:${({theme})=>theme.colors.textSecondary};font:${({theme})=>theme.typography.label};white-space:nowrap;overflow:hidden;text-overflow:ellipsis}`;
const Meta = styled.div`display:flex;gap:${({theme})=>theme.spacing[3]};color:${({theme})=>theme.colors.textTertiary};font:${({theme})=>theme.typography.caption};strong{color:${({theme})=>theme.colors.primary}}`;
const LoadMore = styled.div`height:56px;padding-top:${({theme})=>theme.spacing[5]};text-align:center;color:${({theme})=>theme.colors.textTertiary};font:${({theme})=>theme.typography.caption};`;
