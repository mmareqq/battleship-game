import getTemplate from './modules/getTemplate';
import { Player, Computer } from './modules/player';
import Game from './modules/gamePlay';
import './styles/input.css';
import PlaceShipManager from './modules/placeShip';

const board = await getTemplate('./templates/board.html');

async function fetchStartingPage() {
   try {
      const url = './templates/startingPage.html';
      const template = await getTemplate(url);
      document.body.innerHTML = template;
   } catch (error) {
      console.error('There was a problem with fetching the template:', error);
   }
}

async function init() {
   await fetchStartingPage();
   const btn = document.querySelector('.play-button');
   btn.addEventListener('click', initalizePlacements);
   initalizePlacements() // del
}

async function initalizePlacements() {
   console.log('game started'); // del
   const template = await getTemplate('./templates/boardCreator.html');
   document.body.innerHTML = template;

   const boardEl = document.querySelector('.board');
   boardEl.innerHTML = board;

   let shipPlacementManager = new PlaceShipManager();

   const resetBtn = document.querySelector('.reset-btn');
   resetBtn.addEventListener('click', () => {
      initalizePlacements();
   });

   
   const continueBtn = document.querySelector('.continue-btn');
   continueBtn.addEventListener('click', () => {
      startGame(shipPlacementManager.board.ships, shipPlacementManager.board.ships);
   });
}


async function startGame(ships1, ships2) {
   await fetchGamePage('Player 1', 'Computer')
   const player1 = new Player(ships1, 'Player 1')
   const player2  = new Computer(ships2) 
   const game = new Game(player1, player2)
}

async function fetchGamePage(name1, name2) {
   const gamePageURL = '../templates/gamePage.html';
   const gamePage = await getTemplate(gamePageURL);
   document.body.innerHTML = gamePage;

   document.querySelector('.player-name1').innerHTML = name1;
   document.querySelector('.player-name2').innerHTML = name2;
   const board1 = document.querySelector('.board1');
   const board2 = document.querySelector('.board2');
   board1.innerHTML = board;
   board2.innerHTML = board;

}

init();
