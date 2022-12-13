<script setup lang="ts">
import firebaseConfig from '@/config/firebaseConfig'
import { getDatabase, ref as dref, update, onValue } from "firebase/database";
import Header from '../components/Header.vue'
import { onMounted, ref } from 'vue';
import { NSelect, NButton, SelectOption, SelectGroupOption, useMessage } from 'naive-ui'

firebaseConfig
const db = getDatabase();

const message = useMessage()
const selectVal = ref<string | null>(null)
const options = ref<SelectOption[] | SelectGroupOption[] | any[]>([])
const items = ref<any[]>([])
const isVoted = ref<boolean | null>(null)
const option = ref<any>({
    legend: {
        itemStyle: { color: '' }
    },
    tooltip: {},
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis:
    {
        type: 'category',
        axisTick: {
            alignWithLabel: true
        }
    },
    yAxis:
    {
        type: 'value',
        min: 0,
        max: 150,
        axisTick: {
            alignWithLabel: true
        }
    },
    series:
    {
        name: "獲得票數",
        type: 'line',
        barWidth: '40%',
        data: []
    }
}
)

const handleSubmit = () => {
    const user = dref(db, 'user/');
    onValue(user, (snapshot) => {
        const data = snapshot.val();
        if (data) {
            isVoted.value = data.isVoted
        }
    });
    if (localStorage.user === undefined) {
        message.warning("請先登入")
        return
    }
    else if (isVoted.value) {
        message.warning("您已投過票")
        return
    }
    items.value.forEach(item => {
        if (item.name === selectVal.value) {
            update(dref(db, `students/${selectVal.value}`), {
                vote: item.vote += 1
            });
        }
    })
    update(dref(db, 'user/'), {
        isVoted: true
    });
    selectVal.value = null
    getStudents()
}

const getStudents = () => {
    option.value.xAxis.data = []
    option.value.series.data = []
    options.value = []
    for (let i = 1; i <= 127; i++) {
        const students = dref(db, `students/${i}`);
        onValue(students, (snapshot) => {
            const student = snapshot.val();
            if (student) {
                option.value.xAxis.data.push(`${student.studentID} ${student.name}`)
                option.value.series.data.push({ name: `${student.studentID} ${student.name}`, value: student.vote })
                items.value.push({ name: `${i}`, vote: student.vote })
                options.value.push({ label: `${student.studentID} ${student.name}`, value: `${i}` })
            }
        });
    }
}
onMounted(() => {
    getStudents()
})
</script>

<template>
    <Header />
    <div>
        <v-chart class="lg:w-[1000px] md:w-[300px] lg:h-[30vh] md:h-[30vh] mx-auto" :option="option" />
    </div>
    <div class="flex justify-center items-center lg:w-[500px] md:w-[300px] lg:h-[30vh] mx-auto md:my-[2vh]">
        <NSelect v-model:value="selectVal" :options="options" :filterable="true" placeholder="每人限投一票"
            class="lg:w-[300px] lg:mx-[2vw] md:mx-[2vw]" />
        <NButton type="tertiary" @click="handleSubmit">送出</NButton>
    </div>
    <div class="w-full">
        <div class="absolute bottom-0 -left-[10%] -z-10">
            <img src="../assets/img/five.png" class="w-[20vw] object-cover" alt="">
        </div>
        <div class="absolute bottom-0 -left-0 -z-20">
            <img src="../assets/img/six.png" class="w-[20vw] object-cover" alt="">
        </div>
        <div class="absolute bottom-0 left-[15%] -z-10 ">
            <img src="../assets/img/seven.png" class="w-[30vw] object-cover" alt="">
        </div>
        <div class="absolute bottom-0 left-[40%] -z-20">
            <img src="../assets/img/eight.png" class="w-[20vw] object-cover" alt="">
        </div>
        <div class="absolute bottom-0 right-[25%] -z-10">
            <img src="../assets/img/nine.png" class="w-[20vw] object-cover" alt="">
        </div>
        <div class="absolute bottom-0 right-[18%] -z-10">
            <img src="../assets/img/ten.png" class="w-[15vw] object-cover" alt="">
        </div>
        <div class="absolute bottom-0 right-[5%] -z-20">
            <img src="../assets/img/eleven.png" class="w-[20vw] object-cover" alt="">
        </div>
        <div class="absolute bottom-0 right-0 -z-10">
            <img src="../assets/img/twelve.png" class="w-[15vw] object-cover" alt="">
        </div>
    </div>
</template>



<style scoped>

</style>