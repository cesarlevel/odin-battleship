import Enemy from './enemy';

it('can randomly attack',  () => {
    const enemy = new Enemy();
    enemy.attack();

    expect(enemy.attacks[0][0] >= 0 || enemy.attacks[0][0] <= 10).toBe(true);
    expect(enemy.attacks[0][1] >= 0 || enemy.attacks[0][1] <= 10).toBe(true);
});

it('can randomly attack but by not repeating the same spot',  () => {
    const enemy = new Enemy();
    enemy.attacks.push([2, 3])

    enemy.attack();

    expect(enemy.attacks[0][0] >= 0 || enemy.attacks[0][0] <= 10).toBe(true);
    expect(enemy.attacks[0][1] >= 0 || enemy.attacks[0][1] <= 10).toBe(true);
});

it('can not attack if the board is full',  () => {
    const enemy = new Enemy();

    let x = -1;
    const fullBoard = Array.from({length: 100}, (v, i) => {
      x += i % 10 === 0 ? 1 : 0;
      return [x, i % 10]
    });

    enemy.attacks.push(...fullBoard);
    expect(enemy.attack()).toBe('Can not attack. Board is full');
});