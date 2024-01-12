<template>
    <div class="main-content ml-[300px] p-8">
      <div class="text-4xl font-bold mt-20 ml-20">
        <h1>Add Class</h1>
      </div>
  
      <div class="flex mt-10 ml-20">
        <div class="grid grid-cols-1 text-gray-400 font-bold">
          <div class="mb-3">
            <label class="block text-[#183D5C] mb-1">Class Code</label>
            <input v-model="newClass.group_code" class="form-control" />
          </div>
          <div class="mb-3">
            <label class="block text-[#183D5C] mb-1">Department</label>
            <select v-model="newClass.department_id" class="form-control w-[500px]">
                <option value="1">DSE</option>
                <option value="2">ITE</option>
                <option value="3">FTE</option>
                <option value="4">BIO</option>
                <option value="5">ASCE</option>
                <option value="6">TEED</option>
            </select>
          </div>

          <div class="mb-3">
            <label class="block text-[#183D5C] mb-1">Semester</label>
            <select v-model="newClass.semester" class="form-control w-[500px]">
                <option value="1">1</option>
                <option value="2">2</option>
            </select>
          </div>

          <div class="mb-3">
            <label class="block text-[#183D5C] mb-1">Year</label>
            <select v-model="newClass.year" class="form-control w-[500px]">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
            </select>
          </div>
  
          <button @click="addClass" class="btn w-[150px] text-white bg-[#B22222] hover:bg-red-700 px-4 py-2.5 mt-2">
            Add Course
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import axios from 'axios';
  
  const newClass = ref({
    group_code: '', 
    department_id: '',// Rename to class_name or any other appropriate field
    semester: '',
    year: '',
  });
  
  const classIdExists = ref(false);
  
  const checkClassId = async () => {
    try {
      const trimmedClassId = newClass.value.class_id.trim(); // Update to the correct field name
  
      const existingClasses = await axios.get('http://127.0.0.1:8000/classes/', {
        params: {
          class_id: trimmedClassId, // Update to the correct field name
        },
      });
  
      classIdExists.value = existingClasses.data.length > 0;
    } catch (error) {
      console.error('Error checking class ID:', error);
    }
  };
  
  const addClass = async () => {
    try {
      if (classIdExists.value) {
        alert('Class ID already exists. Please choose a different Class ID.');
      } else {
        await axios.post('http://127.0.0.1:8000/classes/', newClass.value); // Update to the correct API endpoint
        alert('Class added successfully');
        newClass.value = {
            group_code: '', 
            department_id: '',// Rename to class_name or any other appropriate field
            semester: '',
            year: '',
        };
      }
    } catch (error) {
      console.error('Error adding class:', error);
    }
  };
  </script>
  