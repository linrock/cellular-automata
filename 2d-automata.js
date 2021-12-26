(() => {
  const C_WIDTH = 400;
  const C_HEIGHT = 200;
  const GRID_SIZE = 4;

  const UPDATE_INTERVAL_MS = 50;

  const canvas = document.getElementById('game-of-life');
  canvas.width = C_WIDTH;
  canvas.height = C_HEIGHT;

  const ctx = canvas.getContext('2d');

  let world = [];

  // initialize the world with random numbers
  for (let y = 0; y < C_HEIGHT / GRID_SIZE; y++) {
    const row = [];
    for (let x = 0; x < C_WIDTH / GRID_SIZE; x++) {
      row.push(Math.random() > 0.5 ? 1 : 0);
    }
    world.push(row);
  }

  function calculateNewWorld(world) {
    return world;
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
    const newWorld = calculateNewWorld(world);
    requestAnimationFrame(() => drawWorld(newWorld));
    world = newWorld;
    setTimeout(() => updateForever(), UPDATE_INTERVAL_MS);
  }

  drawWorld(world);
  updateForever();
})();
