import getTemplate from './modules/getTemplate';

// (async function() {
//    try {
//       const url = './templates/gameBoard.html'
//       const board = await getTemplate(url)
//       document.body.innerHTML = board
//    } catch (error) {
//       console.error('There was a problem with fetching the template:', error);
//    }
// })();

(async function () {
   try {
      const url = './templates/startingPage.html';
      const board = await getTemplate(url);
      document.body.innerHTML = board;
   } catch (error) {
      console.error('There was a problem with fetching the template:', error);
   }
})();
