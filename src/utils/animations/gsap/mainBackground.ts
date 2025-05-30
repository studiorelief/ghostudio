import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type SectionConfig = {
  selector: string;
  background: string;
};

const sections: SectionConfig[] = [
  { selector: '.section_project.is-intercellar', background: '#FFF' },
  { selector: '.section_project.is-jockiz', background: '#121212' },
  { selector: '.section_project.is-cosmicroyale', background: '#14002F' },
  { selector: '.section_project.is-defit', background: '#F2F3F7' },
  { selector: '.section_project.is-bbs', background: '#18002F' },
  { selector: '.section_project.is-popconn', background: '#FFFFFF' },
  { selector: '.section_project.is-waldos', background: '#1F004C' },
  { selector: '.section_project.is-experquiz', background: '#F1F1F1' },
  { selector: '.section_footer', background: '#0D0D0D' },
];

export function mainBackground(targetSelector = '.section_background') {
  const target = document.querySelector<HTMLElement>(targetSelector);
  if (!target) return;

  sections.forEach((section) => {
    const el = document.querySelector(section.selector);
    if (!el) return;

    ScrollTrigger.create({
      markers: false,
      trigger: el,
      start: 'top 75%',
      end: 'bottom 75%',
      onEnter: () => animateBg(section.background),
      onEnterBack: () => animateBg(section.background),
    });
  });

  function animateBg(bg: string) {
    gsap.to(target, {
      background: bg,
      duration: 1,
      ease: 'power2.inOut',
    });
  }
}
