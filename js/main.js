(() => {
  const POLL_INTERVAL_MS = 500;

  // play all canvases within the current viewport
  // pause all canvases not within the current viewport
  setInterval(() => {
    const canvases = document.getElementsByTagName("canvas");
    canvases.forEach((canvas) => {
      const rect = canvas.getBoundingClientRect();
    });
  }, POLL_INTERVAL_MS);
});
