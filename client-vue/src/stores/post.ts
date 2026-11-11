import api from '@/api/axios';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export interface Post {
  _id: string;
  title: string;
  content: string;
  author: { _id: string; name: string };
  createdAt: string;
  likes: string[];
}

export const usePostStore = defineStore('post', () => {
  // --- STATE ---
  const posts = ref<Post[]>([]);
  const currentPost = ref<Post | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  // --- ACTIONS ---
    const fetchPosts = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      const { data } = await api.get<Post[]>('/posts');
      posts.value = data;
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Ошибка загрузки постов';
    } finally {
      isLoading.value = false;
    }
  };

  const fetchPostById = async (id: string) => {
    isLoading.value = true;
    try {
      const { data } = await api.get<Post>(`/posts/${id}`);
      currentPost.value = data;
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Пост не найден';
    } finally {
      isLoading.value = false;
    }
  };

  const createPost = async (postData: { title: string; content: string }) => {
    try {
      const { data } = await api.post<Post>('/posts', postData);
      posts.value.unshift(data); 
      return true;
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Ошибка создания';
      return false;
    }
  };

  const deletePost = async (id: string) => {
    try {
      await api.delete(`/posts/${id}`);
      posts.value = posts.value.filter(p => p._id !== id); // Удаляем из UI
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Ошибка удаления';
    }
  };


  const reset = () => {
    posts.value = [];
    currentPost.value = null;
  };

  return { 
    posts, 
    currentPost, 
    isLoading, 
    error, 
    fetchPosts, 
    fetchPostById, 
    createPost, 
    deletePost,
    reset 
  };
});