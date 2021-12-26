(() => {
  const C_WIDTH = 400;
  const C_HEIGHT = 400;
  const GRID_SIZE = 4;

  const UPDATE_INTERVAL_MS = 50;

  // https://mathworld.wolfram.com/ElementaryCellularAutomaton.html
  // const RULE_NUM = 73;
  // const RULE_NUM = 73;
  const RULE_NUM = 30;
  // const RULE_NUM = 110;
  // const RULE_NUM = 184;

  const canvas = document.getElementById('1d-world');
  canvas.width = C_WIDTH;
  canvas.height = C_HEIGHT;
  const ctx = canvas.getContext('2d');

  const INIT = {
    // initialize the bottom row with random numbers
    RANDOM_UNIFORM: () => {
      for (let i = 0; i < C_WIDTH / GRID_SIZE; i++) {
        bottomRow.push(Math.random() > 0.5 ? 1 : 0);
      }
    },
    // initialize the bottom row with a single pixel in the middle
    ONE_MIDDLE: () => {
      for (let i = 0; i < C_WIDTH / GRID_SIZE; i++) {
        bottomRow[i] = 0;
        if (i === ~~(C_WIDTH / GRID_SIZE / 2)) {
          bottomRow[i] = 1;
        }
      }
    },
  };

  let bottomRow = [];
  // INIT.RANDOM_UNIFORM();
  INIT.ONE_MIDDLE();

  // draw the bottom row
  for (let i = 0; i < C_WIDTH / GRID_SIZE; i++) {
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
    const n = C_WIDTH / GRID_SIZE;
    for (i = 0; i < n; i++) {
      let nextKey;
      if (i === 0) {
        nextKey = 4 * prevRow[n - 1] + 2 * prevRow[i] + prevRow[i + 1];
      } else if (i === n - 1) {
        nextKey = 4 * prevRow[i - 1] + 2 * prevRow[i] + prevRow[0];
      } else {
        nextKey = 4 * prevRow[i - 1] + 2 * prevRow[i] + prevRow[i + 1];
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
    for (let i = 0; i < C_WIDTH / GRID_SIZE; i++) {
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
