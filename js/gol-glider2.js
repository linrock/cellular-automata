{
  const anim = new AnimatedCanvas('gol-simkin-glider', 3, (numX, numY) => {
    const gol = new GOL(numX, numY);

    // manually draw a simkin glider gun
    const pixels = [
      // the three squares in the top left
      [2, 2], [2, 3], [3, 2], [3, 3],
      [2, 9], [2, 10], [3, 9], [3, 10],
      [5, 6], [5, 7], [6, 6], [6, 7],

      // the one square in the mid right
      [14, 23], [14, 24], [14, 25], [14, 29],

      [11, 24], [11, 25], [11, 27], [11, 28],

      [12, 23], [12, 29],

      [13, 23], [13, 30],

      [15, 28],

      [13, 33], [13, 34], [14, 33], [14, 34],

      [19, 23], [19, 24], [20, 23], [21, 24], [21, 25], [21, 26], [22, 26],
    ];
    pixels.forEach(([y, x]) => gol.world[y][x] = 1);

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
  anim.setBackgroundColor('rgb(15, 8, 26)');
  // anim.setForegroundColor('#39FF14');
  // anim.setForegroundColor('#cef9f2'); // very light blue
  anim.setForegroundColor('#5c7aff'); // periwinkle
  window.animatedCanvases.push(anim);
}
