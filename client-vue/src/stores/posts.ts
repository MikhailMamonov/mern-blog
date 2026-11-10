import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Post } from '../types/api';
import api from '../api/http';

export const usePostsStore = defineStore('posts', () => {
  const posts = ref<Post[]>([]);
  const searchQuery = ref('');
  const selectedTag = ref('');

  const filteredPosts = computed(() => {
    return posts.value.filter(post => {
      const matchSearch = post.title.toLowerCase().includes(searchQuery.value.toLowerCase());
      const matchTag = !selectedTag.value || post.tags.includes(selectedTag.value);
      return matchSearch && matchTag;
    });
  });

  // Действие (загрузка с бэкенда)
  const fetchPosts = async () => {
    try {
      const { data } = await api.get<Post[]>('/posts');
      posts.value = data;
    } catch (error) {
      console.error('Failed to fetch posts', error);
    }
  };

  return { posts, searchQuery, selectedTag, filteredPosts, fetchPosts };
});