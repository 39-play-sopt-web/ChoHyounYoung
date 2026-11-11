export const theme = {
  // 화면에서 색상 값을 직접 쓰지 않고 역할에 맞는 이름으로 가져다 사용한다.
  colors: {
    background: '#181820',
    surface: '#292931',
    surfaceHover: '#383842',
    primary: '#68ecc7',
    primaryHover: '#8af4d6',
    textPrimary: '#f5f5f7',
    textSecondary: '#b6b6bf',
    textTertiary: '#85858f',
    border: '#484851',
    headerBorder: '#303039',
    onPrimary: '#14251f',
    danger: '#ef6a70',
    dangerSurface: '#3d252b',
  },
  typography: {
    // 글자 크기와 줄 높이를 같이 정의해 페이지마다 행간이 달라지지 않게 했다.
    display: '700 28px/1.25 Pretendard, sans-serif',
    heading: '700 24px/1.35 Pretendard, sans-serif',
    title: '700 17px/1.45 Pretendard, sans-serif',
    body: '400 14px/1.7 Pretendard, sans-serif',
    label: '600 13px/1.4 Pretendard, sans-serif',
    caption: '400 12px/1.4 Pretendard, sans-serif',
  },
  spacing: {
    2: '8px',
    3: '12px',
    4: '16px',
    5: '20px',
    6: '24px',
    8: '32px',
    10: '40px',
  },
  radius: { medium: '10px', large: '14px', round: '999px' },
  shadow: { card: '0 12px 32px rgb(0 0 0 / 14%)' },
  transition: { fast: '150ms ease' },
} as const;

export type AppTheme = typeof theme;
