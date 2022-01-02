{
  // standard Game of Life simulation with random initial values
  CA.animate('c-game-of-life', {
    init: (numX, numY) => {
      const gol = new LL(numX, numY, () => Math.random() > 0.5 ? 1 : 0);
      // gol.rulestring = 'B3/S23';
      return () => gol.calculateNewWorld();
    },
    drawWorldDiff: true,
    foregroundColor: 'rgb(112, 160, 48)',
    backgroundColor: 'rgb(3, 14, 1)',
  });

  const initGolWithPixels = (shapes) => (numX, numY) => {
    const gol = new LL(numX, numY);
    shapes.forEach(([pixels, offsetX, offsetY]) => {
      gol.drawPixels(pixels, offsetX, offsetY);
    });
    return () => gol.calculateNewWorld();
  };

  // Game of Life oscillators
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

  // Day and Night simulation - variant of Game of Life
  CA.animate('c-day-and-night', {
    init: (numX, numY) => {
      const ll = new LL(numX, numY, () => Math.random() > 0.5 ? 1 : 0);
      ll.rulestring = 'B3678/S34678';
      return () => ll.calculateNewWorld();
    },
    drawWorldDiff: true,
    foregroundColor: '#fff44f',
    backgroundColor: '#110829',
  });

  const centerThirdInit = (numX, numY) => (x, y) => {
    // initialize only the middle half of the canvas with
    // random numbers
    if (x < numX / 3 || x > 2 * numX / 3) {
      return 0;
    }
    if (y < numY / 3 || y > 2 * numY / 3) {
      return 0;
    }
    return Math.random() > 0.5 ? 1 : 0;
  };

  // Maze simulation - variant of Game of Life
  CA.animate('c-maze', {
    init: (numX, numY) => {
      const ll = new LL(numX, numY, centerThirdInit(numX, numY));
      ll.rulestring = 'B3/S12345';
      return () => ll.calculateNewWorld();
    },
    drawWorldDiff: true,
    foregroundColor: '#eee',
    backgroundColor: '#111',
  });

  // Mazetric simulation - variant of Game of Life
  CA.animate('c-mazectric', {
    init: (numX, numY) => {
      const ll = new LL(numX, numY, centerThirdInit(numX, numY));
      ll.rulestring = 'B3/S1234';
      return () => ll.calculateNewWorld();
    },
    drawWorldDiff: true,
    foregroundColor: Math.random() < 0.5 ? '#fbfb8f' : '#66e1ff',
    backgroundColor: '#111',
  });

  // Anneal - variation of majority voting
  CA.animate('c-anneal', {
    init: (numX, numY) => {
      // hack to make the animation converge to one blob more often
      const thresh = Math.random > 0.5 ? 0.45 : 0.55;
      const ll = new LL(numX, numY, () => Math.random() > thresh ? 1 : 0);
      ll.rulestring = 'B4678/S35678';
      return () => ll.calculateNewWorld();
    },
    drawWorldDiff: true,
    foregroundColor: 'rgb(239, 120, 47)',
    backgroundColor: 'rgb(40, 30, 28)',
  });


  // Diamoeba
  CA.animate('c-diamoeba', {
    init: (numX, numY) => {
      const ll = new LL(numX, numY, () => Math.random() > 0.5 ? 1 : 0);
      ll.rulestring = 'B35678/S5678';
      return () => ll.calculateNewWorld();
    },
    drawWorldDiff: true,
    foregroundColor: 'rgb(23, 120, 225)',
    backgroundColor: 'rgb(15, 4, 36)',
  });
}
