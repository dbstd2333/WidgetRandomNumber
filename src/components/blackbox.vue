<!-- blackbox.vue -->
<!-- E:\codeproject\radomnum\radomnumber\src\components\blackbox.vue -->
<!--  -->

<template>
    <div class="flex flex-col mx-3">
        <div class="text-2xl text-center font-bold mt-4">黑盒工具</div>
        <div class="flex mt-4 items-center">
            <div class="mr-1 w-16">下一个号数</div>
            <a-input-number v-model="nextnum" placeholder="最小值"
                mode="button" class="newfont" />
        </div>
        <div class="flex mt-4 items-center">
            <a-button @click="updateremoteconfig" type="primary"
                class="">提交更改</a-button>
        </div>
    </div>
</template>

<script setup>
import { ref, getCurrentInstance,onMounted } from 'vue'
import { useRouter } from 'vue-router'
const { proxy } = getCurrentInstance()

const nextnum = ref(1)

const updateremoteconfig = async () => {
    const res = await proxy.$axios.post('/api/updateremoteconfig', {
        paircode: proxy.$route.params.paircode,
        nextnum: nextnum.value
    })
    console.log(res)
}

onMounted(() => {
    console.log(proxy.$route.params.paircode)
    console.log(import.meta);
})
</script>

<style></style>