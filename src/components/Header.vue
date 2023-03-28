<script setup lang="ts">
import firebaseConfig from '@/config/firebaseConfig'
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { getDatabase, ref as dref, update } from "firebase/database";
import { onMounted, ref, watchEffect } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { NDropdown, useMessage } from 'naive-ui'
import { Dialog, showConfirmDialog } from 'vant';

firebaseConfig
const db = getDatabase();
const provider = new GoogleAuthProvider();
const auth = getAuth();

const route = useRoute()
const message = useMessage()
const search = ref<string>('')
const userName = ref<string | null>(null)
const show = ref<boolean>(false)
const showConfirm = ref<boolean>(false)
const height = ref<number>(0)
const options = [
    {
        label: '登出',
        key: '登出',
    },
]

const handleScroll = () => {
    height.value = window.scrollY;
};

const handleClickMenu = () => {
    show.value = true
}

const handleCancelMenu = () => {
    show.value = false
}

const handleSearch = () => {
    const numberRegex = /^[0-9\s]*$/;
    if (!search.value || numberRegex.test(search.value) === false) {
        update(dref(db, 'search/'), {
            input: ""
        });
        return
    }
    update(dref(db, 'search/'), {
        input: search.value
    });
}

const handleSignIn = async () => {
    await signInWithPopup(auth, provider)
        .then((result) => {
            update(dref(db, `user/${result.user.displayName}`), {
                uid: result.user.uid,
                name: result.user.displayName,
                email: result.user.email,
            });
            localStorage.setItem("user", JSON.stringify(result.user.displayName))
            userName.value = result.user.displayName
        }).catch((error) => {
            console.log(error)
        });
}

const handleWebSignOut = () => {
    message.success("已成功登出！")
    signOut(auth).then(() => {
        update(dref(db, `user/${userName.value}`), {
            uid: null,
            name: null,
            email: null
        });
        localStorage.removeItem("user")
        userName.value = null
    }).catch((error) => {
        console.log(error)
    });
}

const handlePhoneSignOut = async () => {
    showConfirm.value = true
    await showConfirmDialog({
        title: "確定要登出嗎？",
        confirmButtonText: "確定",
        cancelButtonText: "取消"
    })
        .then(() => {
            signOut(auth).then(() => {
                update(dref(db, `user/${userName.value}`), {
                    uid: null,
                    name: null,
                    email: null
                });
                localStorage.removeItem("user")
                userName.value = null
                show.value = false
                message.success("已成功登出！")
            }).catch((error) => {
                console.log(error)
            });
            showConfirm.value = true
        })
        .catch(() => {
            showConfirm.value = true
        });
}

onMounted(() => {
    if (window.name == "") {
        window.name = "isReload";
    } else if (window.name == "isReload") {
        update(dref(db, 'search/'), {
            input: ""
        });
    }
    localStorage.user === undefined ? userName.value = "" : userName.value = JSON.parse(localStorage.getItem("user") as string)
    window.addEventListener("scroll", handleScroll);
})
watchEffect(() => {
    if (height.value !== 0) {
        show.value = false
    }
})
</script>

<template>
    <header class="md:hidden lg:w-full lg:h-[10vh]">
        <div
            class="lg:w-full lg:h-full flex justify-evenly items-center lg:text-base xl:text-lg text-[#EB8C4A] font-bold">
            <div class="flex justify-center items-center pt-[20px]">
                <div v-if="userName">
                    <NDropdown trigger="click" :options="options" @select="handleWebSignOut">
                        <button>{{
                            userName
                        }}</button>
                    </NDropdown>
                </div>
                <img v-else src="../assets/img/member.png"
                    class="lg:w-[30px] lg:h-[30px] lg:mx-[.5vw] object-cover cursor-pointer" @click="handleSignIn">
            </div>
            <RouterLink to="/">全部作品</RouterLink>
            <RouterLink to="/c1">科技組作品</RouterLink>
            <RouterLink to="/c2">設計組作品</RouterLink>
            <div class="flex flex-col items-center">
                <div class="text-4xl font-['Poller_One',cursive]">YZUIC</div>
                <div>基礎程式設計</div>
            </div>
            <RouterLink to="/vote">作品投票</RouterLink>
            <RouterLink to="/favorite">我的收藏</RouterLink>
            <div class="relative pt-[20px]">
                <font-awesome-icon :icon="['fa', 'magnifying-glass']"
                    class="absolute top-1/2 left-2 w-[18px] h-[18px] outline-none" />
                <input type="text" id="search" name="search" v-model="search" autocomplete="off"
                    class="w-[249px] h-[30px] pl-[30px] rounded-[100px] border border-[#EB8C4A]" @input="handleSearch">
            </div>
        </div>
    </header>
    <header class="lg:hidden md:w-full md:h-[8vh] ">
        <div class="flex items-center">
            <font-awesome-icon :icon="['fa', 'bars']" class="md:w-[32px] md:h-[32px] md:mx-[2vw] md:my-[2vh] "
                @click="handleClickMenu" />
            <div class="w-full text-end text-lg text-[#EB8C4A] font-bold mr-[2vw]">{{ `/${route.meta.name}` }}</div>
        </div>
        <transition v-show="show" name="slide" mode="out-in" appear>
            <div
                class="md:w-[200px] sm:!w-[180px] h-full flex flex-col justify-between items-center fixed top-0 md:text-lg sm:!text-base bg-[white] text-[#EB8C4A] font-bold z-30">
                <nav class="flex flex-col md:mt-[2vh]">
                    <div class="flex justify-center items-center md:my-[3vh]">
                        <div v-if="userName">
                            {{ userName }}
                        </div>
                        <div v-else>
                            <img src="../assets/img/member.png"
                                class="md:w-[24px] md:h-[24px] md:mx-auto object-cover cursor-pointer"
                                @click="handleSignIn">
                        </div>
                    </div>
                    <RouterLink to="/">全部作品</RouterLink>
                    <RouterLink to="/c1">科技組作品</RouterLink>
                    <RouterLink to="/c2">設計組作品</RouterLink>
                    <RouterLink to="/vote">作品投票</RouterLink>
                    <RouterLink to="/favorite">我的收藏</RouterLink>
                </nav>
                <div v-if="userName" class="h-[10vh]">
                    <div @click="handlePhoneSignOut">{{ '登出' }}</div>
                </div>
                <Dialog :overlay="false">
                </Dialog>
            </div>
        </transition>
        <div v-show="show" class="mask lg:hidden md:flex fixed top-0 w-full h-full bg-[black] opacity-50 z-20"
            @click="handleCancelMenu"></div>
    </header>
</template>


<style scoped>
nav>a {
    margin: 3vh 0;
}

.slide-enter-active {
    transition: all .3s ease-in;
}

.slide-enter-from {
    transform: translateX(-100%);
}

.slide-leave-active {
    transition: all .3s ease-out;
}

.slide-leave-to {
    transform: translateX(-100%);
}

@media (min-width:1024px) {

    a {
        padding-top: 20px;
        display: flex;
        align-items: center;
    }

    .router-link-exact-active {
        background: url('../assets/img/Cloud.png') no-repeat top center;
        border-bottom: 3px solid #FF9898;
    }

    .animate-one {
        opacity: 0;
        animation: fadeIn .5s linear forwards;
    }

    .animate-two a {
        opacity: 0;
        animation: fadeIn .5s linear forwards;
    }

    .animate-two a:nth-child(1) {
        animation-delay: .3s;
    }

    .animate-two a:nth-child(2) {
        animation-delay: .5s;
    }

    .animate-two a:nth-child(3) {
        animation-delay: .7s;
    }

    .animate-two a:nth-child(4) {
        animation-delay: .9s;
    }

    .animate-two a:nth-child(5) {
        animation-delay: 1.1s;
    }

    @keyframes fadeIn {
        0% {
            opacity: 0;
            transform: translateX(100%);
        }

        100% {
            opacity: 1;
            transform: translateX(0%);
        }
    }
}
</style>
