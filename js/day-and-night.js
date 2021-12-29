(() => {
  // Day and Night simulation - variant of Game of Life
  const anim = new AnimatedCanvas('c-day-and-night', 3, (numX, numY) => {
    const gol = new GOL(numX, numY, () => Math.random() > 0.5 ? 1 : 0);
    gol.newCellRule = (state, numLiveNeighbors) => {
      if (state) {
        return [3, 4, 6, 7, 8].includes(numLiveNeighbors);
      } else {
        return [3, 6, 7, 8].includes(numLiveNeighbors);
      }
    };
    return () => gol.calculateNewWorld();
  });
  anim.setForegroundColor('#ffd449');
  anim.setBackgroundColor('#110244');
  window.animatedCanvases.push(anim);
})();
