<script lang="ts" setup>
import { reactive, computed, defineEmits, defineProps } from 'vue'
import { isValidUsername, isValidPassword } from "../utils/validationHelper.js";

defineProps({
    error: {
        type: String
    }
})
const emits = defineEmits(['submit'])
const emitLoginData = () => emits('submit', loginData)
const loginData = reactive({
    username: '',
    password: '',
})

const canUserSubmit = computed(() => {
    return isValidUsername(loginData.username) && isValidPassword(loginData.password)
})
</script>
<template>
    <form @submit.prevent="emitLoginData" class="login-form">
        <input type="text" v-model="loginData.username" placeholder="Email">
        <input type="password" v-model="loginData.password" placeholder="Password">
        <span class="error" v-if="error">{{ error }}</span>
        <button type="submit" :disabled="!canUserSubmit">Login</button>
    </form>
</template>

<style scoped>
.login-form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
    width: 100%;
}

input {
    height: 40px;
    padding: 5px 20px;
    font-size: 20px;
    border-radius: 20px;
    border: 1px solid #ccc;
    outline: none;
}

button {
    border-radius: 30px;
    outline: none;
    padding: 10px;
    border: 1px solid green;
    background-color: green;
    color: white;
    font-size: 20px;
    margin-top: 10px;
    cursor: pointer;
}

button:disabled {
    opacity: 0.5;
}

.error {
    color: red;
    text-align: center;
    text-transform: capitalize;
}
</style>