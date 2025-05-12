import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function typeEffect() {
  const textElements = document.querySelectorAll('.project_pantone-text');

  textElements.forEach((element) => {
    const text = element.textContent || '';
    element.textContent = '';

    const chars = text.split('');

    // Create a timeline for typing effect
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: 'top 95%',
        markers: false,
        toggleActions: 'play pause restart reset', // Replay animation when scrolling back
      },
    });

    // Add each character with a slight delay
    chars.forEach((char, index) => {
      const charSpan = document.createElement('span');
      charSpan.textContent = char;
      charSpan.style.opacity = '0';
      element.appendChild(charSpan);

      tl.to(
        charSpan,
        {
          opacity: 1,
          duration: 0.05,
          ease: 'power1.in',
          delay: index * 0.03,
        },
        index * 0.03
      );
    });
  });
}
