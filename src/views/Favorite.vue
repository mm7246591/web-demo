<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { students } from '@/util/global-data'
import Header from "../components/Header.vue";

interface Student {
    id: string,
    group: string,
    studentID: string,
    img: string,
    name: string,
    favorite: boolean
}

const isFavorite = ref<boolean>(false)
const data = ref<Student[] | null>(null)
const router = useRouter()

const handleToWork = (id: string) => {
    router.push(`/${id}`)
}

const handleAddFavorite = (id: string) => {
    let newData = JSON.parse(localStorage.getItem("students") as string);
    newData[id]['favorite'] = !newData[id]['favorite']
    isFavorite.value = false
    localStorage.setItem("students", JSON.stringify(newData))
    getData()
}

const filterStudent = computed(() => {
    if (data.value) {
        return data.value.filter(student => {
            if (student.favorite === true) {
                return student.favorite === true
            }
        })
    }
})

const getData = () => {
    data.value = [...students]
    if (localStorage.students === undefined) {
        localStorage.setItem("students", JSON.stringify(students))
    }
    else {
        data.value = JSON.parse(localStorage.getItem("students") as string)
        data.value?.find(group => {
            if (group.favorite === true) {
                isFavorite.value = true
            }
        })
    }
}

onMounted(() => {
    getData()
})

</script>

<template>
    <Header />
    <div class="w-full overflow-hidden">
        <div v-if="isFavorite" class="w-full h-full flex justify-evenly flex-wrap">
            <div v-for="student of filterStudent" :key="student.id"
                class="flex flex-col items-center lg:my-[2vh] md:my-[2vh] lg:w-[25vw] md:w-[80vw] lg:mx-[0.5vw]">
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
        <div v-else
            class="content w-full h-auto flex justify-center items-center mx-auto my-[3vh] xl:text-2xl lg:text-xl sm:!text-base md:text-lg text-[#EB8C4A]">
            您尚未有任何收藏
        </div>
    </div>
    <div class="w-full">
        <div class="one absolute bottom-0 -left-20 -z-10">
            <img src="../assets/img/one.png" class="object-cover" alt="">
        </div>
        <div class="two absolute bottom-0 -left-20 -z-10">
            <img src="../assets/img/two.png" class="object-cover" alt="">
        </div>
        <div class="three absolute  bottom-0 right-0 -z-10">
            <img src="../assets/img/three.png" class="object-cover" alt="">
        </div>
        <div class="four absolute bottom-0 right-0 -z-10">
            <img src="../assets/img/four.png" class="object-cover" alt="">
        </div>
    </div>
</template>



<style scoped>
@media (min-width:1024px) {
    .img {
        transition: transform .2s;
    }

    .box:hover .img {
        transform: scale(1.3);
    }
}
</style>