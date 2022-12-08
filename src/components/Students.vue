<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { students } from '@/util/global-data'
import { useRoute, useRouter } from 'vue-router';
import Header from "./Header.vue";

interface Student {
    id: string,
    group: string,
    studentID: string,
    img: string,
    name: string,
    favorite: boolean
}

const route = useRoute()
const router = useRouter()

const data = ref<Student[] | null>(null)

const handleAddFavorite = (id: string) => {
    let newData = JSON.parse(localStorage.getItem("students") as string);
    newData[id]['favorite'] = !newData[id]['favorite']
    localStorage.setItem("favorite", JSON.stringify("true"))
    localStorage.setItem("students", JSON.stringify(newData))
    getData()
}

const handleToWork = (id: string) => {
    router.push(`/${id}`)
}

const filterStudent = computed(() => {
    if (data.value) {
        if (route.meta.name === '科技組') {
            return data.value.filter((student) => student.group === '科技組')
        }
        else if (route.meta.name === '設計組') {
            return data.value.filter((student) => student.group === '設計組')
        } else {
            return data.value.filter((student) => student)
        }
    }
})

const getData = () => {
    data.value = [...students]
    if (localStorage.students === undefined) {
        localStorage.setItem("students", JSON.stringify(students))
    }
    else {
        data.value = JSON.parse(localStorage.getItem("students") as string)
    }
}

onMounted(() => {
    getData()
})
</script>

<template>
    <Header />
    <div class="content flex justify-evenly items-center flex-wrap mt-[3vh]">
        <div v-for="student of filterStudent" :key="student.id"
            class=" flex flex-col justify-center items-center lg:my-[2vh] md:my-[2vh] lg:w-[25vw] md:w-[80vw] lg:mx-[0.5vw]">
            <div class="box w-full relative overflow-hidden cursor-pointer" @click="handleToWork(student.id)">
                <div class="img">
                    <img :src="student.img" class="object-cover w-full h-full">
                </div>
            </div>
            <div class="w-full flex justify-between items-center">
                <div class="team-mate md:text-base lg:text-sm xl:text-base">{{
                        student.name
                }}</div>
                <div v-if="student.favorite">
                    <img src="../assets/img/fill-heart.png" class="w-full h-full cursor-pointer"
                        @click.stop="handleAddFavorite(student.id)">
                </div>
                <div v-else>
                    <img src="../assets/img/heart.png" class="w-full h-full cursor-pointer"
                        @click.stop="handleAddFavorite(student.id)">
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
@media (min-width:1024px) {
    .content {
        background: linear-gradient(90deg, #EDFFFC 0%, #CEE0F0 100%);
    }

    .img {
        transition: transform .2s;
    }

    .box:hover .img {
        transform: scale(1.3);
    }
}
</style>