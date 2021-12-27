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
    eca = new ECA(NUM_CELLS_X, RULE_NUM, 'one_middle');
    drawCells(eca.cells);
    isAnimating = true;
  });

  function drawCells(cells) {
    requestAnimationFrame(() => {
      // shift all rows up by one. removes the top row
      const data = ctx.getImageData(
        0, GRID_SIZE, C_WIDTH, C_HEIGHT - GRID_SIZE);
      ctx.putImageData(data, 0, 0);

      // draw the new bottom row with the values of the new generation
      ctx.clearRect(0, C_HEIGHT - GRID_SIZE, C_WIDTH, GRID_SIZE);
      for (let i = 0; i < NUM_CELLS_X; i++) {
        if (cells[i]) {
          ctx.fillRect(
            i * GRID_SIZE,
            C_HEIGHT - GRID_SIZE,
            GRID_SIZE,
            GRID_SIZE);
        }
      }
    });
  }

  function updateForever() {
    if (isAnimating) {
      eca.calculateNextGeneration();
      drawCells(eca.cells);
    }
    setTimeout(() => updateForever(), UPDATE_INTERVAL_MS);
  }

  drawCells(eca.cells);  // draw the bottom row
  updateForever();       // forever repeat calculating/drawing new rows
})();
