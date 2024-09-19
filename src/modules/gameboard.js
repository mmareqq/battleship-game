export default class GameBoard {
   constructor(boardEl = null, boardArray = null, ships = []) {
      this.boardEl = boardEl;
      this.boardArray = boardArray;
      this.squares = null;
      this.squaresArray = null;
      this.ships = ships;
      this.init();
   }


   init() {
      if(!this.boardEl) return;
      this.squares = this.boardEl.querySelectorAll('.square')
      console.log(this.squares)
      this.#mapSquaresBoard();
      console.log(this.boardArray)
      this.addListeners();
   }

   #mapSquaresBoard() {
      if(!this.squares) return;
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

   mapBoardArray() {
      let board = [];
      this.gameBoard.boardArray.forEach(row => {
         let boardRow = [];
         row.forEach(square => {
            if (square.classList.contains('square--occupied')) {
               boardRow.push('o');
            } else boardRow.push('');
         });
         board.push(boardRow);
      });
      return board;
   }

   receiveAttack(x, y) {
      if (typeof x !== 'number') throw new Error('parameter is not a number');
      const index = x * 10 + y;
      for (const ship of this.ships) {
         const indices = ship.squares.map(arr => arr[0] * 10 + arr[1]);
         if (indices.contains(index)) {
            ship.hit();
            if (ship.isDead()) {
               // To Be Continued
               if(this.isAllSunk()) alert('GAME OVER')
            }
         }
      }
   }

   clearBoard() {
      this.squares.forEach(square => {
         square.classList.remove('square--hover');
         square.classList.remove('square--blocked');
      });
   }

   isAllSunk() {
      return this.ships.reduce((acc, ship) => acc && ship.isDead);
   }

   addListeners() {
      this.squares.forEach(square => {
         // To Be Continued
         // square.addEventListener('click', )
         
      });
   }
}

