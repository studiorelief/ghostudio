import Swiper from 'swiper/bundle';

/**
 * Portfolio slider on `.swiper.is-portfolio`.
 */
export function initSwiperPortfolio(): void {
  const els = document.querySelectorAll<HTMLElement>('.swiper.is-portfolio');
  if (!els.length) return;

  els.forEach((el) => {
    el.style.overflow = 'visible';

    new Swiper(el, {
      slidesPerView: 'auto',
      spaceBetween: 24,
      speed: 750,
      loop: true,
      grabCursor: true,
      keyboard: { enabled: true, onlyInViewport: true },
      navigation: {
        prevEl: '.home_portfolio_navigation-button.is-left',
        nextEl: '.home_portfolio_navigation-button.is-right',
      },
      freeMode: { enabled: true, sticky: false },
      mousewheel: { forceToAxis: true },
    });
  });
}
