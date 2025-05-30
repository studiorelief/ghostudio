/**
 * Footer ghost animation module
 * Creates a looping animation for ghost elements in the footer
 */

import { gsap } from 'gsap';

/**
 * Initialize the footer ghost animation with sequential fade and levitation effects
 */
export function initFooterGhostAnimation(): void {
  animateFooterGhosts();
}

/**
 * Create sequential fade and levitation animations for footer ghost elements in an infinite loop
 */
function animateFooterGhosts(): void {
  const ghostFadeTl = gsap.timeline({
    repeat: -1, // Infinite loop
  });

  // Target each ghost from 1 to 9
  for (let i = 1; i <= 9; i++) {
    const ghostSelector = `.footer_ghost.is-${i}`;

    // Set initial state for all ghosts (invisible)
    gsap.set(ghostSelector, { opacity: 0 });

    // Create levitation animation for each ghost
    const levitateTl = gsap.timeline({
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    });

    levitateTl.fromTo(
      ghostSelector,
      {
        y: '1rem',
        rotation: -5,
      },
      {
        y: '-1rem',
        rotation: 5,
        duration: 2,
        ease: 'sine.inOut',
      }
    );

    // Add each ghost to the timeline with fade in, levitation and fade out
    ghostFadeTl
      .to(ghostSelector, {
        opacity: 1,
        duration: 1,
        ease: 'power2.inOut',
      })
      .add(levitateTl, '<') // Start levitation with fade in
      .to(
        ghostSelector,
        {
          opacity: 0,
          duration: 1,
          ease: 'power2.inOut',
        },
        '+=2'
      ); // Add delay before fade out
  }
}

/**
 * Initialize footer ghost animation with custom selectors
 * @param baseSelector - Base CSS selector for the ghost elements (default: '.footer_ghost')
 * @param numberOfGhosts - Number of ghost elements to animate (default: 9)
 * @param fadeDuration - Duration for fade in/out (default: 0.5 seconds)
 */
export function initCustomFooterGhostAnimation(
  baseSelector: string = '.footer_ghost',
  numberOfGhosts: number = 9,
  fadeDuration: number = 0.5
): void {
  const ghostFadeTl = gsap.timeline({
    repeat: -1, // Infinite loop
  });

  // Target each ghost
  for (let i = 1; i <= numberOfGhosts; i++) {
    const ghostSelector = `${baseSelector}.is-${i}`;

    // Set initial state for all ghosts (invisible)
    gsap.set(ghostSelector, { opacity: 0 });

    // Create levitation animation for each ghost
    const levitateTl = gsap.timeline({
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    });

    levitateTl.fromTo(
      ghostSelector,
      {
        y: '1rem',
        rotation: -5,
      },
      {
        y: '-1rem',
        rotation: 5,
        duration: 2,
        ease: 'sine.inOut',
      }
    );

    // Add each ghost to the timeline with fade in, levitation and fade out
    ghostFadeTl
      .to(ghostSelector, {
        opacity: 1,
        duration: fadeDuration,
        ease: 'power2.inOut',
      })
      .add(levitateTl, '<') // Start levitation with fade in
      .to(
        ghostSelector,
        {
          opacity: 0,
          duration: fadeDuration,
          ease: 'power2.inOut',
        },
        '+=2'
      ); // Add delay before fade out
  }
}

/**
 * Setup footer ghost animation when DOM is ready
 */
export const setupFooterGhostAnimation = (): void => {
  if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', () => {
      initFooterGhostAnimation();
    });
  }
};

/**
 * Setup custom footer ghost animation when DOM is ready
 * @param baseSelector - Base CSS selector for the ghost elements
 * @param numberOfGhosts - Number of ghost elements to animate
 * @param fadeDuration - Duration for fade in/out
 */
export const setupCustomFooterGhostAnimation = (
  baseSelector: string = '.footer_ghost',
  numberOfGhosts: number = 9,
  fadeDuration: number = 0
): void => {
  if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', () => {
      initCustomFooterGhostAnimation(baseSelector, numberOfGhosts, fadeDuration);
    });
  }
};
