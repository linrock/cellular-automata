(() => {
  const C_WIDTH = 240;
  const C_HEIGHT = 120;
  const GRID_SIZE = 3;

  const NUM_CELLS_X = C_WIDTH / GRID_SIZE;
  const NUM_CELLS_Y = C_HEIGHT / GRID_SIZE;

  const UPDATE_INTERVAL_MS = 50;

  const canvas = document.getElementById('gol-glider');
  canvas.width = C_WIDTH;
  canvas.height = C_HEIGHT;
  canvas.style.background = '#1a1423'

  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#39FF14';

  // initialize the world with random numbers
  let world = [];
  for (let y = 0; y < NUM_CELLS_Y; y++) {
    const row = [];
    for (let x = 0; x < NUM_CELLS_X; x++) {
      row.push(0);
    }
    world.push(row);
  }

  console.log(`${NUM_CELLS_Y} ${NUM_CELLS_X}`);

  // initialize a glider gun
  world[5][1] = 1;
  world[6][1] = 1;
  world[5][2] = 1;
  world[6][2] = 1;

  world[3][14] = 1;
  world[3][13] = 1;
  world[4][12] = 1;
  world[5][11] = 1;
  world[6][11] = 1;
  world[7][11] = 1;
  world[8][12] = 1;
  world[9][13] = 1;
  world[9][14] = 1;

  world[6][15] = 1;

  world[4][16] = 1;
  world[8][16] = 1;

  world[5][17] = 1;
  world[6][17] = 1;
  world[7][17] = 1;

  world[6][18] = 1;

  world[3][21] = 1;
  world[4][21] = 1;
  world[5][21] = 1;
  world[3][22] = 1;
  world[4][22] = 1;
  world[5][22] = 1;

  world[2][23] = 1;
  world[6][23] = 1;

  world[1][25] = 1;
  world[2][25] = 1;
  world[6][25] = 1;
  world[7][25] = 1;

  world[3][35] = 1;
  world[4][35] = 1;
  world[3][36] = 1;
  world[4][36] = 1;

  // naive way of calculating the next iteration of the world
  function calculateNewWorld(world) {
    const newWorld = [];
    for (let y = 0; y < C_HEIGHT / GRID_SIZE; y++) {
      newWorld.push([]);
      for (let x = 0; x < C_WIDTH / GRID_SIZE; x++) {
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
        if (y < C_HEIGHT / GRID_SIZE - 1) {
          numLiveNeighbors +=
            (world[y + 1][x - 1] ? 1 : 0) +
            (world[y + 1][x]     ? 1 : 0) +
            (world[y + 1][x + 1] ? 1 : 0);
        }

        // decide the new state of the current cell
        newWorld[y][x] = world[y][x];
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
    return newWorld;
  }

  function drawWorld(world) {
    ctx.clearRect(0, 0, C_WIDTH, C_HEIGHT);
    for (let y = 0; y < C_HEIGHT / GRID_SIZE; y++) {
      for (let x = 0; x < C_WIDTH / GRID_SIZE; x++) {
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
    const newWorld = calculateNewWorld(world);
    requestAnimationFrame(() => drawWorld(newWorld));
    world = newWorld;
    setTimeout(() => updateForever(), UPDATE_INTERVAL_MS);
  }

  drawWorld(world);
  updateForever();
})();
