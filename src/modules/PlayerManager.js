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
      this.nameInput = this.dialogEl.querySelector('#name-input');
      this.colorInput = this.dialogEl.querySelector('#color-input');
      this.closeBtn = this.dialogEl.querySelector('.close-btn');
      this.confirmBtn = this.dialogEl.querySelector('.confirm-btn');
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
               this.player.updateScore(0)
               this.updateColor('#1e40af')
               break;
            case 'player2':
               this.updateName('Player 2');
               this.player.updateScore(0)
               this.updateColor('#166534')
               break;
            case 'player3':
               this.updateName('Computer');
               this.player.updateScore(0);
               this.updateColor('#c2410c')
               break;
         }
      });
   }

   openDialog() {
      this.dialogEl.showModal();

      this.nameInput.value = this.player.name;
    
      this.colorInput.value = this.color
    
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
      this.color = newColor;
      let customProperty = `--${this.player.id}-color`
      document.documentElement.style.setProperty(customProperty, newColor)
   }

   updateName(newName) {
      if (!newName || newName === -1) return;
      if (newName.length > 14) {
         alert('Name is too long. Enter no more than 14 characters');
         return;
      }
   
      this.player.setName(newName)
      this.nameEl.textContent = newName + ': ';
   }
}
