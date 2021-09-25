<template>
  <div class="w-full h-screen flex flex-col items-center justify-between py-14 bg-primary">
    <teleport to="body">
      <div class="absolute inset-0 flex items-center justify-center bg-overlay" v-if="showModal">
        <mode-popup/>
      </div>
    </teleport>
    <div class="w-4/5 flex justify-between text-rob-roy text-2xl font-bold">
      <button></button>
      <button @click="showModal = true">CHANGE</button>
    </div>
    <VSComputer @update-score="updateScore"/>
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
        <div class="font-semibold">Computer (O)</div>
        <div class="font-bold">{{ score.computer }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import ModePopup from '../components/ModePopup.vue'
import VSComputer from '../components/VSComputer.vue'

export default {
  name: 'App',
  components: {
    VSComputer,
    ModePopup,
  },
  data() {
    return {
      score : {
        player : 0,
        computer : 0,
        tie : 0
      },
      showModal : false
      
    }
  },
  methods: {
    updateScore(winner) {
      this.score[winner]++
    }
  },
  
}
</script>

<style>

</style>
