import Ship from './ship.js'
let boards = [
   [{"squares":[[5,2],[6,2],[7,2],[8,2],[9,2]],"length":5},{"squares":[[1,5],[2,5],[3,5]],"length":3},{"squares":[[2,1],[2,2],[2,3]],"length":3},{"squares":[[3,8],[3,9]],"length":2},{"squares":[[7,5],[7,6]],"length":2},{"squares":[[6,8],[7,8],[8,8],[9,8]],"length":4},{"squares":[[0,8],[0,9]],"length":2}],
   [{"squares":[[1,0],[2,0],[3,0],[4,0],[5,0]],"length":5},{"squares":[[0,3],[0,4],[0,5],[0,6]],"length":4},{"squares":[[5,4],[6,4],[7,4]],"length":3},{"squares":[[2,8],[3,8],[4,8]],"length":3},{"squares":[[2,4],[2,5]],"length":2},{"squares":[[8,8],[8,9]],"length":2},{"squares":[[8,2],[9,2]],"length":2}],
   [{"squares":[[2,3],[3,3],[4,3],[5,3],[6,3]],"length":5},{"squares":[[0,0],[0,1],[0,2],[0,3]],"length":4},{"squares":[[4,7],[5,7],[6,7]],"length":3},{"squares":[[7,1],[8,1],[9,1]],"length":3},{"squares":[[0,7],[0,8]],"length":2},{"squares":[[8,4],[8,5]],"length":2},{"squares":[[3,0],[4,0]],"length":2}]
]

export function getRandomBoard() {
   const num = Math.floor(Math.random() * boards.length);
   const board = boards[num]
   return board.map(ship => new Ship(ship.squares, ship.length));
}
