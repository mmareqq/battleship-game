import { Board, BoardUI } from './gameboard';
import Ship from './ship';

export default class PlaceShipManager {
   constructor() {
      this.ship = { length: 5, isVertical: true };
      this.shipLengths = [null, null, 0, 0, 0, 1];
      this.board = new Board()
      // Value represents quantity of ships, index represents length of the ship
   }

   async init() {
      this.shipDirBtns = document.querySelectorAll('.ship-direction');
      this.shipsEl = Array.from(document.querySelectorAll('.ship-btn'));
      
      const boardEl = document.querySelector('.game-board');
      if (!boardEl) throw new Error("Couldn't find game-board el");
      this.boardUI = new BoardUI(boardEl);


      this.#addListener();
      this.#removeSquareListener();
      this.#addButtonsListeners();
      this.#addShipsListeners();
   }

   #addListener() {
      this.boardUI.boardEl.addEventListener('mouseover', e => {
         if (this.shipLengths[this.ship.length] <= 0) return;
         this.boardUI.clearBoard();

         const square = e.target;
         if (!square.classList.contains('square')) return;

         square.addEventListener('click', this.handleSquareClick);

         const row = parseInt(square.dataset.x);
         const col = parseInt(square.dataset.y);
         if (isNaN(row) || isNaN(col)) return;

         const markedSquares = this.markSquares(square);
         const canBePlaced = this.checkShipPlacement(markedSquares);

         if (!canBePlaced) this.paintSquares(markedSquares, 'square--blocked');
         else this.paintSquares(markedSquares, 'square--hover');
      });
   }

   #removeSquareListener() {
      this.boardUI.boardEl.addEventListener('mouseout', e => {
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

      const shipSquares = markedSquares.map(square => [parseInt(square.dataset.x), parseInt(square.dataset.y)]);
      this.board.ships.push(new Ship(shipSquares, this.ship.length));

      this.paintSquares(markedSquares, 'square--occupied');
      this.decrementShipCounter();

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
         if (row - 1 >= 0) edgeSquares.push(this.boardUI.squaresArray[row - 1][col]);
         if (row + 1 <= 9) edgeSquares.push(this.boardUI.squaresArray[row + 1][col]);
         if (col - 1 >= 0) edgeSquares.push(this.boardUI.squaresArray[row][col - 1]);
         if (col + 1 <= 9) edgeSquares.push(this.boardUI.squaresArray[row][col + 1]);

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
            const square = this.boardUI.squaresArray[i][col];
            markedSquares.push(square);
            i++;
         }
      } else {
         let i = col;
         if (i + this.ship.length > 10) return;
         while (i < 10 && i < col + this.ship.length) {
            const square = this.boardUI.squaresArray[row][i];
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
      return this.shipLengths.reduce((acc, value) => acc || value) ? false : true;
   }

   // code to improve
   decrementShipCounter() {
      const length = parseInt(this.ship.length);
      this.shipLengths[length] -= 1;
      if (this.shipLengths[length] === 0) {
         this.switchActiveShip();
         if (length === 2) {
            const ship = this.shipsEl.at(-1);
            ship.classList.add('btn--inactive');
         }
      }
      const counterEl = document.querySelector(`.ship-count[data-ship="${length}"]`);
      counterEl.textContent = 'x' + this.shipLengths[length];
   }

   // code to improve
   switchActiveShip() {
      if (this.isAllPlaced()) return;

      for (const ship of this.shipsEl) {
         ship.classList.remove('active');
         const index = parseInt(ship.dataset.ship);
         if (this.shipLengths[index] === 0) {
            ship.classList.add('btn--inactive');
            ship.classList.remove('active');
         }
      }

      const nextShip = document.querySelector('.ship-btn:not(.btn--inactive)');
      nextShip.classList.add('active');

      this.ship.length = parseInt(nextShip.dataset.ship);
   }

   #addButtonsListeners() {
      this.shipDirBtns.forEach(btn => {
         btn.addEventListener('click', () => {
            this.shipDirBtns[0].dataset.selected = 'false';
            this.shipDirBtns[1].dataset.selected = 'false';
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
