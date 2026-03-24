import lottie, { type AnimationItem } from 'lottie-web';

import { gsap } from '$utils/gsapSetup';

const DURATION = 0.4;
const EASE_OUT = 'power2.out';
const EASE_IN = 'power2.in';

const LOTTIE_URL =
  'https://cdn.prod.website-files.com/69ba7c19d8c0d70749cc8227/69c2aab35e36160932fcd54d_Burger%20-%20white.json';

export function initNavbarMobile(): (() => void) | null {
  if (window.innerWidth > 991) return null;

  const button = document.querySelector<HTMLElement>('[navbar="button"]');
  const menu = document.querySelector<HTMLElement>('[navbar="menu"]');
  const background = document.querySelector<HTMLElement>('[navbar="background"]');

  if (!button || !menu || !background) return null;

  // Inject Lottie burger into button
  const anim: AnimationItem = lottie.loadAnimation({
    container: button,
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: LOTTIE_URL,
  });
  anim.setSpeed(2);
  anim.goToAndStop(0, true);

  let isOpen = false;

  // Initial hidden state
  gsap.set(menu, { display: 'none', opacity: 0, y: '1.5rem', filter: 'blur(20px)' });
  gsap.set(background, {
    display: 'none',
    opacity: 0,
    filter: 'blur(50px)',
    backdropFilter: 'blur(0px)',
  });

  function open() {
    isOpen = true;
    document.body.style.overflow = 'hidden';

    // Lottie → forward (0 → 90%)
    anim.playSegments([0, 37], true);

    // Menu
    gsap.set(menu, { display: 'flex' });
    gsap.to(menu, {
      opacity: 1,
      y: '0rem',
      filter: 'blur(0px)',
      duration: DURATION,
      ease: EASE_OUT,
    });

    // Background
    gsap.set(background, { display: 'flex' });
    gsap.to(background, {
      opacity: 1,
      filter: 'blur(4px)',
      backdropFilter: 'blur(4px)',
      duration: DURATION,
      ease: EASE_OUT,
    });
  }

  function close() {
    isOpen = false;

    // Lottie → reverse (90% → 0)
    anim.playSegments([37, 0], true);

    // Menu
    gsap.to(menu, {
      opacity: 0,
      y: '1.5rem',
      filter: 'blur(20px)',
      duration: DURATION,
      ease: EASE_IN,
      onComplete: () => {
        gsap.set(menu, { display: 'none' });
      },
    });

    // Background
    gsap.to(background, {
      opacity: 0,
      filter: 'blur(50px)',
      backdropFilter: 'blur(0px)',
      duration: DURATION,
      ease: EASE_IN,
      onComplete: () => {
        gsap.set(background, { display: 'none' });
        document.body.style.overflow = '';
      },
    });
  }

  const onButton = () => {
    if (isOpen) close();
    else open();
  };
  const onBackground = () => {
    if (isOpen) close();
  };

  button.addEventListener('click', onButton);
  background.addEventListener('click', onBackground);

  return () => {
    button.removeEventListener('click', onButton);
    background.removeEventListener('click', onBackground);
    anim.destroy();
    gsap.killTweensOf([menu, background]);
    gsap.set(menu, { clearProps: 'all' });
    gsap.set(background, { clearProps: 'all' });
    document.body.style.overflow = '';
  };
}
