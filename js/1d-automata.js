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

  const INIT = {
    // initialize the bottom row with random numbers
    RANDOM_UNIFORM: () => {
      for (let i = 0; i < NUM_CELLS_X; i++) {
        bottomRow.push(Math.random() > 0.5 ? 1 : 0);
      }
    },
    // initialize the bottom row with a single pixel in the middle
    ONE_MIDDLE: () => {
      for (let i = 0; i < NUM_CELLS_X; i++) {
        bottomRow[i] = 0;
      }
      bottomRow[~~(NUM_CELLS_X / 2)] = 1;
    },
  };

  let bottomRow = [];
  // INIT.RANDOM_UNIFORM();
  INIT.ONE_MIDDLE();

  // draw the bottom row
  for (let i = 0; i < NUM_CELLS_X; i++) {
    if (bottomRow[i]) {
      ctx.fillRect(
        i * GRID_SIZE,
        C_HEIGHT - GRID_SIZE,
        GRID_SIZE,
        GRID_SIZE);
    }
  }

  // converts a rule number to a 8-digit binary string
  const RULE_BIN = RULE_NUM.toString(2).padStart(8, 0);
  const ITER_KEYS = [7, 6, 5, 4, 3, 2, 1, 0];
  const ITER_MAP = {};
  ITER_KEYS.forEach((k, i) => ITER_MAP[k] = parseInt(RULE_BIN[i]));

  // calculate the values of the next row based on the previous row
  function calculateNextRow(prevRow) {
    const nextRow = [];
    for (i = 0; i < NUM_CELLS_X; i++) {
      let nextKey = 2 * prevRow[i];
      if (i === 0) {
        nextKey += 4 * prevRow[NUM_CELLS_X - 1] + prevRow[i + 1];
      } else if (i === NUM_CELLS_X - 1) {
        nextKey += 4 * prevRow[i - 1] + prevRow[0];
      } else {
        nextKey += 4 * prevRow[i - 1] + prevRow[i + 1];
      }
      nextRow.push(ITER_MAP[nextKey]);
    }
    return nextRow;
  }

  function drawNextIter(nextRow) {
    // move all the previously-calculated rows up a row
    const data = ctx.getImageData(
      0, GRID_SIZE, C_WIDTH, C_HEIGHT - GRID_SIZE);
    ctx.putImageData(data, 0, 0);

    // draw the new bottom row with the values of the new iteration
    ctx.clearRect(0, C_HEIGHT - GRID_SIZE, C_WIDTH, GRID_SIZE);
    for (let i = 0; i < NUM_CELLS_X; i++) {
      if (nextRow[i]) {
        ctx.fillRect(
          i * GRID_SIZE,
          C_HEIGHT - GRID_SIZE,
          GRID_SIZE,
          GRID_SIZE);
      }
    }
  }

  function updateForever() {
    const nextRow = calculateNextRow(bottomRow);
    requestAnimationFrame(() => drawNextIter(nextRow));
    bottomRow = nextRow;
    setTimeout(() => updateForever(), UPDATE_INTERVAL_MS);
  }

  updateForever();
})();
