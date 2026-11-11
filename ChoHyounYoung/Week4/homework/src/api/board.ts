import { http } from '@/lib/http';
import { POSTS_PAGE_SIZE } from '@/constants/board';
import type { Part } from '@/lib/storage';
import type { ApiResponse, CreatePostBody, Post, PostSlice, UpdatePostBody } from '@/types/api';

export async function issueAuthorizationCode(part: Part) {
  const { data } = await http.post<ApiResponse<{ authorizationCode: string }>>('/api/v1/members/authorization-code', { part });
  if (!data.isSuccess) throw new Error(data.message);
  return data.data.authorizationCode;
}

// keyword가 비어 있으면 파라미터를 보내지 않아 전체 목록 API와 같은 함수를 사용한다.
export async function getPosts({ keyword, cursor }: { keyword: string; cursor?: number }) {
  const { data } = await http.get<ApiResponse<PostSlice>>('/api/v1/posts', {
    params: { keyword: keyword || undefined, cursor, size: POSTS_PAGE_SIZE },
  });
  if (!data.isSuccess) throw new Error(data.message);
  return data.data;
}

export async function getPost(postId: number) {
  const { data } = await http.get<ApiResponse<Post>>(`/api/v1/posts/${postId}`);
  if (!data.isSuccess) throw new Error(data.message);
  return data.data;
}

export async function createPost(body: CreatePostBody) {
  const { data } = await http.post<ApiResponse<Post>>('/api/v1/posts', body);
  if (!data.isSuccess) throw new Error(data.message);
  return data.data;
}

export async function updatePost(postId: number, body: UpdatePostBody) {
  const { data } = await http.put<ApiResponse<Post>>(`/api/v1/posts/${postId}`, body);
  if (!data.isSuccess) throw new Error(data.message);
  return data.data;
}

export async function deletePost(postId: number) {
  // 삭제 응답의 data는 비어 있어 성공 여부만 확인하면 된다.
  await http.delete(`/api/v1/posts/${postId}`);
}
