import './index.css';

import { cardAppear } from '$utils/animations/gsap/cardAppear';
import { ghostAnimation } from '$utils/animations/gsap/ghostAnimation';
import { mainBackground } from '$utils/animations/gsap/mainBackground';
import { swiperCrossfade } from '$utils/animations/swiper/swiperCrossfade';
import { swiperRotation } from '$utils/animations/swiper/swiperRotation';
import { swiperSlideLeft } from '$utils/animations/swiper/swiperSlideLeft';
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
  swiperCrossfade();
  swiperSlideUp();

  /* Spectifs */
  ghostAnimation();
});
