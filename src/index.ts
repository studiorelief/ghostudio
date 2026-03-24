import './index.css';

import { animatedCodeBlocks } from '$utils/animations/element/animatedCodeBock';
import { initLevitate } from '$utils/animations/element/levitate';
import { initPreloaderAnimation } from '$utils/animations/element/preloader';
import { initScaleUp } from '$utils/animations/element/scaleUp';
import { initSlideUp } from '$utils/animations/element/slideUp';
import { initCardAppear } from '$utils/animations/gsap/cardAppear';
import { initFooterGhostAnimation } from '$utils/animations/gsap/footerGhost';
import { initGhostAnimation } from '$utils/animations/gsap/ghostAnimation';
import { initHaloRotate } from '$utils/animations/gsap/haloRotate';
import { initLogoAppear } from '$utils/animations/gsap/logoAppear';
import { logoScroll } from '$utils/animations/gsap/logoScroll';
import { initLoopOpen } from '$utils/animations/gsap/loopOpen';
import { initMainBackground } from '$utils/animations/gsap/mainBackground';
import {
  initRevealButton,
  initRevealHeader,
  initRevealText,
} from '$utils/animations/gsap/revealText';
import { initServiceStack } from '$utils/animations/gsap/serviceStack';
import { initTypeEffect } from '$utils/animations/gsap/typeEffect';
import { initSwipers } from '$utils/animations/swiper/swiperFactory';
import { initSwiperPortfolio } from '$utils/animations/swiper/swiperPortfolio';
import { initSwiperLoop } from '$utils/animations/swiper/swiperSectors';
import { initMarker } from '$utils/global/marker';
import { initModelViewer, initResetPosition } from '$utils/global/modalviewers';
import { initNavbarMobile } from '$utils/global/navbarMobile';
import { initNavbarShrink } from '$utils/global/navbarPC';
import { initPopupContact } from '$utils/global/popupContact';
import { initThreeSection } from '$utils/global/threeSection';

window.Webflow ||= [];
window.Webflow.push(() => {
  /*
  ! Global
  */
  let destroyNavbarPC = initNavbarShrink();
  let destroyNavbarMobile = initNavbarMobile();
  let destroyServiceStack = initServiceStack();

  // Resize handler — reinit responsive modules on breakpoint cross
  let lastWidth = window.innerWidth;
  window.addEventListener('resize', () => {
    const w = window.innerWidth;
    const wasDesktop = lastWidth > 991;
    const isDesktop = w > 991;
    const crossedNav = wasDesktop !== isDesktop;
    const wasStackable = lastWidth > 768;
    const isStackable = w > 768;
    const crossedStack = wasStackable !== isStackable;
    lastWidth = w;

    if (crossedNav) {
      destroyNavbarPC?.();
      destroyNavbarMobile?.();
      destroyNavbarPC = initNavbarShrink();
      destroyNavbarMobile = initNavbarMobile();
    }
    if (crossedStack) {
      destroyServiceStack?.();
      destroyServiceStack = initServiceStack();
    }
  });

  initMarker();
  initThreeSection();
  initModelViewer();
  initResetPosition();

  /*
  ! Animations
  */

  /* loader */
  initPreloaderAnimation();

  /* global */
  initCardAppear();
  initMainBackground();
  initFooterGhostAnimation();
  initPopupContact();

  /* swiper */
  initSwipers();
  initSwiperPortfolio();
  initSwiperLoop();

  /* gsap */
  initGhostAnimation();
  initTypeEffect();
  initLogoAppear();
  logoScroll();
  initLoopOpen();
  initRevealHeader();
  initRevealButton();
  initRevealText();

  /* element */
  initSlideUp();
  initScaleUp();
  initHaloRotate();
  initLevitate();
  animatedCodeBlocks();
});
