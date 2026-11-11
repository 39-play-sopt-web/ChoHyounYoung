import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after { box-sizing: border-box; }

  html { font-family: Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; color-scheme: dark; }

  body {
    margin: 0;
    min-width: 320px;
    min-height: 100vh;
    color: ${({ theme }) => theme.colors.textPrimary};
    background: ${({ theme }) => theme.colors.background};
  }

  button, input, textarea, select { font: inherit; }
  button:disabled { opacity: .45; }
  a { color: inherit; text-decoration: none; cursor: default; }
  :focus-visible { outline: 2px solid ${({ theme }) => theme.colors.primary}; outline-offset: 3px; }
  ::selection { color: ${({ theme }) => theme.colors.onPrimary}; background: ${({ theme }) => theme.colors.primary}; }
`;
