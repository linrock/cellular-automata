{
  const anim = new AnimatedCanvas('gol-oscillators', 3, (numX, numY) => {
    const gol = new GOL(numX, numY);

    function drawPixels(pixels, shiftX = 0, shiftY = 0) {
      pixels.forEach((row, y) => {
        row.split('').forEach((pixel, x) => {
          if (pixel !== ' ') {
            gol.world[y + shiftY][x + shiftX] = 1;
          }
        });
      });
    }

    drawPixels([  // an octagon
      '   11   ',
      '  1  1  ',
      ' 1    1 ',
      '1      1',
      '1      1',
      ' 1    1 ',
      '  1  1  ',
      '   11   ',
    ], 5, 6);

    drawPixels([  // a figure eight
      '111',
      '111',
      '111',
      '   111',
      '   111',
      '   111',
    ], 28, 7);

    drawPixels([  // a pentadecathlon
      '  1    1',
      '11 1111 11',
      '  1    1',
    ], 50, 9);

    drawPixels([  // queen bees shuttle
      '         1',
      '       1 1',
      '      1 1',
      '11   1  1           11',
      '11    1 1           11',
      '       1 1',
      '         1',
    ], 74, 6);

    [  // twin bees shuttle
      '                 11',
      '11               1 1       11',
      '11                 1       11',
      '                 111',
      '',
      '',
      '',
      '                 111',
      '11                 1',
      '11               1 1',
      '                 11',
    ];

    return () => gol.calculateNewWorld();
  });
  anim.setForegroundColor('#ffa600');

  // window.animatedCanvases.push(anim);
  setInterval(() => {
    if (anim.isAnimating) {
      anim.updateAndDrawWorld();
    }
  }, 200);
}
