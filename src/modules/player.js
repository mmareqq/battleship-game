import { Board, BoardUI } from './gameboard';
import PlayerManager from './PlayerManager';

class Competitor {
   constructor(name, id, score, ships) {
      this.board = new Board(ships);
      this.boardUI = new BoardUI();
      this._name = name;
      this.score = score;
      this.id = id;
   }

   init() {
      this.manager = new PlayerManager(this)
   }

   get name() {
      return this._name;
   }

   set name(newName) {
      if (!newName) console.warn('Name not provided for setter');
      this._name = newName;
   }
   

   updateScore(newScore) {
      if(!newScore) this.score += 1
      else this.score = newScore
      this.manager.updateScore(this.score)
   } 
}

class Computer extends Competitor {
   constructor(name = 'Computer', id = 'player3', score = 0, ships = []) {
      super(name, id, score, ships);
   }
}

class Player extends Competitor {
   constructor(name, id, score = 0, ships = []) {
      super(name, id, score, ships);
   }
}

export { Player, Computer };
