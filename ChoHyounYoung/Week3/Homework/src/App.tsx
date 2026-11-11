import Header from './components/Header';
import MovieListPage from './pages/MainPage';
import DetailPage from './pages/DetailPage';
import { Route, Routes } from 'react-router-dom';
import { ROUTES } from './constants/routes';

function App() {
  return (
    <div className="min-h-svh bg-surface">
      <Header />
      <Routes>
        <Route path={ROUTES.home} element={<MovieListPage />} />
        <Route path={ROUTES.movieDetailPattern} element={<DetailPage />} />
      </Routes>
    </div>
  );
}

export default App;
