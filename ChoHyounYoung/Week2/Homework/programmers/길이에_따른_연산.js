function solution(num_list) {
  var answer = 0;
  // length: 배열의 길이
  if (num_list.length >= 11) {
    // reduce: 배열의 숫자를 하나씩 계산해서 최종 결과를 구한다.
    // acc: 지금까지 계산한 값 / num: 이번에 계산할 숫자
    // 맨 뒤 값부터 시작해, 계산 결과를 다음 acc로 사용한다.
    // 예: [2, 3, 4] → 0 + 2 = 2 → 2 + 3 = 5 → 5 + 4 = 9
    answer = num_list.reduce((acc, num) => acc + num, 0);
  } else {
    // 곱하기는 1부터 시작한다. 0부터 시작하면 결과가 항상 0이 된다.
    answer = num_list.reduce((acc, num) => acc * num, 1);
  }
  return answer;
}
