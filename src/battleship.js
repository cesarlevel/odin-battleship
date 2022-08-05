import { battleshipView } from "./view.js";
import Gameboard from "./gameboard.js";
import Ship from "./ship.js";
import Player from "./player.js";
import Enemy from "./enemy.js";
class Battleship {
    constructor() {
        this.playerBoard = new Gameboard();
        this.enemyBoard = new Gameboard();
        this.playerBoard.addRandomShips();
        this.enemyBoard.addRandomShips();

        this.view = new battleshipView({cellActionHandler: this.cellActionHandler.bind(this)});
        this.view.renderBoard(this.playerBoard);
        this.view.renderBoard(this.enemyBoard, false);

        this.player = new Player();
        this.enemy = new Enemy();

        this.start = false;
        this.previousDT = 0;
        this.dtDelay = 600;

        this._raf();
    }

    _raf() {
        requestAnimationFrame((dt) => {
            if (this.player.hasTurn) {
                if (this.view.enemyBoardIsDisabled) {
                    this.view.toggleDisabledEnemyBoard();
                }
                this.previousDT = dt;
            } else {
                if (!this.view.enemyBoardIsDisabled) {
                    this.view.toggleDisabledEnemyBoard();
                }
                if (dt >= this.previousDT + this.dtDelay) {
                    const enemyAttack = this.enemy.attack();
                    const [x, y] = enemyAttack;
                    const successfullAttack = this.playerBoard.receiveAttack(enemyAttack);
                    this.view.updateBattleTextArea(`\n▶ Enemy attack: Row: ${Number(x) + 1}, Col: ${Number(y) + 1}`);
                    if (successfullAttack) {
                        this.view.updateBattleTextArea(`\n**** Player got hit! ****`);
                    }
                    this.view.renderBoard(this.playerBoard);
                    this.player.changeTurn();
                }
            }
            if (this.playerBoard.allShipsDestroyed || this.enemyBoard.allShipsDestroyed) {
                const message = this.enemyBoard.allShipsDestroyed ? 'You lose' : 'You win!';
                this.view.updateBattleTextArea(`\n**** ${message} ****`);
                this.view.showRestartGameModal(message);
                return;
            }
            this._raf();
        });
    };

    cellActionHandler(coord) {
        const [x, y] = coord;
        const successfullAttack = this.enemyBoard.receiveAttack(this.player.attack(coord))
        this.view.renderBoard(this.enemyBoard, false);
        this.view.updateBattleTextArea(`\n▶ Player attack: Row: ${Number(x) + 1}, Col: ${Number(y) + 1}`);
        if (successfullAttack) {
            this.view.updateBattleTextArea(`\n**** Enemy got hit! ****`);
        }
        return coord;
    }
}

export default Battleship;
