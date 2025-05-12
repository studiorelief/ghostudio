import 'swiper/css/bundle';

import Swiper from 'swiper/bundle';

export function swiperSlideRight() {
  const swipers = document.querySelectorAll('.swiper.is-slide-right');
  swipers.forEach((swiperEl) => {
    new Swiper(swiperEl as HTMLElement, {
      speed: 750, // rotation duration 0.5s
      loop: true,
      grabCursor: true,
      mousewheel: {
        forceToAxis: true,
        sensitivity: 1,
      },
      keyboard: {
        enabled: true,
        onlyInViewport: true,
      },
      autoplay: {
        delay: 1500,
        disableOnInteraction: false,
        reverseDirection: true, // Added to make the swiper go in the opposite direction
      },
      //   pagination: {
      //     el: (swiperEl as HTMLElement).querySelector('.swiper-pagination'),
      //     clickable: true,
      //   },
    });
  });
}
