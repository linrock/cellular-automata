{
  const anim = new AnimatedCanvas('gol-glider', 3, (numCellsX, numCellsY) => {
    const gol = new GOL(numCellsX, numCellsY);

    // manually draw a gosper glider gun
    gol.drawPixels([
      '                        1',
      '                      1 1',
      '            11      11            11',
      '           1   1    11            11',
      '11        1     1   11',
      '11        1   1 11    1 1',
      '          1     1       1',
      '           1   1',
      '            11',
      '',
    ], 2, 2);

    return () => gol.calculateNewWorld();
  });
  anim.setForegroundColor('#5dfdcb');
  anim.setBackgroundColor('#02020a');
  window.animatedCanvases.push(anim);
}
