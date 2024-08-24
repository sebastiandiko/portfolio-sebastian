import React from 'react';
import GlobalStyle from './GlobalStyle';
import Header from './Header';
import AboutMe from './AboutMe';
import Technologies from './Technologies';
import Experience from './Experience';
import Projects from './Projects';
import Contact from './Contact';
import Footer from './Footer';

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Header />
      <AboutMe />
      <Technologies />
      <Experience />
      <Projects />
      <Contact />  {/* Aquí se agrega la nueva sección de contacto */}
      <Footer />
    </>
  );
};

export default App;
