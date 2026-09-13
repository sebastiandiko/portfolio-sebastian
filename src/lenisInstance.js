// Shared reference to the single Lenis smooth-scroll instance created in
// App.js, so other components (e.g. the floating contact button) can trigger
// scrolls without fighting Lenis's own scroll handling.
let lenisInstance = null;

export const setLenisInstance = (instance) => {
  lenisInstance = instance;
};

export const getLenisInstance = () => lenisInstance;
