/**
 * Footer ghost animation module
 * Simple looping animation with crossfade and levitation
 */

import { gsap } from 'gsap';

/**
 * Initialize footer ghost animation with crossfade and wrapper levitation
 */
export function initFooterGhostAnimation(): void {
  // Animate wrapper levitation
  animateWrapperLevitation();

  // Animate ghost crossfade sequence
  animateGhostCrossfade();
}

/**
 * Create levitation animation for the ghost wrapper
 */
function animateWrapperLevitation(): void {
  const wrapper = document.querySelector('.footer_ghost-wrapper');
  if (!wrapper) return;

  gsap.to(wrapper, {
    y: '-1rem',
    rotation: 3,
    duration: 2,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1,
  });
}

/**
 * Create crossfade animation between ghosts
 */
function animateGhostCrossfade(): void {
  const numberOfGhosts = 5;
  const interval = 1.5; // 1.5s between each ghost

  // Set all ghosts invisible initially
  for (let i = 1; i <= numberOfGhosts; i++) {
    gsap.set(`.footer_ghost.is-${i}`, { opacity: 0 });
  }

  // Show first ghost
  gsap.set('.footer_ghost.is-1', { opacity: 1 });

  // Create crossfade timeline
  const timeline = gsap.timeline({ repeat: -1 });

  for (let i = 1; i <= numberOfGhosts; i++) {
    const currentGhost = `.footer_ghost.is-${i}`;
    const nextGhost = `.footer_ghost.is-${i === numberOfGhosts ? 1 : i + 1}`;

    timeline.to(
      [currentGhost, nextGhost],
      {
        opacity: (index) => (index === 0 ? 0 : 1), // Fade out current, fade in next
        duration: 1.5,
        ease: 'power2.inOut',
      },
      i * interval
    );
  }
}

/**
 * Setup footer ghost animation when DOM is ready
 */
export const setupFooterGhostAnimation = (): void => {
  if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', initFooterGhostAnimation);
  }
};

/**
 * Custom setup with configurable parameters
 */
export const setupCustomFooterGhostAnimation = (
  baseSelector: string = '.footer_ghost',
  numberOfGhosts: number = 9,
  interval: number = 1.5
): void => {
  if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', () => {
      // Wrapper levitation
      const wrapper = document.querySelector('.footer_ghost-wrapper');
      if (wrapper) {
        gsap.to(wrapper, {
          y: '-1rem',
          rotation: 3,
          duration: 2,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        });
      }

      // Custom ghost crossfade
      for (let i = 1; i <= numberOfGhosts; i++) {
        gsap.set(`${baseSelector}.is-${i}`, { opacity: 0 });
      }
      gsap.set(`${baseSelector}.is-1`, { opacity: 1 });

      const timeline = gsap.timeline({ repeat: -1 });
      for (let i = 1; i <= numberOfGhosts; i++) {
        const currentGhost = `${baseSelector}.is-${i}`;
        const nextGhost = `${baseSelector}.is-${i === numberOfGhosts ? 1 : i + 1}`;

        timeline.to(
          [currentGhost, nextGhost],
          {
            opacity: (index) => (index === 0 ? 0 : 1),
            duration: 0.5,
            ease: 'power2.inOut',
          },
          i * interval
        );
      }
    });
  }
};
