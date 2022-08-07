import { battleshipView } from "./view.js";
import Gameboard from "./gameboard.js";
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
                    const [x, y] = this.enemy.attack();
                    const successfullAttack = this.playerBoard.receiveAttack([x, y]);
                    this.view.updateBattleTextArea(`\n▶ Enemy attack: Row: ${Number(x) + 1}, Col: ${Number(y) + 1}`);

                    if (successfullAttack) {
                        this.view.updateBattleTextArea(`\n**** Player got hit! ****`);
                        this.previousDT += this.dtDelay;
                    } else {
                        this.player.changeTurn();
                    }
                    this.view.renderBoard(this.playerBoard);
                }
            }
            if (this.playerBoard.allShipsDestroyed || this.enemyBoard.allShipsDestroyed) {
                const message = this.enemyBoard.allShipsDestroyed ? 'You win!' : 'You lose';
                this.view.updateBattleTextArea(`\n**** ${message} ****`);
                this.view.showRestartGameModal(message);
                return;
            }
            this._raf();
        });
    };

    cellActionHandler([x, y]) {
        const successfullAttack = this.enemyBoard.receiveAttack(this.player.attack([x, y]))
        this.view.renderBoard(this.enemyBoard, false);
        this.view.updateBattleTextArea(`\n▶ Player attack: Row: ${Number(x) + 1}, Col: ${Number(y) + 1}`);
        
        if (successfullAttack) {
            this.view.updateBattleTextArea(`\n**** Enemy got hit! ****`);
        } else {
            this.player.changeTurn();
        }
        return coord;
    }
}

export default Battleship;
