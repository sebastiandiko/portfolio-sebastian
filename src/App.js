import React, { useEffect } from 'react';
import Lenis from 'lenis';
import GlobalStyle from './GlobalStyle';
import Header from './Header';
import IntroVideo from './IntroVideo';
import Services from './Services';
import Technologies from './Technologies';
import Experience from './Experience';
import Projects from './Projects';
import Contact from './Contact';
import Footer from './Footer';
import FloatingContactButton from './FloatingContactButton';
import FX from './FX';
import Navbar from './Navbar';
import { setLenisInstance } from './lenisInstance';

const App = () => {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.085,
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
      <FX />
      <Navbar />
      <Header />
      <IntroVideo />
      <Services />
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
