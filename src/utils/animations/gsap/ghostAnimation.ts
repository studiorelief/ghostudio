import { gsap } from '$utils/gsapSetup';

export function initGhostAnimation() {
  const ghostElements = document.querySelectorAll('.project_image.is-ghost');
  if (!ghostElements.length) return;

  ghostElements.forEach((element) => {
    // Levitation: scope to the .ghost-wrapper inside this element
    const wrapper = element.querySelector('.ghost-wrapper');
    if (wrapper) {
      gsap
        .timeline({ repeat: -1, yoyo: true })
        .fromTo(
          wrapper,
          { y: '1rem', rotation: -5 },
          { y: '-1rem', rotation: 5, duration: 2, ease: 'sine.inOut' }
        );
    }

    // Parallax scroll on desktop only
    if (window.innerWidth >= 768) {
      gsap.fromTo(
        element,
        { y: '0%' },
        {
          y: '100%',
          paddingTop: '1.5rem',
          ease: 'none',
          scrollTrigger: {
            trigger: element,
            start: 'top 100%',
            end: 'bottom 0%',
            scrub: true,
            markers: false,
          },
        }
      );
    }
  });
}
