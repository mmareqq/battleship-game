import { Board, BoardUI } from './gameboard';
import PlayerManager from './PlayerManager';

class Competitor {
   constructor(ships, name, id, score = 0) {
      this.board = new Board(ships);
      this.boardUI = new BoardUI();
      this._name = name;
      this.score = score;
      this.id = id;
   }

   init() {
      new PlayerManager(this)
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
   constructor(ships) {
      super(ships, 'Computer', 'player3');
   }
}

class Player extends Competitor {
   constructor(ships, name, id) {
      super(ships, name, id);
   }
}

export { Player, Computer };
