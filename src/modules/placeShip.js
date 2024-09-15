class BoardManager {
   constructor(length = 5, isVertical = true) {
      this.ship = { isVertical: isVertical, length: length };
      this.ships = [null, null, 3, 2, 1, 1];
      this.buttons = document.querySelectorAll('.ship-direction');
      this.shipsEl = Array.from(document.querySelectorAll('.ship-btn'));
      this.boardArray = null;
      this.boardEl = null;
      this.squares = null;
      this.init();
   }

   init() {
      this.boardEl = document.querySelector('.game-board');
      if (!this.boardEl) throw new Error("Couldn't find game-board el");
      this.squares = this.boardEl.querySelectorAll('.square');
      this.#mapBoard();
      this.#addListener();
      this.#addButtonsListeners();
      this.#addShipsListeners();
   }

   #mapBoard() {
      this.boardArray = [];

      for (let i = 0; i < 10; i++) {
         let row = [];
         for (let j = 0; j < 10; j++) {
            let index = i * 10 + j;
            row.push(this.squares[index]);
         }
         this.boardArray.push(row);
      }
   }

   #addListener() {
      this.boardEl.addEventListener('mouseout', e => {
         const square = e.target;
         square.removeEventListener('click', this.handleSquareClick);
      });

      this.boardEl.addEventListener('mouseover', e => {
         if (this.ships[this.ship.length] <= 0) return;
         this.clearBoard();

         const square = e.target;
         if (!square.classList.contains('square')) return;
         square.addEventListener('click', this.handleSquareClick);
         const row = parseInt(square.dataset.x);
         const col = parseInt(square.dataset.y);
         if (isNaN(row) || isNaN(col)) return;

         const markedSquares = this.markSquares(square);
         const canBePlaced = this.checkShipPlacement(markedSquares);

         if (!canBePlaced) {
            this.paintSquares(markedSquares, 'square--blocked');
            return;
         }
         this.paintSquares(markedSquares, 'square--hover');
      });
   }

   clearBoard() {
      this.squares.forEach(square => {
         square.classList.remove('square--hover');
         square.classList.remove('square--blocked');
      });
   }

   listenerRemover() {
      this.boardEl.addEventListener('mouseout', e => {
         const square = e.target;
         square.removeEventListener('click', this.handleSquareClick);
      });
   }

   handleSquareClick = e => {
      const square = e.target;
      if (square.dataset.x === undefined || square.dataset.y === undefined) return;

      const markedSquares = this.markSquares(square);
      const canBePlaced = this.checkShipPlacement(markedSquares);
      if (!canBePlaced) return;
      this.paintSquares(markedSquares, 'square--occupied');
      this.decrementShipCounter();

      if (this.isAllPlaced()) {
         const continueBtn = document.querySelector('.continue-btn');
         continueBtn.classList.remove('btn--inactive');
      }
   };

   mapBoardArray() {
      let board = [];
      this.boardArray.forEach(row => {
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

   checkShipPlacement(markedSquares) {
      if (!markedSquares) return false;
      for (const square of markedSquares) {
         const row = parseInt(square.dataset.x);
         const col = parseInt(square.dataset.y);
         const edgeSquares = [];
         if (row - 1 >= 0) edgeSquares.push(this.boardArray[row - 1][col]);
         if (row + 1 <= 9) edgeSquares.push(this.boardArray[row + 1][col]);
         if (col - 1 >= 0) edgeSquares.push(this.boardArray[row][col - 1]);
         if (col + 1 <= 9) edgeSquares.push(this.boardArray[row][col + 1]);

         for (const edge of edgeSquares) {
            if (!edge || edge.classList.contains('square-mark')) continue;
            if (edge.classList.contains('square--occupied')) {
               return false;
            }
         }
      }
      return true;
   }

   markSquares(square) {
      const markedSquares = [];
      const row = parseInt(square.dataset.x);
      const col = parseInt(square.dataset.y);
      if (isNaN(row) || isNaN(col)) return;

      if (this.ship.isVertical) {
         let i = row;
         if (i + this.ship.length > 10) return;
         while (i < 10 && i < row + this.ship.length) {
            const square = this.boardArray[i][col];
            markedSquares.push(square);
            i++;
         }
      } else {
         let i = col;
         if (i + this.ship.length > 10) return;
         while (i < 10 && i < col + this.ship.length) {
            const square = this.boardArray[row][i];
            markedSquares.push(square);
            i++;
         }
      }

      return markedSquares;
   }

   paintSquares(squares, className) {
      if (!squares) return;
      squares.forEach(square => {
         square.classList.add(className);
      });
   }

   isAllPlaced() {
      return this.ships.reduce((acc, value) => acc || value) ? false : true;
   }

   decrementShipCounter() {
      const length = parseInt(this.ship.length);
      this.ships[length] -= 1;
      if (this.ships[length] === 0) this.switchActiveShip();
      const counterEl = document.querySelector(`.ship-count[data-ship="${length}"]`);
      counterEl.textContent = 'x' + this.ships[length];
   }

   switchActiveShip() {
      if (this.isAllPlaced()) return;

      for (const ship of this.shipsEl) {
         ship.classList.remove('active');
         const index = parseInt(ship.dataset.ship);
         if (this.ships[index] === 0) ship.classList.add('btn--inactive');
      }

      const nextShip = document.querySelector('.ship-btn:not(.btn--inactive)');
      nextShip.classList.add('active');

      this.ship.length = parseInt(nextShip.dataset.ship);
   }

   #addButtonsListeners() {
      this.buttons.forEach(btn => {
         btn.addEventListener('click', () => {
            this.buttons[0].dataset.selected = 'false';
            this.buttons[1].dataset.selected = 'false';
            btn.dataset.selected = 'true';
            this.ship.isVertical = btn.dataset.dir === 'ver';
         });
      });
   }

   #addShipsListeners() {
      this.shipsEl.forEach(shipBtn => {
         shipBtn.addEventListener('click', () => {
            for (const ship of this.shipsEl) {
               ship.classList.remove('active');
            }

            this.ship.length = parseInt(shipBtn.dataset.ship);
            shipBtn.classList.add('active');
         });
      });
   }
}

export default BoardManager;
