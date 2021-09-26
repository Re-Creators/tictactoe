<template>
  <div class="w-full h-screen flex flex-col items-center justify-between py-14 bg-primary">
    <!-- Winner Modal -->
    <teleport to="body">
      <transition name="popup">
        <div class="absolute inset-0 flex items-center justify-center bg-overlay" @click="showModal = false" v-if="showModal">
          <mode-popup @click.stop @dismiss-modal="dismissModal"/>
        </div>
      </transition>
    </teleport>
    <!-- Share Modal -->
    <teleport to="body">
      <transition name="popup">
        <div class="absolute inset-0 flex items-center justify-center bg-overlay" @click="shareModal = false" v-if="shareModal">
          <share-popup @click.stop/>
        </div>
      </transition>
    </teleport>
    <div class="w-full md:w-4/5 px-5 md:px-0 flex justify-between text-rob-roy md:text-2xl font-bold">
      <button @click="shareModal = true">INVITE PEOPLE</button>
      <button @click="showModal = true">CHANGE</button>
    </div>
    <!-- Board -->
    <VSPlayer 
        @update-score="updateScore" 
        @set-mark-indicator="setMarkIndicator"
        @reset-score="resetScore" 
        :roomId="roomId" 
    />
    
    <div class="grid grid-cols-3 text-rob-roy md:text-2xl px-5 md:px-0 gap-8">
      <div class="text-center">
        <div class="font-semibold h-14 md:h-auto" :class="[myMark === 'x' ? 'text-burnt-sienna' : '']">PLAYER 1 (X)</div>
        <div class="font-bold ">{{ score.x }}</div>
      </div>
      <div class="text-center">
        <div class="font-semibold h-14 md:h-auto">TIE</div>
        <div class="font-bold">{{ score.tie }}</div>
      </div>
      <div class="text-center">
        <div class="font-semibold h-14 md:h-auto" :class="[myMark === 'o' ? 'text-burnt-sienna' : '']">PLAYER 2 (O)</div>
        <div class="font-bold">{{ score.o }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import VSPlayer from '../components/VSPlayer.vue'
import ModePopup from '../components/ModePopup.vue'
import SharePopup from '../components/SharePopup.vue'

export default {
  name: 'App',
  components: {
    VSPlayer,
    ModePopup,
    SharePopup
  },
  data() {
    return {
      score : {
        x : 0,
        o : 0,
        tie : 0
      },
      myMark : "",
      showModal : false,
      shareModal : false
    }
  },
  methods: {
    updateScore(winner) {
      this.score[winner]++
    },
     setMarkIndicator(mark) {
      this.myMark = mark
    },
    dismissModal() {
      this.showModal = false
    },
    resetScore() {
      this.score = {
        x : 0,
        o : 0,
        tie : 0
      }
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
