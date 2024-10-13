import { Board, BoardUI } from './gameboard';
import PlayerManager from './PlayerManager';
import { setToStorage } from './localStorage';

class Competitor {
   constructor(name, id, score, ships = []) {
      this.board = new Board(ships);
      this.boardUI = new BoardUI();
      this.name = name;
      this.id = id;
      this.score = score;
   }

   init() {
      this.manager = new PlayerManager(this)
   }

   setName(newName) {
      if(!newName || newName === this.name) return
      this.name = newName
      setToStorage(this)
   }

   updateScore(newScore) {
      if(newScore === undefined) this.score += 1
      else this.score = newScore
      setToStorage(this)
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
