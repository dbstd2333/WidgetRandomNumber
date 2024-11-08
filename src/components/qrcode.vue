<template>
    <div>
        <img :src="qrCodeDataUrl" alt="QR Code" />
    </div>
</template>
  
<script setup>
import { ref, onMounted } from 'vue';
import QRCode from 'qrcode';

const props = defineProps({
    value: {
        type: String,
        required: false,
        default: () => ({}),
    },
    size: {
        type: Number,
        required: false,
        default: 200,
    },
    color: {
        type: String,
        required: false,
        default: '#000000',
    },
});
const qrCodeDataUrl = ref('');

onMounted(async () => {
    const text = props.value; // 要生成二维码的文本
    console.log(text)
    try {
        const dataUrl = await QRCode.toDataURL(text,{
            errorCorrectionLevel:'H',
            width: '100%',
            'color.dark': props.color,
        });
        qrCodeDataUrl.value = dataUrl;
    } catch (error) {
        console.error('Failed to generate QR Code', error);
    }
});


</script>
