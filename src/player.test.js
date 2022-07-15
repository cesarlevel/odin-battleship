import Player from './player';

it('Returns if the players turn',  () => {
    const player = new Player();

    expect(player.hasTurn).toBe(false);
});

it('starts player\'s turn',  () => {
    const player = new Player();
    player.startsTurn();

    expect(player.hasTurn).toBe(true);
});

it('ends player\'s turn',  () => {
    const player = new Player();
    player.endsTurn();

    expect(player.hasTurn).toBe(false);
});

it('can attack',  () => {
    const player = new Player();

    expect(Array.isArray(player.attack([2, 3]))).toBe(true);
});

it('can register an attack',  () => {
    const player = new Player();
    player.attack([2, 3])
    expect(player.attacks.length).toBe(1);
});