<template>
    <div class="w-4/5 md:w-1/2 lg:w-2/5 bg-secondary pt-5 flex flex-col items-center justify-between relative text-white rounded-xl">
        <div class="w-4/5 md:w-full h-48">
            <img src="@/assets/winners.svg" alt="" class="w-full h-full">
        </div>
        <div class="text-4xl md:text-5xl font-bold text-center mb-10 md:my-8">
            <h1 class="capitalize">{{ winner }}</h1>
            <h1 class="mt-3" v-if="winner !== 'tie'">Win</h1>
        </div>
        <button class=" bg-burnt-sienna mb-5 py-3 px-5 text-base md:py-5 md:px-20 md:text-xl font-bold rounded-xl hover:bg-btn-hover active:bg-btn-click" @click="$emit('play-again')">Play Again</button>
    </div>
</template>
<script>
export default {
    props : ['winner']
}
</script>