(() => {
  const C_WIDTH = 330;
  const C_HEIGHT = 165;
  const GRID_SIZE = 3;

  const NUM_CELLS_X = C_WIDTH / GRID_SIZE;
  const NUM_CELLS_Y = C_HEIGHT / GRID_SIZE;

  const UPDATE_INTERVAL_MS = 50;

  const canvas = document.getElementById('game-of-life');
  canvas.width = C_WIDTH;
  canvas.height = C_HEIGHT;
  canvas.style.background = '#1a1423'

  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#39FF14';

  let isAnimating = false;
  canvas.addEventListener('play', () => isAnimating = true);
  canvas.addEventListener('pause', () => isAnimating = false);

  const gol = new GOL(NUM_CELLS_X, NUM_CELLS_Y);

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
      gol.calculateNewWorld();
      requestAnimationFrame(() => drawWorld(gol.world));
    }
    setTimeout(() => updateForever(), UPDATE_INTERVAL_MS);
  }

  drawWorld(gol.world);
  updateForever(gol);
})();
