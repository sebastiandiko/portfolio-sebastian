// src/GlobalStyle.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Fira Code', monospace;
    background-color: #0d0d0d; /* Fondo oscuro tipo terminal */
    color: #ffffff;
    overflow-x: hidden;
    cursor: default; /* Restauramos el cursor predeterminado */
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
    color: #00ff00; /* Color verde estilo terminal */
    letter-spacing: 1px;
  }

  p {
    font-weight: 400;
    color: #ffffff;
    opacity: 0.8;
  }

  a {
    color: #00ff00;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s ease;
  }

  a:hover {
    color: #ffffff;
  }

  section {
    padding: 80px 0;
    position: relative;
  }
`;

export default GlobalStyle;
