<template>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-20 w-auto" alt="Your Company" src="../assets/rupp_logo.png">
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" action="#" method="POST">

        <div>
          <label for="role" class="block text-sm font-medium leading-6 text-gray-900">Role</label>
          <div class="mt-2">
            <select id="role" name="role" v-model="getRole" v-on:change="process()" required class="select select-bordered block w-full">
              <option value="admin">Admin</option>
              <option value="teacher">Teacher</option>
              <option value="student">Student</option>
            </select>
          </div>
        </div>

        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
          <div class="mt-2">
            <input v-model="email" id="email" name="email" type="email" autocomplete="email" required class="input input-bordered w-full">
          </div>
        </div>

        <div>

          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
            <div class="text-sm">
              <a href="#" class="font-semibold text-red-500 hover:text-red-300">Forgot password?</a>
            </div>
          </div>

          <div class="mt-2">
            <input v-model="password" id="password" name="password" type="password" autocomplete="current-password" required class="input input-bordered w-full">
          </div>

        </div>

        <div>
          <button type="button" class="btn bg-[#B22222] w-full text-white hover:bg-red-900 font-bold" @click="signInWithEmail">Sign in</button>
        </div>

        <div v-if="showAlert" class="mt-4 p-4 bg-red-100 text-red-700 border border-red-400 rounded w-full">
          {{ alertMessage }}
        </div>

      </form>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import auth from '../authService';

const email = ref('');
const password = ref('');
const getRole = ref('admin');
const alertMessage = ref('');
const showAlert = ref(false);

const router = useRouter();

const signInWithEmail = async () => {
  try {
    const { data, error } = await auth.signInWithPassword({
      email: email.value,
      password: password.value
    });

    if (error) {
      console.error('Error signing in:', error.message);
      alertMessage.value = 'Invalid role, email or password. Please try again.';
      showAlert.value = true;
      resetForm();
    } else {
      const response = await axios.get(`https://schoolmanagementapi-46c1c75befdd.herokuapp.com/check_role?role=${getRole.value}&email=${email.value}`);

      if (response.data) {
        console.log('User authenticated and role is valid', response.data);
        await handleValidAuthentication();
      } else {
        console.log('User authenticated but role is not valid', response.data);
        alertMessage.value = 'Invalid role, email or password. Please try again.';
        showAlert.value = true;
        resetForm();
      }
    }
  } catch (error) {
    console.error('Error signing in:', error.message);
    alertMessage.value = 'Error signing in. Please try again later.';
    showAlert.value = true;
    resetForm();
  }
};

const process = () => {
  console.log('Role changed:', getRole.value);
  localStorage.setItem('role', getRole.value);
};

const resetForm = () => {
  email.value = '';
  password.value = '';
};

const handleValidAuthentication = async () => {
  const role = localStorage.getItem('role');
  if (role === 'admin') {
    router.push({ path: '/admin', replace: true });
  } else if (role === 'student') {
    router.push({ path: '/student', replace: true });
  } else if (role === 'teacher') {
    router.push({ path: '/teacher', replace: true });
  }
};

onMounted(() => {
  console.log(`Initial role value: ${getRole.value}`);
  localStorage.setItem('role', getRole.value);
});
</script>
