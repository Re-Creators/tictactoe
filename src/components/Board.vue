<template>
    <transition name="popup">
      <win-popup v-if="isGameOver" v-on:play-again="playAgain" :winner="winner"/>
    
    </transition>
    <div class="w-96 board grid grid-cols-3">
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
import WinPopup from './WinPopup.vue'
export default {
  components :{
    WinPopup
  },
  setup() {
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

    const board = ref([null, null, null, null, null, null, null, null,null])
    const player = 'x'
    const computer = 'o'
    const isGameOver = ref(false)
    const currentTurn = ref(player)
    const winner = ref(null)


    let computerDelay


    watch(currentTurn, () => {
      let isWin = checkWinner(board.value) 
      if(isWin !== null) {
        winner.value = isWin
        clearTimeout(computerDelay)
        setTimeout(() => {
          isGameOver.value = true
        }, 1000)
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

    function checkWinner(board) {
      let win = false
      let winner = ""

      for (let i = 0; i <= 7; i++) {
        const winCondition = WIN_COMBINATION[i]

        let cell1 = board[winCondition[0]]
        let cell2 = board[winCondition[1]]
        let cell3 = board[winCondition[2]]

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

      let draw = !board.includes(null)

      if(draw) {
        return "tie"
      }

      return null
    }

    function computerTurn() {
      let move = getComputerMove()
      board.value[move] = computer
      currentTurn.value = player
    }

    function getComputerMove() {
      // Check if computer can win in first move
      for (let index = 0; index < 9; index++) {
        let copyBoard = getCopyBoard()
        if(copyBoard[index] === null) {
          copyBoard[index] = computer

          if(checkWinner(copyBoard) === computer) {
            return index
          }
        }
      }
      
      // Check if the player could win on their next move and block them.
      for (let i = 0; i < 9; i++) {
        let copyBoard = getCopyBoard()
        if(copyBoard[i] === null) {
          copyBoard[i] = player

          if(checkWinner(copyBoard) === player) {
            return i
          } 

        }
      }

      // Try to take one of the corners, if they are free.
      let move = chooseRandomMoveFromList([0, 1, 6, 8])
      if(move !== null) {
        return move
      }

      // Try to take the center, if it is free.
      if(board.value[5] === null) {
        return 5
      }

      // Move on one of the sides.
      return chooseRandomMoveFromList([1, 3, 5, 7])
    }

    function playAgain() {
        currentTurn.value = player
        isGameOver.value = false
        board.value = [null, null, null, null, null, null, null, null,null]
    }
    
    function getCopyBoard() {
      let newBoard = []
      board.value.forEach(element => {
        newBoard.push(element)
      })

      return newBoard
    }

    function chooseRandomMoveFromList(moveList) {
      let possibleMoves = []
      moveList.forEach(el => {
        if(board.value[el] === null) {
          possibleMoves.push(el)
        }
      })

      if(possibleMoves.length !== 0) {
        return possibleMoves[[Math.floor(Math.random() * possibleMoves.length)]]
      }

      return null
    }

    return {
      setMark,
      board,
      currentTurn,
      isGameOver,
      playAgain,
      winner
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.popup-enter-active,
.popup-leave-active {
  transition: all 0.3s ease-out;
}

.popup-enter-from,
.popup-leave-to {
  transform: scale(.5);
  opacity: 0;
}
</style>
