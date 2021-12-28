(() => {
  const C_WIDTH = 330;
  const C_HEIGHT = 495;
  const GRID_SIZE = 3;

  const UPDATE_INTERVAL_MS = 50;

  const canvas = document.getElementById('three-combined-world');
  canvas.width = C_WIDTH;
  canvas.height = C_HEIGHT;

  const NUM_CELLS_X = C_WIDTH / GRID_SIZE;
  const NUM_CELLS_Y = C_HEIGHT / GRID_SIZE;

  // const RULE_NUM = 30;
  // const RULE_NUM = 73;
  // const RULE_NUM = 106;
  const RULE_NUM_TOP = 73;
  const RULE_NUM_BOTTOM = 30;

  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#39FF14';

  let isAnimating = false;
  canvas.addEventListener('play', () => isAnimating = true);
  canvas.addEventListener('pause', () => isAnimating = false);

  const ecaTop = new ECA(NUM_CELLS_X, RULE_NUM_TOP, 'one_middle');
  const ecaBottom = new ECA(NUM_CELLS_X, RULE_NUM_BOTTOM, 'one_middle');

  // initialize the world with zeroes. top and bottom rows are ECAs
  let world = [];
  for (let y = 0; y < NUM_CELLS_Y; y++) {
    const row = [];
    for (let x = 0; x < NUM_CELLS_X; x++) {
      row.push(0);
    }
    world.push(row);
  }
  world[0] = ecaTop.cells;
  world[NUM_CELLS_Y - 1] = ecaBottom.cells;

  // naive way of calculating the next iteration of the world
  function calculateNewWorld1d(world) {
    const newWorld = [];
    for (let y = 0; y < NUM_CELLS_Y; y++) {
      newWorld[y] = world[y].slice();
    }

    // the bottom third of the world is a 1d cellular automata
    ecaBottom.calculateNextGeneration();
    for (let y = NUM_CELLS_Y - 1; y > 2 * NUM_CELLS_Y / 3; y--) {
      newWorld[y - 1] = world[y];
    }
    newWorld[NUM_CELLS_Y - 1] = ecaBottom.cells;

    // the top third of the world is a 1d cellular automata
    ecaTop.calculateNextGeneration();
    for (let y = 0; y < NUM_CELLS_Y / 3; y++ ) {
      newWorld[y + 1] = world[y];
    }
    newWorld[0] = ecaTop.cells;

    return newWorld;
  }

  function calculateNewWorld2d(world) {
    const newWorld = [];
    for (let y = 0; y < NUM_CELLS_Y; y++) {
      newWorld[y] = world[y].slice();
    }
    // the middle third of the world follows the rules of the game of life
    for (let y = NUM_CELLS_Y / 3; y < 2 * NUM_CELLS_Y / 3; y++) {
      for (let x = 0; x < NUM_CELLS_X; x++) {
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

  function drawWorld(world) {
    ctx.clearRect(0, 0, C_WIDTH, C_HEIGHT);
    for (let y = 0; y < NUM_CELLS_Y; y++) {
      for (let x = 0; x < NUM_CELLS_X; x++) {
        if (world[y][x] === 1) {
          ctx.fillRect(
            x * GRID_SIZE,
            y * GRID_SIZE,
            GRID_SIZE,
            GRID_SIZE);
        }
      }
    }
  }

  function updateForever() {
    if (isAnimating) {
      let newWorld = calculateNewWorld1d(world);
      newWorld = calculateNewWorld2d(newWorld);
      requestAnimationFrame(() => drawWorld(newWorld));
      world = newWorld;
    }
    setTimeout(() => updateForever(), UPDATE_INTERVAL_MS);
  }

  drawWorld(world);
  updateForever();
})();
