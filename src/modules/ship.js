class Ship {
   constructor(x, y, length, isVertical) {
      this.x = x
      this.y = y
      this.length = length;
      this.isVertical = isVertical
      this.hits = 0;
      this.isDead = false;
   }

   hit() {
      this.hits += 1;
   }

   isSunk() {
      if (this.length === this.hits) this.isDead = true;
   }
}

// export default Ship
module.exports = Ship;
