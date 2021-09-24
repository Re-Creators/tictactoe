<template>
  <div class="w-full h-screen flex flex-col items-center justify-between py-14 bg-primary">
    <div class="w-4/5 flex justify-between text-rob-roy text-2xl font-bold">
      <button>INVITE PEOPLE</button>
      <button>CHANGE</button>
    </div>
    <VSPlayer @update-score="updateScore" @set-mark-indicator="setMarkIndicator" :roomId="roomId" />
    <div class="grid grid-cols-3 text-rob-roy text-2xl gap-8">
      <div class="text-center">
        <div class="font-semibold" :class="[myMark === 'x' ? 'text-burnt-sienna' : '']">PLAYER 1 (X)</div>
        <div class="font-bold">{{ score.x }}</div>
      </div>
      <div class="text-center">
        <div class="font-semibold">TIE</div>
        <div class="font-bold">{{ score.tie }}</div>
      </div>
      <div class="text-center">
        <div class="font-semibold" :class="[myMark === 'o' ? 'text-burnt-sienna' : '']">PLAYER 2 (O)</div>
        <div class="font-bold">{{ score.o }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import VSPlayer from '../components/VSPlayer.vue'

export default {
  name: 'App',
  components: {
    VSPlayer,
  },
  data() {
    return {
      score : {
        x : 0,
        o : 0,
        tie : 0
      },
      myMark : ""
    }
  },
  methods: {
    updateScore(winner) {
      this.score[winner]++
    },
     setMarkIndicator(mark) {
      this.myMark = mark
    }
  },
  computed : {
    roomId(){
        return this.$route.params.roomId
    }
   
  }
}
</script>

<style>

</style>
