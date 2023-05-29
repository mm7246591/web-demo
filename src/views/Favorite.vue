<script setup lang="ts">
import firebaseConfig from '@/config/firebaseConfig'
import { getDatabase, ref as dref, onValue } from "firebase/database";
import { computed, onMounted, ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { Groups } from '@/util/global-data'
import Header from "../components/Header.vue";
import { NPagination } from 'naive-ui'

firebaseConfig
const db = getDatabase();

interface Group {
    id: string,
    group: string,
    number: string
    img: string,
    name: string,
    favorite: boolean
}

const router = useRouter()

const isFavorite = ref<boolean>(false)
const data = ref<Group[]>([])
const currentPage = ref<number>(1);
const page = ref<number>(1);
const pageSize = ref<number>(6);
const favoriteCount = ref<number>(0)
const input = ref<string>('')

const handleToWork = (id: string) => {
    router.push(`/${id}`)
}

const handleAddFavorite = (id: string) => {
    let newData = JSON.parse(localStorage.getItem("groups") as string);
    newData[id]['favorite'] = !newData[id]['favorite']
    isFavorite.value = false
    localStorage.setItem("groups", JSON.stringify(newData))
    getData()
}

const handlePage = (page: number) => {
    if (page === null) {
        return
    }
    currentPage.value = page;
};

const filterGroup = computed(() => {
    if (input.value) {
        return data.value.filter(item => {
            if (item.favorite === true) {
                return item.name.includes(input.value)
            }
        }).slice(pageSize.value * currentPage.value - pageSize.value,
            pageSize.value * currentPage.value)
    }
    return data.value.filter(item => item.favorite === true).slice(pageSize.value * currentPage.value - pageSize.value,
        pageSize.value * currentPage.value)
})

const filterPage = computed(() => {
    if (input.value) {
        return page.value
    }
    return Math.ceil(favoriteCount.value / pageSize.value)
})

const getData = () => {
    if (localStorage.groups === undefined) {
        localStorage.setItem("groups", JSON.stringify(Groups))
    }
    else {
        favoriteCount.value = 0
        data.value = JSON.parse(localStorage.getItem("groups") as string)
        data.value?.find(item => {
            if (item.favorite === true) {
                isFavorite.value = true
            }
        })
        data.value.filter(item => {
            if (item.favorite === true) {
                favoriteCount.value += 1
            }
        })
    }
}

onMounted(() => {
    getData()
})

watchEffect(() => {
    if (!filterGroup.value) {
        return
    }
    if (filterGroup.value?.length <= 0 && currentPage.value > 1) {
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
        <div v-for="group of filterGroup" :key="group.id"
            class="flex flex-col items-center lg:my-[2vh] md:my-[2vh] lg:w-[25vw] md:w-[80vw] lg:mx-[0.5vw]">
            <div class="box w-full relative overflow-hidden cursor-pointer" @click="handleToWork(group.id)">
                <div class="img">
                    <img src="https://fakeimg.pl/300/" class="object-cover w-full h-full">
                </div>
                <div class="group md:text-base lg:text-lg font-bold">
                    {{ group.number }}
                </div>
            </div>
            <div class="w-full flex justify-between items-center mt-[1vh]">
                <div class="team-mate md:text-base lg:text-sm xl:text-base">{{
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
    <div v-else
        class="content w-full h-auto flex justify-center items-center mx-auto my-[3vh] xl:text-2xl lg:text-xl md:text-lg sm:!text-base text-[rgb(84,112,198)] font-bold">
        您尚未有任何收藏
    </div>
    <div v-if="isFavorite" class="flex justify-center items-center h-[5vh]">
        <NPagination v-model:page="currentPage" :page-count="filterPage" :onUpdatePage="handlePage">
        </NPagination>
    </div>
</template>



<style scoped>
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
</style>