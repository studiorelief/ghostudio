import './index.css';

import { levitate } from '$utils/animations/element/levitate';
import { initPreloaderAnimation } from '$utils/animations/element/preloader';
import { scaleUp } from '$utils/animations/element/scaleUp';
import { slideUp } from '$utils/animations/element/slideUp';
import { cardAppear } from '$utils/animations/gsap/cardAppear';
import { initFooterGhostAnimation } from '$utils/animations/gsap/footerGhost';
import { ghostAnimation } from '$utils/animations/gsap/ghostAnimation';
import { haloRotate } from '$utils/animations/gsap/haloRotate';
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
import { popupContact } from '$utils/global/popupContact';

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

  /* loader */
  initPreloaderAnimation();

  /* global */
  cardAppear();
  mainBackground();
  initFooterGhostAnimation();
  popupContact();

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
  haloRotate();
  levitate();
});
