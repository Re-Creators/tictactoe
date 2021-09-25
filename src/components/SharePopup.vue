<template>
    <div class="w-4/5 md:w-1/3 bg-secondary px-10 py-10 rounded-lg">
        <h1 class="text-white mb-3">SHARE THIS URL WITH YOUR FRIEND</h1>
        <div class="w-full bg-primary pl-3 pr-10 py-5 relative overflow-elipsis">
            <p class="w-full text-rob-roy truncate">{{ getFullPath }}</p>
            <button @click="copy" class="absolute right-3 top-0 py-5"><span class="material-icons text-burnt-sienna">content_copy</span></button>

            <!-- Copy notification -->
            <transition name="slideup">
                <div class="absolute text-sm right-0 top-16 py-2 px-5 rounded-lg text-white" style="background-color:#152D35" v-if="copied">Copied!</div>
            </transition>
        </div>
    </div>
</template>

<script>
import { copyText } from 'vue3-clipboard'

export default {
    data() {
        return {
            copied : false
        }
    },
    watch : {
        copied() {
            if(this.copied) {
                setTimeout(() => {
                    this.copied = false
                }, 2000)
            }
        }
    },
    methods: {
        copy() {
            copyText(this.getFullPath, undefined, (error) => {
                if (error) {
                    alert('Can not copy')
                    console.log(error)
                } else {
                    this.copied = true
                    console.log("Siccess copy")
                }
            })
        }
    },
    computed: {
        getFullPath() {
            return window.location.origin + this.$route.fullPath
        }
    }
}
</script>
    
<style>

</style>