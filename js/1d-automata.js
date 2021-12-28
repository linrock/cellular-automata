(() => {
  const C_WIDTH = 330;
  const C_HEIGHT = 165;
  const GRID_SIZE = 3;

  const UPDATE_INTERVAL_MS = 50;

  const NUM_CELLS_X = C_WIDTH / GRID_SIZE;
  const NUM_CELLS_Y = C_HEIGHT / GRID_SIZE;

  // https://mathworld.wolfram.com/ElementaryCellularAutomaton.html
  const RULE_NUM = 30;   // chaotic
  // const RULE_NUM = 70;
  // const RULE_NUM = 73;
  // const RULE_NUM = 110;
  // const RULE_NUM = 184;

  // const FG_COLOR = '#39FF14'; // light green
  const FG_COLOR = '#cef9f2'; // light blue
  const BG_COLOR = '#1b065e';

  const canvas = document.getElementById('1d-world');
  canvas.width = C_WIDTH;
  canvas.height = C_HEIGHT;
  canvas.style.background = BG_COLOR;

  const ctx = canvas.getContext('2d');
  ctx.fillStyle = FG_COLOR;

  let world = [];
  for (let i = 0; i < NUM_CELLS_Y; i++) {
    world.push(new Array(NUM_CELLS_X).fill(0));
  }

  // initialize an elementary cellular automaton
  let eca = new ECA(NUM_CELLS_X, RULE_NUM, 'one_middle');

  let isAnimating = false;
  canvas.addEventListener('play', () => isAnimating = true);
  canvas.addEventListener('pause', () => isAnimating = false);
  canvas.addEventListener('click', () => {
    // click to clear the canvas and start over
    isAnimating = false;
    requestAnimationFrame(() => {
      ctx.clearRect(0, 0, C_WIDTH, C_HEIGHT);
    });
    world = [];
    for (let i = 0; i < NUM_CELLS_Y; i++) {
      world.push(new Array(NUM_CELLS_X).fill(0));
    }
    eca = new ECA(NUM_CELLS_X, RULE_NUM, 'one_middle');
    world.push(eca.cells);
    world.shift();
    drawWorld(world);
    isAnimating = true;
  });

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
    setTimeout(() => updateForever(), UPDATE_INTERVAL_MS);
  }

  world.push(eca.cells);
  world.shift();
  drawWorld(world);      // draw the whole world
  updateForever();       // forever repeat calculating/drawing new rows
})();
