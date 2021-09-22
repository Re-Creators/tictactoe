<template>
  <div class="w-full h-screen flex flex-col items-center justify-between py-14 bg-primary">
    <div class="w-4/5 flex justify-between text-rob-roy text-2xl font-bold">
      <button>INVITE PEOPLE</button>
      <button>CHANGE</button>
    </div>
    <Board @update-score="updateScore"/>
    <div class="grid grid-cols-3 text-rob-roy text-2xl gap-8">
      <div class="text-center">
        <div class="font-semibold">PLAYER (X)</div>
        <div class="font-bold">{{ score.player }}</div>
      </div>
      <div class="text-center">
        <div class="font-semibold">TIE</div>
        <div class="font-bold">{{ score.tie }}</div>
      </div>
      <div class="text-center">
        <div class="font-semibold">COMPUTER (O)</div>
        <div class="font-bold">{{ score.computer }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Board from './components/Board.vue'
export default {
  name: 'App',
  components: {
    Board,
  },
  data() {
    return {
      score : {
        player : 0,
        computer : 0,
        tie : 0
      }
    }
  },
  methods: {
    updateScore(winner) {
      this.score[winner]++
    }
  }
}
</script>

<style>

</style>
