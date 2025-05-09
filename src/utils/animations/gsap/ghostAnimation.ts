import { gsap } from 'gsap';

export function ghostAnimation() {
  const ghostElements = document.querySelectorAll('.project_image.is-ghost');

  ghostElements.forEach((element) => {
    // Create a timeline for smooth levitation effect
    // const tl = gsap.timeline({
    //   repeat: -1,
    //   yoyo: true,
    //   ease: 'power1.inOut',
    // });

    // Add the floating animation
    // tl.fromTo(
    //   element,
    //   {
    //     y: '1rem',
    //     rotation: -5,
    //   },
    //   {
    //     y: '-1rem', // Levitate up by 15px
    //     rotation: 5,
    //     duration: 2,
    //     ease: 'sine.inOut',
    //   }
    // );

    // Add scroll trigger animation for desktop
    if (window.innerWidth >= 768) {
      // Assuming 768px is the breakpoint for PC/desktop
      gsap.fromTo(
        element,
        {
          y: 0,
        },
        {
          y: 352,
          ease: 'none',
          scrollTrigger: {
            trigger: element,
            start: 'top 25%', // Start when element is 50% in view
            end: '200% -50%', // End when element is out of view
            scrub: true, // Smooth scrubbing effect
            markers: true,
          },
        }
      );
      // gsap.fromTo(
      //   element,
      //   {
      //     opacity: 1,
      //   },
      //   {
      //     opacity: 0,
      //     ease: 'none',
      //     scrollTrigger: {
      //       trigger: element,
      //       start: '100 25%', // Start when element is 50% in view
      //       end: '150% 25%', // End when element is out of view
      //       scrub: true, // Smooth scrubbing effect
      //       markers: false,
      //     },
      //   }
      // );
    }
  });
}
