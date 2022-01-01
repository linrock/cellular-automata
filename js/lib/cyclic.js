// Cyclic AKA rock paper scissors - two-dimensional
class Cyclic {
  numCellsX = -1;
  numCellsY = -1;
  world = [];

  numStates = 3;
  winThreshold = 2;  // need this # of winning neighbors to win
  winRand = 2;       // add randomess to the win threshold

  constructor(numCellsX, numCellsY, cellInitFunc) {
    this.numCellsX = numCellsX;
    this.numCellsY = numCellsY;
    for (let y = 0; y < numCellsY; y++) {
      const row = [];
      for (let x = 0; x < numCellsX; x++) {
        if (cellInitFunc) {
          row.push(cellInitFunc ? cellInitFunc(x, y) : 0);
        }
      }
      this.world.push(row);
    }
  }

  // naive way of calculating the next generation of the world
  calculateNewWorld() {
    const newWorld = [];
    for (let y = 0; y < this.numCellsY; y++) {
      newWorld.push(new Array(this.numCellsX).fill(0));
    }
    for (let y = 0; y < this.numCellsY; y++) {
      for (let x = 0; x < this.numCellsX; x++) {
        // count the number of neighbors with a particular value
        const counts = {};
        for (let i = 0; i < this.numStates; i++) {
          counts[i] = 0;
        }
        if (y > 0) {
          if (x > 0) {
            counts[this.world[y - 1][x - 1]] += 1;
          }
          counts[this.world[y - 1][x]] += 1;
          if (x < this.numCellsX - 1) {
            counts[this.world[y - 1][x + 1]] += 1;
          }
        }
        if (x > 0) {
          counts[this.world[y][x - 1]] += 1;
        }
        if (x < this.numCellsX - 1) {
          counts[this.world[y][x + 1]] += 1;
        }
        if (y < this.numCellsY - 1) {
          if (x > 0) {
            counts[this.world[y + 1][x - 1]] += 1;
          }
          counts[this.world[y + 1][x]] += 1;
          if (x < this.numCellsX - 1) {
            counts[this.world[y + 1][x + 1]] += 1;
          }
        }
        const winnerVal = (this.world[y][x] + 1) % this.numStates;
        // the state of the cell changes if enough neighbors have
        // a winning value over it
        if (counts[winnerVal] > this.winThreshold) {
          // add some randomness for smoother edges
          const rand = ~~(Math.random() * this.winRand);
          if (counts[winnerVal] > this.winThreshold + rand) {
            newWorld[y][x] = winnerVal;
          } else {
            newWorld[y][x] = this.world[y][x];
          }
        } else {
          newWorld[y][x] = this.world[y][x];
        }
      }
    }
    this.world = newWorld;
    return [newWorld, []];
  }
}
