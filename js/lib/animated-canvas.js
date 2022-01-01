class AnimatedCanvas {
  MAX_FPS = 25;
  CELL_SIZE = 3;

  isAnimating = false;
  lastRenderAt = +new Date();
  updateWorld = () => {};

  canvas;
  ctx;

  canvasWidth;
  canvasHeight;
  cellSize;
  numCellsX;
  numCellsY;

  constructor(canvasId, options = {}) {
    const {
      cellSize,
      init,
      foregroundColor,
      backgroundColor,
      drawWorld,
      drawWorldDiff,
      drawCell,
      maxFps,
    } = options;
    const canvas = document.getElementById(canvasId);
    this.canvas = canvas;
    this.canvasWidth = canvas.width;
    this.canvasHeight = canvas.height;
    this.ctx = canvas.getContext('2d');
    this.cellSize = cellSize || this.CELL_SIZE;
    this.numCellsX = this.canvasWidth / this.cellSize;
    this.numCellsY = this.canvasHeight / this.cellSize;
    if (foregroundColor) {
      this.foregroundColor = foregroundColor;
    }
    if (backgroundColor) {
      this.backgroundColor = backgroundColor;
    }
    if (drawWorld) {
      this.drawWorld = drawWorld.bind(this);
    }
    if (drawCell) {
      this.drawCell = drawCell.bind(this);
    }
    if (drawWorldDiff) {
      this.drawWorldDiff = drawWorldDiff;
    }
    this.maxFps = maxFps || this.MAX_FPS;
    // fade canvases in as they become visible
    canvas.style.opacity = 0.1;
    canvas.addEventListener('play', () => {
      this.isAnimating = true;
      if (!this.canvasInitialized) {
        this.canvasInitialized = true;
        this.canvas.style.opacity = 1;
      }
    });
    canvas.addEventListener('pause', () => {
      this.isAnimating = false;
    });
    canvas.addEventListener('click', () => {
      // click to clear the canvas and start over
      this.isAnimating = false;
      requestAnimationFrame(() => {
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      });
      this.updateWorld = init(this.numCellsX, this.numCellsY);
      this.isAnimating = true;
    });
    // canvas.addEventListener('mousemove', (e) => {
    //   console.log(`mousemove: ${e.offsetX} ${e.offsetY}`);
    // });
    this.updateWorld = init(this.numCellsX, this.numCellsY);
  }

  set maxFps(maxFps) {
    this.minTimePerFrame = 1000 / maxFps;
  }

  set foregroundColor(color) {
    this.ctx.fillStyle = color;
  }

  set backgroundColor(color) {
    this.canvas.style.background = color;
  }

  fillCell(x, y) {
    this.ctx.fillRect(
      x * this.cellSize, y * this.cellSize,
      this.cellSize, this.cellSize,
    );
  }

  drawCell(x, y, value) {
    if (value) {
      this.fillCell(x, y);
    }
  }

  drawWorld(world, worldDiff) {
    if (this.drawWorldDiff) {
      if (!worldDiff.length) {
        return;
      }
      requestAnimationFrame(() => {
        worldDiff.forEach(([x, y, value]) => {
          if (value) {
            this.drawCell(x, y, value);
          } else {
            this.ctx.clearRect(
              x * this.cellSize, y * this.cellSize,
              this.cellSize, this.cellSize,
            );
          }
        });
      });
      return;
    }
    // default to re-drawing the entire world
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
    if (!this.isAnimating) {
      return;
    }
    const now = +new Date();
    if (now - this.lastRenderAt < this.minTimePerFrame) {
      return;
    }
    this.lastRenderAt = now;
    const [newWorld, worldDiff] = this.updateWorld();
    this.drawWorld(newWorld, worldDiff);
  }
}
