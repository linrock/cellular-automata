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

  let isAnimating = false;
  canvas.addEventListener('play', () => isAnimating = true);
  canvas.addEventListener('pause', () => isAnimating = false);

  const gol = new GOL(NUM_CELLS_X, NUM_CELLS_Y);

  // manually draw a glider gun
  gol.world[5][1] = 1;
  gol.world[6][1] = 1;
  gol.world[5][2] = 1;
  gol.world[6][2] = 1;

  gol.world[3][14] = 1;
  gol.world[3][13] = 1;
  gol.world[4][12] = 1;
  gol.world[5][11] = 1;
  gol.world[6][11] = 1;
  gol.world[7][11] = 1;
  gol.world[8][12] = 1;
  gol.world[9][13] = 1;
  gol.world[9][14] = 1;

  gol.world[6][15] = 1;

  gol.world[4][16] = 1;
  gol.world[8][16] = 1;

  gol.world[5][17] = 1;
  gol.world[6][17] = 1;
  gol.world[7][17] = 1;

  gol.world[6][18] = 1;

  gol.world[3][21] = 1;
  gol.world[4][21] = 1;
  gol.world[5][21] = 1;
  gol.world[3][22] = 1;
  gol.world[4][22] = 1;
  gol.world[5][22] = 1;

  gol.world[2][23] = 1;
  gol.world[6][23] = 1;

  gol.world[1][25] = 1;
  gol.world[2][25] = 1;
  gol.world[6][25] = 1;
  gol.world[7][25] = 1;

  gol.world[3][35] = 1;
  gol.world[4][35] = 1;
  gol.world[3][36] = 1;
  gol.world[4][36] = 1;

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
  updateForever();
})();
