(() => {
  // standard Game of Life simulation with random initial values
  const anim = new AnimatedCanvas('game-of-life', 3, (numX, numY) => {
    const gol = new GOL(numX, numY, () => Math.random() > 0.8 ? 1 : 0);
    return () => {
      gol.calculateNewWorld();
      return gol.world;
    };
  });
  anim.setBackgroundColor('#1a1423');
  anim.setForegroundColor('#39FF14');
  anim.updateForever();
})();
