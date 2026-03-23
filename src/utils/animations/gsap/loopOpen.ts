import { gsap } from '$utils/gsapSetup';

export function initLoopOpen() {
  const squares = document.querySelectorAll('.loop_square.is-fix');
  if (!squares.length) return;

  squares.forEach((square) => {
    gsap
      .timeline({ repeat: -1, yoyo: true })
      .fromTo(square, { scale: 1 }, { scale: 0.8, duration: 0.6, ease: 'power2.Out' });
  });
}
