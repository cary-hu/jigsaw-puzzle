<script setup lang="ts">
import { computed, ref } from "vue";
import draggable from "vuedraggable";
import image from "../assets/default.png";
import { GamePlay } from "./logic";
const n = ref(4);
const play = new GamePlay(n.value);

const width = computed(() => {
  return 600 / n.value;
});

const state = computed(() => play.state.value);
const simpleBoard = computed(() => state.value.board.flat());
const isPlay = ref(false);
const beginGame = () => {
  isPlay.value = true;
  play.shuffle();
};
const resetGame = () => {
  isPlay.value = false;
  play.reset(n.value);
};

const upGameLevel = () => {
  if (n.value < 18)
    n.value += 2;
  else
    return;
  play.reset(n.value);
};
const downGameLevel = () => {
  if (n.value > 2)
    n.value -= 2;
  else
    return;
  play.reset(n.value);
};

</script>

<template>
  <div class="warp">
    <div>
      <div class="btn" @click="upGameLevel">
        增加游戏难度
      </div>
      <div class="btn" @click="downGameLevel">
        降低游戏难度
      </div>
      <div v-if="!isPlay" class="btn" @click="beginGame">
        开始游戏
      </div>
      <div v-else class="btn" @click="resetGame">
        重置
      </div>
    </div>
    <TransitionGroup name="list" tag="ul" class="board">
      <li v-for="(row, index) in simpleBoard" :key="row.x + row.y + index * (Math.random())" class="jigsaw-block" :class="isPlay ? 'play' : ''" :data-origin-y="row.originY" :data-origin-x="row.originX" :style="{width: width + 'px', height: width + 'px', backgroundImage: 'url(' + image + ')', backgroundPositionX: (row.y * (100 / (n - 1))) + '%', backgroundPositionY: (row.x * (100 / (n - 1))) + '%'}" />
    </TransitionGroup>
    <!-- <draggable v-model="simpleBoard" tag="transition-group" :component-data="{name:'list'}" class="board" /> -->
  </div>
</template>

<style scoped>
.warp {
    display: flex;
    flex-direction: column;
}
.board {
    position: relative;
    background-color: #000;
    padding: 12px;
    width: 600px;
    height: 600px;
    display: flex;
    flex-wrap: wrap;
    list-style: none;
}
.jigsaw-block {
    background-size: 600px 600px;
    background-repeat: no-repeat;
    color: #000;
    display: flex;
    align-items: center;
    justify-content: center;
}
.jigsaw-block.play::after {
  content: "";
  border: 1px solid #000;
  width: 100%;
  height: 100%;
}
.btn {
    padding: 4px 8px;
    background-color: #000;
    display: inline-block;
    margin: 4px;
    border-radius: 4px;
    cursor: pointer;
    user-select: none;
}

/* 1. declare transition */
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

/* 2. declare enter from and leave to state */
.list-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
.list-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

/* 3. ensure leaving items are taken out of layout flow so that moving
      animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
</style>
