{
  const anim = new AnimatedCanvas('gol-octagon', 3, (numCellsX, numCellsY) => {
    const gol = new GOL(numCellsX, numCellsY);

    // manually draw an octagon oscillator
    const pixels = [
      [0, 3], [1, 2], [2, 1], [3, 0],
      [4, 0], [5, 1], [6, 2], [7, 3],
      [0, 4], [1, 5], [2, 6], [3, 7],
      [4, 7], [5, 6], [6, 5], [7, 4],
    ];
    pixels.forEach(([y, x]) => gol.world[y][x] = 1);

    return () => gol.calculateNewWorld();
  });
  anim.setForegroundColor('#ffa600');

  setInterval(() => {
    if (anim.isAnimating) {
      anim.updateAndDrawWorld();
    }
  }, 500);
}
