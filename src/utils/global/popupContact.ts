import { gsap } from '$utils/gsapSetup';

export function initPopupContact() {
  const popupComponent = document.querySelector<HTMLElement>('[popup="contact"]');
  const popupWrapper = document.querySelector<HTMLElement>('.contact_cards');
  const popupBackground = document.querySelector<HTMLElement>('.contact_background-close');
  const triggers = document.querySelectorAll('[trigger="popup-contact"]');

  if (!popupComponent || !popupWrapper || !popupBackground) return;

  function openPopup() {
    document.body.style.overflow = 'hidden';
    popupComponent!.style.display = 'flex';

    gsap.set([popupComponent, popupWrapper, popupBackground], { opacity: 0 });
    gsap.set(popupWrapper, { y: '2rem' });

    gsap.to(popupComponent, { opacity: 1, duration: 0.3, ease: 'power2.out' });
    gsap.to(popupBackground, { opacity: 1, duration: 0.6, ease: 'power2.out' });
    gsap.to(popupWrapper, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' });
  }

  function closePopup() {
    gsap.to(popupWrapper, { y: '2rem', opacity: 0, duration: 0.3, ease: 'power2.in' });
    gsap.to(popupComponent, {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        popupComponent!.style.display = 'none';
        document.body.style.overflow = '';
      },
    });
  }

  triggers.forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      openPopup();
    });
  });

  popupBackground.addEventListener('click', (e) => {
    e.preventDefault();
    closePopup();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && popupComponent.style.display === 'flex') {
      closePopup();
    }
  });
}
