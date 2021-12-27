// Elementary cellular automata - one-dimensional
class ECA {
  numCells = 0;
  cells = [];

  ruleNum = -1;  // 0 to 255
  iterMap = {};

  constructor(numCells, ruleNum, initMethod) {
    this.numCells = numCells;
    if (initMethod === 'random') {
      for (let i = 0; i < numCells; i++) {
        this.cells.push(Math.random() > 0.5 ? 1 : 0);
      }
    } else {
      this.cells = new Array(numCells).fill(0);
      if (initMethod === 'one_middle') {
        this.cells[~~(numCells / 2)] = 1;
      }
    }
    this.setRule(ruleNum);
  }

  setRule(ruleNum) {
    this.ruleNum = ruleNum;
    // converts a rule number to a 8-digit binary string
    const RULE_BIN = ruleNum.toString(2).padStart(8, 0);
    const ITER_KEYS = [7, 6, 5, 4, 3, 2, 1, 0];
    ITER_KEYS.forEach((k, i) => this.iterMap[k] = parseInt(RULE_BIN[i]));
  }

  // calculate the values of the next row based on the previous row
  calculateNextGeneration() {
    const nextRow = [];
    for (let i = 0; i < this.numCells; i++) {
      let nextKey = 2 * this.cells[i];
      if (i === 0) {
        nextKey += 4 * this.cells[this.numCells - 1] + this.cells[i + 1];
      } else if (i === this.numCells - 1) {
        nextKey += 4 * this.cells[i - 1] + this.cells[0];
      } else {
        nextKey += 4 * this.cells[i - 1] + this.cells[i + 1];
      }
      nextRow.push(this.iterMap[nextKey]);
    }
    this.cells = nextRow;
    return nextRow;
  }
}
