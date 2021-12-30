{
  // standard Game of Life simulation with random initial values
  const anim = new AnimatedCanvas('game-of-life', 3, (numX, numY) => {
    const gol = new GOL(numX, numY, () => Math.random() > 0.8 ? 1 : 0);
    gol.B = [3];
    gol.S = [2, 3];
    return () => gol.calculateNewWorld();
  });
  anim.setForegroundColor('#39FF14');
  anim.setBackgroundColor('#1a1423');
  // anim.setForegroundColor('#9dfff9');
  // anim.setBackgroundColor('#003f59');
  window.animatedCanvases.push(anim);
}
{
  // Day and Night simulation - variant of Game of Life
  const anim = new AnimatedCanvas('c-day-and-night', 3, (numX, numY) => {
    const gol = new GOL(numX, numY, () => Math.random() > 0.5 ? 1 : 0);
    gol.B = [3, 6, 7, 8];
    gol.S = [3, 4, 6, 7, 8];
    return () => gol.calculateNewWorld();
  });
  // anim.setForegroundColor('#ffd449');
  anim.setForegroundColor('#fff44f');
  // anim.setForegroundColor('#29b6f6');
  // anim.setBackgroundColor('#000437');
  // anim.setBackgroundColor('#1a0c3e');
  anim.setBackgroundColor('#110829');
  window.animatedCanvases.push(anim);
}
{
  // Mazetric simulation - variant of Game of Life
  const anim = new AnimatedCanvas('c-mazectric', 3, (numX, numY) => {
    const gol = new GOL(numX, numY, (x, y) => {
      // initialize only the middle half of the canvas with random numbers
      if (x < numX / 3 || x > 2 * numX / 3) {
        return 0;
      }
      if (y < numY / 3 || y > 2 * numY / 3) {
        return 0;
      }
      return Math.random() > 0.5 ? 1 : 0;
    });
    gol.B = [3];
    gol.S = [1, 2, 3, 4, 5];
    return () => gol.calculateNewWorld();
  });
  // anim.setForegroundColor('#7c6354');
  // anim.setBackgroundColor('#dddbf1');
  // anim.setForegroundColor('#b2ff98');
  // anim.setBackgroundColor('#372772');
  anim.setForegroundColor('#eee');
  anim.setBackgroundColor('#111');
  window.animatedCanvases.push(anim);
}
{
  // Anneal - variation of majority voting
  const anim = new AnimatedCanvas('c-anneal', 3, (numX, numY) => {
    let gol;
    // hack to help the animation converge towards one blob more frequently
    if (Math.random() > 0.5) {
      gol = new GOL(numX, numY, () => Math.random() > 0.45 ? 1 : 0);
    } else {
      gol = new GOL(numX, numY, () => Math.random() > 0.55 ? 1 : 0);
    }
    gol.B = [4, 6, 7, 8];
    gol.S = [3, 5, 6, 7, 8];
    return () => gol.calculateNewWorld();
  });
  anim.setForegroundColor('rgb(239, 120, 47)');
  anim.setBackgroundColor('rgb(66, 50, 47)');
  window.animatedCanvases.push(anim);
}
{
  // cyclic tri-state cellular automata with random initial state
  // AKA rock paper scissors
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
  window.animatedCanvases.push(anim);
}
{
  // const bgColor = '#2B2414';
  // const darkColor = '#456B6E';
  // const lightColor = '#6E8984';

  const bgColor = 'rgb(82, 17, 7)';
  const darkColor = '#d75302';
  const lightColor = '#fac000';

  // cyclic tri-state cellular automata with random initial state
  const anim = new AnimatedCanvas('c-first-canvas', 3, (numX, numY) => {
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
              this.ctx.fillStyle = darkColor;
            } else if (world[y][x] === 1) {
              this.ctx.fillStyle = lightColor;
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
  anim.setBackgroundColor(bgColor);
  window.animatedCanvases.push(anim);
}
