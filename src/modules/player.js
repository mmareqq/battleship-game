

class Computer {
   constructor(gameBoard) {
      this.gameBoard = gameBoard
      this.name = 'Computer';
   }
}

class Player {
   constructor(gameBoard, name) {
      this.gameBoard = gameBoard
      this.name = name;
   }
}

export { Player, Computer };
