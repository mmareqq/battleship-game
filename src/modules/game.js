import getTemplate from './getTemplate';
import { getRandomBoard } from './computerBoards';
import getDataToFile from './dataToFile';
import PlaceShipManager from './placeShip';

class Game {
   constructor(player1, player2, app) {
      this.player1 = player1;
      this.player2 = player2;
      this.app = app;
   }

   async init() {
      this.boardTemplate = await getTemplate('./templates/board.html'); // Helper method since board template will be used many times.
      this.initalizePlacements();
   }

   async initalizePlacements() {
      try {
         const template = await getTemplate('./templates/boardCreator.html');
         document.body.innerHTML = template;
      } catch (err) {
         throw new Error(err);
      }

      const boardEl = document.querySelector('.board');
      boardEl.innerHTML = this.boardTemplate;
      this.app.placeShipManager.init();

      this.addResetBtnListener();
      this.addContinueBtnListener();
   }

   addResetBtnListener() {
      const resetBtn = document.querySelector('.reset-btn');
      resetBtn.addEventListener('click', () => {
         this.initalizePlacements();
      });
   }

   addContinueBtnListener() {
      const continueBtn = document.querySelector('.continue-btn');
      continueBtn.addEventListener('click', () => {
         // getDataToFile(shipPlacementManager.board.ships)
         // For making new computer boards
         this.player1.board.ships = this.app.placeShipManager.board.ships
         this.player2.board.ships = getRandomBoard()
         this.startGame();
      });
   }

   async startGame() {
      try {
         await this.#fetchGamePage(this.player1.name, this.player2.name);
      } catch (err) {
         throw new Error(err);
      }

      this.app.initalizeGamePlay(this.player1, this.player2);
   }

   async #fetchGamePage(name1, name2) {
      try {
         const gamePage = await getTemplate('../templates/gamePage.html');
         document.body.innerHTML = gamePage;
      } catch (err) {
         throw new Error(err);
      }

      document.querySelector('.player-name1').innerHTML = name1;
      document.querySelector('.player-name2').innerHTML = name2;

      const board1 = document.querySelector('.board1');
      const board2 = document.querySelector('.board2');
      board1.innerHTML = this.boardTemplate;
      board2.innerHTML = this.boardTemplate;
   }
}

export class PvPGame extends Game {
   constructor(player1, player2, app) {
      super(player1, player2, app);
      this.gameMode = 'pvp';
      this.boardPlacementStatus = '1';
   }

   addContinueBtnListener() {
      const continueBtn = document.querySelector('.continue-btn');
      continueBtn.addEventListener('click', () => {
         if (this.boardPlacementStatus === '1') {
            this.player1.board.ships = this.app.placeShipManager.board.ships
            this.app.placeShipManager = new PlaceShipManager() // Reset placeShipManager
            this.boardPlacementStatus = '2';
            this.initalizePlacements() // Reset board
            return;
         }
         
         this.player2.board.ships = this.app.placeShipManager.board.ships
         this.app.initalizeGamePlay();
      });
   }
}

export class PvCGame extends Game {
   constructor(player1, player2, app) {
      super(player1, player2, app);
      this.gameMode = 'pvc';
   }
}
