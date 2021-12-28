(() => {
  const GRID_SIZE = 3;
  const UPDATE_INTERVAL_MS = 50;

  const canvas = document.getElementById('rule-90');
  const C_WIDTH = canvas.width;
  const C_HEIGHT = canvas.height;

  const NUM_CELLS_X = C_WIDTH / GRID_SIZE;
  const NUM_CELLS_Y = C_HEIGHT / GRID_SIZE;

  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#39FF14';

  let isAnimating = false;
  canvas.addEventListener('play', () => isAnimating = true);
  canvas.addEventListener('pause', () => isAnimating = false);

  // initialize an empty world
  let world = [];
  for (let i = 0; i < NUM_CELLS_Y; i++) {
    world.push(new Array(NUM_CELLS_X).fill(0));
  }

  // initialize an elementary cellular automaton
  const RULE_NUM = 90;
  const eca = new ECA(NUM_CELLS_X, RULE_NUM, 'one_middle');

  function drawWorld(world) {
    requestAnimationFrame(() => {
      ctx.clearRect(0, 0, C_WIDTH, C_HEIGHT);
      for (let x = 0; x < NUM_CELLS_X; x++) {
        for (let y = 0; y < NUM_CELLS_Y; y++) {
          if (world[y][x]) {
            ctx.fillRect(
              x * GRID_SIZE,
              y * GRID_SIZE,
              GRID_SIZE,
              GRID_SIZE);
          }
        }
      }
    });
  }

  function updateForever() {
    if (isAnimating) {
      eca.calculateNextGeneration();
      world.push(eca.cells);
      world.shift();
      drawWorld(world);
    }
    setTimeout(() => updateForever(eca), UPDATE_INTERVAL_MS);
  }

  world.push(eca.cells);
  world.shift();
  drawWorld(world);      // draw the whole world
  updateForever();       // forever repeat calculating/drawing new rows
})();
