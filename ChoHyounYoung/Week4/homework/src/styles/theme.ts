export const theme = {
  colors: {
    primary: '#6c5ce7',
    primaryHover: '#5849c9',
    background: '#f7f7fb',
    surface: '#ffffff',
    text: '#20202a',
    textMuted: '#747481',
    border: '#e5e5ec',
    danger: '#e5484d',
  },
  radius: {
    small: '8px',
    medium: '12px',
    large: '20px',
  },
} as const;

export type AppTheme = typeof theme;
