(() => {
  const C_WIDTH = 330;
  const C_HEIGHT = 330;
  const GRID_SIZE = 3;

  const UPDATE_INTERVAL_MS = 50;

  const canvas = document.getElementById('combined-world');
  canvas.width = C_WIDTH;
  canvas.height = C_HEIGHT;

  // const RULE_NUM = 30;
  // const RULE_NUM = 73;
  // const RULE_NUM = 106;
  const RULE_NUM = 30;

  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#39FF14';

  let isAnimating = false;
  canvas.addEventListener('play', () => isAnimating = true);
  canvas.addEventListener('pause', () => isAnimating = false);

  const eca = new ECA(C_WIDTH / GRID_SIZE, RULE_NUM, 'one_middle');

  // initialize the world with zeroes
  let world = [];
  for (let y = 0; y < C_HEIGHT / GRID_SIZE; y++) {
    const row = [];
    for (let x = 0; x < C_WIDTH / GRID_SIZE; x++) {
      row.push(0);
    }
    world.push(row);
  }
  world[C_HEIGHT / GRID_SIZE - 1] = eca.cells;

  // naive way of calculating the next iteration of the world
  function calculateNewWorld(world) {
    const newWorld = [];
    for (let y = 0; y < C_HEIGHT / GRID_SIZE; y++) {
      const row = [];
      for (let x = 0; x < C_WIDTH / GRID_SIZE; x++) {
        row.push(0);
      }
      newWorld.push(row);
    }

    // the bottom half of the world is a 1d cellular automata
    const newBottomRow = eca.cells;
    const prevRow = world[C_HEIGHT / GRID_SIZE - 1];
    for (let y = C_HEIGHT / GRID_SIZE - 1; y > C_HEIGHT / GRID_SIZE / 2; y--) {
      newWorld[y - 1] = world[y];
    }
    newWorld[C_HEIGHT / GRID_SIZE - 1] = newBottomRow;

    // the top half of the world follows the rules of the game of life
    for (let y = 0; y < C_HEIGHT / GRID_SIZE / 2; y++) {
      for (let x = 0; x < C_WIDTH / GRID_SIZE; x++) {
        let numLiveNeighbors = 0;
        if (y > 0) {
          numLiveNeighbors +=
            (world[y - 1][x - 1] || 0) + world[y - 1][x] + (world[y - 1][x + 1] || 0);
        }
        numLiveNeighbors += (world[y][x - 1] || 0) + (world[y][x + 1] || 0);
        if (y < C_HEIGHT / GRID_SIZE - 1) {
          numLiveNeighbors +=
            (world[y + 1][x - 1] || 0) + world[y + 1][x] + (world[y + 1][x + 1] || 0);
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
    if (isAnimating) {
      eca.calculateNextGeneration();
      const newWorld = calculateNewWorld(world);
      requestAnimationFrame(() => drawWorld(newWorld));
      world = newWorld;
    }
    setTimeout(() => updateForever(), UPDATE_INTERVAL_MS);
  }

  drawWorld(world);
  updateForever();
})();
