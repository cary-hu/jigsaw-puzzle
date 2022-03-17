<script setup lang="ts">
import { computed, ref, watch } from "vue";
import image from "../assets/default.png";
import { GamePlay } from "./logic";

const play = new GamePlay(6);

const n = ref(6);

const width = computed(() => {
  return 600 / n.value;
});

const state = computed(() => play.state.value);
const beginGame = () => {
  play.shuffle();
};

</script>

<template>
  <div class="warp">
    <div>
      <div class="btn" @click="play.reset(++n)">
        增加游戏难度
      </div>
      <div class="btn" @click="play.reset(--n)">
        降低游戏难度
      </div>
      <div class="btn" @click="beginGame">
        开始游戏
      </div>
    </div>
    <div class="board">
      <template v-for="(col, x) in state.board" :key="x">
        <template v-for="(row, y) in col" :key="y">
          <div class="jigsaw-block" :style="{width: width + 'px', height: width + 'px', backgroundImage: 'url(' + image + ')', backgroundPositionX: (row.y * (100 / (n - 1))) + '%', backgroundPositionY: (row.x * (100 / (n - 1))) + '%'}" />
        </template>
      </template>
    </div>
  </div>
</template>

<style scoped>
.warp {
    display: flex;
    flex-direction: column;
}
.board {
    background-color: #000;
    padding: 12px;
    width: 620px;
    height: 620px;
    display: flex;
    flex-wrap: wrap;
}
.jigsaw-block {
    background-size: 600px 600px;
    background-repeat: no-repeat;
    border: 1px solid #000;
}
.btn {
    padding: 4px 8px;
    background-color: #000;
    display: inline-block;
    margin: 4px;
    border-radius: 4px;
    cursor: pointer;
}
</style>
