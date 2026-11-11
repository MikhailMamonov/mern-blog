<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useToast } from 'vue-toastification'

const username = ref('')
const password = ref('')
const router = useRouter()
const authStore = useAuthStore()
const toast = useToast()

// Аналог useSelector(checkIsAuth)
const isAuth = computed(() => authStore.isAuth)
// Аналог useSelector((state) => state.auth.status)
const status = computed(() => authStore.status)

const handleSubmit = async () => {
  try {
    // Аналог dispatch(loginUser(...))
    await authStore.loginUser({ username: username.value, password: password.value })
    
    if (authStore.status) {
      toast(authStore.status)
    }
    
    if (authStore.isAuth) {
      router.push('/')
    }
    
    username.value = ''
    password.value = ''
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <form class="w-1/4 h-60 mx-auto mt-40" @submit.prevent="handleSubmit">
    <h1 class="text-lg text-white text-center">Авторизация</h1>
    
    <label class="text-xs text-gray-400">
      <input
        type="text"
        placeholder="Username"
        v-model="username"
        class="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700"
      />
    </label>
    
    <label class="text-xs text-gray-400">
      <input
        type="password"
        placeholder="Password"
        v-model="password"
        class="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700"
      />
    </label>

    <div class="flex gap-8 justify-center mt-4">
      <button type="submit" class="flex justify-center items-center text-xs bg-gray-600 text-white rounded-sm py-2 px-4">
        Войти
      </button>
      <RouterLink to="/register" class="flex justify-center items-center text-xs text-white">
        Нет аккаунта?
      </RouterLink>
    </div>
  </form>
</template>