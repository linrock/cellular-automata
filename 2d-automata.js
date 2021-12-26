(() => {
  const C_WIDTH = 400;
  const C_HEIGHT = 200;
  const GRID_SIZE = 4;

  const UPDATE_INTERVAL_MS = 50;

  const canvas = document.getElementById('game-of-life');
  canvas.width = C_WIDTH;
  canvas.height = C_HEIGHT;

  const ctx = canvas.getContext('2d');

  // initialize the board with random numbers
  const board = [];
  for (let y = 0; y < C_HEIGHT / GRID_SIZE; y++) {
    const row = [];
    for (let x = 0; x < C_WIDTH / GRID_SIZE; x++) {
      row.push(Math.random() > 0.5 ? 1 : 0);
    }
    board.push(row);
  }

  // draw the board
  for (let y = 0; y < C_HEIGHT / GRID_SIZE; y++) {
    for (let x = 0; x < C_WIDTH / GRID_SIZE; x++) {
      if (board[y][x] === 1) {
        ctx.fillRect(
          x * GRID_SIZE,
          y * GRID_SIZE,
          GRID_SIZE,
          GRID_SIZE);
      }
    }
  }
})();
