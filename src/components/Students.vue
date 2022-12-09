<script setup lang="ts">
import { ref, computed, onMounted, watchEffect } from 'vue'
import { students } from '@/util/global-data'
import { useRoute, useRouter } from 'vue-router';
import Header from "./Header.vue";
import { NPagination } from 'naive-ui'

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
const pageSize = ref<number>(5);

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
        } else if (route.meta.name === '全部作品') {
            if (pageSize.value % 2 === 0) {
                return data.value.slice(pageSize.value * currentPage.value - pageSize.value,
                    pageSize.value * currentPage.value + 1)
            } else if (pageSize.value % 2 === 1) {
                return data.value.slice(pageSize.value * currentPage.value - pageSize.value,
                    pageSize.value * currentPage.value)
            }
        }
    }
})

const filterPage = computed(() => {
    if (route.meta.name === '全部作品') {
        return Math.floor(data.value.length / pageSize.value)
    }
    else {
        if (filterStudent.value) {
            return Math.floor(filterStudent.value.length / pageSize.value)
        }
    }
})

const handlePage = (page: number) => {
    if (page === null) {
        return
    }
    currentPage.value = page;
    localStorage.setItem("page", JSON.stringify(page))
};

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
    if (window.name == "") {
        window.name = "isReload";
    } else if (window.name == "isReload") {
        currentPage.value = parseInt(JSON.parse(localStorage.getItem("page") as string))
    }
})

watchEffect(() => {
})
</script>

<template>
    <Header />
    <div class="content flex justify-evenly items-center flex-wrap mt-[3vh]">
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
    <div class="flex justify-center items-center lg:h-[5vh]">
        <NPagination v-model:page="currentPage" :page-count="filterPage" :onUpdatePage="handlePage">
        </NPagination>
        <!-- <el-pagination :page-zize="pageSize" :currentPage="currentPage" layout="pager" background
            :page-count="Math.floor(data.length / pageSize)" @current-change="handlePage" /> -->
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

    /* .el-pagination {
        --el-pagination-font-size: 20px;
        --el-pagination-button-color: #EB8C4A;
        --el-pagination-button-bg-color: white;
        --el-color-primary: #EB8C4A;
        --el-pagination-border-radius: 5px;
    } */

    .n-pagination {
        --n-item-border-radius: 5px !important;
        --n-item-font-size: 20px !important;
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
    }
}
</style>