class Competitor {
   constructor(gameBoard) {
      this.gameBoard = gameBoard
   }
}

class Computer extends Competitor {

}

class Player extends Competitor {
   constructor(gameBoard) {
      super(gameBoard)
   }
}