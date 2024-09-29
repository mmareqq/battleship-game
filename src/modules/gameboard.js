export class BoardInterface {
   constructor(ships = [], boardEl = null) {
      this._boardEl = boardEl;
      this.squares = null;
      this.squaresArray = null;
      this.board = new Board(ships);
   }

   set boardEl(newBoard) {
      if(!newBoard) return;
      this._boardEl = newBoard;
      this.init();
   }

   get boardEl() { return this._boardEl }

   init() {
      this.squares = this.boardEl.querySelectorAll('.square');
      this.#mapSquaresBoard();
      this.addListeners();
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

   addListeners() {
      this.squares.forEach(square => {
         square.addEventListener('click', () => {
            const x = parseInt(square.dataset.x);
            const y = parseInt(square.dataset.y);
            this.markAttack(x, y);
            this.board.receiveAttack(x, y);
         });
      });
   }
}

export class Board {
   constructor(ships) {
      this.ships = ships;
      this.mappedBoard = this.mapBoardArray();
   }

   receiveAttack(x, y) {
      const square = this.mappedBoard[x][y];
      if (!square === '') return;
      if (!square === undefined) throw new Error('Square was not found in mapped board');

      const ship = this.ships[square.id];
      ship.hit();

      if (this.isAllSunk()) {
         alert('GAME OVER');
         // FURTHER ENDING OF THE GAME
      }
   }

   mapBoardArray() {
      if (this.ships.length === 0) return null;
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
            board[square[0]][square[1]] = { id: index, status: 'o' };
         });
      });
      return board;
   }

   isAllSunk() {
      return this.ships.reduce((acc, ship) => acc && ship.isDead, true);
   }
}
