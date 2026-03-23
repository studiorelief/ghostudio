/**
 * Infinite linear marquee on `.swiper.is-loop`.
 * Uses a pure CSS animation instead of Swiper autoplay for a seamless scroll.
 */
export function initSwiperLoop(): void {
  const marquees = document.querySelectorAll<HTMLElement>('.swiper.is-loop');
  if (!marquees.length) return;

  marquees.forEach((el) => {
    const wrapper = el.querySelector<HTMLElement>('.swiper-wrapper');
    if (!wrapper) return;

    // Duplicate slides until total width >= 2× viewport
    const origSlides = Array.from(wrapper.children) as HTMLElement[];
    const viewportWidth = el.offsetWidth;

    let totalWidth = origSlides.reduce((sum, s) => sum + s.offsetWidth, 0);
    while (totalWidth < viewportWidth * 2) {
      origSlides.forEach((slide) => {
        wrapper.appendChild(slide.cloneNode(true));
      });
      totalWidth *= 2;
    }

    // Measure one full set width (including gap)
    const gap = 16;
    const setWidth = origSlides.reduce((sum, s) => sum + s.offsetWidth + gap, 0);

    // Inject keyframes scoped to this instance
    const id = `marquee-${Math.random().toString(36).slice(2, 8)}`;
    const style = document.createElement('style');
    style.textContent = `
      @keyframes ${id} {
        from { transform: translateX(0); }
        to   { transform: translateX(-${setWidth}px); }
      }
    `;
    document.head.appendChild(style);

    // Apply animation
    wrapper.style.display = 'flex';
    wrapper.style.gap = `${gap}px`;
    wrapper.style.animation = `${id} ${setWidth / 50}s linear infinite`;
    wrapper.style.willChange = 'transform';
  });
}
