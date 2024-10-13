import getTemplate from './getTemplate';
import { getRandomBoard } from './computerBoards';
import getDataToFile from './dataToFile';
import PlaceShipManager from './placeShip';
import { GamePlayPVP, GamePlayPVC } from './gamePlay';

class Game {
   constructor(player1, player2) {
      this.player1 = player1;
      this.player2 = player2;
      this.placeShipManager = null;
      this.init();
   }

   async init() {
      try {
         this.boardTemplate = await getTemplate('./templates/board.html');
         this.boardCreatorTemplate = await getTemplate(
            './templates/boardCreator.html'
         );
      } catch (err) {
         throw new Error(err);
      }
      // Change color if player2 is computer
      document.documentElement.style.setProperty(
         '--player2-color',
         this.player2.manager.color
      );


      this.initalizePlacements();
      this.displayTransition();
   }

   displayTransition() {}

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
   };

   addContinueBtnListener() {
      document
         .querySelector('.continue-btn')
         .addEventListener('click', this.handleContinue);
   }

   handleContinue = () => {
      // getDataToFile(shipPlacementManager.board.ships)
   };
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
   };

   handleContinue = () => {
      if (this.boardPlacementStatus === '2') {
         this.player2.board.ships = this.placeShipManager.board.ships;
         new GamePlayPVP(this.player1, this.player2);
         return;
      }

      this.player1.board.ships = this.placeShipManager.board.ships;
      this.boardPlacementStatus = '2';
      this.initalizePlacements(this.player2.name); // Reset board
      this.displayTransition();
   };

   displayTransition() {
      this.transitionDialog = document.querySelector(
         '#transition-screen-dialog'
      );
      const opponentEl = this.transitionDialog.querySelector('.opponent');
      const playerEl = this.transitionDialog.querySelector('.player-name');
      let playerFirst = this.player1;
      let playerSecond = this.player2;
      if (this.boardPlacementStatus === '2') {
         playerFirst = this.player2;
         playerSecond = this.player1;
      }

      playerEl.textContent = playerFirst.name;
      playerEl.style.color = playerFirst.manager.color;
      opponentEl.textContent = playerSecond.name;
      opponentEl.style.color = playerSecond.manager.color;

      this.transitionDialog.showModal();
      this.transitionDialog
         .querySelector('.transition-btn')
         .addEventListener('click', e => {
            e.preventDefault();
            this.transitionDialog.close();
         });
   }
}

export class PvCGame extends Game {
   constructor(player1, player2) {
      super(player1, player2);
      this.gameMode = 'pvc';
   }

   displayTransition() {
      document.documentElement.style.setProperty(
         '--ship-placement-color',
         this.player1.manager.color
      );
   }

   handleContinue = () => {
      // getDataToFile(shipPlacementManager.board.ships)
      this.player1.board.ships = this.placeShipManager.board.ships;
      this.player2.board.ships = getRandomBoard();
      new GamePlayPVC(this.player1, this.player2);
   };

   handleReset = () => {
      this.initalizePlacements(this.player1.name);
   };

}
