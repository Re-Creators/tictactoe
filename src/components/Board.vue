<template>
  <div class="board grid grid-cols-3">
    <div class="cell flex items-center justify-center text-burnt-sienna border-8 border-secondary w-32 h-32 cursor-pointer" v-for="index in 9" :key="index" @click="setMark(index - 1)">
      <!-- X -->
      <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" fill="none" v-if="board[index - 1] === 'x'">
        <rect y="16.6667" width="23.5702" height="117.851" transform="rotate(-45 0 16.6667)" fill="#E76F51"/>
        <rect x="83.3333" y="2.28882e-05" width="23.5702" height="117.851" transform="rotate(45 83.3333 2.28882e-05)" fill="#E76F51"/>
      </svg>
      <!-- Circle -->
      <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" fill="none" v-if="board[index - 1] === 'o'">
        <circle cx="50" cy="50" r="42" stroke="#E76F51" stroke-width="16"/>
      </svg>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  setup() {
    const board = ref([null, null, null, null, null, null, null, null,null, null])
    const turn = ref('x')

    function setMark(index){
      if(board.value[index] === null) {
         board.value[index] = turn.value

        // Change Turn
        turn.value = (turn.value === 'x') ? 'o' : 'x'
      }
    }

    return {
      setMark,
      board
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
