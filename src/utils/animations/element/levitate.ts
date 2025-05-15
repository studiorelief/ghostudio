import { gsap } from 'gsap';

/**
 * Creates a levitation animation for elements with the 'levitate' attribute
 * Adds a subtle floating effect to create visual interest
 *
 * @param amplitude - The distance to move up and down (in rem)
 * @param duration - The time for a complete cycle (in seconds)
 */
export function levitate(amplitude: number = 1, duration: number = 2): void {
  const elements = document.querySelectorAll('[levitate]');

  if (!elements.length) return;

  elements.forEach((element) => {
    // Create a repeating timeline with smooth transitions
    const tl = gsap.timeline({
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    // Move the element up and down with subtle rotation
    tl.fromTo(
      element,
      {
        y: 0,
        rotation: -1,
      },
      {
        y: `-${amplitude}rem`,
        rotation: 1,
        duration: duration,
        ease: 'sine.inOut',
      }
    );
  });
}
