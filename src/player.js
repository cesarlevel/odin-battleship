export default class Player {
    constructor(turn = true) {
        this.turn = turn;
        this.attacks = [];
    }

    changeTurn() {
        this.turn = !this.turn;
    }

    attack(coords = [0, 0]) {
        this.attacks.push(coords);
        return coords;
    }

    get hasTurn() { return this.turn; }
}
