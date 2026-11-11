<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { usePostStore } from '../stores/post'

const title = ref('')
const text = ref('')
const image = ref<File | null>(null) // В Vue TS лучше указать тип
const router = useRouter()
const postStore = usePostStore()

const submitHandler = async () => {
  try {
    const data = new FormData()
    data.append('title', title.value)
    data.append('text', text.value)
    if (image.value) data.append('image', image.value)

    // Аналог dispatch(createPost(data))
    await postStore.createPost(data)
    router.push('/')
  } catch (error) {
    console.log(error)
  }
}

const clearHandler = () => {
  title.value = ''
  text.value = ''
  image.value = null
}
</script>

<template>
  <form class="w-1/3 mx-auto py-10" @submit.prevent="submitHandler">
    <label class="text-gray-300 py-2 bg-gray-600 text-xs mt-2 flex items-center justify-center border-2 border-dotted cursor-pointer">
      <input
        type="file"
        @change="(e) => image = (e.target as HTMLInputElement).files![0]"
        class="hidden"
      />
      {{ image ? 'Изменить фото' : 'Загрузить фото' }}
    </label>
    
    <div class="flex object-cover py-2" v-if="image">
      <img :src="URL.createObjectURL(image)" :alt="image.name" />
    </div>

    <label class="text-xs text-white opacity-70">
      Заголовок поста:
      <input
        type="text"
        placeholder="Заголовок"
        v-model="title"
        class="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700"
      />
    </label>

    <label class="text-xs text-white opacity-70">
      Текст поста:
      <textarea
        v-model="text"
        placeholder="Текст поста"
        class="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none resize-none h-40 placeholder:text-gray-700"
      />
    </label>

    <div class="flex gap-8 items-center justify-center mt-4">
      <button type="submit" class="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4">
        Добавить
      </button>
      <button class="flex justify-center items-center bg-red-500 text-xs text-white rounded-sm py-2 px-4" @click="clearHandler">
        Отменить
      </button>
    </div>
  </form>
</template>