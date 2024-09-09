import Ship from './ship'


function checkPlaceForShip(x, y, length, isVertical) {
   if(isVertical) {
      if(x + length > 9) return false
   } else {
      if(y + length > 9) return false
   }
   return true
}

const btns = document.querySelectorAll('.ship-btn')
let activeBtn = document.querySelector('')
let ship = new Ship()


function drawShipOnGrid(ship) {

}


// export default checkPlaceForShip
module.exports = checkPlaceForShip