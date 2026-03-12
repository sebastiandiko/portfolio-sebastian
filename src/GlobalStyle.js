// src/GlobalStyle.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    background-color: #000000; /* Fondo negro profundo Apple */
    color: #f5f5f7; /* Gris claro casi blanco para texto */
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    color: #ffffff;
    letter-spacing: -0.02em; /* Estilo clásico San Francisco */
  }

  p {
    font-weight: 400;
    color: #86868b; /* Gris texto secundario Apple */
    line-height: 1.6;
    letter-spacing: 0.01em;
  }

  a {
    color: #2997ff; /* Azul Apple */
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s ease;
  }

  a:hover {
    color: #147ce5; /* Azul Apple hover */
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
    background: #000;
  }
  ::-webkit-scrollbar-thumb {
    background: #333;
    border-radius: 5px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

export default GlobalStyle;
