{
  // cyclic tri-state animation at the top of the page
  {
    let backgroundColor = 'rgb(82, 17, 7)';
    let darkColor = '#d75302';
    let lightColor = '#fac000';
    if (Math.random() < 0.5) {
      backgroundColor = 'rgb(15, 57, 126)';
      darkColor = 'rgb(34, 120, 208)';
      lightColor = 'rgb(83, 184, 252)';

      lightColor = '#7BF6FE';
      darkColor = '#484EBC';
      backgroundColor = '#132042';

      lightColor = '#2DC6CC';
      darkColor = '#2D9FCC';
      backgroundColor = '#2D7FCC';
    }

    const randThresh1 = 3/4;
    const randThresh2 = 1/3;

    CA.animate('c-first-canvas', {
      init: (numX, numY) => {
        const cyc = new Cyclic(numX, numY, () => {
          const rand = Math.random();
          return rand > randThresh1 ? 2 : (rand > randThresh2 ? 1 : 0);
        });
        // update constants to make the animation more chaotic
        cyc.winThreshold = 1;
        cyc.winRand = 4;
        return () => cyc.calculateNewWorld();
      },
      drawWorld: function(world, worldDiff) {
        requestAnimationFrame(() => {
          let fillStyle;
          worldDiff.forEach(([x, y, value]) => {
            if (value) {
              if (value === 2) {
                if (fillStyle !== darkColor) {
                  this.ctx.fillStyle = darkColor;
                  fillStyle = darkColor;
                }
              } else if (value === 1) {
                if (fillStyle !== lightColor) {
                  this.ctx.fillStyle = lightColor;
                  fillStyle = lightColor;
                }
              }
              this.drawCell(x, y, value);
            } else {
              this.ctx.clearRect(
                x * this.cellSize, y * this.cellSize,
                this.cellSize, this.cellSize,
              );
            }
          });
        });
      },
      backgroundColor,
    });
  }

  // cyclic tri-state cellular automata with random initial state
  // AKA rock paper scissors
  CA.animate('c-cyclic', {
    init: (numX, numY) => {
      const cyc = new Cyclic(numX, numY, () => ~~(Math.random() * 3));
      return () => cyc.calculateNewWorld();
    },
    drawWorld: function(world, worldDiff) {
      requestAnimationFrame(() => {
        worldDiff.forEach(([x, y, value]) => {
          if (value) {
            if (value === 2) {
              this.ctx.fillStyle = 'orange';
            } else if (value === 1) {
              this.ctx.fillStyle = 'yellow';
            }
            this.drawCell(x, y, value);
          } else {
            this.ctx.clearRect(
              x * this.cellSize, y * this.cellSize,
              this.cellSize, this.cellSize,
            );
          }
        });
      });
    },
    backgroundColor: '#1a1423',
  });
}
