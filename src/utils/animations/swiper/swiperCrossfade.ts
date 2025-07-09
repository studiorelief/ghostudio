import 'swiper/css/bundle';

import Swiper from 'swiper/bundle';

export function swiperCrossfade() {
  const swipers = document.querySelectorAll('.swiper.is-crossfade   ');
  swipers.forEach((swiperEl) => {
    new Swiper(swiperEl as HTMLElement, {
      effect: 'fade',
      speed: 750, // rotation duration 0.5s
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
      //   pagination: {
      //     el: (swiperEl as HTMLElement).querySelector('.swiper-pagination'),
      //     clickable: true,
      //   },
    });
  });
}
