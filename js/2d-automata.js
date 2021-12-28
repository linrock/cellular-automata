(() => {
  const anim = new AnimatedCanvas('game-of-life', 3, (numCellsX, numCellsY) => {
    const gol = new GOL(numCellsX, numCellsY, () => {
      return Math.random() > 0.8 ? 1 : 0;
    });
    return () => {
      gol.calculateNewWorld();
      return gol.world;
    };
  });

  anim.setBackgroundColor('#1a1423');
  anim.setForegroundColor('#39FF14');
  anim.updateForever();
})();
