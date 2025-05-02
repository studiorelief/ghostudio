export function loadModelViewerScript() {
  return new Promise<void>((resolve, reject) => {
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load model-viewer script'));
    document.head.appendChild(script);
  });
}

export function resetPosition() {
  const modelViewers = document.querySelectorAll('.glb_coin') as NodeListOf<
    HTMLElement & {
      cameraOrbit: string;
      returnToInitialPosition: number;
    }
  >;

  if (modelViewers.length === 0) return;

  const initialOrbit = '45deg 90deg 45deg';
  const userInteracting = new WeakMap<HTMLElement, boolean>();

  modelViewers.forEach((modelViewer) => {
    userInteracting.set(modelViewer, false);

    modelViewer.addEventListener('camera-change', () => {
      userInteracting.set(modelViewer, true);
      clearTimeout(modelViewer.returnToInitialPosition);
      modelViewer.returnToInitialPosition = window.setTimeout(() => {
        userInteracting.set(modelViewer, false);
        modelViewer.cameraOrbit = initialOrbit;
      }, 50);
    });

    const resetCameraOrbit = () => {
      if (!userInteracting.get(modelViewer)) {
        modelViewer.cameraOrbit = initialOrbit;
      }
    };

    modelViewer.addEventListener('mouseup', resetCameraOrbit);
    modelViewer.addEventListener('touchend', resetCameraOrbit);
  });
}
