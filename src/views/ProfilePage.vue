<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar>
                <ion-title>Profile</ion-title>
                <!-- Logout Button -->
                <ion-button slot="end" fill="clear" @click="logout" style="--color: gray;">
                    <ion-icon slot="end" :icon="exit"></ion-icon>
                    <ion-label>Logout</ion-label>
                </ion-button>
            </ion-toolbar>
        </ion-header>

        <ion-content :fullscreen="true">
            <!-- Avatar -->
            <div id="avatar-container">
                <ion-avatar>
                    <img alt="Avatar" :src="userPhoto" @error="handleImageError" />
                </ion-avatar>
                <!-- Upload Input -->
                <ion-button size="small" fill="outline" color="primary">
                    <input
                        type="file"
                        accept="image/*"
                        @change="onFileChange"
                        style="opacity: 0; position: absolute; width: 100%; height: 100%;"
                    />
                    Upload Photo
                </ion-button>
            </div>

            <!-- Data Profile -->
            <ion-list>
                <ion-item>
                    <ion-input label="Nama" :value="user?.displayName" :readonly="true"></ion-input>
                </ion-item>
                <ion-item>
                    <ion-input label="Email" :value="user?.email" :readonly="true"></ion-input>
                </ion-item>
            </ion-list>

            <!-- Tabs Menu -->
            <TabsMenu />
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
    IonInput,
    IonItem,
    IonList,
    IonLabel,
    IonIcon,
    IonButton,
    IonAvatar,
} from '@ionic/vue';
import { exit } from 'ionicons/icons';
import { computed, ref } from 'vue';
import TabsMenu from '@/components/TabsMenu.vue';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const user = computed(() => authStore.user);

const logout = () => {
    authStore.logout();
};

const userPhoto = ref(user.value?.photoURL || 'https://ionicframework.com/docs/img/demos/avatar.svg');

function handleImageError() {
    userPhoto.value = 'https://ionicframework.com/docs/img/demos/avatar.svg';
}

function onFileChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            userPhoto.value = reader.result as string;
            // Tambahkan logika untuk menyimpan URL baru ke server/cloud jika diperlukan.
        };
        reader.readAsDataURL(file);
    }
}
</script>

<style scoped>
#avatar-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px 0;
}

ion-avatar {
    width: 100px;
    height: 100px;
    margin-bottom: 10px;
}

input[type='file'] {
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    width: 100%;
    height: 100%;
}
</style>
