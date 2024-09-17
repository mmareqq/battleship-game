class GameBoard {
   constructor(board = null) {
      this.board = board;
      this.boardEl = null;
      this.ships = [];
   }

   receiveAttack(x, y) {
      if(typeof x !== 'number') throw new Error('parameter is not a number')
      const index = x * 10 + y;
      for (const ship of this.ships) {
         const indices = ship.squares.map(arr => arr[0] * 10 + arr[1])
         if(indices.contains(index)) {
            ship.hit()
            if(ship.isDead()) {
               this.markDeadShip(ship)
               this.isAllSunk();
            }
         }
   }

   markDeadShip(ship) {
      ship.squares.forEach(coord => {
         const row = coord[0]
         const col = coord[1]
         const square = this.boardEl.querySelector(`.square[data-x="${row}"][data-y="${col}"]`)
         square.classList.add('square--dead')
      });
   }
}

   isAllSunk() {
      return this.ships.reduce((acc, ship) => acc && ship.isDead);
   }
}

export default GameBoard;
// module.exports = GameBoard;
