import { gsap } from '$utils/gsapSetup';

export function logoScroll(): void {
  const logo = document.querySelector<HTMLElement>('.home_headline_logo');
  const section = document.querySelector<HTMLElement>('.section_home_headline');
  if (!logo || !section) return;

  gsap.set(logo, { rotation: 90 });

  gsap.to(logo, {
    rotation: 0,
    ease: 'none',
    scrollTrigger: {
      markers: false,
      trigger: section,
      start: '25% 75%',
      end: '50% 50%',
      scrub: 1.5,
    },
  });
}
