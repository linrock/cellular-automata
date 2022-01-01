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
  {
    const colors = [
      '#ffa600',
      'rgb(92, 122, 255)',
      '#5dfdcb',
    ];
    let colorIndex = 0;
    const anim = CA.animate('gol-octagon', {
      cellSize: 3,
      init: (numX, numY) => {
        const gol = new GOL(numX, numY);
        gol.drawPixels(octagon);
        return () => gol.calculateNewWorld();
      },
      foregroundColor: colors[0],
      maxFps: 2,
    });
    anim.canvas.addEventListener('click', () => {
      anim.foregroundColor = colors[++colorIndex % colors.length];
    });
  }

  CA.animate('gol-glider', {
    cellSize: 3,
    init: (numX, numY) => {
      const gol = new GOL(numX, numY);
      gol.drawPixels(gosperGliderGun, 2, 2);
      return () => gol.calculateNewWorld();
    },
    backgroundColor: '#02020a',
    foregroundColor: '#5dfdcb',
  });

  CA.animate('gol-simkin-glider', {
    cellSize: 3,
    init: (numX, numY) => {
      const gol = new GOL(numX, numY);
      gol.drawPixels(simkinGliderGun, 8, 12);
      return () => gol.calculateNewWorld();
    },
    backgroundColor: 'rgb(15, 8, 26)',
    foregroundColor: '#5c7aff', // periwinkle
  });

  {
    CA.animate('gol-oscillators', {
      cellSize: 3,
      init: (numX, numY) => {
        const gol = new GOL(numX, numY);

        gol.drawPixels(octagon, 5, 6);
        gol.drawPixels(figureEight, 28, 7);
        gol.drawPixels(pentadecathlon, 50, 9);
        gol.drawPixels(queenBeesShuttle, 74, 6);

        return () => gol.calculateNewWorld();
      },
      foregroundColor: '#ffa600',
      backgroundColor: 'rgb(15, 8, 26)',
      maxFps: 5,
    });
  }
}
