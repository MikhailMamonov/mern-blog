<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { PostItem } from '../components/PostItem.vue'
import { usePostStore } from '../stores/post'
import { useAuthStore } from '../stores/auth'

// Подключаем сторы
const postStore = usePostStore()
const authStore = useAuthStore()

// Достаем реактивные данные (аналог useSelector)
const { posts } = storeToRefs(postStore)
const { user } = storeToRefs(authStore)

// Аналог useEffect(() => { dispatch(getMyPosts()) }, [])
onMounted(() => {
  postStore.getMyPosts()
})
</script>

<template>
  <div class="w-1/2 mx-auto py-10 flex flex-col gap-10">
    <!-- Аналог posts?.map(...) -->
    <PostItem 
      v-for="(post, idx) in posts" 
      :key="idx" 
      :user="user" 
      :post="post" 
    />
  </div>
</template>