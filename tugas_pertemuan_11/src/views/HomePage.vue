<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Home</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <!-- Komponen Refresher -->
      <ion-refresher slot="fixed" :pull-factor="0.5" :pull-min="100" :pull-max="200" @ionRefresh="handleRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>

      <!-- Konten utama -->
      <div class="scrollable-container">
        <ion-accordion-group>
          <!-- Todos Aktif -->
          <ion-accordion value="active">
            <ion-item slot="header">
              <ion-label>Active Todos</ion-label>
              <ion-badge>{{ activeTodos.length }}</ion-badge>
            </ion-item>
            <ion-list slot="content">
              <ion-item v-for="todo in activeTodos" :key="todo.id">
                <ion-label>
                  <h2>{{ todo.title }}</h2>
                  <p>{{ todo.description }}</p>
                  <small>{{ getRelativeTime(todo.createdAt) }}</small>
                </ion-label>
              </ion-item>
            </ion-list>
          </ion-accordion>

          <!-- Todos Selesai -->
          <ion-accordion value="completed">
            <ion-item slot="header">
              <ion-label>Completed Todos</ion-label>
              <ion-badge>{{ completedTodos.length }}</ion-badge>
            </ion-item>
            <ion-list slot="content">
              <ion-item v-for="todo in completedTodos" :key="todo.id">
                <ion-label>
                  <h2>{{ todo.title }}</h2>
                  <p>{{ todo.description }}</p>
                  <small>{{ getRelativeTime(todo.updatedAt) }}</small>
                </ion-label>
              </ion-item>
            </ion-list>
          </ion-accordion>
        </ion-accordion-group>
      </div>

      <!-- Tombol Tambah dan Modal -->
      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button @click="isOpen = true;">
          <ion-icon :icon="add" size="large"></ion-icon>
        </ion-fab-button>
      </ion-fab>
      <InputModal
        v-model:isOpen="isOpen"
        v-model:editingId="editingId"
        :todo="todo"
        @submit="handleSubmit"
      />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonAccordion,
  IonAccordionGroup,
  IonLabel,
  IonBadge,
  IonList,
  IonFab,
  IonFabButton,
  IonIcon,
  IonRefresher,
  IonRefresherContent,
  toastController,
} from '@ionic/vue';
import { add, checkmarkCircle } from 'ionicons/icons';
import InputModal from '../components/InputModal.vue';
import { ref, computed } from 'vue';
import { formatDistanceToNow } from 'date-fns';

// Variabel State
const isOpen = ref(false);
const editingId = ref<string | null>(null);
const todos = ref([
  {
    id: '1',
    title: 'First Todo',
    description: 'This is your first todo.',
    createdAt: new Date(),
    updatedAt: null,
    status: false,
  },
  {
    id: '2',
    title: 'Completed Todo',
    description: 'This todo is completed.',
    createdAt: new Date(),
    updatedAt: new Date(),
    status: true,
  },
]);
const todo = ref({ title: '', description: '' });
const activeTodos = computed(() => todos.value.filter((todo) => !todo.status));
const completedTodos = computed(() => todos.value.filter((todo) => todo.status));

// Fungsi Mendapatkan Waktu Relatif
const getRelativeTime = (date: any) => {
  try {
    return formatDistanceToNow(date, { addSuffix: true });
  } catch (error) {
    return 'Invalid date';
  }
};

// Fungsi Handle Refresh
const handleRefresh = async (event: any) => {
  // Simulasi muat ulang data
  setTimeout(() => {
    event.target.complete(); // Selesaikan refresher
    showToast('Data refreshed successfully', 'primary');
  }, 1000);
};

// Fungsi Tampilkan Notifikasi
const showToast = async (message: string, color: string = 'success', icon: string = checkmarkCircle) => {
  const toast = await toastController.create({
    message,
    duration: 2000,
    color,
    position: 'top',
    icon,
  });
  await toast.present();
};

// Fungsi Handle Submit (Menambahkan/Mengedit Todo)
const handleSubmit = (newTodo: any) => {
  if (editingId.value) {
    const index = todos.value.findIndex((todo) => todo.id === editingId.value);
    if (index > -1) {
      todos.value[index] = { ...todos.value[index], ...newTodo, updatedAt: new Date() };
    }
  } else {
    todos.value.push({
      ...newTodo,
      id: String(Date.now()),
      createdAt: new Date(),
      updatedAt: null,
      status: false,
    });
  }
  isOpen.value = false;
  editingId.value = null;
  showToast('Todo saved successfully');
};
</script>

<style scoped>
ion-card,
ion-accordion-group {
  width: 100%;
}

.scrollable-container {
  max-height: 80vh;
  overflow-y: auto;
  overflow-x: hidden;
}

ion-fab {
  margin: 25px;
}
</style>

