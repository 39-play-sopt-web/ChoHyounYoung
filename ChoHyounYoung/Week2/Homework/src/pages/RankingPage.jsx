import { useState } from 'react';
import { GAME_LEVELS, RANKING_STORAGE_KEY } from '../constants/game.js';
import { getStorage, removeStorage } from '../utils/storage.js';

const dateFormatter = new Intl.DateTimeFormat('ko-KR', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
});

export default function RankingPage() {
  // 페이지에 들어올 때 저장된 기록을 읽는다. 잘못된 데이터는 목록에서 제외한다.
  const [records, setRecords] = useState(() => {
    const stored = getStorage(RANKING_STORAGE_KEY, []);
    if (!Array.isArray(stored)) return [];
    return stored.filter(
      (record) =>
        record &&
        GAME_LEVELS[record.level] &&
        Number.isFinite(record.playTime) &&
        record.playTime >= 0 &&
        typeof record.playedAt === 'string' &&
        Number.isFinite(Date.parse(record.playedAt))
    );
  });
  const [resetError, setResetError] = useState(false);
  const [sortBy, setSortBy] = useState('level');

  // 높은 레벨을 먼저 표시하고, 같은 레벨에서는 짧은 시간이 먼저 오도록 정렬한다.
  // sort는 배열을 변경하므로 state 배열을 복사해서 사용한다.
  const rankings = [...records].sort(
    (a, b) => sortBy === 'level'
      ? b.level - a.level || a.playTime - b.playTime
      : a.playTime - b.playTime
  );

  const handleReset = () => {
    // 다른 서비스 데이터까지 지우지 않고 게임 기록의 키만 삭제한다.
    if (!removeStorage(RANKING_STORAGE_KEY)) {
      setResetError(true);
      return;
    }
    setRecords([]);
    setResetError(false);
  };

  return (
    <div className="min-h-[calc(100dvh-64px)] bg-[#F0FAF7] text-slate-900">
      <main className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <h2 className="text-2xl font-bold">랭킹</h2>
            <div role="group" aria-label="랭킹 정렬 기준" className="flex items-center gap-3">
              {[
                { value: 'level', label: '레벨순' },
                { value: 'time', label: '시간순' },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  aria-pressed={sortBy === option.value}
                  onClick={() => setSortBy(option.value)}
                  className={`py-2 text-sm transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 ${sortBy === option.value ? 'font-semibold text-emerald-700' : 'text-slate-400 hover:text-emerald-500'}`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
          <button
            type="button"
            onClick={handleReset}
            disabled={rankings.length === 0}
            className="h-10 shrink-0 rounded-lg bg-emerald-200 px-4 text-sm font-semibold transition-colors enabled:hover:bg-emerald-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:cursor-default disabled:opacity-40"
          >
            초기화
          </button>
        </div>

        {resetError && (
          <p role="alert" className="mb-4 text-sm text-red-600">
            기록을 초기화하지 못했어요. 다시 시도해주세요.
          </p>
        )}

        {rankings.length === 0 ? (
          <div className="rounded-2xl border border-emerald-100 bg-white px-6 py-20 text-center">
            <p className="text-lg font-semibold">아직 기록이 없어요.</p>
            <p className="mt-2 text-sm text-slate-500">
              게임을 완료하면 기록이 여기에 표시돼요.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-emerald-100 bg-white">
            <table className="w-full whitespace-nowrap text-left text-sm">
              <caption className="sr-only">
                {sortBy === 'level' ? '레벨 내림차순, 플레이 시간 오름차순 게임 기록' : '플레이 시간 오름차순 게임 기록'}
              </caption>
              <thead className="bg-emerald-50 text-slate-600">
                <tr>
                  <th scope="col" className="px-4 py-4">
                    순위
                  </th>
                  <th scope="col" className="px-4 py-4">
                    레벨
                  </th>
                  <th scope="col" className="px-4 py-4">
                    플레이 시간
                  </th>
                  <th scope="col" className="px-4 py-4">
                    플레이 시각
                  </th>
                </tr>
              </thead>
              <tbody>
                {rankings.map((record, index) => (
                  <tr
                    key={`${record.playedAt}-${index}`}
                    className="border-t border-slate-100"
                  >
                    <th scope="row" className="px-4 py-4 font-semibold">
                      {index + 1}
                    </th>
                    <td className="px-4 py-4">
                      {GAME_LEVELS[record.level].label}
                    </td>
                    <td className="px-4 py-4 font-semibold text-emerald-700 tabular-nums">
                      {record.playTime.toFixed(2)}초
                    </td>
                    <td className="px-4 py-4 text-slate-500">
                      <time dateTime={record.playedAt}>
                        {dateFormatter.format(new Date(record.playedAt))}
                      </time>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
