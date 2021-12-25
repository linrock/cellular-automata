const C_WIDTH = 600;
const C_HEIGHT = 400;
const GRID_SIZE = 2;

const canvas = document.getElementById("world");
canvas.width = C_WIDTH;
canvas.height = C_HEIGHT;
const ctx = canvas.getContext('2d');

// initialize the bottom row with random numbers
const bottomRow = [];
for (let i = 0; i < C_WIDTH / GRID_SIZE; i++) {
  bottomRow.push(Math.round(Math.random()));
}
for (let i = 0; i < C_WIDTH / GRID_SIZE; i++) {
  if (bottomRow[i]) {
    ctx.rect(
      i * GRID_SIZE,
      C_HEIGHT - GRID_SIZE,
      GRID_SIZE,
      GRID_SIZE);
  }
}
ctx.fill();

// copy the previous row higher after the next iteration
const data = ctx.getImageData(
  0, C_HEIGHT - GRID_SIZE, C_WIDTH, GRID_SIZE);
ctx.putImageData(data, 0, C_HEIGHT - 2 * GRID_SIZE);

// rule 30
const nextIter = {
  '111': 0,
  '110': 0,
  '101': 0,
  '100': 1,
  '011': 1,
  '010': 1,
  '001': 1,
  '000': 0,
};
const nextRow = [];
for (i = 0, n = C_WIDTH / GRID_SIZE; i < n; i++) {
  const nextKey = 
    (bottomRow[i - 1] || 0).toString() +
    bottomRow[i].toString() +
    (bottomRow[i + 1] || 0).toString();
  nextRow.push(nextIter[nextKey]);
}
for (let i = 0; i < C_WIDTH / GRID_SIZE; i++) {
  if (nextRow[i]) {
    ctx.rect(
      i * GRID_SIZE,
      C_HEIGHT - GRID_SIZE,
      GRID_SIZE,
      GRID_SIZE);
  }
}
ctx.fill();
