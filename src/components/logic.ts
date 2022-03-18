import type { Ref } from "vue";
import { ref } from "vue";

interface BlockState {
  x: number
  y: number
  originX: number
  originY: number
  swapped: boolean
}
interface JigsawBlock {
  board: BlockState[][]
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
      board: Array.from({ length: n }, (_, x) =>
        Array.from({ length: n }, (_, y) => ({
          x,
          y,
          originX: x,
          originY: y,
          swapped: false,
        }))),
    };
  }

  shuffle() {
    const block = this.state.value.board;
    for (let k = 0; k < this._currentN; k++) {
      for (let i = 0; i < this._currentN; i++) {
        const element = block[k][i];
        if (element.swapped)
          continue;

        element.swapped = true;
        const { x, y } = this.getRandomNumber(this._currentN, k, i);
        const swapItem = block[x][y];
        element.x = swapItem.originX;
        element.y = swapItem.originY;
        swapItem.x = element.originX;
        swapItem.y = element.originY;
        swapItem.swapped = true;
      }
    }
  }

  getRandomNumber(n: number, notX: number, notY: number): { x: number; y: number } {
    const block = this.state.value.board;

    const randomNumberX = Math.floor(Math.random() * n);
    const randomNumberY = Math.floor(Math.random() * n);
    if (block[randomNumberX][randomNumberY].swapped)
      return this.getRandomNumber(n, notX, notY);
    else
      return { x: randomNumberX, y: randomNumberY };
  }
}
