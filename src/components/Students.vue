<script setup lang="ts">
import firebaseConfig from '@/config/firebaseConfig'
import { getDatabase, ref as dref, onValue } from "firebase/database";
import { ref, computed, onMounted, watchEffect } from 'vue'
import { students } from '@/util/global-data'
import { useRoute, useRouter } from 'vue-router';
import Header from "./Header.vue";
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

const route = useRoute()
const router = useRouter()

const data = ref<Student[]>([])
const currentPage = ref<number>(1)
const page = ref<number>(1)
const pageSize = ref<number>(15);
const c1 = ref<number>(0)
const c2 = ref<number>(0)
const input = ref<string>('')


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
    if (input.value) {
        return data.value.filter(student => student.name.includes(input.value)).slice(pageSize.value * currentPage.value - pageSize.value,
            pageSize.value * currentPage.value)
    }
    else {
        if (route.meta.name === '科技組作品') {
            return data.value.filter((student) => student.group === '科技組').slice(pageSize.value * currentPage.value - pageSize.value,
                pageSize.value * currentPage.value)
        }
        else if (route.meta.name === '設計組作品') {
            return data.value.filter((student) => student.group === '設計組').slice(pageSize.value * currentPage.value - pageSize.value,
                pageSize.value * currentPage.value)
        }
        else if (route.meta.name === '全部作品') {
            return data.value.slice(pageSize.value * currentPage.value - pageSize.value,
                pageSize.value * currentPage.value)
        }
    }
})

const filterPage = computed(() => {
    if (input.value) {
        return page.value
    }
    else {
        if (route.meta.name === '全部作品') {
            return Math.ceil(data.value.length / pageSize.value)
        }
        else if (route.meta.name === '科技組作品') {
            return Math.ceil(c1.value / pageSize.value)
        }
        else if (route.meta.name === '設計組作品') {
            return Math.ceil(c2.value / pageSize.value)
        }
    }
})

const handlePage = (page: number) => {
    if (page === null) {
        return
    }
    currentPage.value = page;
};

const getData = () => {
    c1.value = 0
    c2.value = 0
    data.value = [...students]
    data.value.filter(student => {
        if (student.group === '科技組') {
            c1.value += 1
        } else if (student.group === '設計組') {
            c2.value += 1
        }
    })
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

watchEffect(() => {
    onValue(dref(db, 'search/'), (snapshot) => {
        const search = snapshot.val();
        if (search.input) {
            input.value = search.input
            page.value = 1
        }
        else {
            if (route.meta.name === '全部作品') {
                page.value = Math.ceil(data.value.length / pageSize.value)
            }
            else if (route.meta.name === '科技組作品') {
                page.value = Math.ceil(c1.value / pageSize.value)
            }
            else if (route.meta.name === '設計組作品') {
                page.value = Math.ceil(c2.value / pageSize.value)
            }
        }
    });
})
</script>

<template>
    <Header />
    <div class="content flex justify-evenly items-center flex-wrap">
        <div v-for="student of filterStudent" :key="student.id"
            class="flex flex-col justify-center items-center lg:my-[2vh] md:my-[2vh] lg:w-[25vw] md:w-[80vw] lg:mx-[0.5vw]">
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
    <div class="page w-full h-full flex justify-center items-center my-[1vh]">
        <NPagination v-model:page="currentPage" :page-count="filterPage" :onUpdatePage="handlePage">
        </NPagination>
    </div>
</template>

<style scoped>
.content {
    background: linear-gradient(90deg, #EDFFFC 0%, #CEE0F0 100%);
}

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

@media screen and (min-width:411px) and (max-width: 414px) {
    .page {
        margin-bottom: 8vh;
    }
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