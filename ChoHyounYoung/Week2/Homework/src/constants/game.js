// 레벨 번호를 키로 사용한다. 게임판과 랭킹에서 같은 규칙을 참조한다.
export const GAME_LEVELS = {
  1: {
    level: 1,
    label: 'Level 1',
    gridSize: 3,
    tileCount: 9,
    firstNumber: 1,
    initialMaxNumber: 9,
    lastNumber: 18,
  },
  2: {
    level: 2,
    label: 'Level 2',
    gridSize: 4,
    tileCount: 16,
    firstNumber: 1,
    initialMaxNumber: 16,
    lastNumber: 32,
  },
  3: {
    level: 3,
    label: 'Level 3',
    gridSize: 5,
    tileCount: 25,
    firstNumber: 1,
    initialMaxNumber: 25,
    lastNumber: 50,
  },
};

// 첫 화면에는 1~initialMaxNumber, 이후에는 나머지 숫자를 각각 섞어서 사용한다.
export const DEFAULT_LEVEL = 1;

// Select는 배열로 순회하고, 게임과 랭킹은 GAME_LEVELS[level]로 규칙을 찾는다.
export const LEVEL_OPTIONS = Object.values(GAME_LEVELS).map((rule) => ({
  value: rule.level,
  label: `${rule.label} (${rule.gridSize}×${rule.gridSize})`,
}));
