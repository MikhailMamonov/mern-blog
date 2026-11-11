import api from '@/api/axios';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export interface Comment {
  _id: string;
  text: string;
  author: { _id: string; name: string };
  postId: string;
  createdAt: string;
}

export const useCommentStore = defineStore('comment', () => {
  // --- STATE ---
  const comments = ref<Comment[]>([]);
  const isLoading = ref(false);

  // --- ACTIONS ---
  const fetchCommentsByPost = async (postId: string) => {
    isLoading.value = true;
    try {
      const { data } = await api.get<Comment[]>(`/posts/${postId}/comments`);
      comments.value = data;
    } catch (err) {
      console.error(err);
    } finally {
      isLoading.value = false;
    }
  };

  const addComment = async (postId: string, text: string) => {
    try {
      const { data } = await api.post<Comment>(`/posts/${postId}/comments`, { text });
      comments.value.push(data); 
    } catch (err) {
      console.error(err);
    }
  };

  const deleteComment = async (commentId: string) => {
    try {
      await api.delete(`/comments/${commentId}`);
      comments.value = comments.value.filter(c => c._id !== commentId);
    } catch (err) {
      console.error(err);
    }
  };

  return { comments, isLoading, fetchCommentsByPost, addComment, deleteComment };
});