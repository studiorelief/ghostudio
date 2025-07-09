import 'swiper/css/bundle';

import Swiper from 'swiper/bundle';

export function swiperScaleFade() {
  const swipers = document.querySelectorAll('.swiper.is-scale-fade');
  swipers.forEach((swiperEl) => {
    new Swiper(swiperEl as HTMLElement, {
      effect: 'fade',
      fadeEffect: {
        crossFade: true,
      },
      speed: 750, // transition duration 0.75s
      loop: true,
      grabCursor: true,
      // mousewheel: {
      //   forceToAxis: true,
      //   sensitivity: 1,
      // },
      keyboard: {
        enabled: true,
        onlyInViewport: true,
      },
      autoplay: {
        delay: 1500,
        disableOnInteraction: false,
      },
    });
  });
}
