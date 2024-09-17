import getTemplate from './getTemplate';

class Game {
   constructor(player1, player2) {
      this.player1 = player1;
      this.player2 = player2;
      this.move = this.player1;
      this.init();
   }

   async init() {
      const boardURL = '../templates/board.html';
      const board = await getTemplate(boardURL);
      const gamePageURL = '../templates/gamePage.html';
      const gamePage = await getTemplate(gamePageURL);
      document.body.innerHTML = gamePage;
      const sideOne = document.querySelector('.wrapper-board1');
      const sideTwo = document.querySelector('.wrapper-board2');
      sideOne.querySelector('.player-name').innerHTML = this.player1.name;
      sideTwo.querySelector('.player-name').innerHTML = this.player2.name;
      const board1 = sideOne.querySelector('.game-board1');
      const board2 = sideTwo.querySelector('.game-board2');
      board1.innerHTML = board;
      board2.innerHTML = board;
      this.player1.boardEl = board1.querySelector('.game-board');
      this.player2.boardEl = board2.querySelector('.game-board');

      this.#addListeners();
   }

   #addListeners() {
      const squares = this.player2.boardEl.querySelectorAll('.square');
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

      this.player2.gameBoard.receiveAttack(row, col);

      if (this.player2.gameBoard.board[row][col] === 'o') {
         square.classList.add('square--hit');
      } else {
         square.classList.add('square--miss');
      }
   }
}

export default Game;
