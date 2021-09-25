<template>
  <router-view v-slot="{ Component }">
    <transition 
      name="slideup"
      mode="out-in">
      <component :is="Component"></component>
    </transition>
  </router-view>
</template>
<style scoped>
.slideup-enter-active,
.slideup-leave-active {
  transition: all .7s ease-out;
}

.slideup-enter-from,
.slideup-leave-to {
  opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
}
</style>