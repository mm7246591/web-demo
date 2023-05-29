<script setup lang="ts">
import firebaseConfig from '@/config/firebaseConfig'
import { getDatabase, ref as dref, onValue, update } from "firebase/database";
import { ref, computed, onMounted, watchEffect } from 'vue'
import { Groups } from '@/util/global-data'
import { useRoute } from 'vue-router';
import Header from "./Header.vue";
import { NPagination } from 'naive-ui'

firebaseConfig
const db = getDatabase();

interface Group {
    id: string
    group: string
    number: string
    img: string
    name: string
    link: string
    favorite: boolean
}

const route = useRoute()

const data = ref<Group[]>([])
const currentPage = ref<number>(1)
const page = ref<number>(1)
const pageSize = ref<number>(15);
const c1 = ref<number>(0)
const c2 = ref<number>(0)
const input = ref<string>('')


const handleAddFavorite = (id: string) => {
    let newData = JSON.parse(localStorage.getItem("groups") as string);
    newData[id]['favorite'] = !newData[id]['favorite']
    localStorage.setItem("favorite", JSON.stringify("true"))
    localStorage.setItem("groups", JSON.stringify(newData))
    getData()
}

const filterGroup = computed(() => {
    if (input.value) {
        return data.value.filter(item => item.name.includes(input.value)).slice(pageSize.value * currentPage.value - pageSize.value,
            pageSize.value * currentPage.value)
    }
    else {
        if (route.meta.name === '科技組作品') {
            return data.value.filter((item) => item.group === '科技組').slice(pageSize.value * currentPage.value - pageSize.value,
                pageSize.value * currentPage.value)
        }
        else if (route.meta.name === '設計組作品') {
            return data.value.filter((item) => item.group === '設計組').slice(pageSize.value * currentPage.value - pageSize.value,
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

const handleRoute = () => {
    update(dref(db, 'search/'), {
        input: ""
    });
}

const getData = () => {
    c1.value = 0
    c2.value = 0
    data.value = [...Groups]
    data.value.filter(item => {
        if (item.group === '科技組') {
            c1.value += 1
        } else if (item.group === '設計組') {
            c2.value += 1
        }
    })
    if (localStorage.groups === undefined) {
        localStorage.setItem("groups", JSON.stringify(Groups))
    }
    else {
        data.value = JSON.parse(localStorage.getItem("groups") as string)
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
                input.value = search.input
            }
            else if (route.meta.name === '科技組作品') {
                page.value = Math.ceil(c1.value / pageSize.value)
                input.value = search.input
            }
            else if (route.meta.name === '設計組作品') {
                page.value = Math.ceil(c2.value / pageSize.value)
                input.value = search.input
            }
        }
    });
})
</script>

<template>
    <Header />
    <div class="content flex justify-evenly items-center flex-wrap">
        <div v-for="group of filterGroup" :key="group.id"
            class="flex flex-col justify-center items-center lg:my-[2vh] md:my-[2vh] lg:w-[25vw] md:w-[80vw] lg:mx-[0.5vw]">
            <div class="box w-full relative overflow-hidden cursor-pointer" @click="handleRoute">
                <a v-if="group.link" :href="group.link">
                    <img src="https://fakeimg.pl/300/" class="object-cover w-full h-full" />
                </a>
                <a v-else>
                    <img src="https://fakeimg.pl/300/" class="object-cover w-full h-full" alt="未交作業" />
                </a>
                <div class="group md:text-base lg:text-lg font-bold">
                    {{ group.number }}
                </div>
            </div>
            <div class="w-full flex justify-between items-center mt-[1vh]">
                <div class="team-mate w-[90%] md:text-base lg:text-sm">{{
                    group.name
                }}</div>
                <div v-if="group.favorite" class="w-[32px]">
                    <img src="../assets/img/fill-star.png" class="cursor-pointer" @click.stop="handleAddFavorite(group.id)">
                </div>
                <div v-else class="w-[32px]">
                    <img src="../assets/img/star.png" class="cursor-pointer" @click.stop="handleAddFavorite(group.id)">
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
    background: #F2ECE0;
}

.box .group {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 5vh;
    bottom: 0;
    left: 0;
    color: gray;
    background-color: rgba(255, 255, 255, 0.5);
    box-shadow: 0 0 5px rgba(255, 255, 255, .9);
}

.n-pagination {
    --n-item-border-radius: 5px !important;
    --n-item-font-size: 16px !important;
    --n-item-text-color-active: white !important;
    --n-item-border-active: rgb(84, 112, 198) !important;
    --n-item-text-color-active: white !important;
    --n-item-color-active-hover: rgb(84, 112, 198) !important;
    --n-item-text-color: rgb(84, 112, 198) !important;
    --n-item-border: 1px solid rgb(84, 112, 198) !important;
    --n-item-border-hover: 1px solid rgb(84, 112, 198) !important;
    --n-item-border-pressed: 1px solid rgb(84, 112, 198) !important;
    --n-item-text-color-hover: rgb(84, 112, 198) !important;
    --n-item-text-color-pressed: rgb(84, 112, 198) !important;
    --n-item-color-active: rgb(84, 112, 198) !important;
    --n-button-icon-color: rgb(84, 112, 198) !important;
    --n-button-icon-color-hover: rgb(84, 112, 198) !important;
    --n-button-icon-color-pressed: rgb(84, 112, 198) !important;
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
