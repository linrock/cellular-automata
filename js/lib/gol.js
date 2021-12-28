// Game of Life - two-dimensional
class GOL {
  numCellsX = -1;
  numCellsY = -1;
  world = [];

  constructor(numCellsX, numCellsY) {
    this.numCellsX = numCellsX;
    this.numCellsY = numCellsY;
    for (let y = 0; y < numCellsY; y++) {
      const row = [];
      for (let x = 0; x < numCellsX; x++) {
        row.push(Math.random() > 0.8 ? 1 : 0);
      }
      this.world.push(row);
    }
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

        // decide the new state of the current cell
        newWorld[y][x] = this.world[y][x];
        if (newWorld[y][x]) {
          if (numLiveNeighbors < 2 || numLiveNeighbors > 3) {
            newWorld[y][x] = 0;
          }
        } else {
          if (numLiveNeighbors === 3) {
            newWorld[y][x] = 1;
          } else {
            newWorld[y][x] = 0;
          }
        }
      }
    }
    this.world = newWorld;
  }
}
