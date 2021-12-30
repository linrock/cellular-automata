{
  const anim = new AnimatedCanvas('gol-octagon', 3, (numCellsX, numCellsY) => {
    const gol = new GOL(numCellsX, numCellsY);

    // manually draw an octagon oscillator
    const pixels = [
      '   11   ',
      '  1  1  ',
      ' 1    1 ',
      '1      1',
      '1      1',
      ' 1    1 ',
      '  1  1  ',
      '   11   ',
    ];
    pixels.forEach((row, y) => {
      row.split('').forEach((pixel, x) => {
        if (pixel !== ' ') {
          gol.world[y][x] = 1;
        }
      });
    });
    return () => gol.calculateNewWorld();
  });
  anim.setForegroundColor('#ffa600');

  setInterval(() => {
    if (anim.isAnimating) {
      anim.updateAndDrawWorld();
    }
  }, 500);
}
