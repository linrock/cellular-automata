{
  function createEcaAnimCanvas(canvasId, ruleNum, initMethod, options) {
    return new AnimatedCanvas(canvasId, {
      cellSize: 3,
      init: (numX, numY) => {
        // initialize an elementary cellular automaton
        const eca = new ECA(numX, ruleNum, initMethod);

        // initialize an empty world
        const world = [];
        for (let i = 0; i < numY; i++) {
          world.push(new Array(numX).fill(0));
        }

        // the first ECA generation is the bottom row of the world
        world.push(eca.cells);
        world.shift();

        // add new generations of the ECA to the bottom
        return () => {
          eca.calculateNextGeneration();
          world.push(eca.cells);
          world.shift();
          return world;
        };
      },
      ...options,
    });
  }

  window.animatedCanvases.push(createEcaAnimCanvas('1d-world', 30, 'one_middle', {
    foregroundColor: '#5c7aff',
    backgroundColor: '#111',
  }));

  window.animatedCanvases.push(createEcaAnimCanvas('rule-90', 90, 'one_middle', {
    foregroundColor: 'yellow',
  }));

  window.animatedCanvases.push(createEcaAnimCanvas('1d-world-2', 106, 'random', {
    foregroundColor: 'rgb(68,182,239)',  // light blue
    backgroundColor: '#1d0b3b',
  }));
}
