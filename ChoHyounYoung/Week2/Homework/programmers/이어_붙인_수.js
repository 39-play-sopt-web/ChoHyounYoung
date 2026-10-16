function solution(num_list) {
  // filter: 조건을 만족하는 원소만 고른다. 2로 나눈 나머지가 0이면 짝수다.
  const odd = num_list.filter((num) => num % 2 !== 0);
  const even = num_list.filter((num) => num % 2 === 0);
  // join(''): 배열의 값을 사이에 아무것도 넣지 않고 붙여 문자열로 만든다.
  // Number: 문자열을 숫자로 바꾼다. "351" + "42"는 "35142", 351 + 42는 393이다.
  const answer = Number(odd.join('')) + Number(even.join(''));
  return answer;
}
