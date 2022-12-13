<script setup lang="ts">
import firebaseConfig from '@/config/firebaseConfig'
import { getDatabase, ref as dref, onValue } from "firebase/database";
import { computed, onMounted, ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { students } from '@/util/global-data'
import Header from "../components/Header.vue";
import { NPagination } from 'naive-ui'

firebaseConfig
const db = getDatabase();

interface Student {
    id: string,
    group: string,
    studentID: string,
    img: string,
    name: string,
    favorite: boolean
}

const router = useRouter()

const isFavorite = ref<boolean>(false)
const data = ref<Student[]>([])
const currentPage = ref<number>(1);
const page = ref<number>(1);
const pageSize = ref<number>(6);
const favoriteCount = ref<number>(0)
const input = ref<string>('')

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

const handlePage = (page: number) => {
    if (page === null) {
        return
    }
    currentPage.value = page;
};

const filterStudent = computed(() => {
    if (input.value) {
        return data.value.filter(student => {
            if (student.favorite === true) {
                return student.name.includes(input.value)
            }
        }).slice(pageSize.value * currentPage.value - pageSize.value,
            pageSize.value * currentPage.value)
    }
    return data.value.filter(student => student.favorite === true).slice(pageSize.value * currentPage.value - pageSize.value,
        pageSize.value * currentPage.value)
})

const filterPage = computed(() => {
    if (input.value) {
        return page.value
    }
    return Math.ceil(favoriteCount.value / pageSize.value)
})

const getData = () => {
    if (localStorage.students === undefined) {
        localStorage.setItem("students", JSON.stringify(students))
    }
    else {
        favoriteCount.value = 0
        data.value = JSON.parse(localStorage.getItem("students") as string)
        data.value?.find(group => {
            if (group.favorite === true) {
                isFavorite.value = true
            }
        })
        data.value.filter(student => {
            if (student.favorite === true) {
                favoriteCount.value += 1
            }
        })
    }
}

onMounted(() => {
    getData()
})

watchEffect(() => {
    if (!filterStudent.value) {
        return
    }
    if (filterStudent.value?.length <= 0 && currentPage.value > 1) {
        currentPage.value -= 1
    }
    onValue(dref(db, 'search/'), (snapshot) => {
        const search = snapshot.val();
        if (search.input) {
            input.value = search.input
            page.value = 1
        } else {
            page.value = Math.ceil(favoriteCount.value / pageSize.value)
        }
    });

})
</script>

<template>
    <Header />
    <div v-if="isFavorite" class="w-full h-full flex justify-evenly flex-wrap">
        <div v-for="student of filterStudent" :key="student.id"
            class="flex flex-col items-center lg:my-[2vh] md:my-[2vh] lg:w-[25vw] md:w-[80vw] lg:mx-[0.5vw]">
            <div class="box w-full relative overflow-hidden cursor-pointer" @click="handleToWork(student.id)">
                <div class="img">
                    <img :src="student.img" class="object-cover w-full h-full">
                </div>
            </div>
            <div class="w-full flex justify-between items-center mt-[1vh]">
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
        class="content w-full h-auto flex justify-center items-center mx-auto my-[3vh] xl:text-2xl lg:text-xl md:text-lg sm:!text-base text-[#EB8C4A] font-bold">
        您尚未有任何收藏
    </div>
    <div class="w-full" :class="isFavorite ? 'md:hidden' : 'lg:flex'">
        <div class="absolute bottom-1/4 md:bottom-[10%] -left-[10%] -z-10">
            <img src="../assets/img/one.png" class="w-[18vw] object-cover" alt="">
        </div>
        <div class="absolute bottom-0 -left-[5%] -z-10">
            <img src="../assets/img/two.png" class="w-[20vw] object-cover" alt="">
        </div>
        <div class="absolute bottom-[20%] md:bottom-[8%] right-0 -z-10">
            <img src="../assets/img/three.png" class="w-[18vw] object-cover" alt="">
        </div>
        <div class="absolute bottom-0 right-0 -z-10">
            <img src="../assets/img/four.png" class="w-[20vw] object-cover" alt="">
        </div>
    </div>
    <div v-if="isFavorite" class="flex justify-center items-center h-[5vh]">
        <NPagination v-model:page="currentPage" :page-count="filterPage" :onUpdatePage="handlePage">
        </NPagination>
    </div>
</template>



<style scoped>
.n-pagination {
    --n-item-border-radius: 5px !important;
    --n-item-font-size: 16px !important;
    --n-item-text-color-active: white !important;
    --n-item-border-active: #EB8C4A !important;
    --n-item-text-color-active: white !important;
    --n-item-color-active-hover: #EB8C4A !important;
    --n-item-text-color: #EB8C4A !important;
    --n-item-border: 1px solid #EB8C4A !important;
    --n-item-border-hover: 1px solid #EB8C4A !important;
    --n-item-border-pressed: 1px solid #EB8C4A !important;
    --n-item-text-color-hover: #EB8C4A !important;
    --n-item-text-color-pressed: #EB8C4A !important;
    --n-item-color-active: #EB8C4A !important;
    --n-button-icon-color: #EB8C4A !important;
    --n-button-icon-color-hover: #EB8C4A !important;
    --n-button-icon-color-pressed: #EB8C4A !important;
}

@media (min-width:1024px) {
    .img {
        transition: transform .2s;
    }

    .box:hover .img {
        transform: scale(1.3);
    }
}
</style>