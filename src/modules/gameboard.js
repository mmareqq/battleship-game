export class BoardUI {
   constructor(boardEl = null) {
      this.boardEl = boardEl;
      this.squares = null;
      this.squaresArray = null;
      this.init();
   }

   init() {
      if (!this.boardEl) return;
      this.squares = this.boardEl.querySelectorAll('.square');
      this.#mapSquaresBoard();
   }

   #mapSquaresBoard() {
      if (!this.squares) return;
      this.squaresArray = [];

      for (let i = 0; i < 10; i++) {
         let row = [];
         for (let j = 0; j < 10; j++) {
            let index = i * 10 + j;
            row.push(this.squares[index]);
         }
         this.squaresArray.push(row);
      }
   }

   clearBoard() {
      this.squares.forEach(square => {
         square.classList.remove('square--hover');
         square.classList.remove('square--blocked');
      });
   }
}

export class Board {
   constructor(ships = []) {
      this.ships = ships;
      this.mappedBoard = null;
   }

   receiveAttack(square, boardEl) {
      if (!square === undefined)
         throw new Error('Square was not found in mapped board');
      if (!this.mappedBoard) this.mapBoardArray();

      const row = parseInt(square.dataset.x);
      const col = parseInt(square.dataset.y);

      if (this.mappedBoard[row][col].status === 'o') {
         square.classList.add('square--hit');

         const ship = this.ships[this.mappedBoard[row][col].id];
         ship.hit();

         if (ship.isSunk()) {
            this.markDead(ship, boardEl);
            if (this.isAllSunk()) return true;
         }
      } else {
         square.classList.add('square--miss');
      }
   }

   markDead(ship, boardEl) {
      ship.squares.forEach(coord => {
         const [row, col] = coord;
         const square = boardEl.querySelector(
            `.square[data-x="${row}"][data-y="${col}"]`
         );
         square.classList.add('square--dead');
      });
   }

   mapBoardArray() {
      if (!this.ships) return null;
      let board = [];
      for (let i = 0; i < 10; i++) {
         let row = [];
         for (let j = 0; j < 10; j++) {
            row.push('');
         }
         board.push(row);
      }

      this.ships.forEach((ship, index) => {
         ship.squares.forEach(square => {
            const row = square[0];
            const col = square[1];

            board[row][col] = { id: index, status: 'o' };
         });
      });

      this.mappedBoard = board;
   }

   isAllSunk() {
      return this.ships.reduce((acc, ship) => acc && ship.isSunk(), true);
   }
}
