<template>
  <div class="main-content ml-[300px] p-8">
    <div class="text-4xl font-bold mt-20 ml-20">
      <h1>Create Teacher</h1>
    </div>

    <div class="flex mt-10 ml-20">
      <div class="grid grid-cols-1 text-gray-400 font-bold">
        <div class="mb-3">
          <label class="block text-[#183D5C] mb-1">Name</label>
          <input v-model="newTeacher.name" class="form-control w-[500px]" />
        </div>
        <div class="mb-3">
          <label class="block text-[#183D5C] mb-1">Specialist</label>
          <input v-model="newTeacher.specialist" class="form-control" />
        </div>
        <div class="mb-3">
          <label class="block text-[#183D5C] mb-1">Email</label>
          <input v-model="newTeacher.email" class="form-control" />
        </div>
        <div class="mb-3">
          <label class="block text-[#183D5C] mb-1">Password</label>
          <input v-model="newTeacher.password" class="form-control" />
        </div>
        <button @click="addTeacher" class="btn w-[150px] text-white bg-sky-600 hover:bg-sky-700 px-4 py-2.5 mt-2">
          Add Teacher
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import axios from 'axios';

const newTeacher = ref({
  name: '',
  specialist: '',
  email: '',
  password: '',
});

const addTeacher = async () => {
  try {
    await axios.post('http://127.0.0.1:8000/teachers/', newTeacher.value);
    // Assuming the API response contains teacher data
    alert('Teacher added successfully');
    // Clear the input fields
    newTeacher.value = {
      name: '',
      specialist: '',
      email: '',
      password: '',
    };
  } catch (error) {
    console.error('Error adding teacher:', error);
    // You can handle errors here, e.g., show an error message to the user
  }
};
</script>
