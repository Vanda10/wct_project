<template>
  <div class="main-content ml-[300px] p-8">
    <div class="flex  justify-center  text-2xl font-bold mt-4">
      <h1>Student Information Form</h1>
    </div>

    <div class="flex mt-5">
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
          <select v-model="newStudent.department_id" class="form-control">
            <option value="1">DSE</option>
            <option value="2">ITE</option>
            <option value="3">FTE</option>
            <option value="4">BIO</option>
            <option value="5">ASCE</option>
            <option value="6">TEED</option>
          </select>
        </div>
        <div class="mb-3">
          <label class="block text-[#183D5C] mb-1">Class ID</label>
          <select v-model="newStudent.group_code" class="form-control">
            <option v-for="classOption in classOptions" :key="classOption.id" :value="classOption.group_code">
              {{ classOption.group_code }}
            </option>
          </select>
        </div>
      
      </div>

    </div>
    <button @click="addStudent" class="btn mt-3 w-[150px] text-white bg-[#B22222] hover:bg-red-700 px-4 py-2.5 mt-2">
            Add Student
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted} from 'vue';
import axios from 'axios';
import auth from '../../../authService';

const newStudent = ref({
  first_name: '',
  last_name: '',
  gender: '',
  dob: '',
  phone_number: '',
  email: '',
  password: '',
  department_id: '',
  group_code: '',
});

const classOptions = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/classes/');
    classOptions.value = response.data.data; // Assuming the API response is an array of objects with 'id' and 'name' properties
  } catch (error) {
    console.error('Error fetching class options:', error);
  }
});

const addStudent = async () => {
  try {
    // Check if all required fields are present
    const requiredFields = ['first_name', 'last_name', 'gender', 'dob', 'phone_number', 'email', 'password', 'department_id', 'group_code'];
    
    for (const field of requiredFields) {
      if (!newStudent.value[field]) {
        alert(`Validation error: ${field} is required.`);
        console.error(`Validation error: ${field} is required.`);
        return; // Stop further processing if a required field is missing
      }
    }

    // Sign up with Supabase
    const { user, error } = await auth.signUp({
      email: newStudent.value.email,
      password: newStudent.value.password,
    });

    if (error) {
      console.error('Supabase sign-up error:', error.message);
      alert('Error signing up. Please check your input.');
      return;
    }

    // User successfully signed up, you can proceed to add student to the API or perform other actions
    await axios.post('http://127.0.0.1:8000/students/', newStudent.value);

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
      group_code: '',
    };
  } catch (error) {
    // Handle errors
    console.error('Error adding student:', error);
    // You can handle other types of errors here
  }
};
</script>