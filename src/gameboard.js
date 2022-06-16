export default class Gameboard {
    constructor() {
        this.boardLength = 10;
        this.board = Array.from({length: this.boardLength}, () => Array(this.boardLength).fill(0));
        this.missAttacks = [];
        this.missAttacksChar = '*'
        this.placedShips = [];
        this.alphaId = [...'abcdefghijklmnopqrstuvwxyz'];
        this.alphaCounter = 0;
    }

    placeShip(ship, coords = [0, 0]) {
        const [row, col] = coords;

        const isSafeToPlace = () => {
            for (let i = 0; i < ship.length; i++) {
                if (ship.isHorizontal && (this.board[row]?.[col + i] === undefined || this.board[row]?.[col + i] !== 0)
                || this.board[row + i]?.[col] === undefined || this.board[row + i]?.[col] !== 0) {
                    return false
                }
            }
            return true;
        }

        if (isSafeToPlace()) {
            for (let i = 0; i < ship.length; i++) {
                if (ship.isHorizontal) {
                    this.board[row][col + i] = ship.length + this.alphaId[this.alphaCounter];
                } else {
                    this.board[row + i][col] = ship.length + this.alphaId[this.alphaCounter];
                }
            }
            ship.updateId(ship.length + this.alphaId[this.alphaCounter]);
            this.placedShips.push({
                shipCoords: [row, col],
                ship
            });
            this.alphaCounter++;
        } else {
            return false;
        }
    }

    receiveAttack(coords = [0, 0]) {
        const [row, col] = coords;
        let success = false;

        this.placedShips.forEach(({shipCoords, ship}) => {
            const [shipRow, shipCol] = shipCoords;
            if (this.board[row][col] === ship.id) {
                if (ship.isHorizontal) {
                    ship.hit(Math.abs(shipCol - col));
                } else {
                    ship.hit(Math.abs(shipRow - row));
                }
                success = true;
            }
        });
        if (!success) {
            this.board[row][col] = this.missAttacksChar;
            this.missAttacks.push(coords);
        }
        return success;
    }

    get allShipDestroyed() {
        return this.placedShips.every(({ship}) => ship.isSunk);
    }
}