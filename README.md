# An overview of cellular automata

A cellular automaton is a grid of cells where each cell changes over
time based on a set of rules and the states of its neighbors. Simple rules
can lead to complex patterns and behaviors.

This is a work-in-progress. See the webpage for animations and more info:
https://robotmoon.com/cellular-automata/

Suggestions and feedback are welcome!


## Source code

The source code for all animations on the page live in the [./js](https://github.com/linrock/cellular-automata/tree/master/js) directory.

* One-dimensional cellular automata
  * [eca.js](https://github.com/linrock/cellular-automata/blob/master/js/lib/eca.js) implements ECA behavior and rule numbers
  * [1d-automata.js](https://github.com/linrock/cellular-automata/blob/master/js/1d-automata.js) implements the animations on the page
* Two-dimensional cellular automata
  * [life-like.js](https://github.com/linrock/cellular-automata/blob/master/js/lib/life-like.js) implements the Game of Life and Life-like automata
  * [cyclic.js](https://github.com/linrock/cellular-automata/blob/master/js/lib/cyclic.js) implements cyclic automata such as Rock, Paper, Scissors


## License

MIT
