/* Gestion du popup premium avec animations */
export function popupContact() {
  // Sélectionner les éléments nécessaires
  const popupComponent = document.querySelector('[popup="contact"]') as HTMLElement;
  const popupWrapper = document.querySelector('.contact_cards') as HTMLElement;
  const popupBackground = document.querySelector('.contact_background-close') as HTMLElement;
  const triggers = document.querySelectorAll('[trigger="popup-contact"]');

  if (!popupComponent || !popupWrapper || !popupBackground) {
    // console.warn('Éléments popup premium non trouvés');
    return;
  }

  // Fonction pour ouvrir le popup
  function openPopup() {
    // Empêcher le scroll de la page
    document.body.style.overflow = 'hidden';

    // Réinitialiser les styles
    popupComponent.style.display = 'flex';
    popupComponent.style.opacity = '0';
    popupWrapper.style.opacity = '0';
    popupBackground.style.opacity = '0';
    popupWrapper.style.transform = 'translateY(2rem)';

    // Ajouter les transitions
    popupComponent.style.transition = 'opacity 0.3s ease-out';
    popupWrapper.style.transition = 'opacity 0.6s ease-out, transform 0.3s ease-out';
    popupBackground.style.transition = 'opacity 0.6s ease-out';

    // Déclencher les animations
    requestAnimationFrame(() => {
      popupComponent.style.opacity = '1';
      popupWrapper.style.opacity = '1';
      popupBackground.style.opacity = '1';
      popupWrapper.style.transform = 'translateY(0rem)';
    });
  }

  // Fonction pour fermer le popup
  function closePopup() {
    // Ajouter les transitions de fermeture
    popupComponent.style.transition = 'opacity 0.3s ease-out';
    popupWrapper.style.transition = 'transform 0.3s ease-out';
    popupBackground.style.transition = 'opacity 0.6s ease-out';

    // Déclencher les animations de fermeture
    popupComponent.style.opacity = '0';
    popupWrapper.style.transform = 'translateY(0rem)';

    // Masquer complètement le popup après 0.3s
    setTimeout(() => {
      popupComponent.style.display = 'none';
      // Réactiver le scroll de la page
      document.body.style.overflow = '';
    }, 300);
  }

  // Ajouter les événements de clic sur les triggers
  triggers.forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      openPopup();
    });
  });

  // Ajouter l'événement de clic sur le background pour fermer
  popupBackground.addEventListener('click', (e) => {
    e.preventDefault();
    closePopup();
  });
}
