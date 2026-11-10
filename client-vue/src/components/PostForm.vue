<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <h2>{{ initialData ? 'Редактировать пост' : 'Создать пост' }}</h2>
      
      <!-- Форма -->
      <form @submit.prevent="onSubmit">
        <div>
          <label>Заголовок:</label>
          <input v-model="form.title" type="text" required />
        </div>

        <div>
          <label>Текст:</label>
          <textarea v-model="form.content" required></textarea>
        </div>

        <div>
          <label>Теги (через запятую):</label>
          <input v-model="tagsString" type="text" />
        </div>

        <div class="actions">
          <button type="submit">Сохранить</button>
          <button type="button" @click="$emit('close')">Отмена</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue';
import type { UpdatePostDTO, Post } from '../types/api';

const props = defineProps<{
  initialData?: Post;
}>();

const emit = defineEmits<{
  (e: 'save', data: UpdatePostDTO): void;
}>();


const form = reactive<UpdatePostDTO>({
  title: props.initialData?.title || '',
  content: props.initialData?.content || '',
});

const tagsString = ref(props.initialData?.tags.join(', ') || '');

const onSubmit = () => {
  // Парсим строку обратно в массив
  const tags = tagsString.value.split(',').map(t => t.trim()).filter(Boolean);
  emit('save', { ...form, tags });
};
</script>

<style scoped>
.modal-overlay {
  position: fixed; top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.5); display: flex; justify-content: center; align-items: center;
}
.modal-content {
  background: white; padding: 20px; border-radius: 8px; width: 400px;
}
.actions { margin-top: 15px; display: flex; gap: 10px; }
</style>