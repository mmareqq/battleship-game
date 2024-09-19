import getTemplate from './modules/getTemplate';
import BoardManager from './modules/placeShip';
import { Player, Computer } from './modules/player';
import Game from './modules/gamePlay';
import './styles/input.css';
import GameBoard from './modules/gameboard';

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
   initalizePlacements()
}

async function initalizePlacements() {
   console.log('game started');
   const template = await getTemplate('./templates/boardCreator.html');
   document.body.innerHTML = template;
   const boardEl = document.querySelector('.board');
   boardEl.innerHTML = board;
   let boardManager = new BoardManager();

   const resetBtn = document.querySelector('.reset-btn');
   resetBtn.addEventListener('click', () => {
      initalizePlacements();
   });
   startGame(getPlayerBoard(), getComputerBoard());
   const continueBtn = document.querySelector('.continue-btn');
   continueBtn.addEventListener('click', () => {
      let board = boardManager.mapBoardArray();
      boardManager = null; // Trash variable
      startGame(getPlayerBoard(), getComputerBoard());
   });
}

function getComputerBoard() {
   return [
      ['o', '', '', '', '', 'o', 'o', 'o', 'o', ''],
      ['o', '', '', '', '', '', '', '', '', ''],
      ['o', '', '', '', '', '', '', '', '', ''],
      ['o', '', '', '', '', '', 'o', 'o', '', ''],
      ['o', '', 'o', '', '', '', '', '', '', ''],
      ['', '', 'o', '', '', '', '', '', '', ''],
      ['', '', 'o', '', '', '', 'o', 'o', '', ''],
      ['', '', '', '', '', 'o', '', '', '', ''],
      ['', '', '', '', '', 'o', '', '', '', ''],
      ['', 'o', 'o', '', '', 'o', '', '', '', ''],
   ];
}

function getPlayerBoard() {
   return [
      ['o', '', '', '', '', 'o', 'o', 'o', 'o', ''],
      ['o', '', '', '', '', '', '', '', '', ''],
      ['o', '', '', '', '', '', '', '', '', ''],
      ['o', '', '', '', '', '', 'o', 'o', '', ''],
      ['o', '', 'o', '', '', '', '', '', '', ''],
      ['', '', 'o', '', '', '', '', '', '', ''],
      ['', '', 'o', '', '', '', 'o', 'o', '', ''],
      ['', '', '', '', '', 'o', '', '', '', ''],
      ['', '', '', '', '', 'o', '', '', '', ''],
      ['', 'o', 'o', '', '', 'o', '', '', '', ''],
   ];
}

function startGame(board1, board2) {
   // const gameBoard1 = new GameBoard(board1)
   // const gameBoard2 = new GameBoard(board2)
   const player1 = new Player(board1, 'Player 1');
   const player2 = new Computer(board2);
   // const game = new Game(player1, player2);
}

init();
