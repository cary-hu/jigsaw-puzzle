import type { Ref } from "vue";
import { ref } from "vue";

export interface BlockState {
  x: number
  y: number
  originX: number
  originY: number
  swapped: boolean
  index: number
  backgroundPositionX: string
  backgroundPositionY: string
}
interface JigsawBlock {
  board: BlockState[]
  isWin: boolean
}
export class GamePlay {
  private _currentN = 6;
  constructor(n: number) {
    this.reset(n);
  }

  state = ref() as Ref<JigsawBlock>;
  reset(n: number) {
    this._currentN = n;
    this.state.value = {
      board: [],
      isWin: false,
    };
    let index = 0;
    for (let x = 0; x < n; x++) {
      for (let y = 0; y < n; y++) {
        this.state.value.board.push({
          x,
          y,
          originX: x,
          originY: y,
          swapped: false,
          index: x + y + index * Math.random(),
          backgroundPositionX: `${y * (100 / (n - 1))}%`,
          backgroundPositionY: `${x * (100 / (n - 1))}%`,
        });
        index++;
      }
    }
  }

  shuffle() {
    for (let k = 0; k < this._currentN; k++) {
      for (let i = 0; i < this._currentN; i++) {
        const element = this.getBlockByPosition(k, i);
        if (element.swapped)
          continue;

        element.swapped = true;
        const { x, y } = this.getRandomNumber(this._currentN, k, i);
        const swapItem = this.getBlockByPosition(x, y);
        [element.x, swapItem.x] = [swapItem.x, element.x];
        [element.y, swapItem.y] = [swapItem.y, element.y];
        [element.backgroundPositionX, swapItem.backgroundPositionX] = [swapItem.backgroundPositionX, element.backgroundPositionX];
        [element.backgroundPositionY, swapItem.backgroundPositionY] = [swapItem.backgroundPositionY, element.backgroundPositionY];

        swapItem.swapped = true;
      }
    }
  }

  getBlockByPosition(positionX: number, positionY: number) {
    return this.state.value.board.find(x => x.originX === positionX && x.originY === positionY) ?? {} as BlockState;
  }

  getRandomNumber(n: number, notX: number, notY: number): { x: number; y: number } {
    const randomNumberX = Math.floor(Math.random() * n);
    const randomNumberY = Math.floor(Math.random() * n);
    if (this.getBlockByPosition(randomNumberX, randomNumberY).swapped)
      return this.getRandomNumber(n, notX, notY);
    else
      return { x: randomNumberX, y: randomNumberY };
  }

  checkStates() {
    let win = true;
    let index = 0;
    for (let x = 0; x < this._currentN; x++) {
      for (let y = 0; y < this._currentN; y++) {
        const element = this.state.value.board[index++];
        if (element.x !== x || element.y !== y)
          win = false;
      }
    }
    this.state.value.isWin = win;
    return win;
  }
}
