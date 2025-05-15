/**
 * Creates a continuous rotation animation for the planet halo element
 * Uses GSAP to create a smooth, infinite rotation effect
 */

import { gsap } from 'gsap';

/**
 * Initialize the halo rotation animation
 * @param selector - CSS selector for the halo element (defaults to '.bbs_planet-halo')
 * @param duration - Time for a complete rotation in seconds (defaults to 20)
 * @param ease - GSAP easing function to use (defaults to 'linear')
 */
export function haloRotate(
  selector: string = '[rotate] ',
  duration: number = 10,
  ease: string = 'linear'
): void {
  const haloElements = document.querySelectorAll(selector);

  if (!haloElements.length) return;

  // Create rotation animation for each halo element
  haloElements.forEach((halo) => {
    gsap.to(halo, {
      rotation: 360,
      repeat: -1, // Infinite repetition
      duration: duration,
      ease: ease,
      transformOrigin: 'center center', // Rotate around center
    });
  });
}

/**
 * Initialize the halo rotation with default settings
 */
export function initHaloRotation(): void {
  haloRotate();
}
