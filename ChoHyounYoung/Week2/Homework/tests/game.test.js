import assert from 'node:assert/strict';
import test from 'node:test';
import { GAME_LEVELS, RANKING_STORAGE_KEY } from '../src/constants/game.js';
import { advanceGame, createInitialGame } from '../src/utils/game.js';
import { getRankingRecords, saveRankingRecord, sortRankingRecords } from '../src/utils/ranking.js';

for (const rule of Object.values(GAME_LEVELS)) {
  test(`${rule.label}: 모든 숫자를 한 번씩 순서대로 완료하고 중복 클릭을 무시한다`, () => {
    let game = createInitialGame(rule);
    assert.equal(game.numbers.length, rule.tileCount);
    assert.deepEqual([...game.numbers].sort((a, b) => a - b),
      Array.from({ length: rule.tileCount }, (_, index) => index + 1));
    assert.deepEqual([...game.replacements].sort((a, b) => a - b),
      Array.from({ length: rule.tileCount }, (_, index) => rule.tileCount + index + 1));

    const wrongIndex = game.numbers.findIndex((number) => number !== 1);
    assert.equal(advanceGame(game, wrongIndex, rule), game);

    for (let number = 1; number <= rule.lastNumber; number += 1) {
      const index = game.numbers.indexOf(number);
      assert.notEqual(index, -1);
      const previous = game;
      game = advanceGame(game, index, rule);
      assert.equal(previous.nextNumber, number);
      assert.equal(game.nextNumber, number + 1);
      // 같은 칸에 다음 정답이 새로 나타난 경우에는 클릭이 허용된다.
      if (game.numbers[index] !== game.nextNumber) {
        assert.equal(advanceGame(game, index, rule), game);
      }
    }
    assert.ok(game.numbers.every((number) => number < game.nextNumber));
    assert.equal(game.replacementIndex, rule.tileCount);
  });
}

test('랭킹은 레벨 우선 또는 시간순으로 정렬하며 원본을 유지한다', () => {
  const records = [
    { level: 1, playTime: 2 },
    { level: 3, playTime: 20 },
    { level: 3, playTime: 10 },
    { level: 2, playTime: 5 },
  ];
  const original = structuredClone(records);
  assert.deepEqual(sortRankingRecords(records).map((record) => record.playTime), [10, 20, 5, 2]);
  assert.deepEqual(sortRankingRecords(records, 'time').map((record) => record.playTime), [2, 5, 10, 20]);
  assert.deepEqual(records, original);
});

test('기록을 누적 저장하고 잘못된 기록과 손상된 JSON을 처리한다', () => {
  const values = new Map();
  globalThis.localStorage = {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
  };
  try {
    const first = { level: 1, playTime: 2, playedAt: '2026-10-14T00:00:00.000Z' };
    const second = { ...first, level: 2, playTime: 5 };
    assert.equal(saveRankingRecord(first), true);
    assert.equal(saveRankingRecord(second), true);
    assert.deepEqual(getRankingRecords(), [first, second]);
    values.set(RANKING_STORAGE_KEY, JSON.stringify([first, null, { ...first, level: 'toString' }, { ...first, playTime: -1 }]));
    assert.deepEqual(getRankingRecords(), [first]);
    values.set(RANKING_STORAGE_KEY, 'invalid JSON');
    assert.deepEqual(getRankingRecords(), []);
    globalThis.localStorage.setItem = () => { throw new Error('Storage unavailable'); };
    assert.equal(saveRankingRecord(second), false);
  } finally {
    delete globalThis.localStorage;
  }
});
