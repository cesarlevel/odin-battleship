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
      <h1 class="title">&#60;Battleship&#62</h1>
      <div id="battleship">
        <div class="board is-player"></div>
        <div class="board is-oponent"></div>
        <div class="controls"></div>
      </div>
    `;

    this.dom.battleship = document.querySelector("#battleship");
    this.dom.playerBoard = document.querySelectorAll(".board")[0];
    this.dom.enemyBoard = document.querySelectorAll(".board")[1];
    this.dom.controls = document.querySelector(".controls");

    for (let i = 0; i < 100; i++) {
      const coords = `${Math.floor(i / 10)}, ${i % 10}`;
      this.dom.playerBoard.innerHTML += `
        <div class="board-cell" data-coord="${coords}"></div>
      `;
      this.dom.enemyBoard.innerHTML += `
        <div class="board-cell" data-coord="${coords}"></div>
      `;
    }

    this.dom.playerBoardCells = this.dom.playerBoard.querySelectorAll('.board-cell');
    this.dom.enemyBoardCells = this.dom.enemyBoard.querySelectorAll('.board-cell');

    this.dom.enemyBoardCells.forEach(cell => {
      cell.addEventListener('click', ({target}) => {
        const coord = target.dataset.coord.split(', ');
        this.cellActionHandler(coord);
      })
    })
  }

  renderBoard({board}, isPlayer = true) {
    console.log(board)
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
        boardCell.innerHTML = this.missShootChar;
      }
    }
  }
}
