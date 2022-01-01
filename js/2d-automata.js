{
  // standard Game of Life simulation with random initial values
  window.animatedCanvases.push(new AnimatedCanvas('c-game-of-life', {
    cellSize: 3,
    init: (numX, numY) => {
      const gol = new GOL(numX, numY, () => Math.random() > 0.5 ? 1 : 0);
      // gol.rulestring = 'B3/S23';
      return () => gol.calculateNewWorld();
    },
    foregroundColor: 'rgb(112, 160, 48)',
    backgroundColor: 'rgb(3, 14, 1)',
  }));

  // Day and Night simulation - variant of Game of Life
  window.animatedCanvases.push(new AnimatedCanvas('c-day-and-night', {
    cellSize: 3,
    init: (numX, numY) => {
      const gol = new GOL(numX, numY, () => Math.random() > 0.5 ? 1 : 0);
      gol.rulestring = 'B3678/S34678';
      return () => gol.calculateNewWorld();
    },
    foregroundColor: '#fff44f',
    backgroundColor: '#110829',
  }));

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
  window.animatedCanvases.push(new AnimatedCanvas('c-maze', {
    cellSize: 3,
    init: (numX, numY) => {
      const gol = new GOL(numX, numY, centerThirdInit(numX, numY));
      gol.rulestring = 'B3/S12345';
      return () => gol.calculateNewWorld();
    },
    foregroundColor: '#eee',
    backgroundColor: '#111',
  }));

  // Mazetric simulation - variant of Game of Life
  window.animatedCanvases.push(new AnimatedCanvas('c-mazectric', {
    cellSize: 3,
    init: (numX, numY) => {
      const gol = new GOL(numX, numY, centerThirdInit(numX, numY));
      gol.rulestring = 'B3/S1234';
      return () => gol.calculateNewWorld();
    },
    foregroundColor: '#fbfb8f',
    backgroundColor: '#111',
  }));

  // Anneal - variation of majority voting
  window.animatedCanvases.push(new AnimatedCanvas('c-anneal', {
    cellSize: 3,
    init: (numX, numY) => {
      // hack to make the animation converge to one blob more often
      const thresh = Math.random > 0.5 ? 0.45 : 0.55;
      const gol = new GOL(numX, numY, () => Math.random() > thresh ? 1 : 0);
      gol.rulestring = 'B4678/S35678';
      return () => gol.calculateNewWorld();
    },
    foregroundColor: 'rgb(239, 120, 47)',
    backgroundColor: 'rgb(40, 30, 28)',
  }));


  // Diamoeba
  window.animatedCanvases.push(new AnimatedCanvas('c-diamoeba', {
    cellSize: 3,
    init: (numX, numY) => {
      // hack to make the animation converge to one blob more often
      const gol = new GOL(numX, numY, () => Math.random() > 0.5 ? 1 : 0);
      gol.rulestring = 'B35678/S5678';
      return () => gol.calculateNewWorld();
    },
    foregroundColor: 'rgb(23, 120, 225)',
    backgroundColor: 'rgb(15, 4, 36)',
  }));

  // cyclic tri-state cellular automata with random initial state
  // AKA rock paper scissors
  window.animatedCanvases.push(new AnimatedCanvas('c-cyclic', {
    cellSize: 3,
    init: (numX, numY) => {
      const cyc = new Cyclic(numX, numY, () => {
        const rand = Math.random();
        return rand > 0.667 ? 2 : (rand > 0.333 ? 1 : 0);
      });
      return () => cyc.calculateNewWorld();
    },
    drawWorld: function(world) {
      requestAnimationFrame(() => {
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        for (let x = 0; x < this.numCellsX; x++) {
          for (let y = 0; y < this.numCellsY; y++) {
            if (world[y][x]) {
              if (world[y][x] === 2) {
                this.ctx.fillStyle = 'orange';
              } else if (world[y][x] === 1) {
                this.ctx.fillStyle = 'yellow';
              }
              this.fillCell(x, y);
            }
          }
        }
      });
    },
    backgroundColor: '#1a1423',
  }));

  // cyclic tri-state animation at the top of the page
  {
    const backgroundColor = 'rgb(82, 17, 7)';
    const darkColor = '#d75302';
    const lightColor = '#fac000';

    const randThresh1 = 3/4;
    const randThresh2 = 1/3;

    window.animatedCanvases.push(new AnimatedCanvas('c-first-canvas', {
      cellSize: 3,
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
      drawWorld: function(world) {
        requestAnimationFrame(() => {
          this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
          for (let x = 0; x < this.numCellsX; x++) {
            for (let y = 0; y < this.numCellsY; y++) {
              if (world[y][x]) {
                if (world[y][x] === 2) {
                  this.ctx.fillStyle = darkColor;
                } else if (world[y][x] === 1) {
                  this.ctx.fillStyle = lightColor;
                }
                this.fillCell(x, y);
              }
            }
          }
        });
      },
      backgroundColor,
    }));
  }
}
