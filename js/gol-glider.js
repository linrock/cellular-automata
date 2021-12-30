{
  const anim = new AnimatedCanvas('gol-glider', 3, (numCellsX, numCellsY) => {
    const gol = new GOL(numCellsX, numCellsY);

    // manually draw a gosper glider gun
    const pixels = [
      [5, 1], [6, 1], [5, 2], [6, 2],

      [3, 14],
      [3, 13],
      [4, 12],
      [5, 11],
      [6, 11],
      [7, 11],
      [8, 12],
      [9, 13],
      [9, 14],

      [6, 15],
      [4, 16], [8, 16],
      [5, 17], [6, 17], [7, 17],
      [6, 18],
      [3, 21], [4, 21], [5, 21], [3, 22], [4, 22], [5, 22],
      [2, 23], [6, 23],
      [1, 25], [2, 25], [6, 25], [7, 25],
      [3, 35], [4, 35], [3, 36], [4, 36],
    ];
    pixels.forEach(([y, x]) => gol.world[y][x] = 1);
    return () => gol.calculateNewWorld();
  });
  anim.setForegroundColor('#5dfdcb');
  anim.setBackgroundColor('#02020a');
  window.animatedCanvases.push(anim);
}
