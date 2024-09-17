class GameBoard {
   constructor(board = null) {
      this.board = board;
      this.boardEl = null;
      this.ships = [];
   }

   receiveAttack(x, y) {
      if (typeof x !== 'number') throw new Error('parameter is not a number');
      const index = x * 10 + y;
      for (const ship of this.ships) {
         const indices = ship.squares.map(arr => arr[0] * 10 + arr[1]);
         if (indices.contains(index)) {
            ship.hit();
            if (ship.isDead()) {
               ship.markDeadShip();
               this.isAllSunk();
            }
         }
      }
   }

   isAllSunk() {
      return this.ships.reduce((acc, ship) => acc && ship.isDead);
   }

   addListeners() {
      const squares = this.GameBoard.boardEl.querySelector('.square');
      squares.forEach(square => {
         square.addEventListener('click', )
         
      });
   }
}

export default GameBoard;
// module.exports = GameBoard;
