import getRandomNum from './getRandom';
import getTemplate from './getTemplate';

class GamePlay {
   constructor(player1, player2) {
      this.player1 = player1;
      this.player2 = player2;
      this.playerToMove = player1;
      this.init();
   }

   async init() {
      await this.#fetchGamePage();
      this.player1.boardUI.boardEl = document.querySelector('.board1');
      this.player2.boardUI.boardEl = document.querySelector('.board2');

      const name1El = document.querySelector('.player1-name');
      const name2El = document.querySelector('.player2-name');

      name1El.textContent = this.player1.name + ':';
      name2El.textContent = this.player2.name + ':';

      name1El.style.color = this.player1.manager.color;
      name2El.style.color = this.player2.manager.color;

      this.addListeners();
   }

   async #fetchGamePage() {
      try {
         const gamePage = await getTemplate('../templates/gamePage.html');
         this.boardTemplate = await getTemplate('../templates/board.html');
         document.body.innerHTML = gamePage;
      } catch (err) {
         throw new Error(err);
      }

      const board1 = document.querySelector('.board1');
      const board2 = document.querySelector('.board2');
      board1.innerHTML = this.boardTemplate;
      board2.innerHTML = this.boardTemplate;
   }

   addListeners() {
   }

   handleAttack(e) {
      const isGameOver = this.playerToMove.board.receiveAttack(
         e,
         this.player1.boardUI.boardEl
      );
      if (isGameOver) {
         showGameOverDialog(this.playerToMove);
      }
   }
}

export class GamePlayPVP extends GamePlay {
   constructor(player1, player2) {
      super(player1, player2);
   }

   handleAttack(e) {
      const playerHit =
         this.playerToMove === this.player1 ? this.player2 : this.player1;
      const isGameOver = playerHit.board.receiveAttack(e.target, playerHit.boardUI.boardEl);
      if(isGameOver) showGameOverDialog(this.playerToMove) 
   }

   addListeners() {
      this.player1.boardUI.boardEl
      .querySelectorAll('.square')
      .forEach(square => {
         square.addEventListener('click', e => {
            if(this.playerToMove !== this.player2) return
            this.handleAttack(e);
            this.playerToMove = this.player1
         });
      });

      this.player2.boardUI.boardEl
      .querySelectorAll('.square')
      .forEach(square => {
         square.addEventListener('click', e => {
            if(this.playerToMove !== this.player1) return
            this.handleAttack(e);
            this.playerToMove = this.player2
         });
      });
   }
}

export class GamePlayPVC extends GamePlay {
   constructor(player1, player2) {
      super(player1, player2);
   }

   addListeners() {
      this.player2.boardUI.boardEl
      .querySelectorAll('.square')
      .forEach(square => {
         square.addEventListener('click', e => {
            this.handleAttack(e);
         });
      });
   }

   handleAttack(e) {
      const isGameOver = this.player2.board.receiveAttack(
         e.target,
         this.player2.boardUI.boardEl
      );
      if (isGameOver) showGameOverDialog(this.player1);
      setTimeout(() => {
         this.handleComputerAttack();
      }, 500);
   }

   handleComputerAttack() {
      let row, col, square;
      let i = 0;
      do {
         i++;
         if (i > 250) {
            console.warn(
               'i variable exceeded 250 mark. Random function is not optimized!'
            );
            return;
         }
         row = getRandomNum(0, 9);
         col = getRandomNum(0, 9);
         square = this.player1.boardUI.boardEl.querySelector(
            `.square[data-x="${row}"][data-y="${col}"]`
         );
      } while (
         square.classList.contains('square--miss') ||
         square.classList.contains('square--hit')
      );

      const isGameOver = this.player1.board.receiveAttack(
         square,
         this.player1.boardUI.boardEl
      );
      if (isGameOver) showGameOverDialog(this.player2);
   }
}

function showGameOverDialog(winner) {
   const dialog = document.querySelector('#game-over-dialog');
   dialog.showModal();
   const winnerEl = dialog.querySelector('.winner')
   winnerEl.textContent = winner.name;
   winnerEl.style.color = winner.manager.color
   winner.updateScore();
   dialog.querySelector('.home-btn').onclick = () => location.reload();
}
