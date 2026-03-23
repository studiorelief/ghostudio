/**
 * Preloader animation module with mouse tracking and ghost animations
 * Handles first-time visitor detection and smooth loading transitions
 */

import { CustomEase, gsap } from '$utils/gsapSetup';

/**
 * Initialize the preloader animation with floating ghost and mouse tracking
 */
export function initPreloaderAnimation(): void {
  // Skip animation for returning visitors in the same session
  if (sessionStorage.getItem('visited') !== null) {
    hidePreloader();
    return;
  }

  // Show preloader for first-time visitors
  showPreloader();

  // Mark as visited for future page loads
  sessionStorage.setItem('visited', 'true');

  const ghostWrapper = document.querySelector('.preloader_ghost-wrapper') as HTMLElement;
  if (!ghostWrapper) return;

  // Initialize all animations
  animateFloatingGhost();
  animateGhostFades();
  const stopMouseTracking = setupMouseTracking(ghostWrapper);
  animateCounterAndProgress(stopMouseTracking);
}

/**
 * Hide the preloader component
 */
function hidePreloader(): void {
  const preloaderComponent = document.querySelector('.preloader_component');
  if (preloaderComponent) {
    (preloaderComponent as HTMLElement).style.display = 'none';
  }
}

/**
 * Show the preloader component
 */
function showPreloader(): void {
  const preloaderComponent = document.querySelector('.preloader_component');
  if (preloaderComponent) {
    (preloaderComponent as HTMLElement).style.display = 'flex';
  }
}

/**
 * Create floating animation for the main ghost
 */
function animateFloatingGhost(): void {
  const tl = gsap.timeline({
    repeat: -1,
    yoyo: true,
    ease: 'power1.inOut',
  });

  tl.fromTo(
    '.preloader_ghost',
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
}

/**
 * Create sequential fade animations for multiple ghost elements
 */
function animateGhostFades(): void {
  const ghostFadeTl = gsap.timeline({
    repeat: -1,
  });

  // Target each ghost from 1 to 9
  for (let i = 1; i <= 9; i++) {
    const ghostSelector = `.preloader_ghost.is-${i}`;

    // Set initial state for all ghosts
    gsap.set(ghostSelector, { opacity: 0 });

    // Add each ghost to the timeline with fade in and fade out
    ghostFadeTl
      .to(ghostSelector, {
        opacity: 1,
        duration: 0.5,
        ease: 'power2.inOut',
      })
      .to(ghostSelector, {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.inOut',
      });
  }
}

/**
 * Animate the counter and progress bar
 */
function animateCounterAndProgress(stopMouseTracking: () => void): void {
  const preloaderNumber = document.querySelector('.preloader_number');
  if (!preloaderNumber) return;

  const customEase = 'M0,0 C0.25,0.1 0.25,1 1,1';
  const loaderDuration = 5;
  const counter = { value: 0 };
  let hasFadedOut = false;

  const updateLoaderText = () => {
    const currentValue = Math.round(counter.value);
    preloaderNumber.textContent = currentValue.toString();

    // When counter exactly reaches 100, trigger fade out
    if (currentValue === 100 && !hasFadedOut) {
      hasFadedOut = true;
      endLoaderAnimation();
    }
  };

  const endLoaderAnimation = () => {
    const preloaderComponent = document.querySelector('.preloader_component');

    // Animate the number moving down and fading out
    gsap.to(preloaderNumber, {
      y: 4 * 16,
      opacity: 0,
      duration: 0.4,
      ease: 'power2.out',
      onComplete: () => {
        // Only fade out the entire preloader component after the number animation fully completes
        gsap.to(preloaderComponent, {
          opacity: 0,
          duration: 0.5, // Longer fade out to ensure smooth transition
          ease: 'power2.out',
          onComplete: () => {
            if (preloaderComponent) {
              (preloaderComponent as HTMLElement).style.display = 'none';
            }
            stopMouseTracking();
          },
        });
      },
    });
  };

  // Create the animation timeline but don't use onComplete
  const numberTl = gsap.timeline();

  numberTl.to(counter, {
    value: 100,
    onUpdate: updateLoaderText,
    duration: loaderDuration,
    ease: CustomEase.create('custom', customEase),
  });

  numberTl.to(
    '.preloader_progress',
    {
      width: '100%',
      duration: loaderDuration,
      ease: CustomEase.create('custom', customEase),
    },
    0
  );
}

function setupMouseTracking(ghostWrapper: HTMLElement): () => void {
  const onMouseMove = (event: MouseEvent) => {
    const mouseX = event.clientX / window.innerWidth - 0.5;
    const mouseY = event.clientY / window.innerHeight - 0.5;

    gsap.to(ghostWrapper, {
      x: `${-mouseX * 50}rem`,
      y: `${-mouseY * 50}rem`,
      duration: 1,
      ease: 'power2.out',
      overwrite: true,
    });
  };

  document.addEventListener('mousemove', onMouseMove);

  return () => document.removeEventListener('mousemove', onMouseMove);
}
