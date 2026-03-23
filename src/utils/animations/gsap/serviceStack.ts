import { gsap } from '$utils/gsapSetup';

const PEEK_Y = [0, 140, 240];
const EXIT_ROTATE_X = 50;
const STACK_SCALE = 0.85;
const PERSPECTIVE = 2500;

export function initServiceStack() {
  const cards = gsap.utils.toArray<HTMLElement>('.home_services_cards');
  if (!cards.length) return;

  const section = document.querySelector<HTMLElement>('.section_home_services');
  if (!section) return;

  const cardCount = cards.length;
  const cardHeight = cards[0].getBoundingClientRect().height;
  const exitY = -(cardHeight + 120);
  const vh = window.innerHeight;

  // Initial stacked state — perspective on each card directly (sticky parent kills preserve-3d)
  cards.forEach((card, i) => {
    const scale = i === 0 ? 1 : Math.pow(STACK_SCALE, i);
    gsap.set(card, {
      zIndex: cardCount - i,
      y: PEEK_Y[i] ?? 0,
      scale,
      transformPerspective: PERSPECTIVE,
      rotateX: 0,
      transformOrigin: 'top center',
    });
  });

  // Card 1 rotates from 50vh→100vh, card 2 from 150vh→200vh
  cards.forEach((card, i) => {
    const rotationStart = i === cardCount - 1 ? (i + 1) * 100 : i * 100 + 50;
    const rotationEnd = i === cardCount - 1 ? (i + 1) * 100 + 50 : (i + 1) * 100;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: () => `top+=${(rotationStart / 100) * vh} top`,
        end: () => `top+=${(rotationEnd / 100) * vh} top`,
        scrub: 1,
        markers: false,
      },
    });

    // Card exits: rotateX + translateY
    tl.to(card, { rotateX: EXIT_ROTATE_X, y: exitY, scale: 0.85, ease: 'power1.in' }, 0);

    // Behind cards slide forward and scale up
    for (let j = i + 1; j < cardCount; j++) {
      const newStackIndex = j - (i + 1);
      const newScale = newStackIndex === 0 ? 1 : Math.pow(STACK_SCALE, newStackIndex);
      tl.to(cards[j], { y: PEEK_Y[newStackIndex] ?? 0, scale: newScale, ease: 'none' }, 0);
    }
  });
}
