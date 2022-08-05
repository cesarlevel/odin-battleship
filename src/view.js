import Ship from './ship.js';
import Gameboard from './gameboard.js';

export class battleshipView {
  constructor({cellActionHandler} = {cellActionHandler: null}) {
    this.dom = {};
    this.init();
    this.explotionChar = Ship.explotionChar;
    this.missShootChar = 'M';
    this.cellActionHandler = cellActionHandler;
  }

  init() {
    this.dom.app = document.querySelector("#app");
    this.dom.app.innerHTML = `
      <div class="restart-game">
        <h1></h1>
        <p>Do you want to play again?</p>
        <button onclick="window.location = 'https://www.theodinproject.com/dashboard'">Nope</button><button onclick="window.location.reload()">Yup!</button>
      </div>
      <h1 class="title">&#60;Battleship&#62</h1>
      <div id="battleship">
        <div class="board is-player"></div>
        <div class="board is-oponent"></div>
        <div class="battle-text">
          <textarea readonly>**** Battle started! ****</textarea>
        </div>
      </div>
    `;

    this.dom.battleship = document.querySelector('#battleship');
    this.dom.playerBoard = document.querySelectorAll('.board')[0];
    this.dom.enemyBoard = document.querySelectorAll('.board')[1];
    this.dom.restartGameModal = document.querySelector('.restart-game');
    this.dom.battleText = document.querySelector('.battle-text');
    this.dom.battleTextArea = this.dom.battleText.querySelector('textarea');

    this.renderCells();

    this.dom.playerBoardCells = this.dom.playerBoard.querySelectorAll('.board-cell');
    this.dom.enemyBoardCells = this.dom.enemyBoard.querySelectorAll('.board-cell');

    this.dom.enemyBoardCells.forEach(cell => {
      cell.addEventListener('click', ({target}) => {
        const coord = target.dataset.coord.split(', ');
        this.cellActionHandler(coord);
      })
    });
  }

  renderCells() {
    for (let i = 0; i < 100; i++) {
      const coords = `${Math.floor(i / 10)}, ${i % 10}`;
      this.dom.playerBoard.innerHTML += `
        <div class="board-cell" data-coord="${coords}"></div>
      `;
      this.dom.enemyBoard.innerHTML += `
        <div class="board-cell" data-coord="${coords}"></div>
      `;
    }
  }

  renderBoard({board}, isPlayer = true) {
    const flatBoard = [...board.flat()];
    const hasShipRegex = new RegExp(`\\d\\w|${this.explotionChar}`)
    const boardCells = isPlayer ? this.dom.playerBoardCells : this.dom.enemyBoardCells;

    for (let i = 0; i < 100; i++) {
      const boardCell = boardCells[i];
      if (flatBoard[i] && flatBoard[i].match(hasShipRegex)) {
        boardCell.classList.add('ship-cell');
      }
      
      if (flatBoard[i] === this.explotionChar) {
        boardCell.classList.add('is-hit');
        boardCell.innerHTML = this.explotionChar;
      }

      if (flatBoard[i] === Gameboard.missAttacksChar) {
        boardCell.classList.add('is-miss');
        boardCell.innerHTML = this.missShootChar;
      }
    }
  }

  toggleDisabledEnemyBoard() {
    this.dom.enemyBoard.classList.toggle('is-disabled');
  }

  updateBattleTextArea(string) {
    this.dom.battleTextArea.value += string;
    this.dom.battleTextArea.scrollTop = this.dom.battleTextArea.scrollHeight;
  }

  showRestartGameModal(message) {
    this.dom.restartGameModal.querySelector('h1').innerHTML = message;
    this.dom.restartGameModal.classList.add('is-visible');
  }

  get enemyBoardIsDisabled() {
    return this.dom.enemyBoard.classList.contains('is-disabled');
  }

  get battleTextAreaValue() {
    return this.dom.battleTextArea.value;
  }
}
