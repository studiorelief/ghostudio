import { gsap } from '$utils/gsapSetup';

export function initHaloRotate(
  selector: string = '[rotate]',
  duration: number = 10,
  ease: string = 'linear'
): void {
  const elements = document.querySelectorAll(selector);
  if (!elements.length) return;

  elements.forEach((el) => {
    gsap.to(el, {
      rotation: 360,
      repeat: -1,
      duration,
      ease,
      transformOrigin: 'center center',
    });
  });
}
