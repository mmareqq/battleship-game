import getTemplate from '../src/modules/getTemplate';
import { Player, Computer } from '../src/modules/player';
import './styles/input.css';
import PlaceShipManager from '../src/modules/placeShip';
import { PvPGame, PvCGame } from './modules/game';
import GamePlay from './modules/gamePlay';

async function fetchStartingPage() {
   try {
      const url = './templates/startingPage.html';
      const template = await getTemplate(url);
      document.body.innerHTML = template;
   } catch (error) {
      console.error('There was a problem with fetching the template:', error);
   }
}

class App {
   constructor(player1, player2) {
      this.player1 = player1;
      this.player2 = player2;
      this.computer = new Computer()
      this.placeShipManager = new PlaceShipManager();
      this.init();
   }

   async init() {
      try {
         await fetchStartingPage();
         this.player1.init();
         this.player2.init();
         this.computer.init()

         this.pvcBtn = document.querySelector('.play-btn-pvc');
         this.pvpBtn = document.querySelector('.play-btn--pvp');
         this.#addListeners();
      } catch (err) {
         throw new Error(err);
      }
   }

   updatePlayerScore(player, newScore) {
      if (newScore) player.score = newScore;
      else player.score += 1;
      const scoreEl = document.querySelector('#player1 > .player-score');
      scoreEl.textContent = player.score;
   }

   #addListeners() {
      this.pvcBtn.addEventListener('click', () => {
         this.game = new PvCGame(this.player1, new Computer(), this);
         this.game.init();
      });

      this.pvpBtn.addEventListener('click', () => {
         this.game = new PvPGame(this.player1, this.player2, this);
         this.game.init();
      });
   }

}



new App(new Player([], 'Player 1', 'player1'), new Player([], 'Player 2', 'player2'));