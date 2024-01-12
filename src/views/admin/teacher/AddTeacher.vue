<template>
  <div class="main-content ml-[300px] p-8">
    <div class=" flex justify-center text-2xl font-bold mt-20">
      <h1>ROYAL UNIVERSITY OF PHNOM PENH</h1>
    </div>

    <div class=" flex justify-center text-xl font-bold mt-20">
      <h1>Teacher Information Form</h1>
    </div>

    <div class="flex justify-center mt-10">
      <div class="grid grid-cols-1 text-gray-400 font-bold">
        <div class="mb-3">
          <label class="block text-[#183D5C] mb-1">Name</label>
          <input v-model="newTeacher.name" class="form-control w-[500px]" />
        </div>
        <div class="mb-3">
          <label class="block text-[#183D5C] mb-1">Email</label>
          <input v-model="newTeacher.email" class="form-control" />
        </div>
        <div class="mb-3">
          <label class="block text-[#183D5C] mb-1">Password</label>
          <input v-model="newTeacher.password" class="form-control" />
        </div>
        <button @click="addTeacher" class="btn w-[150px] text-white bg-[#B22222] hover:bg-red-700 px-4 py-2.5 mt-2">
          Add Teacher
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import axios from 'axios';
import auth from '../../../authService';

const newTeacher = ref({
  name: '',
  email: '',
  password: '',
});



const addTeacher = async () => {
  try {
    // Sign up with Supabase
    const { user, error } = await auth.signUp({
      email: newTeacher.value.email,
      password: newTeacher.value.password,
    });

    if (error) {
      console.error('Supabase sign-up error:', error.message);
      alert('Error signing up: ' + error.message);
      return;
    }

    await axios.post('http://localhost:8000/teachers/', newTeacher.value);
    // Assuming the API response contains teacher data
    alert('Teacher added successfully');
    // Clear the input fields
    newTeacher.value = {
      name: '',
      email: '',
      password: '',
    };
  } catch (error) {
    console.error('Error adding teacher:', error);
    // You can handle errors here, e.g., show an error message to the user
  }
};

</script>
