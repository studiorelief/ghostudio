import { gsap, SplitText } from '$utils/gsapSetup';

export function initRevealHeader() {
  const elements = document.querySelectorAll<HTMLElement>('[reveal-header="blur"]');

  if (!elements.length) return;

  elements.forEach((el) => {
    const split = new SplitText(el, { type: 'chars' });
    const { chars } = split;
    const total = chars.length;

    chars.forEach((char, i) => {
      const endBlur = total > 1 ? (i / (total - 1)) * 4 : 0;

      gsap.fromTo(
        char,
        {
          opacity: 0,
          y: '1rem',
          filter: 'blur(15px)',
        },
        {
          opacity: 1,
          y: '0rem',
          filter: `blur(${endBlur}px)`,
          duration: 1,
          ease: 'power2.out',
          delay: i * 0.02,
        }
      );
    });
  });
}

export function initRevealButton() {
  const elements = document.querySelectorAll<HTMLElement>('[reveal="button"]');

  if (!elements.length) return;

  elements.forEach((el) => {
    const split = new SplitText(el, { type: 'chars' });
    el.addEventListener('mouseenter', () => {
      // Blur instant sur tous les chars
      gsap.set(split.chars, { filter: 'blur(8px)' });

      // Reveal lettre par lettre immédiatement après
      gsap.to(split.chars, {
        filter: 'blur(0px)',
        duration: 0.15,
        ease: 'power2.out',
        stagger: 0.025,
        overwrite: true,
      });
    });
  });
}

export function initRevealText() {
  const elements = document.querySelectorAll<HTMLElement>('[reveal="blur"]');

  if (!elements.length) return;

  elements.forEach((el) => {
    const split = new SplitText(el, { type: 'words' });

    gsap.fromTo(
      split.words,
      {
        opacity: 0,
        y: '1rem',
        filter: 'blur(15px)',
      },
      {
        opacity: 1,
        y: '0rem',
        filter: 'blur(0px)',
        duration: 1,
        ease: 'power2.out',
        stagger: 0.05,
        scrollTrigger: {
          markers: false,
          trigger: el,
          start: '0% 100%',
          end: '100% 75%',
          scrub: 5,
        },
      }
    );
  });
}
