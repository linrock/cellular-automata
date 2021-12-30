{
  const anim = new AnimatedCanvas('gol-oscillators', 3, (numX, numY) => {
    const gol = new GOL(numX, numY);

    gol.drawPixels([  // an octagon
      '   11   ',
      '  1  1  ',
      ' 1    1 ',
      '1      1',
      '1      1',
      ' 1    1 ',
      '  1  1  ',
      '   11   ',
    ], 5, 6);

    gol.drawPixels([  // a figure eight
      '111',
      '111',
      '111',
      '   111',
      '   111',
      '   111',
    ], 28, 7);

    gol.drawPixels([  // a pentadecathlon
      '  1    1',
      '11 1111 11',
      '  1    1',
    ], 50, 9);

    gol.drawPixels([  // queen bees shuttle
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
