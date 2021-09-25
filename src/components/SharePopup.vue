<template>
    <div class="w-4/5 md:w-1/3 bg-secondary px-10 py-10 rounded-lg">
        <h1 class="text-white mb-3">SHARE THIS URL WITH YOUR FRIEND</h1>
        <div class="w-full bg-primary pl-3 pr-10 py-5 relative overflow-elipsis">
            <p class="w-full text-rob-roy truncate">{{ getFullPath }}</p>
            <button @click="tes" class="absolute right-3 top-0 py-5"><span class="material-icons text-burnt-sienna">content_copy</span></button>
        </div>
    </div>
</template>

<script>
export default {
    mounted() {
    },
    methods: {
        tes() {
        console.log(this.getFullPath)

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