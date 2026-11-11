// 파생 값은 gridSize에서 계산해 레벨 규칙이 서로 어긋나지 않도록 한다.
function createLevel(level, gridSize) {
  const tileCount = gridSize ** 2;
  return {
    level,
    label: `Level ${level}`,
    gridSize,
    tileCount,
    firstNumber: 1,
    initialMaxNumber: tileCount,
    lastNumber: tileCount * 2,
  };
}

export const GAME_LEVELS = {
  1: createLevel(1, 3),
  2: createLevel(2, 4),
  3: createLevel(3, 5),
};

// 앞 절반을 먼저 표시하고, 맞힌 칸에 섞어둔 후반 숫자를 하나씩 채운다.
export const DEFAULT_LEVEL = 1;

// Select는 배열로 순회하고, 게임과 랭킹은 GAME_LEVELS[level]로 규칙을 찾는다.
export const LEVEL_OPTIONS = Object.values(GAME_LEVELS).map((rule) => ({
  value: rule.level,
  label: `${rule.label} (${rule.gridSize}×${rule.gridSize})`,
}));

// 게임 기록만 저장하는 키. 랭킹에서도 같은 키로 읽고 초기화한다.
export const RANKING_STORAGE_KEY = 'number-game-rankings';
