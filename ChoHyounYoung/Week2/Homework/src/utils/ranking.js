import { GAME_LEVELS, RANKING_STORAGE_KEY } from '../constants/game.js';
import { getStorage, setStorage } from './storage.js';

export function getRankingRecords() {
  const stored = getStorage(RANKING_STORAGE_KEY, []);
  if (!Array.isArray(stored)) return [];
  return stored.filter((record) => (
    record && Object.hasOwn(GAME_LEVELS, record.level)
    && Number.isInteger(record.level)
    && Number.isFinite(record.playTime) && record.playTime >= 0
    && typeof record.playedAt === 'string' && Number.isFinite(Date.parse(record.playedAt))
  ));
}

export function saveRankingRecord(record) {
  return setStorage(RANKING_STORAGE_KEY, [...getRankingRecords(), record]);
}

// sort는 배열을 변경하므로 복사본을 정렬한다.
export function sortRankingRecords(records, sortBy = 'level') {
  return [...records].sort((a, b) => (
    sortBy === 'level'
      ? b.level - a.level || a.playTime - b.playTime
      : a.playTime - b.playTime
  ));
}
