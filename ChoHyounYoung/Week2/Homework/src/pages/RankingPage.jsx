import { useState } from 'react';
import { GAME_LEVELS, RANKING_STORAGE_KEY } from '../constants/game.js';
import { removeStorage } from '../utils/storage.js';
import { getRankingRecords, sortRankingRecords } from '../utils/ranking.js';

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
  // 페이지에 진입할 때 저장된 유효한 기록만 읽는다.
  const [records, setRecords] = useState(getRankingRecords);
  const [resetError, setResetError] = useState(false);
  const [sortBy, setSortBy] = useState('level');

  const rankings = sortRankingRecords(records, sortBy);

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
    <div className="min-h-[calc(100dvh-64px)] bg-page text-ink">
      <main className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <h2 className="text-heading font-bold">랭킹</h2>
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
                  className={`py-2 text-caption transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-focus ${sortBy === option.value ? 'font-semibold text-primary' : 'text-subtle hover:text-accent-bright'}`}
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
            className="h-10 shrink-0 rounded-lg bg-accent px-4 text-caption font-semibold transition-colors enabled:hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-focus disabled:cursor-default disabled:opacity-40"
          >
            초기화
          </button>
        </div>

        {resetError && (
          <p role="alert" className="mb-4 text-caption text-danger">
            기록을 초기화하지 못했어요. 다시 시도해주세요.
          </p>
        )}

        {rankings.length === 0 ? (
          <div className="rounded-2xl border border-accent-soft bg-surface px-6 py-20 text-center">
            <p className="text-subtitle font-semibold">아직 기록이 없어요.</p>
            <p className="mt-2 text-caption text-muted">
              게임을 완료하면 기록이 여기에 표시돼요.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-accent-soft bg-surface">
            <table className="w-full whitespace-nowrap text-left text-caption">
              <caption className="sr-only">
                {sortBy === 'level' ? '레벨 내림차순, 플레이 시간 오름차순 게임 기록' : '플레이 시간 오름차순 게임 기록'}
              </caption>
              <thead className="bg-accent-faint text-secondary">
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
                    className="border-t border-divider"
                  >
                    <th scope="row" className="px-4 py-4 font-semibold">
                      {index + 1}
                    </th>
                    <td className="px-4 py-4">
                      {GAME_LEVELS[record.level].label}
                    </td>
                    <td className="px-4 py-4 font-semibold text-primary tabular-nums">
                      {record.playTime.toFixed(2)}초
                    </td>
                    <td className="px-4 py-4 text-muted">
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
