export class BoardUI {
   constructor(boardEl = null) {
      this.boardEl = boardEl;
      this.squares = null;
      this.squaresArray = null;
      this.init();
   }

   set boardEl(newBoard) {
      if (!newBoard) return;
      this._boardEl = newBoard;
      this.init();
   }

   get boardEl() {
      return this._boardEl;
   }

   init() {
      if (!this.boardEl) return;
      this.squares = this.boardEl.querySelectorAll('.square');
      this.#mapSquaresBoard();
      this.#addListeners();
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

   markAttack(x, y) {
      // Mark squares to correct color
   }

   #addListeners() {
      this.squares.forEach(square => {
         square.addEventListener('click', () => {
            const x = parseInt(square.dataset.x);
            const y = parseInt(square.dataset.y);
            this.markAttack(square);
         });
      });
   }
}

export class Board {
   constructor(ships = []) {
      this.ships = ships;
      this.mappedBoard = null;
   }

   receiveAttack(square, boardEl) {
      if (!square === undefined) throw new Error('Square was not found in mapped board');
      if (!this.mappedBoard) this.mapBoardArray();

      const row = parseInt(square.dataset.x);
      const col = parseInt(square.dataset.y);

      if (this.mappedBoard[row][col].status === 'o') {
         square.classList.add('square--hit');

         const ship = this.ships[this.mappedBoard[row][col].id];
         ship.hit();

         if (ship.isSunk()) {
            ship.markDead(boardEl);

            if (this.isAllSunk()) {
               alert('GAME OVER');
               // FURTHER ENDING OF THE GAME
            }
         }
      } else {
         square.classList.add('square--miss');
      }
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
