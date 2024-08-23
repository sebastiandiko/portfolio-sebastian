// src/App.js
import React, { useEffect } from 'react';
import GlobalStyle from './GlobalStyle';
import Header from './Header';
import AboutMe from './AboutMe';
import Technologies from './Technologies';
import Experience from './Experience';
import Projects from './Projects';
import Footer from './Footer';

const App = () => {
  useEffect(() => {
    const cursor = document.querySelector('.cursor');

    const moveCursor = (e) => {
      cursor.style.top = `${e.clientY}px`;
      cursor.style.left = `${e.clientX}px`;
    };

    window.addEventListener('mousemove', moveCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, []);

  return (
    <>
      <GlobalStyle />
      <Header />
      <AboutMe />
      <Technologies />
      <Experience />
      <Projects />
      <Footer />
      {/* Cursor personalizado */}
      <div className="cursor"></div>
    </>
  );
};

export default App;
