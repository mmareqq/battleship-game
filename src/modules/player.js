import { Board, BoardUI } from './gameboard';

class Competitor {
   constructor(ships, name) {
      this.board = new Board(ships);
      this.boardUI = new BoardUI();
      this._name = name;
   }

   get name() {
      return this._name;
   }

   set name(newName) {
      if (!newName) console.warn('Name not provided for setter');
      this._name = newName;
   }
}

class Computer extends Competitor {
   constructor(ships, name = 'Computer') {
      super(ships, name);
   }
}

class Player extends Competitor {
   constructor(ships, name) {
      super(ships, name);
   }
}

export { Player, Computer };
