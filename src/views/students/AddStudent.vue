<template>
  <div class="main-content ml-[300px] p-8">
    <div class="text-4xl font-bold mt-4 ml-10">
      <h1>Create Student</h1>
    </div>

    <div class="flex mt-5 ml-5">
      <div class="grid grid-cols-2 gap-6 text-gray-400 font-bold w-full">
        <div class="mb-3">
          <label class="block text-[#183D5C] mb-1">First Name</label>
          <input v-model="newStudent.first_name" class="form-control" />
        </div>
        <div class="mb-3">
          <label class="block text-[#183D5C] mb-1">Last Name</label>
          <input v-model="newStudent.last_name" class="form-control" />
        </div>
        <div class="mb-3">
          <label class="block text-[#183D5C] mb-1">Gender</label>
          <input v-model="newStudent.gender" class="form-control" />
        </div>
        <div class="mb-3">
          <label class="block text-[#183D5C] mb-1">Date of Birth</label>
          <input v-model="newStudent.dob" type="date" class="form-control" />
        </div>
        <div class="mb-3">
          <label class="block text-[#183D5C] mb-1">Phone Number</label>
          <input v-model="newStudent.phone_number" class="form-control" />
        </div>
        <div class="mb-3">
          <label class="block text-[#183D5C] mb-1">Email</label>
          <input v-model="newStudent.email" class="form-control" />
        </div>
        <div class="mb-3">
          <label class="block text-[#183D5C] mb-1">Password</label>
          <input v-model="newStudent.password" class="form-control" />
        </div>
        <div class="mb-3">
          <label class="block text-[#183D5C] mb-1">Department ID</label>
          <input v-model="newStudent.department_id" class="form-control" />
        </div>
        <div class="mb-3">
          <label class="block text-[#183D5C] mb-1">Class ID</label>
          <input v-model="newStudent.class_id" class="form-control" />
        </div>
        <div class="mb-3">
          <label class="block text-[#183D5C] mb-1">Year</label>
          <input v-model="newStudent.year" class="form-control" />
        </div>

        <router-link to="/add-student">
        <button @click="addStudent" class="btn w-[150px] text-white bg-sky-600 hover:bg-sky-700 px-4 py-2.5 mt-2">
          Add Student
        </button>
      </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const newStudent = ref({
  first_name: '',
  last_name: '',
  gender: '',
  dob: '',
  phone_number: '',
  email: '',
  password: '',
  department_id: '',
  class_id: '',
  year: '',
});

const addStudent = async () => {
  try {
    // Check if all required fields are present
    const requiredFields = ['first_name', 'last_name', 'gender', 'dob', 'phone_number', 'email', 'password', 'department_id', 'class_id', 'year'];
    
    for (const field of requiredFields) {
      if (!newStudent.value[field]) {
        alert(`Validation error: ${field} is required.`);
        console.error(`Validation error: ${field} is required.`);
        return; // Stop further processing if a required field is missing
      }
    }

    await axios.post('https://schoolmanagementapi-46c1c75befdd.herokuapp.com/students/', newStudent.value);
    // Assuming the API response contains student data
    alert('Student added successfully');
    // Clear the input fields
    newStudent.value = {
      first_name: '',
      last_name: '',
      gender: '',
      dob: '',
      phone_number: '',
      email: '',
      password: '',
      department_id: '',
      class_id: '',
      year: '',
    };
  } catch (error) {
    if (error.response && error.response.status === 422) {
      // Validation error
      alert('Validation error. Please check your input.');
      console.error('Validation error:', error.response.data.detail);

      // Log individual validation errors
      error.response.data.detail.forEach((validationError, index) => {
        console.error(`Validation error ${index + 1}:`, validationError);
      });
    } else {
      // Other error
      console.error('Error adding student:', error);
      // You can handle other types of errors here
    }
  }
};
</script>