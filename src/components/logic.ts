import type { Ref } from "vue";
import { ref } from "vue";
interface BlockState {
  x: number
  y: number
}
interface JigsawBlock {
  board: BlockState[][]
}
export class GamePlay {
  constructor(n: number) {
    this.reset(n);
  }

  state = ref() as Ref<JigsawBlock>;
  reset(n: number) {
    this.state.value = {
      board: Array.from({ length: n }, (_, x) =>
        Array.from({ length: n }, (_, y) => ({
          x,
          y,
        }))),
    };
  }

  shuffle() {
    const block = this.state.value.board;
    for (let k = 0; k < block.length; k++) {
      let i = block[k].length;
      if (i === 0) { return false; }
      else {
        while (--i) {
          const j = Math.floor(Math.random() * (i + 1));
          const tempi = block[k][i];
          const tempj = block[k][j];
          block[k][i] = tempj;
          block[k][j] = tempi;
        }
      }
    }
  }
}
