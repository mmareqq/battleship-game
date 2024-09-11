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
      this.shipsEl = document.querySelectorAll('.ship-btn');
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
         this.paintSquares(square, 'square--hover');
      });
   }

   clearBoard() {
      this.squares.forEach(square => {
         square.classList.remove('square--hover');
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
      this.paintSquares(square, 'square--occupied');
      this.decrementShipCounter(this.ship.length);
      if (this.isAllPlaced()) {
         // Make OK button clickable to continue game
      }
   };

   paintSquares(square, className) {
      if (!square || !className) throw new Error('PaintSquares missing parameter');
      const row = parseInt(square.dataset.x);
      const col = parseInt(square.dataset.y);
      if (row === undefined || col === undefined) throw new Error("Missing square's col or row data");

      if (this.ship.isVertical) {
         let i = row;
         if (i + this.ship.length > 10) return;
         while (i < 10 && i < row + this.ship.length) {
            const square = this.boardArray[i][col];
            square.classList.add(className);
            i++;
         }
      } else {
         let i = col;
         if (i + this.ship.length > 10) return;
         while (i < 10 && i < col + this.ship.length) {
            const square = this.boardArray[row][i];
            square.classList.add(className);
            i++;
         }
      }
   }

   isAllPlaced() {
      return this.ships.reduce((acc, value) => acc || value) ? true : false;
   }

   decrementShipCounter(length) {
      this.ships[length] -= 1;
      const shipEl = document.querySelector(`.ship-btn[data-ship="${length}"]`);
      this.ships[length] <= 0 ? shipEl.classList.add('btn--inactive') : shipEl.classList.remove('btn--inactive');
      const counterEl = document.querySelector(`.ship-count[data-ship="${length}"]`);
      console.log('counter: ', counterEl);
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
