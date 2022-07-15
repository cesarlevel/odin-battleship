export default class Player {
    constructor(turn = false) {
        this.turn = turn;
        this.attacks = [];
    }

    startsTurn() {
        this.turn = true;
    }

    endsTurn() {
        this.turn = false;
    }

    attack(coords = [0, 0]) {
        this.attacks.push(coords);
        return coords;
    }

    get hasTurn() { return this.turn; }
}
