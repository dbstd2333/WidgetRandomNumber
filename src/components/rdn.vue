<template>
    <div class="flex flex-col items-center justify-center">
        <div class="flex-1 text-center text-black text-4xl">权重随机数生成器</div>
        <div class="flex-1 text-center text-black font-bold text-9xl">{{ gneresult }}</div>
        <div class="flex mt-4 items-center">
            <div class="mr-1 w-16">最小值</div>
            <a-input-number v-model="min" placeholder="最小值" mode="button" />
        </div>
        <div class="flex mt-4 items-center">
            <div class="mr-1 w-16">最大值</div>
            <a-input-number v-model="max" placeholder="最大值" mode="button" />
        </div>
        <div class="flex mt-4 items-center">
            <div class="w-20">生成数量</div>
            <a-input-number v-model="gnenum" placeholder="生成数量" :max="12" mode="button" />
        </div>
        <div class="flex mt-6 items-center">
            <div class="mr-2">使用权重</div>
            <a-switch v-model="useWeight" />
        </div>
        <div class="flex flex-row mt-6 ml-4">
            <a-button @click="generate" type="primary" class="mr-4">生成</a-button>
            <a-button @click="resetwidget">重置权重</a-button>
        </div>
        <div class="text-sm text-gray-400 mt-4">*注：刷新会自动重置权重，权重降低率为60%，生成数量>=1时默认生成数字不一致</div>
        <div class="text-sm text-gray-400 mt-2">
            Version：0.2
            <a-link href="link">
                <template #icon>
                    <icon-github />
                </template>
                Link
            </a-link>
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
let generator
watchEffect(() => {
    generator = new WeightedRandomGenerator(min.value, max.value, 10, 6)
})

const resetwidget = () => {
    generator.manuallyrResetWeights()
    Message.success("重置成功")
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

    console.log(min.value, max.value, gnenum.value, gneresult.value)
}
</script>

<style></style>
