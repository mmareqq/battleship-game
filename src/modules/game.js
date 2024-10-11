import getTemplate from './getTemplate';
import { getRandomBoard } from './computerBoards';
import getDataToFile from './dataToFile';
import PlaceShipManager from './placeShip';
import GamePlay from './gamePlay';

class Game {
   constructor(player1, player2) {
      this.player1 = player1;
      this.player2 = player2;
      this.placeShipManager = null;
      this.init();
   }

   async init() {
      try {
         this.transitionScreenTemplate = await getTemplate(
            './templates/transitionScreen.html'
         );
         this.boardTemplate = await getTemplate('./templates/board.html');
         this.boardCreatorTemplate = await getTemplate(
            './templates/boardCreator.html'
         );
      } catch (err) {
         throw new Error(err);
      }
      this.initalizePlacements();
   }

   initalizePlacements(name) {
      this.placeShipManager = new PlaceShipManager();
      document.body.innerHTML = this.boardCreatorTemplate;

      document.querySelector('.player-ship').textContent =
         name || this.player1.name;

      const boardEl = document.querySelector('.board');
      boardEl.innerHTML = this.boardTemplate;
      this.placeShipManager.init();

      this.addResetBtnListener();
      this.addContinueBtnListener();
   }

   addResetBtnListener() {
      document
         .querySelector('.reset-btn')
         .addEventListener('click', this.handleReset);
   }

   handleReset = () => {
      this.initalizePlacements(this.player1.name);
   }

   addContinueBtnListener() {
      document
         .querySelector('.continue-btn')
         .addEventListener('click', this.handleContinue);
   }

   handleContinue = () => {
      debugger
      // getDataToFile(shipPlacementManager.board.ships)
      // For making new computer boards
      this.player1.board.ships = this.placeShipManager.board.ships;
      this.player2.board.ships = getRandomBoard();
      new GamePlay(this.player1, this.player2);
   }
}

export class PvPGame extends Game {
   constructor(player1, player2) {
      super(player1, player2);
      this.gameMode = 'pvp';
      this.boardPlacementStatus = '1';
   }

   handleReset = () => {
      this.boardPlacementStatus === '1'
         ? this.initalizePlacements(this.player1.name)
         : this.initalizePlacements(this.player2.name);
   }

   handleContinue = () => {
      if (this.boardPlacementStatus === '2') {
         this.player2.board.ships = this.placeShipManager.board.ships;
         new GamePlay(this.player1, this.player2);
         return;
      }

      this.player1.board.ships = this.placeShipManager.board.ships;
      this.boardPlacementStatus = '2';
      this.initalizePlacements(this.player2.name); // Reset board
   }
}

export class PvCGame extends Game {
   constructor(player1, player2) {
      super(player1, player2);
      this.gameMode = 'pvc';
   }
}
