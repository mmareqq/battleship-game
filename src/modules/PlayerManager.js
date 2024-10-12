export default class PlayerManager {
   constructor(player) {
      this.player = player;
      this.color = '#000000';
      this.colorIndex = 0;
      this.init();
   }

   init() {
      this.playerEl = document.querySelector(`.${this.player.id}`);
      
      this.nameEl = this.playerEl.querySelector('.player-name');
      this.updateName(this.player.name);

      this.scoreEl = this.playerEl.querySelector('.player-score');
      this.updateScore();

      this.editBtn = this.playerEl.querySelector('.edit-name');
      this.trashBtn = this.playerEl.querySelector('.delete-user');

      this.dialogEl = document.querySelector('#dialog');

      this.#addListeners();
   }

   #addListeners() {
      this.editBtn.addEventListener('click', () => {
         this.openDialog();
      });

      this.trashBtn.addEventListener('click', () => {
         switch (this.player.id) {
            case 'player1':
               this.updateName('Player 1');
               this.scoreEl = '0';
               this.updateColor('#000000')
               break;
            case 'player2':
               this.updateName('Player 2');
               this.scoreEl = '0';
               this.updateColor('#000000')
               break;
            case 'player3':
               this.updateName('Computer');
               this.scoreEl = '0';
               this.updateColor('#000000')
               break;
         }
      });
   }

   openDialog() {
      this.dialogEl.showModal();
      this.nameInput = this.dialogEl.querySelector('#name-input');
      this.nameInput.value = this.player.name;

      this.colorInput = this.dialogEl.querySelector('#color-input');
      this.colorInput.value = this.color

      this.closeBtn = this.dialogEl.querySelector('.close-btn');
      this.confirmBtn = this.dialogEl.querySelector('.confirm-btn');

      this.closeBtn.addEventListener('click', this.handleCancel);
      this.confirmBtn.addEventListener('click', this.handleConfirm);
   }

   handleCancel = e => {
      e.preventDefault();
      this.dialogEl.close();
      this.removeListeners();
   };

   handleConfirm = e => {
      e.preventDefault();
      this.dialogEl.close();
      this.removeListeners();

      this.updateColor(this.colorInput.value);
      this.updateName(this.nameInput.value);
   };

   removeListeners() {
      this.closeBtn.removeEventListener('click', this.handleCancel);
      this.confirmBtn.removeEventListener('click', this.handleConfirm);
   }

   updateScore(newScore) {
      this.scoreEl.textContent = newScore || this.player.score;
   }

   updateColor(newColor) {
      if(!newColor) return;
      let customProperty = `--${this.player.id}-color`
      document.documentElement.style.setProperty(customProperty, newColor)

      this.color = newColor;
      // this.scoreEl.style.color = newColor
      // this.nameEl.style.color = newColor
      // this.playerEl.querySelector('svg').style.fill = newColor
   }

   updateName(newName) {
      if (!newName || newName === -1) return;
      if (newName.length > 14) {
         alert('Name is too long. Enter no more than 14 characters');
         return;
      }

      this.player.name = newName;
      this.nameEl.textContent = newName + ': ';
   }
}
