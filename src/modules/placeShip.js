import Ship from './ship';

class ShipToPlace {
   constructor(length, isVertical) {
      this.x = null;
      this.y = null;
      this.isVertical = isVertical;
      this.length = length;
   }
}

export function initalizeHoverEffect() {
   const board = document.querySelector('.game-board');
   const ship = new ShipToPlace(3, false);
   const squares = document.querySelectorAll('.square');
   const boardArray = mapBoard(squares);

   board.addEventListener('mouseout', e => {
      const square = e.target;
      square.removeEventListener('click', handleClick);
   });

   board.addEventListener('mouseover', e => {
      clearBoard(squares);
      const square = e.target;
      square.addEventListener('click', handleClick);
      const row = parseInt(square.dataset.x);
      const col = parseInt(square.dataset.y);

      if (row === undefined || col === undefined) return;

      if (ship.isVertical) {
         let i = row;
         if (i + ship.length > 10) return;
         while (i < 10) {
            const square = boardArray[i][col];
            square.classList.add('square--hover');
            i++;
         }
      } else {
         let i = col;
         if (i + ship.length > 10) return;
         while (i < 10 && i < col + ship.length) {
            const square = boardArray[row][i];
            square.classList.add('square--hover');
            i++;
         }
      }
   });
}

function handleClick(e) {
   const square = e.target;
   const row = parseInt(square.dataset.x);
   const col = parseInt(square.dataset.y);

   if (row === undefined || col === undefined) return;

   if (ship.isVertical) {
      let i = row;
      if (i + ship.length > 10) return;
      while (i < 10) {
         const square = boardArray[i][col];
         square.classList.add('square--hover');
         i++;
      }
   } else {
      let i = col;
      if (i + ship.length > 10) return;
      while (i < 10 && i < col + ship.length) {
         const square = boardArray[row][i];
         square.classList.add('square--hover');
         i++;
      }
   }
}

class BoardCreator {
   constructor() {
      this.init();
      this.ship = new ShipToPlace(2, false);
      this.boardArray = null;
      this.boardEl = null;
   }

   init() {
      this.boardEl = document.querySelector('.game-board');
      if (!this.boardEl) throw new Error("Couldn't find game-board el");
      const squares = this.boardEl.querySelectorAll('.square');
      this.#mapBoard(squares);
   }

   #mapBoard(squares) {
      this.boardEl = [];

      for (let i = 0; i < 10; i++) {
         let row = [];
         for (let j = 0; j < 10; j++) {
            let index = i * 10 + j;
            row.push(squares[index]);
         }
         this.boardEl.push(row);
      }
   }

   clearBoard() {
      const squares = this.boardEl.querySelectorAll('.square');
      squares.forEach(square => {
         square.classList.remove('square--hover');
      });
   }

   listenerRemover() {
      this.boardEl.addEventListener('mouseout', e => {
         const square = e.target;
         square.removeEventListener('click', this.handleSquareClick);
      });
   }

   handleSquareClick(e) {
      const square = e.target;
   }
}

export default checkPlaceForShip;
// module.exports = checkPlaceForShip
