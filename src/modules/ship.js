export default class Ship {
   constructor(squares, length) {
      this.squares = squares;
      this.length = length;
      this.hits = 0;
   }

   hit() {
      this.hits += 1;
   }

   isSunk() {
      return this.hits === this.length;
   }
}
