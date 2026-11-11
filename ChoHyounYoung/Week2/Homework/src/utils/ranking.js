import { GAME_LEVELS, RANKING_STORAGE_KEY } from '../constants/game.js';
import { getStorage, removeStorage, setStorage } from './storage.js';

export function getRankingRecords() {
  const stored = getStorage(RANKING_STORAGE_KEY, []);
  if (!Array.isArray(stored)) return [];
  const usedIds = new Set();
  return stored.filter((record) => (
    record && Object.hasOwn(GAME_LEVELS, record.level)
    && Number.isInteger(record.level)
    && Number.isFinite(record.playTime) && record.playTime >= 0
    && typeof record.playedAt === 'string' && Number.isFinite(Date.parse(record.playedAt))
  )).map((record, index) => {
    // 기존 기록에도 ID를 제공한다. 정렬 전에 부여하므로 정렬 기준과 무관하다.
    let id = typeof record.id === 'string' && record.id ? record.id : `legacy-${index}`;
    while (usedIds.has(id)) id = `duplicate-${id}-${index}`;
    usedIds.add(id);
    return { ...record, id };
  });
}

export function saveRankingRecord(record) {
  return setStorage(RANKING_STORAGE_KEY, [...getRankingRecords(), { ...record, id: crypto.randomUUID() }]);
}

export function clearRankingRecords() {
  return removeStorage(RANKING_STORAGE_KEY);
}

// sort는 배열을 변경하므로 복사본을 정렬한다.
export function sortRankingRecords(records, sortBy = 'level') {
  return [...records].sort((a, b) => (
    sortBy === 'level'
      ? b.level - a.level || a.playTime - b.playTime
      : a.playTime - b.playTime
  ));
}
