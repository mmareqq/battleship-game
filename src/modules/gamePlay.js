import getRandomNum from './getRandom';
import getTemplate from './getTemplate';

export default class GamePlay {
   constructor(player1, player2) {
      this.player1 = player1;
      this.player2 = player2;
      this.init();
   }

   async init() {
      await this.#fetchGamePage()
      this.player1.boardUI.boardEl = document.querySelector('.board1');
      this.player2.boardUI.boardEl = document.querySelector('.board2');
      const name1El = document.querySelector('.player-name1')
      const name2El = document.querySelector('.player-name2')
      name1El.textContent = this.player1.name +  ':'
      name2El.textContent = this.player2.name +  ':'
      
      this.#addListeners();
   }

   async #fetchGamePage() {
      try {
         const gamePage = await getTemplate('../templates/gamePage.html');
         this.boardTemplate = await getTemplate('../templates/board.html')
         document.body.innerHTML = gamePage;
      } catch (err) {
         throw new Error(err);
      }

      document.querySelector('.player-name1').textContent = this.player1.name + ':';
      document.querySelector('.player-name2').textContent = this.player2.name + ':';

      const board1 = document.querySelector('.board1');
      const board2 = document.querySelector('.board2');
      board1.innerHTML = this.boardTemplate;
      board2.innerHTML = this.boardTemplate;
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
      if(this.player2.id === 'player3') {
         setTimeout(() => {
            this.handleComputerAttack();
         }, 500);
      }
   }

   handleComputerAttack() {
      let row, col, square;
      let i = 0;
      do {
         i++;
         if (i > 250) {
            console.warn('i variable exceeded 250 mark. Random function is not optimized!');
            return;
         }
         row = getRandomNum(0, 9);
         col = getRandomNum(0, 9);
         square = this.player1.boardUI.boardEl.querySelector(`.square[data-x="${row}"][data-y="${col}"]`);
      } while (square.classList.contains('square--miss') || square.classList.contains('square--hit'));

      this.player1.board.receiveAttack(square, this.player1.boardUI.boardEl);
   }
}
