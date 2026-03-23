/**
 * Injects the 3D carousel iframe into `.section_ghost-3d` containers.
 * Uses IntersectionObserver to load only when visible (avoids WebGL zero-size errors).
 * Uses MutationObserver to handle Webflow AJAX page transitions.
 */

const IFRAME_SRC = 'https://lezar-studio.github.io/GhostStudio_Carousel/';
const INJECTED_ATTR = 'data-carousel-injected';

function observeAndInject(container: HTMLElement): void {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          io.disconnect();

          const iframe = document.createElement('iframe');
          iframe.src = IFRAME_SRC;
          iframe.width = '100%';
          iframe.height = '100%';
          iframe.setAttribute('frameborder', '0');
          iframe.style.border = 'none';

          container.appendChild(iframe);
        }
      }
    },
    { threshold: 0.01 }
  );

  io.observe(container);
}

function tryInject(): void {
  const containers = document.querySelectorAll<HTMLElement>(
    `.section_ghost-3d:not([${INJECTED_ATTR}])`
  );
  containers.forEach((container) => {
    container.setAttribute(INJECTED_ATTR, '');
    observeAndInject(container);
  });
}

export function initThreeSection(): void {
  tryInject();

  const observer = new MutationObserver(() => tryInject());
  observer.observe(document.body, { childList: true, subtree: true });
}
