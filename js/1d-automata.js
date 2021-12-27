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

  const canvas = document.getElementById('1d-world');
  canvas.width = C_WIDTH;
  canvas.height = C_HEIGHT;

  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#39FF14';

  function drawCells(cells) {
    requestAnimationFrame(() => {
      // move all the previously-calculated rows up a row
      const data = ctx.getImageData(
        0, GRID_SIZE, C_WIDTH, C_HEIGHT - GRID_SIZE);
      ctx.putImageData(data, 0, 0);

      // draw the new bottom row with the values of the new iteration
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
