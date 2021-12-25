const C_WIDTH = 600;
const C_HEIGHT = 400;
const GRID_SIZE = 2;
const UPDATE_INTERVAL_MS = 100;

const canvas = document.getElementById("world");
canvas.width = C_WIDTH;
canvas.height = C_HEIGHT;
const ctx = canvas.getContext('2d');

// initialize the bottom row with random numbers
let bottomRow = [];
for (let i = 0; i < C_WIDTH / GRID_SIZE; i++) {
  bottomRow.push(Math.round(Math.random()));
}
// initialize the bottom row with a single pixel in the middle
for (let i = 0; i < C_WIDTH / GRID_SIZE; i++) {
  bottomRow[i] = 0;
  if (i === ~~(C_WIDTH / GRID_SIZE / 2)) {
    bottomRow[i] = 1;
  }
}

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
ctx.fill();

// rule 30
const NEXT_ITER = {
  '111': 0,
  '110': 0,
  '101': 0,
  '100': 1,
  '011': 1,
  '010': 1,
  '001': 1,
  '000': 0,
};

// calculate the values of the next row based on the previous row
function calculateNextRow(prevRow) {
  const nextRow = [];
  for (i = 0, n = C_WIDTH / GRID_SIZE; i < n; i++) {
    const nextKey =
      (prevRow[i - 1] || 0).toString() +
      prevRow[i].toString() +
      (prevRow[i + 1] || 0).toString();
    nextRow.push(NEXT_ITER[nextKey]);
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
    if (nextRow[i] === 1) {
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
  drawNextIter(nextRow);
  bottomRow = nextRow;
  setTimeout(() => {
    requestAnimationFrame(updateForever);
  }, UPDATE_INTERVAL_MS);
}

updateForever();
