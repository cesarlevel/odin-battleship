import Player from './player';

it('can attack',  () => {
    const player = new Player();

    expect(Array.isArray(player.attack([2, 3]))).toBe(true);
});

it('can register an attack',  () => {
    const player = new Player();
    player.attack([2, 3])
    expect(player.attacks.length).toBe(1);
});