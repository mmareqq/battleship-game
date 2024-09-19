export default class Ship {
   constructor(squares, length) {
      this.squares = squares;
      this.length = length;
      this.hits = 0;
      this.isDead = false;
   }

   markDeadShip() {
      console.log('marked as dead');
      this.squares.forEach(coord => {
         const row = coord[0];
         const col = coord[1];
         const square = this.boardEl.querySelector(`.square[data-x="${row}"][data-y="${col}"]`);
         square.classList.add('square--dead');
      });
   }

   hit() {
      this.hits += 1;
      this.isSunk();
   }

   isSunk() {
      if (this.length === this.hits) {
         this.isDead = true;
         this.markDeadShip();
      }
   }
}