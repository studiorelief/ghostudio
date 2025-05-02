import './index.css';

import { cardAppear } from '$utils/animations/cardAppear';
import { mainBackground } from '$utils/animations/mainBackground';
import { swiperRotation, swiperSlideLeft } from '$utils/animations/swiper';
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
  cardAppear();
  mainBackground();

  /* swiper */
  swiperRotation();
  swiperSlideLeft();
});
