import 'swiper/css/bundle';

import Swiper from 'swiper/bundle';
import type { SwiperOptions } from 'swiper/types';

type SwiperVariant =
  | 'rotate'
  | 'slide-left'
  | 'slide-right'
  | 'slide-up'
  | 'crossfade'
  | 'scale-fade';

const BASE_OPTIONS: SwiperOptions = {
  speed: 750,
  loop: true,
  grabCursor: true,
  keyboard: { enabled: true, onlyInViewport: true },
  autoplay: { delay: 1500, disableOnInteraction: false },
};

const VARIANT_OPTIONS: Record<SwiperVariant, SwiperOptions> = {
  rotate: {
    effect: 'flip',
    flipEffect: { slideShadows: false, limitRotation: true },
  },
  'slide-left': {},
  'slide-right': {
    autoplay: { delay: 1500, disableOnInteraction: false, reverseDirection: true },
  },
  'slide-up': {
    direction: 'vertical',
  },
  crossfade: {
    effect: 'fade',
  },
  'scale-fade': {
    effect: 'fade',
    fadeEffect: { crossFade: true },
  },
};

export function initSwipers(): void {
  const variants = Object.keys(VARIANT_OPTIONS) as SwiperVariant[];

  variants.forEach((variant) => {
    const swipers = document.querySelectorAll(`.swiper.is-${variant}`);
    if (!swipers.length) return;

    const options: SwiperOptions = { ...BASE_OPTIONS, ...VARIANT_OPTIONS[variant] };

    swipers.forEach((swiperEl) => {
      new Swiper(swiperEl as HTMLElement, options);
    });
  });
}
