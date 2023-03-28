<script setup lang="ts">
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import { useSettingState } from "@/util/useSetting";
const { getSettingLoding } = useSettingState();
</script>
<template>
    <div>
        <Loading v-model:active="getSettingLoding" :can-cancel="false" :is-full-page="true" :lockScroll="true"/>
    </div>
</template>

<style scoped>

</style>
