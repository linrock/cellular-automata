{
  const anim = new AnimatedCanvas('gol-octagon', 3, (numCellsX, numCellsY) => {
    const gol = new GOL(numCellsX, numCellsY);

    // manually draw an octagon oscillator
    gol.world[0][3] = 1;
    gol.world[1][2] = 1;
    gol.world[2][1] = 1;
    gol.world[3][0] = 1;

    gol.world[4][0] = 1;
    gol.world[5][1] = 1;
    gol.world[6][2] = 1;
    gol.world[7][3] = 1;

    gol.world[0][4] = 1;
    gol.world[1][5] = 1;
    gol.world[2][6] = 1;
    gol.world[3][7] = 1;

    gol.world[4][7] = 1;
    gol.world[5][6] = 1;
    gol.world[6][5] = 1;
    gol.world[7][4] = 1;

    return () => gol.calculateNewWorld();
  });
  anim.setForegroundColor('#ffa600');

  setInterval(() => {
    if (anim.isAnimating) {
      anim.updateAndDrawWorld();
    }
  }, 500);
}
