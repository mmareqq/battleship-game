function checkPlaceForShip(x, y, length, isVertical) {
   if(isVertical) {
      if(x + length > 9) return false
   } else {
      if(y + length > 9) return false
   }
   return true
}

// export default checkPlaceForShip
module.exports = checkPlaceForShip