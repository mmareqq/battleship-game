class Competitor {
   constructor(gameBoard) {
      this.gameBoard = gameBoard;
   }
}

class Computer extends Competitor {
   constructor() {
      super(gameBoard)
      this.name = 'Computer'
   }
}

class Player extends Competitor {
   constructor(gameBoard, name) {
      super(gameBoard);
      this.name = name;
   }
}
