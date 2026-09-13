import React, { useEffect } from 'react';
import Lenis from 'lenis';
import GlobalStyle from './GlobalStyle';
import Header from './Header';
import AboutMe from './AboutMe';
import IntroVideo from './IntroVideo';
import Technologies from './Technologies';
import Experience from './Experience';
import Projects from './Projects';
import Contact from './Contact';
import Footer from './Footer';

const App = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
    });

    let frameId;
    const raf = (time) => {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    };
    frameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <GlobalStyle />
      <Header />
      <AboutMe />
      <IntroVideo />
      <Technologies />
      <Experience />
      <Projects />
      <Contact />  {/* Aquí se agrega la nueva sección de contacto */}
      <Footer />
    </>
  );
};

export default App;
