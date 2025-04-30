<script setup>
const userName = () => localStorage.getItem('username')
</script>
<template>
    <div class="welcome-container">
        Welcome Back {{ userName() }}!
    </div>
</template>

<style scoped>
.welcome-container {
    text-align: center;
    width: 100%;
    color: #0b1144;
    font-size: 20px;
}
</style>