(() => {
  // initialize an elementary cellular automaton
  const RULE_NUM = 90;

  const animatedCanvas = new AnimatedCanvas('rule-90', 3, () => {
    eca.calculateNextGeneration();
    world.push(eca.cells);
    world.shift();
  });

  const eca = new ECA(animatedCanvas.numCellsX, RULE_NUM, 'one_middle');

  // initialize an empty world
  let world = [];
  for (let i = 0; i < animatedCanvas.numCellsY; i++) {
    world.push(new Array(animatedCanvas.numCellsX).fill(0));
  }

  world.push(eca.cells);
  world.shift();
  animatedCanvas.updateForever(world);
})();
