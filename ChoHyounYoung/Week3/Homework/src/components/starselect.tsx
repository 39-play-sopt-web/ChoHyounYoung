// 부모 컴포넌트에서 전달받는 값(props)의 타입
type StarSelectProps = {
  // 버튼에 표시할 문구 (예: '전체', '9점 이상')
  label: string;
  onClick: () => void;
  variant?: 'default' | 'accent';
  isSelected?: boolean;
};

// 구조 분해 할당으로 props를 꺼냄. variant를 생략하면 'default' 사용
function StarSelect({
  label,
  onClick,
  variant = 'default',
  isSelected,
}: StarSelectProps) {
  return (
    <button
      type="button" // form 안에서도 제출 버튼으로 동작하지 않도록 설정
      onClick={onClick} // 클릭하면 부모에서 전달한 함수를 실행
      aria-pressed={isSelected} // 접근성: 버튼이 선택된 상태인지 알려줌
      // 공통 스타일 뒤에 variant에 따른 색상 클래스를 추가
      className={`flex h-7 shrink-0 items-center justify-center overflow-hidden rounded-[30px] px-3 font-['Inter',sans-serif] text-xs leading-4 font-medium transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
        variant === 'accent'
          ? 'bg-accent text-black'
          : 'bg-border text-text-secondary'
      }`}
    >
      {/* 부모에서 전달한 문구를 화면에 표시 */}
      {label}
    </button>
  );
}

export default StarSelect;

/*
[크기와 정렬]
flex: 자식 요소를 flex 방식으로 배치
h-7: 버튼 높이 28px
shrink-0: 공간이 부족해도 버튼이 줄어들지 않도록 설정
items-center: 세로 가운데 정렬
justify-center: 가로 가운데 정렬
px-3: 좌우 안쪽 여백 12px

[모양]
overflow-hidden: 버튼 밖으로 넘치는 내용을 숨김
rounded-[30px]: 모서리를 30px만큼 둥글게 설정
대괄호는 원하는 값을 직접 지정할 때 사용

[글자]
font-['Inter',sans-serif]: Inter 폰트를 사용하고, 없으면 sans-serif 사용
Inter 폰트 자체는 별도로 불러와야 적용됨
text-xs: 글자 크기 12px
leading-4: 줄 높이 16px
font-medium: 글자 굵기 500

[마우스와 키보드 효과]
transition-opacity: 투명도 변화를 부드럽게 처리
hover:opacity-80: 마우스를 올리면 불투명도 80% 적용
focus-visible:outline-2: 키보드로 포커스할 때 2px 외곽선 표시
focus-visible:outline-offset-2: 외곽선을 버튼에서 2px 떨어뜨려 표시
focus-visible:outline-accent: 외곽선에 공통 포인트 색상 적용

[variant에 따른 색상]
variant가 'accent'일 때:
  bg-accent: 민트색 배경 (#99FAEE)
  text-black: 검정 글자
그 외에는:
  bg-border: 회색 배경 (#363636)
  text-text-secondary: 밝은 회색 글자 (#DDDDDD)
*/
