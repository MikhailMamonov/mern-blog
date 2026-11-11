<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import PostItem from '../components/PostItem.vue' 
import { usePostStore } from '../stores/post'
import { useAuthStore } from '../stores/auth'

const postStore = usePostStore()
const authStore = useAuthStore()

const { posts } = storeToRefs(postStore)
const { user } = storeToRefs(authStore)

onMounted(() => {
  postStore.getMyPosts()
})
</script>

<template>
  <div class="w-1/2 mx-auto py-10 flex flex-col gap-10">
    <PostItem 
      v-for="(post, idx) in posts" 
      :key="idx" 
      :user="user" 
      :post="post" 
    />
  </div>
</template>