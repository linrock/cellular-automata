(() => {
  // https://mathworld.wolfram.com/ElementaryCellularAutomaton.html
  const RULE_NUM = 30;   // chaotic
  // const RULE_NUM = 70;
  // const RULE_NUM = 73;
  // const RULE_NUM = 110;
  // const RULE_NUM = 184;

  {
    const anim = new AnimatedCanvas('1d-world', 3, (numCellsX, numCellsY) => {
      // initialize an elementary cellular automaton
      const eca = new ECA(numCellsX, RULE_NUM, 'one_middle');

      // initialize an empty world
      const world = [];
      for (let i = 0; i < numCellsY; i++) {
        world.push(new Array(numCellsX).fill(0));
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
    });
    anim.setForegroundColor('#cef9f2');  // light blue
    anim.setBackgroundColor('#1b065e');
    window.animatedCanvases.push(anim);
  }

  {
    const anim = new AnimatedCanvas('1d-world-2', 3, (numCellsX, numCellsY) => {
      const eca = new ECA(numCellsX, 106, 'random');

      // initialize an empty world
      const world = [];
      for (let i = 0; i < numCellsY; i++) {
        world.push(new Array(numCellsX).fill(0));
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
    });
    anim.setForegroundColor('#cef9f2');  // light blue
    anim.setBackgroundColor('#1b065e');
    window.animatedCanvases.push(anim);
  }
})();
