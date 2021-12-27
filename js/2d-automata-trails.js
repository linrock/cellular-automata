(() => {
  const C_WIDTH = 330;
  const C_HEIGHT = 165;
  const GRID_SIZE = 3;

  const UPDATE_INTERVAL_MS = 50;

  const canvas = document.getElementById('game-of-life-trails');
  canvas.width = C_WIDTH;
  canvas.height = C_HEIGHT;
  canvas.style.background = '#1a1423'

  const ctx = canvas.getContext('2d');

  let world = [];

  const CELL_LIVE = 10;

  // initialize the world with random numbers
  for (let y = 0; y < C_HEIGHT / GRID_SIZE; y++) {
    const row = [];
    for (let x = 0; x < C_WIDTH / GRID_SIZE; x++) {
      row.push(Math.random() > 0.8 ? CELL_LIVE : 0);
    }
    world.push(row);
  }

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
            (world[y - 1][x - 1] === CELL_LIVE ? 1 : 0) +
            (world[y - 1][x] === CELL_LIVE     ? 1 : 0) + 
            (world[y - 1][x + 1] === CELL_LIVE ? 1 : 0);
        }
        numLiveNeighbors +=
          (world[y][x - 1] === CELL_LIVE ? 1 : 0) +
          (world[y][x + 1] === CELL_LIVE ? 1 : 0);
        if (y < C_HEIGHT / GRID_SIZE - 1) {
          numLiveNeighbors +=
            (world[y + 1][x - 1] === CELL_LIVE ? 1 : 0) +
            (world[y + 1][x] === CELL_LIVE     ? 1 : 0) +
            (world[y + 1][x + 1] === CELL_LIVE ? 1 : 0);
        }

        // decide the new state of the current cell
        newWorld[y][x] = world[y][x];
        if (newWorld[y][x] === CELL_LIVE) {
          if (numLiveNeighbors < 2 || numLiveNeighbors > 3) {
            newWorld[y][x] = Math.max(0, newWorld[y][x] - 1);
          }
        } else {
          if (numLiveNeighbors === 3) {
            newWorld[y][x] = CELL_LIVE;
          } else {
            newWorld[y][x] = Math.max(0, newWorld[y][x] - 1);
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
        if (world[y][x] !== 0) {
          if (world[y][x] === CELL_LIVE) {
            ctx.fillStyle = '#b5ffe9';
          } else if (world[y][x] > CELL_LIVE / 2) {
            ctx.fillStyle = '#ff66b3';
          } else {
            ctx.fillStyle = '#96031a';
          }
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
