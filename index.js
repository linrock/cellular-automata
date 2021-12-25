const C_WIDTH = 600;
const C_HEIGHT = 400;
const GRID_SIZE = 2;

const canvas = document.getElementById("world");
canvas.width = C_WIDTH;
canvas.height = C_HEIGHT;
const ctx = canvas.getContext('2d');

// initialize the bottom row with random numbers
const bottomRowInit = [];
for (let i = 0; i < C_WIDTH / GRID_SIZE; i++) {
  bottomRowInit.push(Math.round(Math.random()));
}
for (let i = 0; i < C_WIDTH / GRID_SIZE; i++) {
  if (bottomRowInit[i]) {
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
