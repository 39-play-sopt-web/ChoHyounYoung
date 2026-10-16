function solution(names) {
  // const는 변수를 선언할 때 사용한다. 재할당이 불가능하다.
  // filter는 조건이 true인 원소만 모아 새 배열을 만든다.
  // => 뒤에는 각 원소를 남길 조건을 작성한다.
  const answer = names.filter((name, index) => index % 5 === 0);
  return answer;
}

const names = ['nami', 'ahri', 'jayce', 'garen', 'ivern', 'vex', 'jinx'];

// solution(names)로 함수를 실행하고, 반환된 배열을 콘솔에 출력한다.
console.log(solution(names));
