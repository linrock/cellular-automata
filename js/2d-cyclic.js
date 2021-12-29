(() => {
  // cyclic automata with random initial state
  const anim = new AnimatedCanvas('c-cyclic', 3, (numX, numY) => {
    const cyc = new Cyclic(numX, numY, () => {
      const rand = Math.random();
      return rand > 0.667 ? 2 : (rand > 0.333 ? 1 : 0);
    });
    return () => cyc.calculateNewWorld();
  });
  anim.drawWorld = function(worldDiff) {
    requestAnimationFrame(() => {
      worldDiff.forEach(([state, coords]) => {
        if (state) {
          if (state === 1) {
            this.ctx.fillStyle = 'yellow';
          } else if (state === 2) {
            this.ctx.fillStyle = 'orange';
          }
          coords.forEach(([x, y]) => {
            this.ctx.fillRect(
              x * this.gridSize,
              y * this.gridSize,
              this.gridSize,
              this.gridSize
            );
          });
        } else {
          coords.forEach(([x, y]) => {
            this.ctx.clearRect(
              x * this.gridSize,
              y * this.gridSize,
              this.gridSize,
              this.gridSize
            );
          });
        }
      });
    });
  };
  anim.setBackgroundColor('#1a1423');
  anim.setForegroundColor('#39FF14');
  anim.updateForever();
})();
