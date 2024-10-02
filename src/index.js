import getTemplate from '../src/modules/getTemplate';
import { Player, Computer } from '../src/modules/player';
import Game from '../src/modules/gamePlay';
import './styles/input.css';
import PlaceShipManager from '../src/modules/placeShip';
import { getRandomBoard, generateNewBoard } from './modules/computerBoards';

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
   try {
      await fetchStartingPage();
   } catch (err) {
      throw new Error(err);
   }
   const btn = document.querySelector('.play-button');
   btn.addEventListener('click', initalizePlacements);
   initalizePlacements(); // del
}

async function initalizePlacements() {
   try {
      const template = await getTemplate('./templates/boardCreator.html');
      document.body.innerHTML = template;
   } catch (err) {
      throw new Error(err);
   }

   const boardEl = document.querySelector('.board');
   boardEl.innerHTML = board;

   let shipPlacementManager = new PlaceShipManager();

   const resetBtn = document.querySelector('.reset-btn');
   resetBtn.addEventListener('click', () => {
      initalizePlacements();
   });

   const continueBtn = document.querySelector('.continue-btn');
   continueBtn.addEventListener('click', () => {
      // getDataToFile(shipPlacementManager.board.ships)

      startGame(shipPlacementManager.board.ships, getRandomBoard());
   });
}

async function startGame(ships1, ships2) {
   try {
      await fetchGamePage('Player 1', 'Computer');
   } catch (err) {
      throw new Error(err);
   }

   const player1 = new Player(ships1, 'Player 1');
   const player2 = new Computer(ships2);
   const game = new Game(player1, player2);
}

async function fetchGamePage(name1, name2) {
   const gamePageURL = '../templates/gamePage.html';
   try {
      const gamePage = await getTemplate(gamePageURL);
      document.body.innerHTML = gamePage;
   } catch (err) {
      throw new Error(err);
   }

   document.querySelector('.player-name1').innerHTML = name1;
   document.querySelector('.player-name2').innerHTML = name2;
   const board1 = document.querySelector('.board1');
   const board2 = document.querySelector('.board2');
   board1.innerHTML = board;
   board2.innerHTML = board;
}

function getDataToFile(data) {
   data.forEach(ship => {
      delete ship.hits; // Deleting unnecessary properties
   });
   data = JSON.stringify(data)
   const blob = new Blob([data], { type: 'text/plain' }); // Create a Blob object
   const url = URL.createObjectURL(blob); // Create a URL for the Blob

   const a = document.createElement('a'); // Create an anchor element
   a.href = url; // Set the href to the Blob URL
   a.download = 'output.txt'; // Set the desired file name
   document.body.appendChild(a); // Append the anchor to the body
   a.click(); // Programmatically click the anchor to trigger the download
   document.body.removeChild(a); // Remove the anchor from the document
   URL.revokeObjectURL(url); // Clean up the Blob URL
}

init();
