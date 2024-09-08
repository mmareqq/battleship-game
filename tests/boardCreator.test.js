const checkPlaceForShip = require('../src/modules/placeShip.js')

it('Board creator doesnt let you place ship going outside board', () => {
   expect(checkPlaceForShip(8, 0, 5, true)).toBe(false)
   expect(checkPlaceForShip(8, 0, 5, false)).toBe(true)
})