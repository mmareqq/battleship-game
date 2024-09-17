import GameBoard from './gameboard';

class Computer {
   constructor(gameBoard) {
      this.gameBoard = new GameBoard(gameBoard);
      this.name = 'Computer';
   }
}

class Player {
   constructor(gameBoard, name) {
      this.gameBoard = new GameBoard(gameBoard);
      this.name = name;
   }
}

export { Player, Computer };
