<template>
    <div class="flex flex-col items-center justify-center">
        <div class="flex-1 text-center text-black text-4xl">权重随机数生成器
        </div>
        <div :class="{ 'fade': isFading }"
            class="flex-1 text-center text-black newfont text-40">
            {{ gneresult }}</div>
        <div class="flex mt-4 items-center">
            <div class="mr-1 w-16">最小值</div>
            <a-input-number v-model="min" placeholder="最小值"
                mode="button" class="newfont" />
        </div>
        <div class="flex mt-4 items-center">
            <div class="mr-1 w-16">最大值</div>
            <a-input-number v-model="max" placeholder="最大值"
                mode="button" class="newfont" />
        </div>
        <div class="flex mt-4 items-center">
            <div class="w-20">生成数量</div>
            <a-input-number v-model="gnenum" placeholder="生成数量"
                :max="8" mode="button" class="newfont" />
        </div>
        <div class="flex mt-6 items-center">
            <div class="mr-2">使用权重</div>
            <a-switch v-model="useWeight" />
        </div>
        <div class="flex flex-row mt-6 ml-4">
            <a-button @click="generate" type="primary"
                class="mr-4">生成</a-button>
            <a-button @click="resetwidget">重置权重</a-button>
        </div>
        <div class="text-sm text-gray-400 mt-4">
            *注：刷新会自动重置权重</div>
        <div class="text-sm text-gray-400 mt-2 newfont">
            Version：0.4.0（build:09062216）
            <a-link
                href="https://github.com/dbstd2333/WidgetRandomNumber">
                <template #icon>
                    <icon-github />
                </template>
                Github开源地址
            </a-link>
        </div>
        <div class="text-sm text-gray-400 mt-2 newfont">
            当前版本更新日志：优化了随机算法，同一轮权重下抽到的不会再被抽到；去掉[]括号，添加过渡动画
        </div>
    </div>
</template>

<script setup>
import { watchEffect, ref } from "vue"
import { WeightedRandomGenerator } from "../assets/radom.js"
import { Message } from "@arco-design/web-vue"

const min = ref(1)
const max = ref(30)
const gnenum = ref(1)
const gneresult = ref("请生成")
const useWeight = ref(true)
const isFading = ref(false)
let generator
watchEffect(() => {
    generator = new WeightedRandomGenerator(min.value, max.value, 10, 10)
})

const resetwidget = () => {
    generator.manuallyResetWeights()
    Message.success("重置成功")
    setTimeout(() => {
        isFading.value = true
    }, 1000)
}

const generate = () => {
    gneresult.value = []
    if (useWeight.value == false) {
        for (let i = 0; i < gnenum.value; i++) {
            gneresult.value[i] = Math.floor(Math.random() * (max.value - min.value + 1)) + min.value

        }
    } else {
        for (let i = 0; i < gnenum.value; i++) {
            gneresult.value[i] = generator.generateUnique()
        }
    }
    //把generesult这个list转为字符串
    gneresult.value = gneresult.value.join(" , ")
        isFading.value = false
    console.log(gneresult.value)
}
</script>

<style>
.newfont {
    font-family: 'Barlow-SemiBold';
}
</style>
