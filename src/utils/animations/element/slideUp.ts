import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function slideUp() {
  const elements = document.querySelectorAll('[slideup]');

  elements.forEach((element) => {
    gsap.set(element, {
      y: '6rem',
      opacity: 0,
    });
    gsap.to(element, {
      y: '0rem',
      opacity: 1,
      // duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 75%',
        end: 'top 50%',
        scrub: 1,
        markers: false,
      },
    });
  });
}
