function solution(names) {
  // filter: 조건을 만족하는 원소만 모아 새 배열 반환
  // index: 원소의 인덱스 / %: 나머지 / ===: 일치 비교
  const answer = names.filter((name, index) => index % 5 === 0);
  return answer;
}

const names = ['nami', 'ahri', 'jayce', 'garen', 'ivern', 'vex', 'jinx'];
// console.log: 콘솔에 값 출력
console.log(solution(names));
