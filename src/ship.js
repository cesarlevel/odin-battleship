export default class Ship {
    constructor(length) {
        this.length = length;
        this.shipArr = Array.from({length: this.length}, () => this.length);
        this.horizontal = true;
        this.id = '';
    }

    static explotionChar = 'X';

    hit(n) {
        if (this.shipArr[n] !== undefined) {
            this.shipArr[n] = Ship.explotionChar;
            return true;
        }
        return false;
    }

    changeDirection() {
        this.horizontal = !this.horizontal;
    }

    updateId(id) {
        this.id = id;
    }

    get isHorizontal() {
        return this.horizontal;
    }

    get isSunk() {
        return this.shipArr.every(item => item === Ship.explotionChar);
    }
}
