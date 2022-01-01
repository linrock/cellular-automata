{
  const CELL_LIVE = 16;
  const CELL_TRANSITION = CELL_LIVE / 2;

  const backgroundColor = '#2e0400';
  const ecaColor = 'rgb(249,95,2)';

  // top-half GOL and trail colors
  const liveColor = 'rgb(255, 255, 0)';
  const fadeColor1 = '#ff9000';
  const fadeColor2 = 'rgb(84, 6, 0)';

  CA.animate('combined-world', {
    cellSize: 3,
    init: (numX, numY) => {
      const RULE_NUM = 30;
      const eca = new ECA(numX, RULE_NUM, 'one_middle');

      // initialize the world with zeroes. the bottom row is an ECA
      let world = [];
      for (let y = 0; y < numY; y++) {
        world.push(new Array(numX).fill(0));
      }
      world[numY - 1] = eca.cells;

      const halfNumY = numY / 2;

      // naive way of generating new worlds
      return () => {
        eca.calculateNextGeneration();

        const newWorld = [];
        for (let y = 0; y < numY; y++) {
          newWorld.push(new Array(numX).fill(0));
        }

        // the bottom half of the world is a 1d cellular automata
        for (let y = numY - 1; y > halfNumY; y--) {
          newWorld[y - 1] = world[y];
        }
        newWorld[numY - 1] = eca.cells.map(x => x ? CELL_LIVE : 0);

        // the top half of the world follows the rules of the game of life
        for (let y = 0; y < halfNumY; y++) {
          for (let x = 0; x < numX; x++) {
            let numLiveNeighbors = 0;
            if (y > 0) {
              numLiveNeighbors +=
                (world[y - 1][x - 1] === CELL_LIVE ? 1 : 0) +
                (world[y - 1][x] === CELL_LIVE     ? 1 : 0) +
                (world[y - 1][x + 1] === CELL_LIVE ? 1 : 0);
            }
            numLiveNeighbors +=
              (world[y][x - 1] === CELL_LIVE ? 1 : 0) +
              (world[y][x + 1] === CELL_LIVE ? 1 : 0);
            if (y < numY - 1) {
              numLiveNeighbors +=
                (world[y + 1][x - 1] === CELL_LIVE ? 1 : 0) +
                (world[y + 1][x] === CELL_LIVE     ? 1 : 0) +
                (world[y + 1][x + 1] === CELL_LIVE ? 1 : 0);
            }
            newWorld[y][x] = world[y][x];
            if (newWorld[y][x] === CELL_LIVE) {
              if (numLiveNeighbors < 2 || numLiveNeighbors > 3) {
                newWorld[y][x] = Math.max(0, newWorld[y][x] - 1);
              }
            } else {
              if (numLiveNeighbors === 3) {
                newWorld[y][x] = CELL_LIVE;
              } else {
                newWorld[y][x] = Math.max(0, newWorld[y][x] - 1);
              }
            }
          }
        }
        world = newWorld;
        return [world, []];
      }
    },
    drawCell: function(x, y, value) {
      if (!value) {
        return;
      }
      if (y < this.numCellsY / 2) {
        if (value === CELL_LIVE) {
          this.ctx.fillStyle = liveColor;
        } else if (value > CELL_TRANSITION) {
          this.ctx.fillStyle = fadeColor1;
        } else {
          this.ctx.fillStyle = fadeColor2;
        }
      } else {
        // the ECA in the bottom half
        this.ctx.fillStyle = ecaColor;
      }
      this.fillCell(x, y);
    },
    backgroundColor,
  });
}
