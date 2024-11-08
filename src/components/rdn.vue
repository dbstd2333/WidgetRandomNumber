<template>
    <div class="flex flex-col items-center justify-center m-8">
        <div class="flex-1 text-center text-black text-4xl">权重随机数生成器</div>
        <div :class="{ fade: isFading }" class="flex-1 text-center text-black newfont text-40">
            {{ gneresult }}
        </div>
        <div class="flex mt-4 items-center">
            <div class="mr-1 w-16">最小值</div>
            <a-input-number v-model="min" placeholder="最小值" mode="button" class="newfont" />
        </div>
        <div class="flex mt-4 items-center">
            <div class="mr-1 w-16">最大值</div>
            <a-input-number v-model="max" placeholder="最大值" mode="button" class="newfont" />
        </div>
        <div class="flex mt-4 items-center">
            <div class="mr-2">滑动调整</div>
            <a-slider v-model="max" :style="{ width: '260px' }" />
        </div>
        <div class="flex mt-4 items-center">
            <div class="w-20">生成数量</div>
            <a-input-number
                v-model="gnenum"
                placeholder="生成数量"
                :max="8"
                mode="button"
                class="newfont"
            />
        </div>
        <div class="flex flex-row mt-6 ml-4">
            <a-button @click="generate" type="primary" class="mr-4">生成</a-button>
            <a-button @click="resetwidget" class="mr-4">清空已抽</a-button>
        </div>
        <div class="text-sm text-gray-400 mt-4">*注：刷新会自动重置权重</div>
        <div class="text-sm text-gray-400 mt-2 newfont flex flex-row">
            Version：0.5.0（build:20241108）
            <a-link href="https://github.com/dbstd2333/WidgetRandomNumber">
                <template #icon>
                    <icon-github />
                </template>
                Github开源地址
            </a-link>
            <a-trigger position="top" auto-fit-position :unmount-on-close="false">
                <span>
                    <div class="ml-2">远程配置</div>
                </span>
                <template #content>
                    <div
                        class="p-1 bg-white rounded shadow-xl flex flex-col items-center text-center justify-center"
                    >
                        <div class="">
                            <qrcode :value="qrdata" :size="size" :foreground="color" level="H">
                            </qrcode>
                        </div>
                    </div>
                </template>
            </a-trigger>
        </div>

        <div class="text-sm text-gray-400 mt-2 newfont">当前版本更新日志：新增收款码</div>
    </div>
    <a-modal
        width="auto"
        v-model:visible="visible"
        @ok="handleOk"
        @cancel="handleCancel"
        :footer="false"
    >
        <template #title> 要倒闭了 </template>
        <div class="flex flex-col text-center">
            考虑一下，赞助一点<br />服务器好贵的 (不想赞助点空白处即可关闭)
            <img src="../assets/aliyun.webp" class="w-1000px" />
            <img src="../assets/pay.webp" class="w-400px self-center" />
        </div>
    </a-modal>
</template>

<script setup>
import { watchEffect, ref, onMounted } from "vue"
import UniqueRandomGenerator from "../assets/radom.js"
import { Message } from "@arco-design/web-vue"
import { IconGithub } from "@arco-design/web-vue/es/icon"
import qrcode from "./qrcode.vue"

const qrdata = ref("https://baidu.com")
const size = ref(200)
const color = ref("#000000")

const min = ref(1)
const max = ref(30)
const gnenum = ref(1)
const gneresult = ref("请生成")
const useWeight = ref(true)
const isFading = ref(false)
const exclude = ref([])
const visible = ref(false)
let generator
watchEffect(() => {
    generator = new UniqueRandomGenerator(min.value, max.value, exclude.value)
})

const resetwidget = () => {
    generator.reset()
    Message.info("已重置")
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
            gneresult.value[i] = generator.generate()
        }
    }
    //把generesult这个list转为字符串
    gneresult.value = gneresult.value.join(" , ")
    isFading.value = false
    console.log(gneresult.value)
}

const opentoast = () => {
    visible.value = true
}

const handleOk = () => {
    visible.value = false
}
const handleCancel = () => {
    visible.value = false
}

onMounted(() => {
    opentoast()
})
</script>

<style>
.newfont {
    font-family: "Barlow-SemiBold";
}
</style>
