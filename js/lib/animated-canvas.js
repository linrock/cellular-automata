class AnimatedCanvas {
  UPDATE_INTERVAL_MS = 50;
  isAnimating = false;

  canvas;
  ctx;

  canvasWidth;
  canvasHeight;
  gridSize;
  numCellsX;
  numCellsY;

  constructor(canvasId, gridSize, updateFunc) {
    const canvas = document.getElementById(canvasId);
    canvas.addEventListener('play', () => this.isAnimating = true);
    canvas.addEventListener('pause', () => this.isAnimating = false);
    this.ctx = canvas.getContext('2d');
    this.ctx.fillStyle = '#39FF14';
    this.canvasWidth = canvas.width;
    this.canvasHeight = canvas.height;
    this.gridSize = gridSize;
    this.numCellsX = this.canvasWidth / gridSize;
    this.numCellsY = this.canvasHeight / gridSize;
    this.updateFunc = updateFunc;
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

  updateForever(world) {
    if (this.isAnimating) {
      this.updateFunc();
      this.drawWorld(world);
    }
    setTimeout(() => this.updateForever(world), this.UPDATE_INTERVAL_MS);
  }
}
