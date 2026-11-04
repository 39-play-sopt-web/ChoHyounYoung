import { shuffle } from './shuffle.js';

// 초기 배치와 교체 순서를 각각 섞는다. 렌더링마다 다시 섞지 않고 초기화 시에만 호출한다.
export function createInitialGame(rule) {
  return {
    numbers: shuffle(Array.from({ length: rule.tileCount }, (_, index) => rule.firstNumber + index)),
    replacements: shuffle(Array.from(
      { length: rule.lastNumber - rule.initialMaxNumber },
      (_, index) => rule.initialMaxNumber + 1 + index,
    )),
    replacementIndex: 0,
    nextNumber: rule.firstNumber,
  };
}

// 오답은 기존 상태를 반환한다. 정답은 새 상태를 만들어 원본을 변경하지 않는다.
export function advanceGame(game, index, rule) {
  const number = game.numbers[index];
  if (game.nextNumber > rule.lastNumber || number !== game.nextNumber) return game;

  // 앞 절반은 후반 숫자로 교체하고, 후반 숫자는 남겨 화면에서 빈 칸으로 처리한다.
  const shouldReplace = number <= rule.initialMaxNumber;
  return {
    ...game,
    numbers: shouldReplace
      ? game.numbers.map((value, tileIndex) => (
        tileIndex === index ? game.replacements[game.replacementIndex] : value
      ))
      : game.numbers,
    replacementIndex: game.replacementIndex + (shouldReplace ? 1 : 0),
    nextNumber: game.nextNumber + 1,
  };
}
