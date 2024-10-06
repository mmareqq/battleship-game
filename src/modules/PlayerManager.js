export default class PlayerManager {
   constructor(player) {
      this.player = player
      this.init()
   }

   init() {
      console.log('init Player manager', this.player.id)
      this.nameEl = document.querySelector(`#${this.player.id} > .player-name`);
      if(!this.nameEl) throw new Error('Missing name element')
      this.nameEl.textContent = this.player.name + ': ';

      this.scoreEl = document.querySelector(`#${this.player.id} > .player-score`);
      if(!this.scoreEl) throw new Error('Missing score element')
      this.scoreEl.textContent = this.player.score;

      this.dialogEl = document.querySelector('#dialog');
      this.editBtn = document.querySelector(`#${this.player.id} > .edit-name`);
      this.#addListeners();
   }

   #addListeners() {
      this.editBtn.addEventListener('click', () => {
         this.openDialog()
      })
      
   }

   openDialog() {
      console.log('adf');
      this.dialogEl.showModal();

      this.closeBtn = this.dialogEl.querySelector('.close-btn')
      this.confirmBtn = this.dialogEl.querySelector('.confirm-btn')

      this.closeBtn.addEventListener('click', this.handleCancel)

      this.confirmBtn.addEventListener('click', this.handleConfirm)
   }

   handleCancel = e => {
      e.preventDefault()
      this.dialogEl.close()
      this.removeListeners()
   }

   handleConfirm = e => {
      e.preventDefault()
      this.dialogEl.close()
      this.removeListeners()
      const input = this.dialogEl.querySelector('#dialog-input')
      this.changeName(input.value)

   }

   removeListeners() {
      this.closeBtn.removeEventListener('click', this.handleCancel)
      this.confirmBtn.removeEventListener('click', this.handleConfirm)
   }

   changeName(name) {
      console.log('changing name', this.player.id)
      if(!name || name === -1) return;
      if(name.length > 14) {
         alert('Name is too long. Enter no more than 14 characters')
         return;
      }

      
      this.nameEl.textContent = name + ': '
   }
}
