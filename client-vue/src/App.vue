<template>
  <div style="padding: 20px;">
    <h1>Тест формы поста</h1>
    

    <button @click="isFormOpen = true" style="margin-bottom: 20px;">
      ➕ Создать новый пост
    </button>

    <p v-if="isLoading">Загрузка...</p>

    <div v-else-if="posts.length > 0">
      <h2>Созданные посты:</h2>
      <ul>
        <li v-for="post in posts" :key="post.id || post._id" style="margin-bottom: 10px;">
          <strong>{{ post.title }}</strong><br/>
          {{ post.content }} <br/>
          <em>Теги: {{ post.tags?.join(', ') }}</em>
        </li>
      </ul>
    </div>
    <p v-else>Постов пока нет. Создайте первый!</p>


    <PostForm 
      v-if="isFormOpen" 
      @save="handleSave" 
      @close="isFormOpen = false" 
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import PostForm from './components/PostForm.vue';
import api from './api/http';
import type { UpdatePostDTO, Post, CreatePostDTO } from './types/api'; 

const isLoading = ref(false);
const isFormOpen = ref(false); 
const posts = ref<UpdatePostDTO[]>([]);


const fetchPosts = async () => {
  isLoading.value = true;
  try {
    const { data } = await api.get<Post[]>('/posts'); // Запрос уйдет на /api/posts
    posts.value = data;
  } catch (error) {
    console.error('Ошибка загрузки постов', error);
  } finally {
    isLoading.value = false;
  }
};


const handleSave = async (postData: UpdatePostDTO) => {
  try {
    const { data } = await api.post<Post>('/posts', postData); 
    posts.value.push(data); 
    isFormOpen.value = false; 
  } catch (error) {
    console.error('Ошибка создания поста', error);
    alert('Не удалось сохранить пост');
  }
};

onMounted(() => {
  fetchPosts();
});
</script>