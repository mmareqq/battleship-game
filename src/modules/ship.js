export default class Ship {
   constructor(squares, length) {
      this.squares = squares;
      this.length = length;
      this.hits = 0;
   }

   hit() {
      this.hits += 1;
   }

   markDead(boardEl) {
      this.squares.forEach(coord => {
         const row = coord[0];
         const col = coord[1];
         const square = boardEl.querySelector(`.square[data-x="${row}"][data-y="${col}"]`);
         square.classList.add('square--dead');
      })
   }

   isSunk() {
      return this.hits === this.length;
   }
}
