<template>
    <div class="notification">
      <transition name="popup">
        <win-popup v-if="isGameOver" v-on:play-again="playAgain" :winner="winner"/>
      </transition>

      <transition name="notif">
        <div class="fixed top-10 right-20  bg-secondary px-10 py-5 text-rob-roy rounded-xl text-lg" v-if="showNotif">
            {{ notifMessage }}
        </div>
      </transition>
    </div>
    <div class="w-96 board grid grid-cols-3">
      <div class="cell flex items-center justify-center text-burnt-sienna border-8 border-secondary w-32 h-32 cursor-pointer" v-for="index in 9" :key="index" @click="setMark(index-1)">
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
import {v4 as uuidV4} from 'uuid'

import { io } from "socket.io-client"
import {ref, watch} from 'vue'
import WinPopup from './WinPopup.vue'

export default {
  props : ['roomId'],
  emits: ['update-score', 'set-mark-indicator'],
  components :{
    WinPopup
  },
  setup(props, { emit }) {
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
    const playerId = uuidV4()
    const socket = io('http://localhost:3030')
    const isGameOver = ref(false)
    const board = ref([null, null, null, null, null, null, null, null,null])

    const notifMessage = ref("")
    const showNotif = ref(false)
    const currentTurn = ref("x")
    const myMark = ref(null)
    const winner = ref(null)
    const canPlay = ref(true)

     watch(currentTurn, () => {
      let isWin = checkWinner(board.value) 
      if(isWin !== null) {
        winner.value = isWin
        isGameOver.value = true
        canPlay.value = false
      }
    })

    // Join room socket io & subscribe to event
    socket.emit('join-room', props.roomId, playerId)
    
    socket.on('player-connected', (data) => {
      console.log("Player joined game")
      // Show notification only for who created the room
      if(data.id !== playerId) {
        // set first player mark
        myMark.value = 'x'
        displayMessageNofication("Player has joined the room!")
      }else{
        // second player mark
        myMark.value = "o"
      }

      emit('set-mark-indicator', myMark.value)
      canPlay.value = true

    })

    // listening event when player left room
    socket.on('player-disconnected', () => {
      // Reset game when other player left the room
      winner.value = myMark.value
      board.value = [null, null, null, null, null, null, null, null,null]
      isGameOver.value = true

      myMark.value = null
      displayMessageNofication("Player left the room!")
    })


    // listening event when player set mark
    socket.on('set-mark', (data) => {
      board.value[data] = currentTurn.value
      currentTurn.value = (currentTurn.value === 'x') ? 'o' : 'x'
      console.log("player clicked on " + data)
    })

    // Listening event when other player want to play again
    socket.on('ready-to-play', () => {
      canPlay.value = true
    })

    function displayMessageNofication(msg) {
      notifMessage.value = msg
      showNotif.value = true
      setTimeout(() => {
        showNotif.value = false
      }, 1000)

    }

    function setMark(coor) {
      if(myMark.value === currentTurn.value && canPlay.value){
        board.value[coor] = currentTurn.value
        currentTurn.value = (currentTurn.value === 'x') ? 'o' : 'x'
        socket.emit('player-click', props.roomId, coor)
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
      
      let draw = !board.includes(null)
      
      if(draw) return "tie"
      if(win) return winner

      return null
    }

    function playAgain() {
        // Tell other play im ready to play
        socket.emit('play-again', props.roomId)
        
        emit('update-score', winner.value) 
        winner.value = null
        currentTurn.value = "x"
        isGameOver.value = false
        board.value = [null, null, null, null, null, null, null, null,null]
    }
    
    return {
      isGameOver,
      board,
      showNotif,
      setMark,
      myMark,
      winner,
      notifMessage,
      playAgain
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

.notif-enter-active,
.notif-leave-active {
  transition: all 0.3s ease-out;
}

.notif-enter-from,
.notif-leave-to {
  transform: translateY(-50%);
  opacity: 0;
}
</style>
