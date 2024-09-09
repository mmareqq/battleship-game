const Ship = require('./ship.js');

class GameBoard {
   constructor(ships = []) {
      this.board = this.initalizeBoard();
      this.ships = ships;
      this.hits = [];
   }

   initalizeBoard() {
      let board = [];
      for (let i = 0; i < 10; i++) {
         let row = [];
         for (let j = 0; j < 10; j++) {
            row.push('empty-not');
         }
         board.push(row);
      }
      console.log(board)
      return board;
   }

   receiveAttack(x, y) {
      this.addHit(x, y);
      for (const ship of this.ships) {
         if (ship.isVertical) {
            if (x !== ship.x) continue;
            if (y >= ship.y && y < ship.y + ship.length) {
               ship.hit();
               return 1;
            }
         } else {
            if (y !== ship.y) continue;
            if (x >= ship.x && x < ship.x + ship.length) {
               console.log('GFDGGHGFGG');
               console.log(ship);
               ship.hit();
               return 1;
            }
         }
      }
      return 0;
   }

   addHit(x, y) {
      this.hits.push([x, y]);
   }

   isAllSunk() {
      return this.ships.reduce((acc, ship) => acc && ship.isDead);
   }
}

const game = new GameBoard([new Ship(2, 3, 5, true), new Ship(3, 3, 3, true)]);
game.isAllSunk();
// export default GameBoard
module.exports = GameBoard;
