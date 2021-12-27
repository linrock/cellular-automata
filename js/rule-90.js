(() => {
  const GRID_SIZE = 3;
  const UPDATE_INTERVAL_MS = 50;

  const canvas = document.getElementById('rule-90');
  const C_WIDTH = canvas.width;
  const C_HEIGHT = canvas.height;

  const NUM_CELLS_X = C_WIDTH / GRID_SIZE;
  const NUM_CELLS_Y = C_HEIGHT / GRID_SIZE;

  const RULE_NUM = 90;

  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#39FF14';

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

  function updateForever(eca) {
    eca.calculateNextGeneration();
    drawCells(eca.cells);
    setTimeout(() => updateForever(eca), UPDATE_INTERVAL_MS);
  }

  // initialize an elementary cellular automaton
  const eca = new ECA(NUM_CELLS_X, RULE_NUM, 'one_middle'); 

  // draw the bottom row
  drawCells(eca.cells);

  // forever repeat calculating new rows and drawing them
  updateForever(eca);
})();
