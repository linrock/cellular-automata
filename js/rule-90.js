(() => {
  const RULE_NUM = 90;

  const anim = new AnimatedCanvas('rule-90', 3, (numCellsX, numCellsY) => {
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

  anim.updateForever();
})();
