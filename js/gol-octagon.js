{
  const anim = new AnimatedCanvas('gol-octagon', 3, (numCellsX, numCellsY) => {
    const gol = new GOL(numCellsX, numCellsY);
    gol.drawPixels([
      '   11   ',
      '  1  1  ',
      ' 1    1 ',
      '1      1',
      '1      1',
      ' 1    1 ',
      '  1  1  ',
      '   11   ',
    ]);
    return () => gol.calculateNewWorld();
  });
  anim.setForegroundColor('#ffa600');

  setInterval(() => {
    if (anim.isAnimating) {
      anim.updateAndDrawWorld();
    }
  }, 500);
}
