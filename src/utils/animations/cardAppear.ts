import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function cardAppear() {
  const elements = document.querySelectorAll('.project_cell');

  elements.forEach((element) => {
    gsap.fromTo(
      element,
      {
        y: '3rem',
        opacity: 0,
        rotateX: () => {
          if (
            (element as HTMLElement).classList.contains('is-portrait') ||
            (element as HTMLElement).classList.contains('is-square-big')
          ) {
            return '22.5deg';
          }
          return '45deg';
        },
        transformPerspective: () => {
          if (
            (element as HTMLElement).classList.contains('is-portrait') ||
            (element as HTMLElement).classList.contains('is-square-big')
          ) {
            return 2000;
          }
          return 1000;
        },
      },
      {
        y: '0rem',
        opacity: 1,
        rotateX: '0deg',
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          markers: false,
          trigger: element,
          start: 'top bottom',
          end: 'top 75%',
          scrub: 1,
        },
        stagger: 0.5,
      }
    );
  });
}
