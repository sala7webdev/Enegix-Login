<script setup>
import Logo from "../components/Logo.vue"
import LoginForm from "../components/LoginForm.vue"
import WelcomeBack from "../components/WelcomeBack.vue"
import { ref, watch } from 'vue'
import { APIClient } from "../services/APIClient.js"
import { submitUserLogin } from "../services/authService.js"

const error = ref("")
const successMessage = ref("")
const submitLogin = async ({ username, password }) => {
  const loginResponse = await submitUserLogin({ username, password })
  if (!loginResponse.success) return error.value = loginResponse.message
  successMessage.value = loginResponse.message
}
</script>
<template>
  <main class="home-container">
    <div class="form-container">
      <Logo />
      <WelcomeBack v-if="successMessage" />
      <LoginForm v-else @submit="submitLogin" :error="error" />
    </div>
  </main>
</template>

<style scoped>
.home-container {
  background-color: #f5f5f5;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
}

.form-container {
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  width: 100%;
  max-width: 500px;
  min-width: 380px;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 10px 10px 20px 2px #eee;
}
</style>