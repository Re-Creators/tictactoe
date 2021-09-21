<template>
  <div class="board grid grid-cols-3">
    <div class="cell flex items-center justify-center text-burnt-sienna border-8 border-secondary w-32 h-32 cursor-pointer" v-for="index in 9" :key="index" @click="setMark(index - 1)">
      <!-- X -->
      <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" fill="none" v-if="board[index - 1] === 'x'" class="animate-scaleUp">
        <rect y="16.6667" width="23.5702" height="117.851" transform="rotate(-45 0 16.6667)" fill="#E76F51"/>
        <rect x="83.3333" y="2.28882e-05" width="23.5702" height="117.851" transform="rotate(45 83.3333 2.28882e-05)" fill="#E76F51"/>
      </svg>
      <!-- Circle -->
      <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" fill="none" v-if="board[index - 1] === 'o'" class="animate-scaleUp">
        <circle cx="50" cy="50" r="42" stroke="#E76F51" stroke-width="16"/>
      </svg>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
export default {
  setup() {

    const SCORES = {
      x : -10,
      o: 10,
      tie: 0
    }
    const WIN_COMBINATION = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]

    const board = ref([null, null, null, null, null, null, null, null,null, null])
    const player = 'x'
    const computer = 'o'
    const isGameOver = ref(false)
    let computerDelay
    const currentTurn = ref(player)


    watch(currentTurn, () => {
      let winner = checkWinner() 
      if(winner !== null) {
        console.log(winner)
        gameOver.value = true
        gameOver()
      }
    })

    function setMark(index){
      if(board.value[index] === null && !isGameOver.value && currentTurn.value === player) {
          board.value[index] = player
          currentTurn.value = computer

          // Computer turn
          computerDelay = setTimeout(() => {
            computerTurn()
          }, 700)
          
      }
    }

    function checkWinner() {
      let win = false
      let winner = ""

      for (let i = 0; i <= 7; i++) {
        const winCondition = WIN_COMBINATION[i]

        let cell1 = board.value[winCondition[0]]
        let cell2 = board.value[winCondition[1]]
        let cell3 = board.value[winCondition[2]]

        if(cell1 === null || cell2 === null || cell3 === null) {
          continue
        }

        if(cell1 === cell2 && cell2 === cell3) {
          win = true
          winner = cell1
          break
        }
        
      }

      if(win && winner === computer) {
        return computer
      }else if(win && winner === player) {
        return player
      }

      let draw = !board.value.includes(null)

      if(draw) {
        return "tie"
      }

      return null
    }

    function computerTurn() {
      let bestScore = -Infinity
      let move

      for (let index = 0; index < board.value.length; index++) {
        if(board.value[index] === null) {
          board.value[index] = computer
          let score = minimax(board.value, 0, false)
          board.value[index] = null

          if(score > bestScore) {
            bestScore = score
            move = index
          }
        }
      }
      
      board.value[move] = computer
      currentTurn.value = player
    }


    function minimax(board, depth, isMaximazing) {
      let result = checkWinner()
      if(result !== null){
        return SCORES[result]
      }

      if(isMaximazing) {
        let bestScore = -Infinity
        for (let i = 0; i < board.length; i++) {
          if(board[i] === null) {
            board[i] = computer
            let score = minimax(board, depth + 1, false)
            board[i] = null
            bestScore = Math.max(score, bestScore)
          }
        }

        return bestScore
      }else{
        let bestScore = Infinity
        for (let i = 0; i < board.length; i++) {
          if(board[i] === null) {
            board[i] = player
            let score = minimax(board, depth + 1, true)
            board[i] = null
            bestScore = Math.min(score, bestScore)
          }
        }

        return bestScore
      }
    }


    function gameOver() {
        clearTimeout(computerDelay)
        setTimeout(() => {
          currentTurn.value = player
          isGameOver.value = false
          board.value = [null, null, null, null, null, null, null, null,null, null]
        }, 1000)
    }
    
    return {
      setMark,
      board,
      currentTurn
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
