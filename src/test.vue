<script setup>
import LoginForm from './views/LoginForm.vue';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import auth from './authService';

// Create a single Supabase client for interacting with your database
const router = useRouter();
const checkingSession = ref(true);
const role = ref(localStorage.getItem("role"));

onMounted(async () => {
  try {
    const { data } = await auth.getSession();
    
    if (data.session) {
      if (role === 'admin' || role === 'student' || role === 'teacher') {
        router.push(`/${role.value}`);
      }
    } else {
      router.push({ path: '/login', replace: true });
    }
  } catch (error) {
    console.error('Error checking session:', error.message);
  }

  auth.onAuthStateChange((event, _session) => {
    if (event === 'SIGNED_OUT') {
      role.value = null;
      router.push({ path: '/login', replace: true });
    } else if (event === 'SIGNED_IN') {

      if (role === 'admin' || role === 'student' || role === 'teacher') {
        router.push(`/${role.value}`);
      } 
    }
  });
});
</script>

<template>
  <div>
    <router-view />
  </div>
</template>