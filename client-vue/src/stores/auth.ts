import api from '@/api/axios'; // ваш настроенный axios
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<any>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const login = async (credentials: any) => {
    isLoading.value = true;
    error.value = null;
    try {
      const { data } = await api.post('/auth/login', credentials);
      user.value = data;
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Ошибка входа';
    } finally {
      isLoading.value = false;
    }
  };

  const logout = () => {
    user.value = null;
  };

  return { user, isLoading, error, login, logout };
});