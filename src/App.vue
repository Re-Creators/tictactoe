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

</style>