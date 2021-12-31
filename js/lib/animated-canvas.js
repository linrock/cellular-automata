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

  constructor(canvasId, options = {}) {
    const {
      cellSize,
      init,
      foregroundColor,
      backgroundColor,
      drawWorld,
      drawCell,
    } = options;
    const canvas = document.getElementById(canvasId);
    this.canvas = canvas;
    this.canvasWidth = canvas.width;
    this.canvasHeight = canvas.height;
    this.ctx = canvas.getContext('2d');
    if (cellSize) {
      this.cellSize = cellSize;
    } else {
      throw new Error('cellSize is required!');
    }
    this.numCellsX = this.canvasWidth / cellSize;
    this.numCellsY = this.canvasHeight / cellSize;
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
    canvas.addEventListener('play', () => this.isAnimating = true);
    canvas.addEventListener('pause', () => this.isAnimating = false);
    canvas.addEventListener('click', () => {
      // click to clear the canvas and start over
      this.isAnimating = false;
      requestAnimationFrame(() => {
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      });
      this.updateWorld = init(this.numCellsX, this.numCellsY);
      this.isAnimating = true;
    });
    this.updateWorld = init(this.numCellsX, this.numCellsY);
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
      this.cellSize, this.cellSize
    );
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
