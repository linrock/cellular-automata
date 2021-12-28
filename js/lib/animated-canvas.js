class AnimatedCanvas {
  UPDATE_INTERVAL_MS = 50;
  isAnimating = false;
  updateWorld = () => {};

  canvas;
  ctx;

  canvasWidth;
  canvasHeight;
  gridSize;
  numCellsX;
  numCellsY;

  constructor(canvasId, gridSize, initAnimContext) {
    const canvas = document.getElementById(canvasId);
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.canvasWidth = canvas.width;
    this.canvasHeight = canvas.height;
    this.gridSize = gridSize;
    this.numCellsX = this.canvasWidth / gridSize;
    this.numCellsY = this.canvasHeight / gridSize;
    canvas.addEventListener('play', () => this.isAnimating = true);
    canvas.addEventListener('pause', () => this.isAnimating = false);
    canvas.addEventListener('click', () => {
      // click to clear the canvas and start over
      this.isAnimating = false;
      requestAnimationFrame(() => {
        this.ctx.clearRect(0, 0, C_WIDTH, C_HEIGHT);
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

  drawWorld(world) {
    requestAnimationFrame(() => {
      this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      for (let x = 0; x < this.numCellsX; x++) {
        for (let y = 0; y < this.numCellsY; y++) {
          if (world[y][x]) {
            this.ctx.fillRect(
              x * this.gridSize,
              y * this.gridSize,
              this.gridSize,
              this.gridSize);
          }
        }
      }
    });
  }

  updateForever() {
    if (this.isAnimating) {
      this.drawWorld(this.updateWorld());
    }
    setTimeout(() => this.updateForever(), this.UPDATE_INTERVAL_MS);
  }
}
