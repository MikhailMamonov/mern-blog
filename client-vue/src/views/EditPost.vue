<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from '../api/axios' // ваш axios
import { usePostStore } from '../stores/post'

const title = ref('')
const text = ref('')
const oldImage = ref('')
const newImage = ref<File | null>(null)

// Выносим формирование URL в скрипт
const oldImageUrl = computed(() => {
  if (!oldImage.value) return ''
  const baseUrl = import.meta.env.VITE_BASE_URL || 'localhost'
  return `${window.location.protocol}//${baseUrl}:8080/${oldImage.value}`
})

const route = useRoute()
const router = useRouter()
const postStore = usePostStore()
const postId = route.params.id as string

const fetchPost = async () => {
  const { data } = await axios.get(`/posts/${postId}`)
  title.value = data.title
  text.value = data.text
  oldImage.value = data.imgUrl
}



const submitHandler = async () => {
  try {
    const updatedPost = new FormData()
    updatedPost.append('title', title.value)
    updatedPost.append('text', text.value)
    updatedPost.append('id', postId)
    if (newImage.value) updatedPost.append('image', newImage.value)

    await postStore.updatePost(updatedPost)
    router.push('/posts')
  } catch (error) {
    console.log(error)
  }
}

const clearFormHandler = () => {
  title.value = ''
  text.value = ''
}

onMounted(() => {
  fetchPost()
})
</script>

<template>
  <form class="w-1/3 mx-auto py-10" @submit.prevent="submitHandler">
    <!-- ... Секция загрузки фото как в AddPost ... -->
    
    <div class="flex object-cover py-2">
        <img v-if="newImage" :src="URL.createObjectURL(newImage)" :alt="newImage.name" />
        <img v-if="oldImage" :src="oldImageUrl" alt="old image" />
  </div>

    <label class="text-xs text-white opacity-70">
      Заголовок поста:
      <input type="text" v-model="title" class="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700" />
    </label>

    <label class="text-xs text-white opacity-70">
      Текст поста:
      <textarea v-model="text" class="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none resize-none h-40 placeholder:text-gray-700" />
    </label>

    <div class="flex gap-8 items-center justify-center mt-4">
      <button type="submit" class="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4">Применить</button>
      <button class="flex justify-center items-center bg-red-500 text-xs text-white rounded-sm py-2 px-4" @click="clearFormHandler">Отменить</button>
    </div>
  </form>
</template>