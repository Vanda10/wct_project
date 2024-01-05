<template>
    <div class="main-content ml-[300px] p-8">
      <!-- First row -->
      <div class="text-4xl font-bold mt-20 ml-20">
        <h1>Student Information</h1>
      </div>
  
      <!-- Student details -->
      <div class="flex mt-10 ml-20 mr-20">
        <!-- Student profile -->
        <div class="flex -space-x-1 overflow-hidden">
          <i class="bi bi-person-circle mt-3 inline-block text-[150px] text-black"></i>
        </div>
  
  
        <!-- Student description -->
        <div class="flex mt-10 ml-10" grow h-14>
        <div v-if="!editing" class="grid grid-cols-2 text-gray-400 font-bold">
            <p class="mb-3" @dblclick="startEditing('first_name')">First Name: {{ student.first_name || 'N/A' }}</p>
            <p class="mb-3" @dblclick="startEditing('last_name')">Last Name: {{ student.last_name || 'N/A' }}</p>
            <p class="mb-3" @dblclick="startEditing('gender')">Gender: {{ student.gender || 'N/A' }}</p>
            <p class="mb-3" @dblclick="startEditing('dob')">Date of Birth: {{ student.dob || 'N/A' }}</p>
            <p class="mb-3" @dblclick="startEditing('phone_number')">Phone Number: {{ student.phone_number || 'N/A' }}</p>
            <p class="mb-3" @dblclick="startEditing('email')">Email: {{ student.email || 'N/A' }}</p>
            <p class="mb-3" @dblclick="startEditing('password')">Password: {{ student.password || 'N/A' }}</p>
            <p class="mb-3" @dblclick="startEditing('department_id')">Department ID: {{ student.department_id || 'N/A' }}</p>
            <p class="mb-3" @dblclick="startEditing('class_id')">Class ID: {{ student.class_id || 'N/A' }}</p>
            <p class="mb-3" @dblclick="startEditing('year')">Year: {{ student.year || 'N/A' }}</p>
        </div>
  
        <div v-else class="grid grid-cols-2 text-gray-400 font-bold">
            <div class="flex flex-col mb-3">
                <label for="first-name">First Name</label>
                <input id="first-name" v-model="editedStudent.first_name" class="form-control" />
            </div>
            <div class="flex flex-col mb-3 ml-5">
                <label for="last-name">Last Name</label>
                <input id="last-name" v-model="editedStudent.last_name" class="form-control" />
            </div>
            <div class="flex flex-col mb-3">
                <label for="gender">Gender</label>
                <input id="gender" v-model="editedStudent.gender" class="form-control" />
            </div>
            <div class="flex flex-col mb-3 ml-5">
                <label for="dob">Date of Birth</label>
                <input id="dob" v-model="editedStudent.dob" class="form-control" />
            </div>
            <div class="flex flex-col mb-3">
                <label for="phone-number">Phone Number</label>
                <input id="phone-number" v-model="editedStudent.phone_number" class="form-control" />
            </div>
            <div class="flex flex-col mb-3 ml-5">
                <label for="email">Email</label>
                <input id="email" v-model="editedStudent.email" class="form-control" />
            </div>
            <div class="flex flex-col mb-3">
                <label for="password">Password</label>
                <input id="password" v-model="editedStudent.password" class="form-control" />
            </div>
            <div class="flex flex-col mb-3 ml-5">
                <label for="department-id">Department ID</label>
                <input id="department-id" v-model="editedStudent.department_id" class="form-control" />
            </div>
            <div class="flex flex-col mb-3">
                <label for="class-id">Class ID</label>
                <input id="class-id" v-model="editedStudent.class_id" class="form-control" />
            </div>
            <div class="flex flex-col mb-3 ml-5">
                <label for="year">Year</label>
                <input id="year" v-model="editedStudent.year" class="form-control" />
            </div>
            <div class="flex">
                <button @click="updateStudent" class="btn w-[100px] text-white bg-sky-600 hover:bg-sky-700 px-4 py-2.5 mt-2">
                    Update
                </button>
            </div>
        </div>
        </div>
  
        
      </div>
  
      <!-- Additional details -->
      <div class="flex-col mt-20 mr-20 ml-[110px] text-[#183D5C] font-bold">
        <div class="flex mt-4">
          <i class="bi bi-easel2-fill"></i>
          <p class="ml-3">Courses: </p>
        </div>
  
        <div class="flex mt-4">
          <i class="bi bi-door-open"></i>
          <p class="ml-3">Classes: </p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { useRoute } from 'vue-router';
  
  const student = ref({});
  const editedStudent = ref({});
  const editing = ref(false);
  const route = useRoute();
  
  const startEditing = (field) => {
    editing.value = true;
    editedStudent.value = { ...student.value }; // Create a copy for editing
    editedStudent.value.editingField = field; // Keep track of the field being edited
  };
  
  const stopEditing = async (field) => {
    try {
      if (editedStudent.value[field] !== student.value[field]) {
        // If the value has changed, update it in the database
        await axios.put(`http://127.0.0.1:8000/students/${route.params.id}`, {
          [field]: editedStudent.value[field],
        });
      }
      editing.value = false;
    } catch (error) {
      console.error(`Error updating ${field}:`, error);
    }
  };
  
  const updateStudent = async () => {
    try {
      await axios.put(`http://127.0.0.1:8000/students/${route.params.id}`, editedStudent.value);
      // Assuming the API response contains student data
      student.value = { ...editedStudent.value };
      editing.value = false;
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };
  
  onMounted(async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/students/${route.params.id}`);
      student.value = response.data;
      editedStudent.value = { ...student.value }; // Initialize editedStudent with student data
    } catch (error) {
      console.error('Error fetching student details:', error);
    }
  });
  </script>
  