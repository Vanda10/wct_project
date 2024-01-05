<template>
    <div class="main-content ml-[300px] p-8">
      <!-- First row -->
      <div class="text-4xl font-bold mt-20 ml-20">
        <h1>Teacher Information</h1>
      </div>
  
      <!-- Teacher details -->
      <div class="flex mt-10 ml-20 mr-20">
        <!-- Teacher profile -->
        <div class="flex -space-x-1 overflow-hidden">
          <i class="bi bi-person-circle mt-3 inline-block text-[150px] text-black"></i>
        </div>
<!-- Teacher description -->
        <div class="flex mt-10 ml-20">
            <div v-if="!editing" class="flex-col text-gray-400 font-bold">
            <p class="mb-3 text-[#183D5C]">About</p>
            <p class="mb-3" @dblclick="startEditing('name')">Name: {{ teacher.name || 'N/A' }}</p>
            <p class="mb-3" @dblclick="startEditing('specialist')">Specialist: {{ teacher.specialist || 'N/A' }}</p>
            <p class="mb-3" @dblclick="startEditing('email')">Email: {{ teacher.email || 'N/A' }}</p>
            <p class="mb-3" @dblclick="startEditing('password')">Password: {{ teacher.password || 'N/A' }}</p>
            </div>
            <div v-else class="grid grid-cols-1 text-gray-400 font-bold" >
                <input v-model="editedTeacher.name" class="mb-3 form-control w-[500px]" />
                <input v-model="editedTeacher.specialist" class="mb-3 form-control" />
                <input v-model="editedTeacher.email" class="mb-3 form-control" />
                <input v-model="editedTeacher.password" class="mb-3 form-control" />
                <button @click="updateTeacher" class="btn w-[100px] text-white bg-sky-600 hover:bg-sky-700 px-4 py-2.5 mt-2">
                    Update
                </button>
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
  
  const teacher = ref({});
  const editedTeacher = ref({});
  const editing = ref(false);
  const route = useRoute();
  
  const startEditing = (field) => {
    editing.value = true;
    editedTeacher.value = { ...teacher.value }; // Create a copy for editing
    editedTeacher.value.editingField = field; // Keep track of the field being edited
  };
  
  const stopEditing = async (field) => {
    try {
      if (editedTeacher.value[field] !== teacher.value[field]) {
        // If the value has changed, update it in the database
        await axios.put(`https://schoolmanagementapi-46c1c75befdd.herokuapp.com/teachers/${route.params.id}`, {
          [field]: editedTeacher.value[field],
        });
      }
      editing.value = false;
    } catch (error) {
      console.error(`Error updating ${field}:`, error);
    }
  };
  
  const updateTeacher = async () => {
    try {
      await axios.put(`https://schoolmanagementapi-46c1c75befdd.herokuapp.com/teachers/${route.params.id}`, editedTeacher.value);
      // Assuming the API response contains teacher data
      teacher.value = { ...editedTeacher.value };
      editing.value = false;
    } catch (error) {
      console.error('Error updating teacher:', error);
    }
  };
  
  onMounted(async () => {
    try {
      const response = await axios.get(`https://schoolmanagementapi-46c1c75befdd.herokuapp.com/teachers/${route.params.id}`);
      teacher.value = response.data;
      editedTeacher.value = { ...teacher.value }; // Initialize editedTeacher with teacher data
    } catch (error) {
      console.error('Error fetching teacher details:', error);
    }
  });
  </script>
  