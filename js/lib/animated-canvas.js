class AnimatedCanvas {
  UPDATE_INTERVAL_MS = 50;
  isAnimating = false;
  updateWorld = () => {};

  canvas;
  ctx;

  canvasWidth;
  canvasHeight;
  cellSize;
  numCellsX;
  numCellsY;

  constructor(canvasId, cellSize, initAnimContext) {
    const canvas = document.getElementById(canvasId);
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.canvasWidth = canvas.width;
    this.canvasHeight = canvas.height;
    this.cellSize = cellSize;
    this.numCellsX = this.canvasWidth / cellSize;
    this.numCellsY = this.canvasHeight / cellSize;
    canvas.addEventListener('play', () => this.isAnimating = true);
    canvas.addEventListener('pause', () => this.isAnimating = false);
    canvas.addEventListener('click', () => {
      // click to clear the canvas and start over
      this.isAnimating = false;
      requestAnimationFrame(() => {
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      });
      this.updateWorld = initAnimContext(this.numCellsX, this.numCellsY);
      this.isAnimating = true;
    });
    this.updateWorld = initAnimContext(this.numCellsX, this.numCellsY);
  }

  setForegroundColor(color) {
    this.ctx.fillStyle = color;
  }

  setBackgroundColor(color) {
    this.canvas.style.background = color;
  }

  fillCell(x, y) {
    this.ctx.fillRect(
      x * this.cellSize,
      y * this.cellSize,
      this.cellSize,
      this.cellSize);
  }

  drawCell(x, y, value) {
    if (value) {
      this.fillCell(x, y);
    }
  }

  drawWorld(world) {
    requestAnimationFrame(() => {
      this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      for (let x = 0; x < this.numCellsX; x++) {
        for (let y = 0; y < this.numCellsY; y++) {
          this.drawCell(x, y, world[y][x]);
        }
      }
    });
  }

  updateAndDrawWorld() {
    if (this.isAnimating) {
      this.drawWorld(this.updateWorld());
    }
  }
}
