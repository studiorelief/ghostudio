import { gsap, ScrollTrigger } from '$utils/gsapSetup';

// Animation durations
const FADE_OUT = 0.35;
const FADE_IN = 0.35;
const FADE_IN_CTA = 0.7;
const SHRINK = 0.35;
const EXPAND = 0.45;
const TRIGGER_DELAY = 350; // ms before triggering after sustained scroll
const EASE_IN_OUT = 'power2.inOut';
const EASE_OUT = 'power2.out';

export function initNavbarShrink(): (() => void) | null {
  if (window.innerWidth <= 991) return null;

  const container = document.querySelector<HTMLElement>('.nav_container');
  const menu = document.querySelector<HTMLElement>('.nav_menu');
  const brand = document.querySelector<HTMLElement>('.nav_brand');
  const feedLink = document.querySelector<HTMLElement>('.nav_menu_link.is-feed');
  const ctaLink = document.querySelector<HTMLElement>('.nav_menu_link.is-cta');
  const navCta = document.querySelector<HTMLElement>('.nav_cta');
  if (!container || !menu) return null;

  let isShrunk = false;
  let activeTl: gsap.core.Timeline | null = null;
  let scrollTimer: ReturnType<typeof setTimeout> | null = null;
  let pendingDirection = 0;

  const fullElements = [brand, feedLink, navCta].filter(Boolean);
  const compactElements = [navCta, ctaLink].filter(Boolean);

  // Hide .is-cta by default (only visible in compact state)
  if (ctaLink) gsap.set(ctaLink, { display: 'none', opacity: 0 });

  // Measure compact width by simulating the compact state
  const initialWidth = container.offsetWidth;
  container.style.display = 'flex';
  container.style.width = 'fit-content';
  menu.style.display = 'none';
  if (brand) brand.style.display = 'none';
  if (feedLink) feedLink.style.display = 'none';
  if (ctaLink) ctaLink.style.display = 'flex';
  if (navCta) navCta.style.margin = '0 auto';
  const compactWidth = container.offsetWidth;
  container.style.display = '';
  container.style.width = '';
  menu.style.display = '';
  if (brand) brand.style.display = '';
  if (feedLink) feedLink.style.display = '';
  if (ctaLink) ctaLink.style.display = 'none';
  if (navCta) navCta.style.margin = '';

  function triggerShrink() {
    isShrunk = true;
    if (activeTl) activeTl.kill();

    activeTl = gsap
      .timeline()
      // Fade out menu + brand + feedLink + navCta
      .to(menu, { x: -20, opacity: 0, duration: FADE_OUT, ease: EASE_IN_OUT }, 0)
      .to(fullElements, { opacity: 0, duration: FADE_OUT, ease: EASE_IN_OUT }, 0)
      // Swap layout: hide full elements, show ctaLink, switch to flex
      .call(() => {
        menu!.style.display = 'none';
        if (brand) gsap.set(brand, { display: 'none' });
        if (feedLink) gsap.set(feedLink, { display: 'none' });
        if (ctaLink) gsap.set(ctaLink, { display: 'flex', opacity: 0 });
        if (navCta) gsap.set(navCta, { margin: '0 auto' });
        gsap.set(container, { display: 'flex' });
      })
      // Shrink width + fade in compact elements
      .to(container, { width: compactWidth, duration: SHRINK, ease: EASE_IN_OUT }, '>')
      .to(compactElements, { opacity: 1, duration: FADE_IN_CTA, ease: EASE_OUT }, '<');
  }

  function triggerExpand() {
    isShrunk = false;
    if (activeTl) activeTl.kill();

    activeTl = gsap
      .timeline()
      // Restore full elements in DOM (hidden) + lock overflow
      .call(() => {
        gsap.set(container, { overflow: 'hidden' });
        menu!.style.display = '';
        gsap.set(menu, { x: -20, opacity: 0 });
        if (brand) gsap.set(brand, { display: '', opacity: 0 });
        if (feedLink) gsap.set(feedLink, { display: '', opacity: 0 });
        if (navCta) gsap.set(navCta, { margin: '' });
      })
      // Fade out compact elements + expand width
      .to(compactElements, { opacity: 0, duration: FADE_OUT, ease: EASE_IN_OUT }, '<')
      .to(container, { width: initialWidth, duration: EXPAND, ease: EASE_IN_OUT }, '<')
      // Restore grid layout + fade in all full elements
      .call(() => {
        if (ctaLink) gsap.set(ctaLink, { display: 'none' });
        gsap.set(container, { display: '', width: '', overflow: '' });
        if (navCta) gsap.set(navCta, { opacity: 0 });
      })
      .to(menu, { x: 0, opacity: 1, duration: FADE_IN, ease: EASE_OUT }, '>')
      .to(fullElements, { opacity: 1, duration: FADE_IN, ease: EASE_OUT }, '<');
  }

  const st = ScrollTrigger.create({
    start: 'top top',
    end: 'max',
    onUpdate: (self) => {
      const dir = self.direction;

      // Direction changed — reset timer
      if (dir !== pendingDirection) {
        if (scrollTimer) clearTimeout(scrollTimer);
        pendingDirection = dir;
        scrollTimer = setTimeout(() => {
          scrollTimer = null;
          if (pendingDirection === 1 && !isShrunk) triggerShrink();
          if (pendingDirection === -1 && isShrunk) triggerExpand();
        }, TRIGGER_DELAY);
      }
    },
  });

  return () => {
    if (scrollTimer) clearTimeout(scrollTimer);
    if (activeTl) activeTl.kill();
    st.kill();
    // Reset inline styles
    gsap.set(container, { clearProps: 'all' });
    gsap.set(menu, { clearProps: 'all' });
    if (brand) gsap.set(brand, { clearProps: 'all' });
    if (feedLink) gsap.set(feedLink, { clearProps: 'all' });
    if (ctaLink) gsap.set(ctaLink, { clearProps: 'all' });
    if (navCta) gsap.set(navCta, { clearProps: 'all' });
  };
}
