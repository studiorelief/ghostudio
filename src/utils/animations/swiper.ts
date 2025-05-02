import 'swiper/css/bundle';

import Swiper from 'swiper/bundle';

export function swiperRotation() {
  const swipers = document.querySelectorAll('.swiper.is-rotate');
  swipers.forEach((swiperEl) => {
    new Swiper(swiperEl as HTMLElement, {
      effect: 'flip',
      flipEffect: {
        slideShadows: false,
        limitRotation: true,
      },
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
      },
      //   pagination: {
      //     el: (swiperEl as HTMLElement).querySelector('.swiper-pagination'),
      //     clickable: true,
      //   },
    });
  });
}

export function swiperSlideLeft() {
  const swipers = document.querySelectorAll('.swiper.is-slide-left');
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
      },
      //   pagination: {
      //     el: (swiperEl as HTMLElement).querySelector('.swiper-pagination'),
      //     clickable: true,
      //   },
    });
  });
}
