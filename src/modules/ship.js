class Ship {
   constructor(squares, length) {
      this.squares = squares;
      this.length = length;
      this.hits = 0;
      this.isDead = false;
   }

   hit() {
      this.hits += 1;
      this.isSunk();
   }

   isSunk() {
      if (this.length === this.hits) this.isDead = true;
   }
}

export default Ship
// module.exports = Ship;
