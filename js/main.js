(() => {
  // time to wait between rendering animation frames
  const ANIM_UPDATE_INTERVAL_MS = 50;

  // frequency of toggling all animation play/pause statuses
  const VIZ_POLL_INTERVAL_MS = 200;

  const PLAY_EVENT = new CustomEvent('play');
  const PAUSE_EVENT = new CustomEvent('pause');

  // centralize all animated canvases in one place
  const animatedCanvases = [];

  function updateAndDrawAllAnimations() {
    requestAnimationFrame(() => {
      animatedCanvases.forEach((anim) => anim.updateAndDrawWorld());
    });
  }

  // a convenient global for creating animated canvases
  window.CA = {
    animate: (canvasId, options) => {
      animatedCanvases.push(new AnimatedCanvas(canvasId, options));
    },
  };

  function updateAndDrawAllAnimationsForever() {
    updateAndDrawAllAnimations();
    setTimeout(() => {
      updateAndDrawAllAnimationsForever();
    }, ANIM_UPDATE_INTERVAL_MS);
  }

  // play all canvases within the current viewport
  // pause all canvases not within the current viewport
  function toggleCanvasAnimations() {
    const viewportHeight = window.innerHeight;
    const canvases = document.getElementsByTagName('canvas');
    [...canvases].forEach((canvas) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > viewportHeight) {
        // canvas is not visible
        canvas.dispatchEvent(PAUSE_EVENT);
      } else {
        // canvas is visible
        canvas.dispatchEvent(PLAY_EVENT);
      }
    });
  }

  function toggleCanvasAnimationsForever() {
    toggleCanvasAnimations();
    setTimeout(() => toggleCanvasAnimationsForever(), VIZ_POLL_INTERVAL_MS);
  }

  toggleCanvasAnimationsForever();
  updateAndDrawAllAnimationsForever();
})();
