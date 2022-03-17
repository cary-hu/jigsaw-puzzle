<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import JigsawPuzzle from './components/JigsawPuzzle.vue'

</script>

<template>
  <h1>Jigsaw Puzzle</h1>
  <JigsawPuzzle />
</template>

<style>
* {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
  height: 100vh;
  width: 100vw;
  background-color: #2c3e50;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>
