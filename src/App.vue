<script setup>
import sidebar from './components/sidebar.vue';
import LoginForm from './views/LoginForm.vue';
import ForgetPass from './views/ForgetPass.vue';
import ResetPass from './views/ResetPass.vue';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router'

import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabase = createClient('https://mkslcxldoihuzcxijabw.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1rc2xjeGxkb2lodXpjeGlqYWJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQzNjE1MTUsImV4cCI6MjAxOTkzNzUxNX0.40TikJDPUS8rgKYv4-YAMG1kvkpv7AzX4AynpRd3d08')
const router = useRouter()

onMounted(async () => {
  supabase.auth.getSession().then(({ data }) => {
    if(data.session) {
      router.push({ path: '/dashboard', replace: true })
    }else {
      router.push({ path: '/login', replace: true })
    }
  })

  supabase.auth.onAuthStateChange((event, _session) => {
    if (event == "SIGNED_OUT"){
      router.push({ path: '/login', replace: true })
    }else if(event == "SIGNED_IN") {
      router.push({ path: '/', replace: true })
    }
  })
})
</script>

<template>
  <div>
    <router-view />
  </div>
</template>
<style scoped>
</style>
