// src/GlobalStyle.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    /* Superficies: grafito casi negro con un matiz frío muy leve */
    --bg: #08080a;
    --surface-1: #0d0d10;
    --surface-2: #141418;

    /* Texto (todos >= 4.5:1 sobre --bg) */
    --text-hi: #f2f2f5;
    --text: #e2e2e8;
    --text-2: #9d9da8;
    --text-3: #7c7c87;

    /* Único acento: azul hielo desaturado, usado con mucha moderación */
    --accent: #9fb4ff;
    --accent-soft: rgba(159, 180, 255, 0.16);
    --accent-glow: rgba(159, 180, 255, 0.35);

    --line: rgba(232, 234, 255, 0.09);
    --line-strong: rgba(232, 234, 255, 0.18);
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    /* Prevents Safari from auto-inflating font sizes on rotation,
       which otherwise breaks the fixed/clamp() type scale on mobile. */
    -webkit-text-size-adjust: 100%;
    text-size-adjust: 100%;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    background-color: var(--bg);
    color: var(--text); /* Gris claro casi blanco para texto */
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  img, video {
    max-width: 100%;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    color: var(--text-hi);
    letter-spacing: -0.02em; /* Estilo clásico San Francisco */
  }

  p {
    font-weight: 400;
    color: var(--text-2); /* Gris texto secundario Apple */
    line-height: 1.6;
    letter-spacing: 0.01em;
  }

  a {
    color: var(--text);
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s ease;
  }

  a:hover {
    color: var(--text-hi);
  }

  section {
    padding: 100px 0;
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
  }

  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-track {
    background: var(--bg);
  }
  ::-webkit-scrollbar-thumb {
    background: #333;
    border-radius: 5px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #44444c;
  }
`;

export default GlobalStyle;
