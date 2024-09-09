import getTemplate from './modules/getTemplate';
import './styles/input.css';

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
   startGame()
   btn.addEventListener('click', startGame);
}

async function startGame() {
   console.log('game started');
   const template = await getTemplate('./templates/boardCreator.html');
   document.body.innerHTML = template;
   const boardEl = document.querySelector('.board');
   boardEl.innerHTML = board;
}


init();
