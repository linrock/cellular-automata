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
    const anim = new AnimatedCanvas('gol-octagon', 3, (numX, numY) => {
      const gol = new GOL(numX, numY);
      gol.drawPixels(octagon);
      return () => gol.calculateNewWorld();
    });
    let colorIndex = 0;
    const colors = [
      '#ffa600',
      'rgb(92, 122, 255)',
      '#5dfdcb',
    ];
    anim.canvas.addEventListener('click', () => {
      anim.foregroundColor = colors[++colorIndex % colors.length];
    });
    anim.foregroundColor = colors[0];

    // render at around 2 fps
    setInterval(() => {
      if (anim.isAnimating) {
        anim.updateAndDrawWorld();
      }
    }, 500);
  }
  {
    const anim = new AnimatedCanvas('gol-glider', 3, (numX, numY) => {
      const gol = new GOL(numX, numY);
      gol.drawPixels(gosperGliderGun, 2, 2);
      return () => gol.calculateNewWorld();
    });
    anim.foregroundColor = '#5dfdcb';
    anim.backgroundColor = '#02020a';
    window.animatedCanvases.push(anim);
  }
  {
    const anim = new AnimatedCanvas('gol-simkin-glider', 3, (numX, numY) => {
      const gol = new GOL(numX, numY);
      gol.drawPixels(simkinGliderGun, 8, 12);
      return () => gol.calculateNewWorld();
    });
    // anim.setBackgroundColor('#1a1423');
    // anim.setForegroundColor('#39FF14');
    // anim.setForegroundColor('#cef9f2'); // very light blue
    anim.backgroundColor = 'rgb(15, 8, 26)';
    anim.foregroundColor = '#5c7aff'; // periwinkle
    window.animatedCanvases.push(anim);
  }
  {
    const anim = new AnimatedCanvas('gol-oscillators', 3, (numX, numY) => {
      const gol = new GOL(numX, numY);

      gol.drawPixels(octagon, 5, 6);
      gol.drawPixels(figureEight, 28, 7);
      gol.drawPixels(pentadecathlon, 50, 9);
      gol.drawPixels(queenBeesShuttle, 74, 6);

      return () => gol.calculateNewWorld();
    });
    anim.foregroundColor = '#ffa600';
    anim.backgroundColor = 'rgb(15, 8, 26)';
    // window.animatedCanvases.push(anim);
    setInterval(() => {
      if (anim.isAnimating) {
        anim.updateAndDrawWorld();
      }
    }, 200);
  }
}