{
  const anim = new AnimatedCanvas('gol-simkin-glider', 3, (numX, numY) => {
    const gol = new GOL(numX, numY);

    // manually draw a simkin glider gun
    gol.drawPixels([
      '11     11           1',
      '11     11         111',
      '                  1 1',
      '    11            1  ',
      '    11',
      '',
      '',
      '',
      '                           11',
      '                           11',
      '',
      '                        11     11',
      '                        11     11',
    ], 8, 12);

    return () => gol.calculateNewWorld();
  });
  // anim.setBackgroundColor('#1a1423');
  // anim.setForegroundColor('#39FF14');
  // anim.setForegroundColor('#cef9f2'); // very light blue
  anim.setBackgroundColor('rgb(15, 8, 26)');
  anim.setForegroundColor('#5c7aff'); // periwinkle
  window.animatedCanvases.push(anim);
}
