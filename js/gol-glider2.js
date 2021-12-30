{
  const anim = new AnimatedCanvas('gol-simkin-glider', 3, (numX, numY) => {
    const gol = new GOL(numX, numY);

    // manually draw a simkin glider gun
    const pixels = [
      '11     11           1',
      '11     11         111',
      '                  1 1',
      '    11            1  ',
      '    11',
      '',
      '',
      '',
      '                           11',
      '                           11',
      '',
      '                        11     11',
      '                        11     11',
    ];
    pixels.forEach((row, y) => {
      row.split('').forEach((pixel, x) => {
        if (pixel !== ' ') {
          gol.world[y][x] = 1;
        }
      });
    });

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
