import getRandomNum from './getRandom';

class Game {
   constructor(player1, player2) {
      this.player1 = player1;
      this.player2 = player2;
      this.init();
   }

   async init() {
      this.player1.boardUI.boardEl = document.querySelector('.board1');
      this.player2.boardUI.boardEl = document.querySelector('.board2');
      this.#addListeners();
   }

   #addListeners() {
      const squares = this.player2.boardUI.boardEl.querySelectorAll('.square');
      squares.forEach(square => {
         square.addEventListener('click', e => {
            this.handleAttack(e);
         });
      });
   }

   handleAttack(e) {
      this.player2.board.receiveAttack(e.target, this.player2.boardUI.boardEl);
      setTimeout(() => {
         this.handleComputerAttack();
      }, 500);
   }

   handleComputerAttack() {
      const row = getRandomNum(0, 9);
      const col = getRandomNum(0, 9);
      const square = this.player1.boardUI.boardEl.querySelector(`.square[data-x="${row}"][data-y="${col}"]`);
      this.player1.board.receiveAttack(square, this.player1.boardUI.boardEl)
   }
}

export default Game;
