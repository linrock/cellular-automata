(() => {
  // cyclic automata with random initial state
  const anim = new AnimatedCanvas('c-cyclic', 3, (numX, numY) => {
    const cyc = new Cyclic(numX, numY, () => {
      const rand = Math.random();
      return rand > 0.667 ? 2 : (rand > 0.333 ? 1 : 0);
    });
    return () => cyc.calculateNewWorld();
  });
  anim.drawWorld = function(world) {
    requestAnimationFrame(() => {
      this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      for (let x = 0; x < this.numCellsX; x++) {
        for (let y = 0; y < this.numCellsY; y++) {
          if (world[y][x]) {
            if (world[y][x] === 2) {
              this.ctx.fillStyle = 'orange';
            } else if (world[y][x] === 1) {
              this.ctx.fillStyle = 'yellow';
            }
            this.ctx.fillRect(
              x * this.gridSize,
              y * this.gridSize,
              this.gridSize,
              this.gridSize);
            }
        }
      }
    });
  };
  anim.setBackgroundColor('#1a1423');
  anim.setForegroundColor('#39FF14');
  anim.updateForever();
})();
