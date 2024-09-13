class ShipToPlace {
   constructor(length, isVertical) {
      this.x = null;
      this.y = null;
      this.isVertical = isVertical;
      this.length = length;
   }
}

class BoardManager {
   constructor(len = 5, isVertical = true) {
      this.ship = new ShipToPlace(len, isVertical);
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
         square.addEventListener('click', this.handleSquareClick);
         const row = parseInt(square.dataset.x);
         const col = parseInt(square.dataset.y);
         if (row === undefined || col === undefined) return;
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

   switchActiveShip() {
      const [activeShip] = this.shipsEl.filter(ship => ship.classList.contains('active'));
      activeShip.classList.add('btn--inactive');
      activeShip.classList.remove('active');
      if (this.isAllPlaced()) return;
      let index = this.ships.findIndex(val => val > 0);
      console.log(index)
      let nextShip = this.shipsEl[index];

      console.log(nextShip)
      nextShip.classList.add('active');
      this.ship.length = parseInt(nextShip.dataset.ship);
   }

   handleSquareClick = e => {
      const square = e.target;
      if (square.dataset.x === undefined || square.dataset.y === undefined) return;
      const markedSquares = this.markSquares(square, 'square--occupied');
      const canBePlaced = this.checkShipPlacement(markedSquares);
      if (!canBePlaced) return;
      this.paintSquares(markedSquares, 'square--occupied');
      this.decrementShipCounter(this.ship.length);

      if (this.isAllPlaced()) {
         const continueBtn = document.querySelector('.continue-btn');
         continueBtn.classList.remove('btn--inactive');
      }
   };

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
      if (row === undefined || col === undefined) throw new Error("Missing square's col or row data");

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

   decrementShipCounter(length) {
      this.ships[length] -= 1;
      const shipEl = document.querySelector(`.ship-btn[data-ship="${length}"]`);
      if (this.ships[length] <= 0) this.switchActiveShip();
      const counterEl = document.querySelector(`.ship-count[data-ship="${length}"]`);
      counterEl.textContent = 'x' + this.ships[length];
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
            this.ship.length = parseInt(shipBtn.dataset.ship);
            for (const ship of this.shipsEl) {
               ship.classList.remove('active');
            }
            shipBtn.classList.add('active');
         });
      });
   }
}

export default BoardManager;
