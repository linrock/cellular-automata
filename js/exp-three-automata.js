{
  // const RULE_NUM = 106;
  const RULE_NUM_TOP = 73;
  const RULE_NUM_BOTTOM = 30;

  const anim = new AnimatedCanvas('three-combined-world', 3, (numX, numY) => {
    const ecaTop = new ECA(numX, RULE_NUM_TOP, 'one_middle');
    const ecaBottom = new ECA(numX, RULE_NUM_BOTTOM, 'one_middle');

    // initialize the world with zeroes. top and bottom rows are ECAs
    let world = [];
    for (let y = 0; y < numY; y++) {
      const row = [];
      for (let x = 0; x < numX; x++) {
        row.push(0);
      }
      world.push(row);
    }
    world[0] = ecaTop.cells;
    world[numY - 1] = ecaBottom.cells;

    const BOUND_TOP_Y = numY / 4;
    const BOUND_BOTTOM_Y = 3 * numY / 4;

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
      newWorld[numY - 1] = ecaBottom.cells;

      // the top fourth of the world is a 1d cellular automata
      ecaTop.calculateNextGeneration();
      for (let y = 0; y < BOUND_TOP_Y; y++ ) {
        newWorld[y + 1] = world[y];
      }
      newWorld[0] = ecaTop.cells;

      return newWorld;
    }

    // generates the next iteration of the central GOL world
    function calculateNewWorld2d(world) {
      const newWorld = [];
      for (let y = 0; y < numY; y++) {
        newWorld[y] = world[y].slice();
      }
      // the middle fourth of the world follows the rules of the game of life
      for (let y = BOUND_TOP_Y; y < BOUND_BOTTOM_Y; y++) {
        for (let x = 0; x < numX; x++) {
          const numLiveNeighbors =
            (world[y - 1][x - 1] || 0) +
            world[y - 1][x] +
            (world[y - 1][x + 1] || 0) +
            (world[y][x - 1] || 0) +
            (world[y][x + 1] || 0) +
            (world[y + 1][x - 1] || 0) +
            world[y + 1][x] +
            (world[y + 1][x + 1] || 0);
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
      let newWorld = calculateNewWorld1d(world);
      newWorld = calculateNewWorld2d(newWorld);
      world = newWorld;
      return world;
    };
  });
  anim.setForegroundColor('#39FF14');
  window.animatedCanvases.push(anim);
}
