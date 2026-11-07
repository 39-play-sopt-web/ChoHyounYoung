import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after { box-sizing: border-box; }

  html { font-family: Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }

  body {
    margin: 0;
    min-width: 320px;
    min-height: 100vh;
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.background};
  }

  button, input, textarea, select { font: inherit; }
  button { cursor: pointer; }
  a { color: inherit; text-decoration: none; }
`;
