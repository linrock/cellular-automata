// Game of Life - two-dimensional
class GOL {
  numCellsX = -1;
  numCellsY = -1;
  world = [];

  B = [3];     // born
  S = [2, 3];  // survives

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

  // assumes notation format: B3/S23
  set rulestring(bsRulestring) {
    const [b, s] = bsRulestring.split('/');
    this.B = b.slice(1).split('').map(Number);
    this.S = s.slice(1).split('').map(Number);
  }

  // for manually converting arrays of strings into pixels
  drawPixels(pixels, shiftX = 0, shiftY = 0) {
    pixels.forEach((row, y) => {
      row.split('').forEach((pixel, x) => {
        if (pixel !== ' ') {
          this.world[y + shiftY][x + shiftX] = 1;
        }
      });
    });
  }

  // method of deciding the new state of the current cell
  newCellRule(state, numLiveNeighbors) {
    if (state)  {
      return this.S.includes(numLiveNeighbors);
    }
    return this.B.includes(numLiveNeighbors);
  }

  // naive way of calculating the next generation of the world
  calculateNewWorld() {
    const newWorld = [];
    for (let y = 0; y < this.numCellsY; y++) {
      newWorld.push([]);
      for (let x = 0; x < this.numCellsX; x++) {
        // calculate the number of live neighbors among the
        // 8 immediate neighboring cells (Moore neighborhood)
        let numLiveNeighbors =
          (this.world[y][x - 1] ? 1 : 0) +
          (this.world[y][x + 1] ? 1 : 0);
        if (y > 0) {
          numLiveNeighbors +=
            (this.world[y - 1][x - 1] ? 1 : 0) +
            (this.world[y - 1][x]     ? 1 : 0) + 
            (this.world[y - 1][x + 1] ? 1 : 0);
        }
        if (y < this.numCellsY - 1) {
          numLiveNeighbors +=
            (this.world[y + 1][x - 1] ? 1 : 0) +
            (this.world[y + 1][x]     ? 1 : 0) +
            (this.world[y + 1][x + 1] ? 1 : 0);
        }
        newWorld[y][x] = this.newCellRule(this.world[y][x], numLiveNeighbors);
      }
    }
    this.world = newWorld;
    return newWorld;
  }
}
