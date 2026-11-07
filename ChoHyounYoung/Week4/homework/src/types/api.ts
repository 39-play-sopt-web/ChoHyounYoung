export interface ApiResponse<T> { isSuccess: boolean; code: string; message: string; data: T }
export interface Post { id: number; title: string; content: string; author: string; createdAt: string; updatedAt: string }
export interface PostSlice { posts: Post[]; nextCursor: number | null; hasNext: boolean }
export interface CreatePostBody { title: string; content: string; author: string }
export interface UpdatePostBody { title: string; content: string }
