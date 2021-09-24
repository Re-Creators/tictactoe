<template>
    <div>
        <button @click="play">PLAY</button>
    </div>
</template>
<script>
import {v4 as uuidV4} from 'uuid'

export default {
    methods : {
        play() {
            this.$router.push({name:'PlayerRoom', params:{roomId: uuidV4()}})
        }
    }
}
</script>