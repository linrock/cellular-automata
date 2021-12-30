{
  const anim = new AnimatedCanvas('gol-octagon', 3, (numX, numY) => {
    const gol = new GOL(numX, numY);
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
{
  const anim = new AnimatedCanvas('gol-glider', 3, (numX, numY) => {
    const gol = new GOL(numX, numY);

    // manually draw a gosper glider gun
    gol.drawPixels([
      '                        1',
      '                      1 1',
      '            11      11            11',
      '           1   1    11            11',
      '11        1     1   11',
      '11        1   1 11    1 1',
      '          1     1       1',
      '           1   1',
      '            11',
      '',
    ], 2, 2);

    return () => gol.calculateNewWorld();
  });
  anim.setForegroundColor('#5dfdcb');
  anim.setBackgroundColor('#02020a');
  window.animatedCanvases.push(anim);
}
{
  const anim = new AnimatedCanvas('gol-simkin-glider', 3, (numX, numY) => {
    const gol = new GOL(numX, numY);

    // manually draw a simkin glider gun
    gol.drawPixels([
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
    ], 8, 12);

    return () => gol.calculateNewWorld();
  });
  // anim.setBackgroundColor('#1a1423');
  // anim.setForegroundColor('#39FF14');
  // anim.setForegroundColor('#cef9f2'); // very light blue
  anim.setBackgroundColor('rgb(15, 8, 26)');
  anim.setForegroundColor('#5c7aff'); // periwinkle
  window.animatedCanvases.push(anim);
}
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
