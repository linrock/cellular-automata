{
  const anim = new AnimatedCanvas('gol-simkin-glider', 3, (numX, numY) => {
    const gol = new GOL(numX, numY);

    // manually draw a simkin glider gun
    gol.world[2][2] = 1;
    gol.world[2][3] = 1;
    gol.world[3][2] = 1;
    gol.world[3][3] = 1;

    gol.world[2][9] = 1;
    gol.world[2][10] = 1;
    gol.world[3][9] = 1;
    gol.world[3][10] = 1;

    gol.world[5][6] = 1;
    gol.world[5][7] = 1;
    gol.world[6][6] = 1;
    gol.world[6][7] = 1;

    gol.world[11][24] = 1;
    gol.world[11][25] = 1;
    gol.world[11][27] = 1;
    gol.world[11][28] = 1;

    gol.world[12][23] = 1;
    gol.world[12][29] = 1;

    gol.world[13][23] = 1;
    gol.world[13][30] = 1;

    gol.world[14][23] = 1;
    gol.world[14][24] = 1;
    gol.world[14][25] = 1;
    gol.world[14][29] = 1;

    gol.world[15][28] = 1;

    gol.world[13][33] = 1;
    gol.world[13][34] = 1;
    gol.world[14][33] = 1;
    gol.world[14][34] = 1;

    gol.world[19][23] = 1;
    gol.world[19][24] = 1;
    gol.world[20][23] = 1;
    gol.world[21][24] = 1;
    gol.world[21][25] = 1;
    gol.world[21][26] = 1;
    gol.world[22][26] = 1;

    const shiftedWorld = [];
    for (let y = 0; y < numY; y++) {
      shiftedWorld.push(new Array(numX).fill(0));
    }

    // hack for shifting a structure around
    const shiftX = 8;
    const shiftY = 12;
    for (let y = 0; y < numY - 1; y++) {
      for (let x = 0; x < numX - 1; x++) {
        if (gol.world[y][x]) {
          shiftedWorld[y + shiftY][x + shiftX] = gol.world[y][x];
        }
      }
    }
    gol.world = shiftedWorld;
    return () => gol.calculateNewWorld();
  });
  anim.setBackgroundColor('#1a1423');
  anim.setForegroundColor('#39FF14');
  window.animatedCanvases.push(anim);
}
