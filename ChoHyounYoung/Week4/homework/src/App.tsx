import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { RequireAuth } from '@/components/RequireAuth';
import { AuthPage } from '@/pages/AuthPage';
import { PostDetailPage } from '@/pages/PostDetailPage';
import { PostListPage } from '@/pages/PostListPage';
import { WritePage } from '@/pages/WritePage';

export default function App() {
  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />
      <Route element={<RequireAuth />}>
        <Route element={<Layout />}>
          <Route index element={<PostListPage />} />
          <Route path="write" element={<WritePage />} />
          <Route path="posts/:postId" element={<PostDetailPage />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
