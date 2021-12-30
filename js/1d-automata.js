{
  function createEcaAnimatedCanvas(canvasId, ruleNum, initMethod) {
    return new AnimatedCanvas(canvasId, 3, (numX, numY) => {
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
    });
  }

  const anim1 = createEcaAnimatedCanvas('1d-world', 30, 'one_middle');
  anim1.setForegroundColor('#5c7aff');
  // anim1.setBackgroundColor('#1b065e');
  anim1.setBackgroundColor('#111');
  window.animatedCanvases.push(anim1);

  const anim2 = createEcaAnimatedCanvas('rule-90', 90, 'one_middle');
  anim2.setForegroundColor('yellow');
  window.animatedCanvases.push(anim2);

  const anim3 = createEcaAnimatedCanvas('1d-world-2', 106, 'random');
  anim3.setForegroundColor('rgb(68,182,239)');  // light blue
  anim3.setBackgroundColor('#1d0b3b');
  window.animatedCanvases.push(anim3);
}
