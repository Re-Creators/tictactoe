<template>
  <div class="w-full h-screen flex flex-col items-center justify-between py-14 bg-primary">
    <div class="w-4/5 flex justify-between text-rob-roy text-2xl font-bold">
      <button>INVITE PEOPLE</button>
      <button>CHANGE</button>
    </div>
    <Board/>
    <div class="grid grid-cols-3 text-rob-roy text-2xl gap-8">
      <div class="text-center">
        <div class="font-semibold">PLAYER (X)</div>
        <div class="font-bold">12</div>
      </div>
      <div class="text-center">
        <div class="font-semibold">TIE</div>
        <div class="font-bold">0</div>
      </div>
      <div class="text-center">
        <div class="font-semibold">COMPUTER (O)</div>
        <div class="font-bold">17</div>
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
  }
}
</script>

<style>

</style>
