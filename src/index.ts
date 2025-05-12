import './index.css';

import { scaleUp } from '$utils/animations/element/scaleUp';
import { slideUp } from '$utils/animations/element/slideUp';
import { cardAppear } from '$utils/animations/gsap/cardAppear';
import { ghostAnimation } from '$utils/animations/gsap/ghostAnimation';
import { logoAppear } from '$utils/animations/gsap/logoAppear';
import { mainBackground } from '$utils/animations/gsap/mainBackground';
import { typeEffect } from '$utils/animations/gsap/typeEffect';
import { swiperCrossfade } from '$utils/animations/swiper/swiperCrossfade';
import { swiperRotation } from '$utils/animations/swiper/swiperRotation';
import { swiperScaleFade } from '$utils/animations/swiper/swiperScaleFade';
import { swiperSlideLeft } from '$utils/animations/swiper/swiperSlideLeft';
import { swiperSlideRight } from '$utils/animations/swiper/swiperSlideRight';
import { swiperSlideUp } from '$utils/animations/swiper/swiperSlideUp';
import { initMarker } from '$utils/global/marker';
import { loadModelViewerScript, resetPosition } from '$utils/global/modalviewers';

window.Webflow ||= [];
window.Webflow.push(() => {
  /* 
  ! Global 
  */
  initMarker();
  loadModelViewerScript();
  resetPosition();

  /* 
  ! Animations 
  */

  /* global */
  cardAppear();
  mainBackground();

  /* swiper */
  swiperRotation();
  swiperSlideLeft();
  swiperSlideRight();
  swiperCrossfade();
  swiperSlideUp();
  swiperScaleFade();

  /* gsap */
  ghostAnimation();
  typeEffect();
  logoAppear();

  /* element */
  slideUp();
  scaleUp();
});
