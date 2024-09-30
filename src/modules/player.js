import { Board, BoardUI } from "./gameboard";

class Computer {
   constructor(ships) {
      this.board = new Board(ships)
      this.boardUI = new BoardUI()
      this.name = 'Computer';
   }
}

class Player {
   constructor(ships, name) {
      this.board = new Board(ships);
      this.boardUI = new BoardUI();
      this.name = name;
   }
}

export { Player, Computer };
