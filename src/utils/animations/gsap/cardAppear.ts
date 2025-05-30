import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/*
  ! TO DO : Coupler scroll y avec rotation
   */

export function cardAppear() {
  const elements = document.querySelectorAll('.project_cell');

  elements.forEach((element) => {
    gsap.fromTo(
      element,
      {
        y: '24rem',
      },
      {
        y: '0rem',
        ease: 'power2.out',
        duration: 2,
        scrollTrigger: {
          markers: false,
          trigger: element,
          start: 'top 100%',
          end: 'top 75%',
          scrub: 1,
        },
      }
    );
  });
}

//   gsap.fromTo(
//     element,
//     {
//       // y: '6rem',
//       opacity: 1,
//       rotateX: () => {
//         if (
//           (element as HTMLElement).classList.contains('is-portrait') ||
//           (element as HTMLElement).classList.contains('is-square-big')
//         ) {
//           return '11.25deg';
//         }
//         return '-45deg';
//       },
//       transformPerspective: () => {
//         if (
//           (element as HTMLElement).classList.contains('is-portrait') ||
//           (element as HTMLElement).classList.contains('is-square-big')
//         ) {
//           return 2000;
//         }
//         return 1000;
//       },
//     },
//     {
//       // y: '0rem',
//       opacity: 1,
//       rotateX: '0deg',
//       duration: 2,
//       ease: 'power2.out',
//       scrollTrigger: {
//         markers: false,
//         trigger: element,
//         start: 'top 75%',
//         end: 'top 45%',
//         scrub: 1,
//       },
//       // stagger: 0.5,
//     }
//   );
// });
// }
