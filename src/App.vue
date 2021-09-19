<template>
  <div class="w-full h-screen flex flex-col items-center justify-center bg-primary">
    <board/>
  </div>
</template>

<script>
import Board from './components/Board.vue'
export default {
  name: 'App',
  components: {
    Board
  }
}
</script>

<style>

</style>
