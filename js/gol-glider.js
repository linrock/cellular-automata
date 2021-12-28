(() => {
  const anim = new AnimatedCanvas('gol-glider', 3, (numCellsX, numCellsY) => {
    const gol = new GOL(numCellsX, numCellsY);

    // manually draw a glider gun
    gol.world[5][1] = 1;
    gol.world[6][1] = 1;
    gol.world[5][2] = 1;
    gol.world[6][2] = 1;

    gol.world[3][14] = 1;
    gol.world[3][13] = 1;
    gol.world[4][12] = 1;
    gol.world[5][11] = 1;
    gol.world[6][11] = 1;
    gol.world[7][11] = 1;
    gol.world[8][12] = 1;
    gol.world[9][13] = 1;
    gol.world[9][14] = 1;

    gol.world[6][15] = 1;

    gol.world[4][16] = 1;
    gol.world[8][16] = 1;

    gol.world[5][17] = 1;
    gol.world[6][17] = 1;
    gol.world[7][17] = 1;

    gol.world[6][18] = 1;

    gol.world[3][21] = 1;
    gol.world[4][21] = 1;
    gol.world[5][21] = 1;
    gol.world[3][22] = 1;
    gol.world[4][22] = 1;
    gol.world[5][22] = 1;

    gol.world[2][23] = 1;
    gol.world[6][23] = 1;

    gol.world[1][25] = 1;
    gol.world[2][25] = 1;
    gol.world[6][25] = 1;
    gol.world[7][25] = 1;

    gol.world[3][35] = 1;
    gol.world[4][35] = 1;
    gol.world[3][36] = 1;
    gol.world[4][36] = 1;

    return () => gol.calculateNewWorld();
  });
  anim.setBackgroundColor('#1a1423');
  anim.setForegroundColor('#39FF14');
  anim.updateForever();
})();
