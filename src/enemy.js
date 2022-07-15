import Player from './player';

export default class Enemy extends Player {
    constructor(turn = false) {
        super(turn);
        this.missedAttacks = [];
        this.successfulAttacks = [];
    }

    attack() {
        const random = () => Math.floor(Math.random() * 10);

        let attempts = 1;
        let coords = [random(), random()];
        
        while (
            this.attacks.some(([x, y]) => x === coords[0] && y === coords[1])
            && attempts < 100) {
            coords = [random(), random()];
            attempts++;
        }
        
        if (attempts === 100) {
            return 'Can not attack. Board is full';
        }

        this.attacks.push(coords);
        return coords;
    }
}
