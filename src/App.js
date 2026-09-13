import React, { useEffect } from 'react';
import Lenis from 'lenis';
import GlobalStyle from './GlobalStyle';
import Header from './Header';
import IntroVideo from './IntroVideo';
import Technologies from './Technologies';
import Experience from './Experience';
import Projects from './Projects';
import Contact from './Contact';
import Footer from './Footer';
import FloatingContactButton from './FloatingContactButton';
import { setLenisInstance } from './lenisInstance';

const App = () => {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });
    setLenisInstance(lenis);

    let frameId;
    const raf = (time) => {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    };
    frameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frameId);
      setLenisInstance(null);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <GlobalStyle />
      <Header />
      <IntroVideo />
      <Technologies />
      <Experience />
      <Projects />
      <Contact />  {/* Aquí se agrega la nueva sección de contacto */}
      <Footer />
      <FloatingContactButton />
    </>
  );
};

export default App;
