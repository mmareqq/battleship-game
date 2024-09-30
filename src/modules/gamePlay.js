class Game {
   constructor(player1, player2) {
      this.player1 = player1;
      this.player2 = player2;
      this.move = this.player1;
      this.init();
   }

   async init() {
      this.player2.boardUI.boardEl = document.querySelector('.board2')
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
      const square = e.target;
      const row = parseInt(square.dataset.x);
      const col = parseInt(square.dataset.y);

      this.player2.board.receiveAttack(row, col);

      if (this.player2.board.mappedBoard[row][col] === 'o') {
         square.classList.add('square--hit');
      } else {
         square.classList.add('square--miss');
      }
   }
}

export default Game;
