<script setup lang="ts">
import Loading from "./components/Loading.vue";
import { RouterView, useRoute } from "vue-router";
import { NMessageProvider } from "naive-ui";

const route = useRoute()
</script>

<template>
  <NMessageProvider>
    <Loading />
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <div :key="(route.name as string)">
          <component :is="Component"></component>
        </div>
      </transition>
    </router-view>
  </NMessageProvider>
</template>

<style scoped>
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .3s ease-out;
}
</style>
