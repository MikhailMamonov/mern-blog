<script setup lang="ts">
defineProps<{ post: any, user: any }>()
</script>

<template>
  <div class="p-4 bg-gray-800 text-white rounded border border-gray-600">
    <h3 class="text-lg">{{ post.title }}</h3>
    <p class="text-sm opacity-70">{{ post.text }}</p>
  </div>
</template>