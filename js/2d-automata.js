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
    foregroundColor: '#fbfb8f',
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

  // cyclic tri-state cellular automata with random initial state
  // AKA rock paper scissors
  CA.animate('c-cyclic', {
    init: (numX, numY) => {
      const cyc = new Cyclic(numX, numY, () => ~~(Math.random() * 3));
      return () => cyc.calculateNewWorld();
    },
    drawWorld: function(world, worldDiff) {
      requestAnimationFrame(() => {
        worldDiff.forEach(([x, y, value]) => {
          if (value) {
            if (value === 2) {
              this.ctx.fillStyle = 'orange';
            } else if (value === 1) {
              this.ctx.fillStyle = 'yellow';
            }
            this.drawCell(x, y, value);
          } else {
            this.ctx.clearRect(
              x * this.cellSize, y * this.cellSize,
              this.cellSize, this.cellSize,
            );
          }
        });
      });
    },
    backgroundColor: '#1a1423',
  });

  // cyclic tri-state animation at the top of the page
  {
    const backgroundColor = 'rgb(82, 17, 7)';
    const darkColor = '#d75302';
    const lightColor = '#fac000';

    const randThresh1 = 3/4;
    const randThresh2 = 1/3;

    CA.animate('c-first-canvas', {
      init: (numX, numY) => {
        const cyc = new Cyclic(numX, numY, () => {
          const rand = Math.random();
          return rand > randThresh1 ? 2 : (rand > randThresh2 ? 1 : 0);
        });
        // update constants to make the animation more chaotic
        cyc.winThreshold = 1;
        cyc.winRand = 4;
        return () => cyc.calculateNewWorld();
      },
      drawWorld: function(world, worldDiff) {
        requestAnimationFrame(() => {
          let fillStyle;
          worldDiff.forEach(([x, y, value]) => {
            if (value) {
              if (value === 2) {
                if (fillStyle !== darkColor) {
                  this.ctx.fillStyle = darkColor;
                  fillStyle = darkColor;
                }
              } else if (value === 1) {
                if (fillStyle !== lightColor) {
                  this.ctx.fillStyle = lightColor;
                  fillStyle = lightColor;
                }
              }
              this.drawCell(x, y, value);
            } else {
              this.ctx.clearRect(
                x * this.cellSize, y * this.cellSize,
                this.cellSize, this.cellSize,
              );
            }
          });
        });
      },
      backgroundColor,
    });
  }
}
