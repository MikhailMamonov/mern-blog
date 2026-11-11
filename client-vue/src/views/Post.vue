<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import axios from '../api/axios'
import { useAuthStore } from '../stores/auth'
import { usePostStore } from '../stores/post'
import { useCommentStore } from '../stores/comment'
import { useToast } from 'vue-toastification'
import dayjs from 'dayjs'

const post = ref<any>(null)
const comment = ref('')
const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const postStore = usePostStore()
const commentStore = useCommentStore()
const toast = useToast()

const postId = route.params.id as string

const postImageUrl = computed(() => {
  if (!post.value?.imgUrl) return ''
  const baseUrl = import.meta.env.VITE_BASE_URL || 'localhost'
  const port = import.meta.env.VITE_PORT || '8080'
  return `${window.location.protocol}//${baseUrl}:${port}/${post.value.imgUrl}`
})

const fetchPost = async () => {
  const { data } = await axios.get(`/posts/${postId}`)
  post.value = data
}

const fetchComments = async () => {
  await commentStore.getCommentsByPost(postId)
}

onMounted(async () => {
  await fetchPost()
  await fetchComments()
})

const removeHandler = async () => {
  try {
    await postStore.removePost(postId)
    toast('Пост успешно удален')
    router.push('/posts')
  } catch (error) {
    toast('Ошибка удаления')
  }
}

const submitCommentHandler = async () => {
  try {
    await commentStore.createComment(comment.value, postId)
    comment.value = ''
  } catch (error) {
    toast('Ошибка отправки комментария')
  }
}
</script>

<template>
  <div v-if="!post" class="text-xl text-center text-white py-10">Загрузка...</div>
  <div v-else>
    <button class="flex justify-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4">
      <RouterLink class="flex" to="/">Назад</RouterLink>
    </button>
    
    <div class="flex gap-10 py-8">
      <div class="w-2/3">
        <div class="flex flex-col basis-1/4 flex-grow">
          <div :class="post.imgUrl ? 'flex rounded-sm h-80' : 'flex rounded-sm'">
            <img v-if="post.imgUrl" :src="postImageUrl" alt="img" class="object-cover w-full" />
          </div>
          
          <div class="flex justify-between items-center pt-2">
            <div class="text-xs text-white opacity-50">{{ post.username }}</div>
            <div class="text-xs text-white opacity-50">
              {{ dayjs(post.createdAt).format('D MMM YYYY') }}
            </div>
          </div>
          
          <div class="text-white text-xl">{{ post.title }}</div>
          <p class="text-white opacity-60 text-xs pt-4 line-clamp-4">{{ post.text }}</p>

          <div class="flex gap-3 items-center mt-2 justify-between">
            <div class="flex gap-3 mt-4">
              <button class="flex items-center justify-center gap-2 text-xs text-white opacity-50">
                👁️ <span>{{ post.views }}</span>
              </button>
              <button class="flex items-center justify-center gap-2 text-xs text-white opacity-50">
                💬 <span>{{ commentStore.comments?.length || 0 }}</span>
              </button>
            </div>
            
            <div v-if="authStore.user?.id === post.author" class="flex gap-3 mt-4">
              <RouterLink :to="`/${postId}/edit`" class="text-white opacity-50">✏️</RouterLink>
              <button @click="removeHandler" class="text-white opacity-50">🗑️</button>
            </div>
          </div>
        </div>
      </div>

      <div class="w-1/3 p-8 flex flex-col bg-gray-700 gap-10 rounded-sm">
        <form class="flex gap-2" @submit.prevent="submitCommentHandler">
          <input
            type="text"
            v-model="comment"
            placeholder="Comment"
            class="w-full text-black rounded-sm bg-gray-400 outline-none border p-2 text-xs placeholder:text-gray-700"
          />
          <button type="submit" class="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4">
            Отправить
          </button>
        </form>
        
        <!-- Компонент CommentItem (нужно будет также перевести на Vue) -->
        <div v-for="(cmt, idx) in commentStore.comments" :key="idx">
           <!-- <CommentItem :comment="cmt" /> -->
           {{ cmt.text }}
        </div>
      </div>
    </div>
  </div>
</template>