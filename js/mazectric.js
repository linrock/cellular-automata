(() => {
  // Mazetric simulation - variant of Game of Life
  const anim = new AnimatedCanvas('c-mazectric', 3, (numX, numY) => {
    const gol = new GOL(numX, numY, (x, y) => {
      // initialize only the middle half of the canvas with random numbers
      if (x < numX / 3 || x > 2 * numX / 3) {
        return 0;
      }
      if (y < numY / 3 || y > 2 * numY / 3) {
        return 0;
      }
      return Math.random() > 0.5 ? 1 : 0;
    });
    gol.newCellRule = (state, numLiveNeighbors) => {
      if (state) {
        return numLiveNeighbors >= 1 && numLiveNeighbors <= 5;
      } else {
        return numLiveNeighbors === 3;
      }
    };
    return () => gol.calculateNewWorld();
  });
  anim.setForegroundColor('#ffd449');
  anim.setBackgroundColor('#110244');
  anim.updateForever();
})();
