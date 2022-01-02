{
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
      init: initGolWithPixels([[CA.shapes.octagon]]),
      foregroundColor: colors[0],
      drawWorldDiff: true,
      maxFps: 2,
    });
    anim.canvas.addEventListener('click', () => {
      anim.foregroundColor = colors[++colorIndex % colors.length];
    });
  }

  CA.animate('gol-glider', {
    init: initGolWithPixels([[CA.shapes.gosperGliderGun, 2, 2]]),
    drawWorldDiff: true,
    backgroundColor: '#02020a',
    foregroundColor: '#5dfdcb',
  });

  CA.animate('gol-simkin-glider', {
    init: initGolWithPixels([[CA.shapes.simkinGliderGun, 8, 12]]),
    drawWorldDiff: true,
    backgroundColor: 'rgb(15, 8, 26)',
    foregroundColor: '#5c7aff', // periwinkle
  });

  {
    CA.animate('gol-oscillators', {
      init: initGolWithPixels([
        [CA.shapes.octagon, 5, 6],
        [CA.shapes.figureEight, 28, 7],
        [CA.shapes.pentadecathlon, 50, 9],
        [CA.shapes.queenBeesShuttle, 74, 6],
      ]),
      drawWorldDiff: true,
      foregroundColor: '#ffa600',
      backgroundColor: 'rgb(15, 8, 26)',
      maxFps: 5,
    });
  }
}
