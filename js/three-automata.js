(() => {
  const C_WIDTH = 330;
  const C_HEIGHT = 495;
  const GRID_SIZE = 3;

  const UPDATE_INTERVAL_MS = 50;

  const canvas = document.getElementById('three-combined-world');
  canvas.width = C_WIDTH;
  canvas.height = C_HEIGHT;

  // const RULE_NUM = 30;
  // const RULE_NUM = 73;
  // const RULE_NUM = 106;
  const RULE_NUM_TOP = 73;
  const RULE_NUM_BOTTOM = 30;

  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#39FF14';

  // initialize the world with zeroes
  let world = [];
  for (let y = 0; y < C_HEIGHT / GRID_SIZE; y++) {
    const row = [];
    for (let x = 0; x < C_WIDTH / GRID_SIZE; x++) {
      row.push(0);
    }
    world.push(row);
  }

  // central dot
  world[0][C_WIDTH / GRID_SIZE / 2] = 1;
  world[C_HEIGHT / GRID_SIZE - 1][C_WIDTH / GRID_SIZE / 2] = 1;

  // random
  // for (let i = 0; i < C_WIDTH / GRID_SIZE; i++) {
  //   world[C_HEIGHT / GRID_SIZE - 1][i] = Math.random() > 0.5 ? 1 : 0;
  // }

  const ITER_KEYS = [7, 6, 5, 4, 3, 2, 1, 0];

  const RULE_BIN_TOP = RULE_NUM_TOP.toString(2).padStart(8, '0');
  const ITER_MAP_TOP = {};
  ITER_KEYS.forEach((k, i) => ITER_MAP_TOP[k] = parseInt(RULE_BIN_TOP[i], 10));

  const RULE_BIN_BOTTOM = RULE_NUM_BOTTOM.toString(2).padStart(8, '0');
  const ITER_MAP_BOTTOM = {};
  ITER_KEYS.forEach((k, i) => ITER_MAP_BOTTOM[k] = parseInt(RULE_BIN_BOTTOM[i], 10));


  // naive way of calculating the next iteration of the world
  function calculateNewWorld1d(world) {
    const newWorld = [];
    for (let y = 0; y < C_HEIGHT / GRID_SIZE; y++) {
      newWorld[y] = world[y].slice();
    }

    // num grid values in X direction
    const n = C_WIDTH / GRID_SIZE;

    // the bottom third of the world is a 1d cellular automata
    const newBottomRow = [];
    const prevRow = world[C_HEIGHT / GRID_SIZE - 1];
    for (let x = 0; x < n; x++) {
      let nextKey;
      if (x === 0) {
        nextKey = prevRow[n - 1] * 4 + prevRow[x] * 2 + prevRow[x + 1];
      } else if (x === n - 1) {
        nextKey = prevRow[x - 1] * 4 + prevRow[x] * 2 + prevRow[0];
      } else {
        nextKey = prevRow[x - 1] * 4 + prevRow[x] * 2 + prevRow[x + 1];
      }
      newBottomRow.push(ITER_MAP_BOTTOM[nextKey]);
    }
    for (let y = C_HEIGHT / GRID_SIZE - 1; y > 2 * C_HEIGHT / GRID_SIZE / 3; y--) {
      newWorld[y - 1] = world[y];
    }
    newWorld[C_HEIGHT / GRID_SIZE - 1] = newBottomRow;

    // the top third of the world is a 1d cellular automata
    const newTopRow = [];
    const prevTopRow = world[0];
    for (let x = 0; x < n; x++) {
      let nextKey;
      if (x === 0) {
        nextKey = prevTopRow[n - 1] * 4 + prevTopRow[x] * 2 + prevTopRow[x + 1];
      } else if (x === n - 1) {
        nextKey = prevTopRow[x - 1] * 4 + prevTopRow[x] * 2 + prevTopRow[0];
      } else {
        nextKey = prevTopRow[x - 1] * 4 + prevTopRow[x] * 2 + prevTopRow[x + 1];
      }
      newTopRow.push(ITER_MAP_TOP[nextKey]);
    }
    for (let y = 0; y < C_HEIGHT / GRID_SIZE / 3; y++) {
      newWorld[y + 1] = world[y];
    }
    newWorld[0] = newTopRow;

    return newWorld;
  }

  function calculateNewWorld2d(world) {
    const newWorld = [];
    for (let y = 0; y < C_HEIGHT / GRID_SIZE; y++) {
      newWorld[y] = world[y].slice();
    }
    // the middle third of the world follows the rules of the game of life
    for (let y = C_HEIGHT / GRID_SIZE / 3; y < 2 * C_HEIGHT / GRID_SIZE / 3; y++) {
      for (let x = 0; x < C_WIDTH / GRID_SIZE; x++) {
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
    for (let y = 0; y < C_HEIGHT / GRID_SIZE; y++) {
      for (let x = 0; x < C_WIDTH / GRID_SIZE; x++) {
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
    let newWorld = calculateNewWorld1d(world);
    newWorld = calculateNewWorld2d(newWorld);
    requestAnimationFrame(() => drawWorld(newWorld));
    world = newWorld;
    setTimeout(() => updateForever(), UPDATE_INTERVAL_MS);
  }

  drawWorld(world);
  updateForever();
})();