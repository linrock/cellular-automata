{
  // const RULE_NUM = 106;
  const RULE_NUM_TOP = 73;
  const RULE_NUM_BOTTOM = 86;

  const topFgColor = '#364c6c';     // blue
  const bottomFgColor = '#ED6142';  // red
  const middleFgColor = '#AE5976';  // purple

  const CELL_BLUE = 1;
  const CELL_RED = 2;
  const CELL_PURPLE = 3;

  const anim = new AnimatedCanvas('three-combined-world', 3, (numX, numY) => {
    const ecaTop = new ECA(numX, RULE_NUM_TOP, 'one_middle');
    const ecaBottom = new ECA(numX, RULE_NUM_BOTTOM, 'one_middle');

    const BOUND_TOP_Y = numY / 4;
    const BOUND_BOTTOM_Y = 3 * numY / 4;

    // initialize the world with zeroes
    let world = [];
    for (let y = 0; y < numY; y++) {
      const row = [];
      for (let x = 0; x < numX; x++) {
        row.push(0);
      }
      world.push(row);
    }
    // the top and bottom rows are ECAs
    world[0] = ecaTop.cells.map(x => x ? CELL_BLUE : 0);
    world[numY - 1] = ecaBottom.cells.map(x => x ? CELL_RED : 0);

    // generates the next iteration of the 2x ECA worlds
    function calculateNewWorld1d(world) {
      const newWorld = [];
      for (let y = 0; y < numY; y++) {
        newWorld[y] = world[y].slice();
      }

      // the bottom fourth of the world is a 1d cellular automata
      ecaBottom.calculateNextGeneration();
      for (let y = numY - 1; y > BOUND_BOTTOM_Y; y--) {
        newWorld[y - 1] = world[y];
      }
      newWorld[numY - 1] = ecaBottom.cells.map(x => x ? CELL_RED : 0);

      // the top fourth of the world is a 1d cellular automata
      ecaTop.calculateNextGeneration();
      for (let y = 0; y < BOUND_TOP_Y; y++ ) {
        newWorld[y + 1] = world[y];
      }
      newWorld[0] = ecaTop.cells.map(x => x ? CELL_BLUE : 0);

      return newWorld;
    }

    // generates the next iteration of the central GOL world
    function calculateNewWorld2d(world) {
      const newWorld = [];
      for (let y = 0; y < numY; y++) {
        newWorld[y] = world[y].slice();
      }
      // the middle half of the world follows the rules of the game of life
      for (let y = BOUND_TOP_Y; y < BOUND_BOTTOM_Y; y++) {
        for (let x = 0; x < numX; x++) {
          const counts = {}
          counts[CELL_BLUE] = 0;
          counts[CELL_RED] = 0;
          counts[CELL_PURPLE] = 0;
          counts[world[y][x]]++;
          let numNeighbors = 0;
          world[y - 1][x - 1] && ++numNeighbors && counts[world[y-1][x-1]]++;
          world[y - 1][x]     && ++numNeighbors && counts[world[y-1][x]]++;
          world[y - 1][x + 1] && ++numNeighbors && counts[world[y-1][x+1]]++;
          world[y][x - 1]     && ++numNeighbors && counts[world[y][x-1]]++;
          world[y][x + 1]     && ++numNeighbors && counts[world[y][x+1]]++;
          world[y + 1][x - 1] && ++numNeighbors && counts[world[y+1][x-1]]++;
          world[y + 1][x]     && ++numNeighbors && counts[world[y+1][x]]++;
          world[y + 1][x + 1] && ++numNeighbors && counts[world[y+1][x+1]]++;
          newWorld[y][x] = world[y][x];
          if (newWorld[y][x]) {
            if (numNeighbors < 2 || numNeighbors > 3) {
              newWorld[y][x] = 0;
            }
          } else if (numNeighbors === 3) {
            if (counts[CELL_PURPLE] > 0) {
              newWorld[y][x] = CELL_PURPLE;
            } else if (counts[CELL_BLUE] > 0 && counts[CELL_RED] > 0) {
              newWorld[y][x] = CELL_PURPLE;
            } else if (counts[CELL_BLUE] > 0) {
              newWorld[y][x] = CELL_BLUE;
            } else {
              newWorld[y][x] = CELL_RED;
            }
          }
        }
      }
      return newWorld;
    }

    return () => {
      let newWorld = calculateNewWorld1d(world);
      newWorld = calculateNewWorld2d(newWorld);
      world = newWorld;
      return world;
    };
  });
  anim.drawPixel = function(x, y, value) {
    if (!value) {
      return;
    }
    if (y < this.numCellsY / 4) {
      this.ctx.fillStyle = topFgColor;
    } else if (y > 3 * this.numCellsY / 4) {
      this.ctx.fillStyle = bottomFgColor;
    } else {
      if (value === CELL_BLUE) {
        this.ctx.fillStyle = topFgColor;
      } else if (value === CELL_RED) {
        this.ctx.fillStyle = bottomFgColor;
      } else {
        this.ctx.fillStyle = middleFgColor;
      }
    }
    this.ctx.fillRect(
      x * this.gridSize,
      y * this.gridSize,
      this.gridSize,
      this.gridSize);
  }
  anim.setBackgroundColor('#0c0b0b');
  window.animatedCanvases.push(anim);
}
