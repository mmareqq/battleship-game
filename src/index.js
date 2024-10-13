import getTemplate from '../src/modules/getTemplate';
import { Player, Computer } from '../src/modules/player';
import './styles/input.css';
import { PvPGame, PvCGame } from './modules/game';
import { getFromStorage } from './modules/localStorage';

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
   constructor(player1, player2, computer) {
      this.player1 = player1;
      this.player2 = player2;
      this.computer = computer;
      this.init();
   }

   async init() {
      try {
         await fetchStartingPage();
      } catch (err) {
         throw new Error(err);
      }
      console.log(this.player1.id);
      console.log(this.player2.id);
      console.log(this.computer.id);
      this.player1.init();
      this.player2.init();
      this.computer.init();

      this.player1.manager.updateColor('#1e40af');
      this.player2.manager.updateColor('#166534');
      this.computer.manager.updateColor('#c2410c');
      this.#addListeners();
   }

   updatePlayerScore(player, newScore) {
      if (!newScore) player.score += 1;
      else player.score = newScore;
   }

   #addListeners() {
      document.querySelector('.play-btn--pvc').addEventListener('click', () => {
         new PvCGame(this.player1, this.computer);
      });

      document.querySelector('.play-btn--pvp').addEventListener('click', () => {
         new PvPGame(this.player1, this.player2);
      });
   }
}

function init() {
   const player1 =
      getFromStorage('player1') || new Player('Player 1', 'player1');
   const player2 =
      getFromStorage('player2') || new Player('Player 2', 'player2');
   const comp = getFromStorage('player3') || new Computer();

   new App(player1, player2, comp);
}

document.addEventListener('DOMContentLoaded', init);
