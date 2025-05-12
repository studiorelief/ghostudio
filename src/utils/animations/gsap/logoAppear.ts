import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function logoAppear() {
  const logoElements = document.querySelectorAll('.project_logo');

  logoElements.forEach((element) => {
    gsap.fromTo(
      element,
      {
        y: '2rem',
        opacity: 0,
      },
      {
        y: '0rem',
        opacity: 1,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 75%',
          end: 'top 50%',
          scrub: 1,
          markers: false,
        },
      }
    );
  });
}
