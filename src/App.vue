<script setup>
import RadomNum from "./components/rdn.vue"
</script>

<template>
    <div class="gbc">
        <RouterView></RouterView>
    </div>
</template>

<style scoped>
body {
    margin: 0;
}
.gbc {
    display: flex;
    justify-content: center;
    height: 100vh;
    font-family: 'MiSans-Regular';
}</style>
