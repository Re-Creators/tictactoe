<template>
    <div class="fixed z-20 inset-0 bg-overlay flex justify-center items-center">
        <div class="w-2/5 h-3/5 bg-secondary pt-5 flex flex-col items-center justify-between relative text-white rounded-xl">
            <div class="w-full h-32">
                <img src="@/assets/winners.svg" alt="" class="w-1/2 mx-auto">
            </div>
            <div class="text-5xl font-bold  text-center mt-8">
                <h1 class="capitalize">{{ winner }}</h1>
                <h1 class="mt-3" v-if="winner !== 'tie'">Win</h1>
            </div>
            <button class=" bg-burnt-sienna mb-5 py-5 px-20 text-xl font-bold rounded-xl hover:bg-btn-hover active:bg-btn-click" @click="$emit('play-again')">Play Again</button>
        </div>
    </div>
</template>
<script>
export default {
    props : ['winner']
}
</script>