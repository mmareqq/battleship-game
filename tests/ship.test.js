const Ship = require('../src/modules/ship.js');

it('Checks ship correct constructor values', () => {
   const ship = new Ship(2, 3, 5, true);
   expect(ship.isVertical).toBe(true)
   expect(ship.x).toBe(2)
   expect(ship.y).toBe(3)
   expect(ship.hits).toBe(0);
});

it('checks hit function incrementation', () => {
   const ship = new Ship(2, 3, 5, true);
   expect(ship.hits).toBe(0);
   ship.hit();
   ship.hit();
   expect(ship.hits).toBe(2);
})

