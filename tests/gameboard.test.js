const GameBoard = require('../src/modules/gameboard.js');
const Ship = require('../src/modules/ship.js')

test('Tests if receiveAttack is incrementing hits to the ship', () => {
   const board = new GameBoard([new Ship(2, 2, 2, true), new Ship(3, 2, 5, false)]);
   board.receiveAttack(2, 2)
   expect(board.hits).toEqual([[2, 2]])
   expect(board.ships[0].hits).toBe(1)
   expect(board.ships[1].hits).toBe(0)
});

test('Tests if receiveAttack adds hit coords to array', () => {
   const board = new GameBoard([])
   board.receiveAttack(7, 2)
   expect(board.hits).toEqual([[7, 2]])
})