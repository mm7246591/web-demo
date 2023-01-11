<script setup lang="ts">
import { students } from '@/util/global-data'
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()

const filterStudent = computed(() => {
    return students.filter(student => student.studentID === route.params.id)
})

</script>

<template>
    <div>
        <div v-for="student of filterStudent" :key="student.id">
            <iframe :src="student.link" class="iframe" frameborder="0" scrolling="no">
            </iframe>
        </div>
    </div>
</template>

<style scoped>
.iframe {
    width: 100vw;
    height: 100vh;
}
</style>