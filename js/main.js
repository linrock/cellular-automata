(() => {
  const POLL_INTERVAL_MS = 500;

  const PLAY_EVENT = new CustomEvent('play');
  const PAUSE_EVENT = new CustomEvent('pause');

  // play all canvases within the current viewport
  // pause all canvases not within the current viewport
  setInterval(() => {
    const viewportHeight = window.innerHeight;
    const canvases = document.getElementsByTagName("canvas");
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
  }, POLL_INTERVAL_MS);
})();
