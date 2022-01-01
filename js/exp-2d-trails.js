{
  const CELL_LIVE = 16;
  const CELL_TRANSITION = CELL_LIVE / 2;

  const backgroundColor = 'rgb(26, 28, 25)';
  const liveColor = '#C8E77F';
  const fadeColor1 = '#5C8B6B';
  const fadeColor2 = '#355852';

  CA.animate('c-game-of-life-trails', {
    cellSize: 3,
    init: (numX, numY) => {
      // initialize the world with random numbers
      let world = [];
      for (let y = 0; y < numY; y++) {
        const row = [];
        for (let x = 0; x < numX; x++) {
          row.push(Math.random() > 0.5 ? CELL_LIVE : 0);
        }
        world.push(row);
      }

      // naive way of calculating the next iteration of the world
      return () => {
        const newWorld = [];
        for (let y = 0; y < numY; y++) {
          newWorld.push([]);
          for (let x = 0; x < numX; x++) {
            // calculate the number of live neighbors
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

            // decide the new state of the current cell
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
      };
    },
    drawWorld: function(world) {
      this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      for (let y = 0; y < this.numCellsY; y++) {
        for (let x = 0; x < this.numCellsX; x++) {
          if (world[y][x] !== 0) {
            if (world[y][x] === CELL_LIVE) {
              this.ctx.fillStyle = liveColor;
            } else if (world[y][x] > CELL_TRANSITION) {
              this.ctx.fillStyle = fadeColor1;
            } else {
              this.ctx.fillStyle = fadeColor2;
            }
            this.fillCell(x, y);
          }
        }
      }
    },
    backgroundColor,
  });
}
