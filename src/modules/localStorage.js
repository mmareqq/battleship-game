import { Player, Computer } from './player';
export function setToStorage(player) {
   if (!player) return;
   const object = {
      name: player.name,
      id: player.id,
      score: player.score,
   };
   localStorage.setItem(player.id, JSON.stringify(object));
}

export function getFromStorage(id) {
   if (!id) return;
   const player = JSON.parse(localStorage.getItem(id));

   if (!player) return null;
   if (id === 'player3') return new Computer(player.name, player.id, player.score);
   return new Player(player.name, player.id, player.score);
}
