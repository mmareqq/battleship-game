import getTemplate from './getTemplate';

class Game {
   constructor(player1, player2) {
      this.player1 = player1;
      this.player2 = player2;
      this.init();
   }

   async init() {
      const boardURL = '../templates/board.html';
      const board = await getTemplate(boardURL);
      const gamePageURL = '../templates/gamePage.html';
      const gamePage = await getTemplate(gamePageURL);
      document.body.innerHTML = gamePage;
      const sideOne = gamePage.querySelector('.wrapper-board1');
      const sideTwo = gamePage.querySelector('.wrapper-board2');
      sideOne.querySelector('.player-name').innerHTML = this.player1.name;
      sideTwo.querySelector('.player-name').innerHTML = this.player1.name;
      const board1 = sideOne.querySelector('.game-board1');
      const board2 = sideTwo.querySelector('.game-board2');
      board1.innerHTML = board;
      board2.innerHTML = board;
   }
}

export default Game;
