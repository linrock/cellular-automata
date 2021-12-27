(() => {
  const C_WIDTH = 330;
  const C_HEIGHT = 165;
  const GRID_SIZE = 3;

  const UPDATE_INTERVAL_MS = 50;

  const NUM_CELLS_X = C_WIDTH / GRID_SIZE;
  const NUM_CELLS_Y = C_HEIGHT / GRID_SIZE;

  // const FG_COLOR = '#39FF14';
  // const BG_COLOR = '#1a1423';
  // const FG_COLOR = '#ff934f';
  // const BG_COLOR = '#1b065e';
  const FG_COLOR = '#ffd449';
  const BG_COLOR = '#110244';

  const canvas = document.getElementById('c-day-and-night');
  canvas.width = C_WIDTH;
  canvas.height = C_HEIGHT;
  canvas.style.background = BG_COLOR;

  const ctx = canvas.getContext('2d');
  ctx.fillStyle = FG_COLOR;

  let isAnimating = false;
  canvas.addEventListener('play', () => isAnimating = true);
  canvas.addEventListener('pause', () => isAnimating = false);

  // initialize the world with random numbers
  let world = [];
  for (let y = 0; y < NUM_CELLS_Y; y++) {
    const row = [];
    for (let x = 0; x < NUM_CELLS_X; x++) {
      row.push(Math.random() > 0.5 ? 1 : 0);
    }
    world.push(row);
  }

  // naive way of calculating the next iteration of the world
  function calculateNewWorld(world) {
    const newWorld = [];
    for (let y = 0; y < NUM_CELLS_Y; y++) {
      newWorld.push([]);
      for (let x = 0; x < NUM_CELLS_X; x++) {
        // calculate the number of live neighbors
        let numLiveNeighbors = 0;
        if (y > 0) {
          numLiveNeighbors +=
            (world[y - 1][x - 1] ? 1 : 0) +
            (world[y - 1][x]     ? 1 : 0) + 
            (world[y - 1][x + 1] ? 1 : 0);
        }
        numLiveNeighbors +=
          (world[y][x - 1] ? 1 : 0) +
          (world[y][x + 1] ? 1 : 0);
        if (y < NUM_CELLS_Y - 1) {
          numLiveNeighbors +=
            (world[y + 1][x - 1] ? 1 : 0) +
            (world[y + 1][x]     ? 1 : 0) +
            (world[y + 1][x + 1] ? 1 : 0);
        }

        // decide the new state of the current cell
        newWorld[y][x] = world[y][x];
        if (newWorld[y][x]) {
          if (![3, 4, 6, 7, 8].includes(numLiveNeighbors)) {
            newWorld[y][x] = 0;
          }
        } else {
          if ([3, 6, 7, 8].includes(numLiveNeighbors)) {
            newWorld[y][x] = 1;
          } else {
            newWorld[y][x] = 0;
          }
        }
      }
    }
    return newWorld;
  }

  function drawWorld(world) {
    ctx.clearRect(0, 0, C_WIDTH, C_HEIGHT);
    for (let y = 0; y < NUM_CELLS_Y; y++) {
      for (let x = 0; x < NUM_CELLS_X; x++) {
        if (world[y][x]) {
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
      const newWorld = calculateNewWorld(world);
      requestAnimationFrame(() => drawWorld(newWorld));
      world = newWorld;
    }
    setTimeout(() => updateForever(), UPDATE_INTERVAL_MS);
  }

  drawWorld(world);
  updateForever();
})();
