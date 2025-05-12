import { gsap } from 'gsap';

export function ghostAnimation() {
  const ghostElements = document.querySelectorAll('.project_image.is-ghost');

  /*
  ! TO DO : faire en % pour y (responsive) + ajuster animation
   */

  ghostElements.forEach((element) => {
    // Create a timeline for smooth levitation effect

    const tl = gsap.timeline({
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    });

    tl.fromTo(
      '.ghost-wrapper',
      {
        y: '1rem',
        rotation: -5,
      },
      {
        y: '-1rem', // Levitate up by 15px
        rotation: 5,
        duration: 2,
        ease: 'sine.inOut',
      }
    );

    // Add scroll trigger animation for desktop
    if (window.innerWidth >= 768) {
      // Assuming 768px is the breakpoint for PC/desktop
      gsap.fromTo(
        element,
        {
          y: '0%',
        },
        {
          y: '100%',
          paddingTop: '1.5rem',

          ease: 'none',
          scrollTrigger: {
            trigger: element,
            start: 'top 100%', // Start when element is 50% in view
            end: 'bottom 0%', // End when element is out of view
            scrub: true, // Smooth scrubbing effect
            markers: false,
          },
        }
      );
    }
  });
}
