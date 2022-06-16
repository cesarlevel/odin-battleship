import Gameboard from "./gameboard";
import Ship from "./ship";

it('Generates a 10x10 gameboard', () => {
    const gameboard = new Gameboard();
    const arr = [
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
    ];
    expect(gameboard.board).toEqual(arr);
});

it('Places a ship', () => {
    const ship = new Ship(5);
    const gameboard = new Gameboard();
    const arr = [
        ['5a','5a','5a','5a','5a',0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
    ];
    gameboard.placeShip(ship, [0, 0]);
    expect(gameboard.board).toEqual(arr);
});

it('Places a ship on a different coord', () => {
    const ship = new Ship(5);
    const gameboard = new Gameboard();
    const arr = [
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,'5a','5a','5a','5a','5a',0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
    ];
    gameboard.placeShip(ship, [4, 2]);
    expect(gameboard.board).toEqual(arr);
});

it('Places a ship vertically', () => {
    const ship = new Ship(5);
    const gameboard = new Gameboard();
    const arr = [
        ['5a',0,0,0,0,0,0,0,0,0],
        ['5a',0,0,0,0,0,0,0,0,0],
        ['5a',0,0,0,0,0,0,0,0,0],
        ['5a',0,0,0,0,0,0,0,0,0],
        ['5a',0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
    ];
    ship.changeDirection();
    gameboard.placeShip(ship, [0, 0]);
    expect(gameboard.board).toEqual(arr);
});

it('Places a ship vertically on a different coord', () => {
    const ship = new Ship(3);
    const gameboard = new Gameboard();
    const arr = [
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,'3a',0,0,0,0],
        [0,0,0,0,0,'3a',0,0,0,0],
        [0,0,0,0,0,'3a',0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
    ];
    ship.changeDirection();
    gameboard.placeShip(ship, [3, 5]);
    expect(gameboard.board).toEqual(arr);
});

it('Prevent placing a horizontal ship outside the gameboard', () => {
    const ship = new Ship(5);
    const gameboard = new Gameboard();
    expect(gameboard.placeShip(ship, [0, 6])).toBe(false);
});

it('Prevent placing a horizontal ship where other ship is', () => {
    const ship = new Ship(5);
    const ship2 = new Ship(3);
    const gameboard = new Gameboard();
    gameboard.placeShip(ship, [0, 5])
    expect(gameboard.placeShip(ship2, [0, 3])).toBe(false);
});

it('Prevent placing a vertical ship outside the gameboard', () => {
    const ship = new Ship(5);
    const gameboard = new Gameboard();
    ship.changeDirection();
    expect(gameboard.placeShip(ship, [6, 0])).toBe(false);
});

it('Prevent placing a vertical ship where other ship is', () => {
    const ship = new Ship(5);
    ship.changeDirection();
    const ship2 = new Ship(3);
    ship2.changeDirection();

    const gameboard = new Gameboard();
    gameboard.placeShip(ship, [4, 3])
    expect(gameboard.placeShip(ship2, [2, 3])).toBe(false);
});

it('Handles attack', () => {
    const ship = new Ship(5);
    const ship2 = new Ship(5);
    ship2.changeDirection();
    const gameboard = new Gameboard();

    gameboard.placeShip(ship, [4, 2]);
    gameboard.placeShip(ship2, [4, 1]);
    expect(gameboard.receiveAttack([4, 0])).toBe(false);
    expect(gameboard.receiveAttack([4, 1])).toBe(true);
    expect(gameboard.board[4][0]).toBe(gameboard.missAttacksChar);
    expect(gameboard.missAttacks.length).toBe(1);
});

it('Checks that all ship were destroyed', () => {
    const ship = new Ship(3);
    const ship2 = new Ship(3);

    const gameboard = new Gameboard();
    gameboard.placeShip(ship, [0, 0])
    gameboard.placeShip(ship2, [1, 0]);

    gameboard.receiveAttack([0, 0]);
    gameboard.receiveAttack([0, 1]);
    gameboard.receiveAttack([0, 2]);

    gameboard.receiveAttack([1, 0]);
    gameboard.receiveAttack([1, 1]);
    gameboard.receiveAttack([1, 2]);

    expect(gameboard.allShipDestroyed).toBe(true);
});