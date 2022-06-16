import Ship from './ship';

it('Creates a ship with proper length', () => {
    const ship = new Ship(4);
    expect(ship.length).toBe(4);
});

it('Build the ship array', () => {
    const ship = new Ship(4);
    expect(ship.shipArr.length).toBe(4);
});

it('Ship can get hit', () => {
    const ship = new Ship(4);
    ship.hit(2);
    expect(ship.shipArr[2]).toBe(ship.explotionChar);
});

it('Ship can not get hit', () => {
    const ship = new Ship(4);
    expect(ship.hit(6)).toBe(false);
});


it('Ship sunked', () => {
    const ship = new Ship(4);
    ship.hit(0);
    ship.hit(1);
    ship.hit(2);
    ship.hit(3);
    expect(ship.isSunk).toBe(true);
});

it('Ship was not sunked', () => {
    const ship = new Ship(4);
    ship.hit(0);
    expect(ship.isSunk).toBe(false);
});

it('Ship can change direction', () => {
    const ship = new Ship(4);
    ship.changeDirection();
    expect(ship.isHorizontal).toBe(false);
});
