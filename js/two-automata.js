(() => {
  const RULE_NUM = 30;

  const anim = new AnimatedCanvas('combined-world', 3, (numX, numY) => {
    const eca = new ECA(numX, RULE_NUM, 'one_middle');

    // initialize the world with zeroes. the bottom row is an ECA
    let world = [];
    for (let y = 0; y < numY; y++) {
      const row = [];
      for (let x = 0; x < numX; x++) {
        row.push(0);
      }
      world.push(row);
    }
    world[numY - 1] = eca.cells;

    // naive way of calculating the next iteration of the world
    function calculateNewWorld(world) {
      const newWorld = [];
      for (let y = 0; y < numY; y++) {
        const row = [];
        for (let x = 0; x < numX; x++) {
          row.push(0);
        }
        newWorld.push(row);
      }

      // the bottom half of the world is a 1d cellular automata
      for (let y = numY - 1; y > numY / 2; y--) {
        newWorld[y - 1] = world[y];
      }
      newWorld[numY - 1] = eca.cells;

      // the top half of the world follows the rules of the game of life
      for (let y = 0; y < numY / 2; y++) {
        for (let x = 0; x < numX; x++) {
          let numLiveNeighbors = 0;
          if (y > 0) {
            numLiveNeighbors +=
              (world[y - 1][x - 1] || 0) +
              world[y - 1][x] +
              (world[y - 1][x + 1] || 0);
          }
          numLiveNeighbors += (world[y][x - 1] || 0) + (world[y][x + 1] || 0);
          if (y < numY - 1) {
            numLiveNeighbors +=
              (world[y + 1][x - 1] || 0) +
              world[y + 1][x] +
              (world[y + 1][x + 1] || 0);
          }
          newWorld[y][x] = world[y][x];
          if (newWorld[y][x]) {
            if (numLiveNeighbors < 2 || numLiveNeighbors > 3) {
              newWorld[y][x] = 0;
            }
          } else if (numLiveNeighbors === 3) {
            newWorld[y][x] = 1;
          }
        }
      }
      return newWorld;
    }

    return () => {
      eca.calculateNextGeneration();
      const newWorld = calculateNewWorld(world);
      world = newWorld;
      return world;
    }
  });
  anim.setForegroundColor('#39FF14');
  anim.updateForever();
})();
