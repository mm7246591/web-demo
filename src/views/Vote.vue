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
const C1 = ref<any>({
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
        max: 100,
        axisTick: {
            alignWithLabel: true
        }
    },
    series:
    {
        name: "科技組獲得票數",
        type: 'line',
        barWidth: '40%',
        data: []
    }
}
)

const C2 = ref<any>({
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
        max: 100,
        axisTick: {
            alignWithLabel: true
        }
    },
    series:
    {
        name: "設計組獲得票數",
        type: 'line',
        barWidth: '40%',
        data: []
    }
}
)

const handleSubmit = () => {
    if (!JSON.parse(localStorage.getItem('user') as string)) {
        message.warning("請先登入")
        return
    }
    const user = dref(db, `user/${JSON.parse(localStorage.getItem('user') as string)}`);
    onValue(user, async (snapshot) => {
        const data = snapshot.val();
        if (data.isVoted) {
            message.warning("您已投過票")
            return
        }
        if (!data.isVoted) {
            items.value.forEach(item => {
                if (item.name === selectVal.value) {
                    update(dref(db, `groups/${selectVal.value}`), {
                        vote: item.vote += 1
                    });
                }
            })
            message.success("投票成功")
            await update(dref(db, `user/${JSON.parse(localStorage.getItem('user') as string)}`), {
                isVoted: true
            });
            selectVal.value = null
            await getGroups()
            return
        }
    }, {
        onlyOnce: true
    });
}

const getGroups = () => {
    C1.value.xAxis.data = []
    C1.value.series.data = []
    C2.value.xAxis.data = []
    C2.value.series.data = []
    options.value = []
    const groups = dref(db, `groups`);
    onValue(groups, (snapshot) => {
        const data = snapshot.val();
        if (data) {
            data.forEach((item, index) => {
                options.value.push({ label: `${item.group}`, value: `${index}` })
                if (index < 14) {
                    C1.value.xAxis.data.push(`${item.group}`)
                    C1.value.series.data.push({ name: `${item.group}`, value: item.vote })
                } else {
                    C2.value.xAxis.data.push(`${item.group}`)
                    C2.value.series.data.push({ name: `${item.group}`, value: item.vote })
                }
                items.value.push({ name: `${index}`, vote: item.vote })
            });

        }
    });
}
onMounted(() => {
    getGroups()
})
</script>

<template>
    <Header />
    <div>
        <v-chart class="lg:w-[1000px] md:w-[300px] lg:h-[20vh] md:h-[30vh] mx-auto" :option="C1" />
        <v-chart class="lg:w-[1000px] md:w-[300px] lg:h-[20vh] md:h-[30vh] mx-auto" :option="C2" />
    </div>
    <div class="flex justify-center items-center lg:w-[500px] md:w-[300px] lg:h-[30vh] mx-auto md:my-[2vh]">
        <NSelect v-model:value="selectVal" :options="options" :filterable="true" placeholder="每人限投一票"
            class="lg:w-[300px] lg:mx-[2vw] md:mx-[2vw]" />
        <NButton type="tertiary" @click="handleSubmit">送出</NButton>
    </div>
</template>
