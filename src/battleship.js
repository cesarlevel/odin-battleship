import { battleshipView } from "./view.js";
import Gameboard from "./gameboard.js";
import Ship from "./ship.js";

const playerBoard = new Gameboard();
const playerShip = new Ship(4);
playerBoard.placeShip(playerShip, [1, 0]);

const view = new battleshipView({cellActionHandler});
function cellActionHandler(coord) {
    console.log(coord);
    enemyBoard.receiveAttack(coord)
    view.renderBoard(enemyBoard, false);
    return coord;
}

const enemyBoard = new Gameboard();
const enemyShip = new Ship(4);
enemyBoard.placeShip(enemyShip, [0, 0]);

playerBoard.receiveAttack([1,1])
playerBoard.receiveAttack([9,2])

enemyBoard.receiveAttack()
enemyBoard.receiveAttack([0,1])
enemyBoard.receiveAttack([0,2])
enemyBoard.receiveAttack([0,3])
enemyBoard.receiveAttack([9,2])

console.log(playerBoard.allShipsDestroyed);
console.log(enemyBoard.allShipsDestroyed);

console.log(view)
//view.renderBoards(playerBoard, enemyBoard);
view.renderBoard(playerBoard);
view.renderBoard(enemyBoard, false);
export default view;
