{
  const octagon = [
    '   11   ',
    '  1  1  ',
    ' 1    1 ',
    '1      1',
    '1      1',
    ' 1    1 ',
    '  1  1  ',
    '   11   ',
  ];
  const gosperGliderGun = [
    '                        1',
    '                      1 1',
    '            11      11            11',
    '           1   1    11            11',
    '11        1     1   11',
    '11        1   1 11    1 1',
    '          1     1       1',
    '           1   1',
    '            11',
  ];
  const simkinGliderGun = [
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
  const figureEight = [
    '111',
    '111',
    '111',
    '   111',
    '   111',
    '   111',
  ];
  const pentadecathlon = [
    '  1    1',
    '11 1111 11',
    '  1    1',
  ];
  const queenBeesShuttle = [
    '         1',
    '       1 1',
    '      1 1',
    '11   1  1           11',
    '11    1 1           11',
    '       1 1',
    '         1',
  ];
  const twinBeesShuttle = [
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

  const initGolWithPixels = (shapes) => (numX, numY) => {
    const gol = new LL(numX, numY);
    shapes.forEach(([pixels, offsetX, offsetY]) => {
      gol.drawPixels(pixels, offsetX, offsetY);
    });
    return () => gol.calculateNewWorld();
  };

  {
    const colors = [
      '#ffa600',
      'rgb(92, 122, 255)',
      '#5dfdcb',
    ];
    let colorIndex = 0;
    const anim = CA.animate('gol-octagon', {
      init: initGolWithPixels([[octagon]]),
      foregroundColor: colors[0],
      drawWorldDiff: true,
      maxFps: 2,
    });
    anim.canvas.addEventListener('click', () => {
      anim.foregroundColor = colors[++colorIndex % colors.length];
    });
  }

  CA.animate('gol-glider', {
    init: initGolWithPixels([[gosperGliderGun, 2, 2]]),
    drawWorldDiff: true,
    backgroundColor: '#02020a',
    foregroundColor: '#5dfdcb',
  });

  CA.animate('gol-simkin-glider', {
    init: initGolWithPixels([[simkinGliderGun, 8, 12]]),
    drawWorldDiff: true,
    backgroundColor: 'rgb(15, 8, 26)',
    foregroundColor: '#5c7aff', // periwinkle
  });

  {
    CA.animate('gol-oscillators', {
      init: initGolWithPixels([
        [octagon, 5, 6],
        [figureEight, 28, 7],
        [pentadecathlon, 50, 9],
        [queenBeesShuttle, 74, 6],
      ]),
      drawWorldDiff: true,
      foregroundColor: '#ffa600',
      backgroundColor: 'rgb(15, 8, 26)',
      maxFps: 5,
    });
  }
}
