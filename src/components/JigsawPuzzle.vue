<script setup lang="ts">
import { computed, ref } from "vue";
import draggable from "vuedraggable";
import image from "../assets/default.png";
import { GamePlay } from "./logic";
import Confetti from "./Confetti.vue";

const n = ref(2);
const play = new GamePlay(n.value);

const width = computed(() => {
  return 600 / n.value;
});

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

const dragging = ref(false);
const dragOptions = computed(() => {
  return {
    animation: 200,
    disabled: !isPlay.value,
    ghostClass: "ghost",
  };
});
const onDrop = () => {
  const isWin = play.checkStates();
  if (isWin)
    isPlay.value = false;
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
    <div class="board">
      <draggable
        v-model="play.state.value.board"
        tag="transition-group"
        :component-data="{
          type: 'transition-group',
          name: 'flip-list',
        }"
        item-key="index"
        v-bind="dragOptions"
        @end="onDrop"
      >
        <template #item="{element}">
          <li
            class="jigsaw-block"
            :class="isPlay ? 'play' : ''"
            :style="{
              width: width + 'px',
              height: width + 'px',
              backgroundImage: 'url(' + image + ')',
              backgroundPositionX: element.backgroundPositionX,
              backgroundPositionY: element.backgroundPositionY
            }"
          />
        </template>
      </draggable>
    </div>
    <Confetti :passed="play.state.value.isWin" />
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
    border-radius: 8px;
    overflow: hidden;
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
.ghost {
  opacity: 0.5;
}
.flip-list-move {
  transition: transform 1s;
}

.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
.list-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.list-leave-active {
  position: absolute;
}

.flip-list-move, /* apply transition to moving elements */
.flip-list-enter-active,
.flip-list-leave-active {
  transition: all 0.5s ease;
}

.flip-list-enter-from,
.flip-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.flip-list-leave-active {
  position: absolute;
}

</style>
