(() => {
  const anim = new AnimatedCanvas('c-day-and-night', 3, (numX, numY) => {
    const gol = new GOL(numX, numY, () => {
      return Math.random() > 0.5 ? 1 : 0;
    });
    gol.newCellRule = (state, numLiveNeighbors) => {
      if (state) {
        if (![3, 4, 6, 7, 8].includes(numLiveNeighbors)) {
          return 0;
        }
        return state;
      } else {
        if ([3, 6, 7, 8].includes(numLiveNeighbors)) {
          return 1;
        }
      }
    };
    return () => {
      gol.calculateNewWorld();
      return gol.world;
    };
  });
  anim.setForegroundColor('#ffd449');
  anim.setBackgroundColor('#110244');
  anim.updateForever();
})();
