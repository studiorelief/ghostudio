import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function scaleUp() {
  const elements = document.querySelectorAll('[scaleup]');

  elements.forEach((element) => {
    // Create animation with ScrollTrigger
    gsap.set(element, {
      scale: 0.5,
    });
    gsap.to(element, {
      scale: 1,
      //   duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 100%',
        end: 'top 75%',
        markers: false,
        scrub: 1,
      },
    });
  });
}
