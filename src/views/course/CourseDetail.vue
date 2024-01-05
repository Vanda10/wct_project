<template>
    <div class="main-content ml-[300px] p-8">
      <!-- First row -->
      <div class="text-4xl font-bold mt-20 ml-20">
        <h1>Course Information</h1>
      </div>
  
      <!-- Course details -->
      <div class="flex mt-10 ml-20 mr-20">
        <!-- Course icon -->
        <div class="flex -space-x-1 overflow-hidden">
          <i class="bi bi-book mt-3 inline-block text-[150px] text-black"></i>
        </div>
  
        <!-- Course description -->
        <div class="flex mt-10 ml-20">
          <div v-if="!editing" class="flex-col text-gray-400 font-bold">
            <p class="mb-3 text-[#183D5C]">About</p>
            <p class="mb-3" @dblclick="startEditing('coursename')">Course Name: {{ course.coursename || 'N/A' }}</p>
            <p class="mb-3" @dblclick="startEditing('courseid')">Course ID: {{ course.courseid || 'N/A' }}</p>
          </div>
          <div v-else class="grid grid-cols-1 text-gray-400 font-bold">
            <input v-model="editedCourse.coursename" class="mb-3 form-control w-[500px]" />
            <input v-model="editedCourse.courseid" class="mb-3 form-control" />
            <button @click="updateCourse" class="btn w-[100px] text-white bg-sky-600 hover:bg-sky-700 px-4 py-2.5 mt-2">
              Update
            </button>
          </div>
        </div>
      </div>
  
      <!-- Additional details -->
      <div class="flex-col mt-20 mr-20 ml-[110px] text-[#183D5C] font-bold">
        <div class="flex mt-4">
          <i class="bi bi-easel2-fill"></i>
          <p class="ml-3">Additional Details Placeholder</p>
        </div>
  
        <div class="flex mt-4">
          <i class="bi bi-door-open"></i>
          <p class="ml-3">Additional Details Placeholder</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { useRoute } from 'vue-router';
  
  const course = ref({});
  const editedCourse = ref({});
  const editing = ref(false);
  const route = useRoute();
  
  const startEditing = (field) => {
    editing.value = true;
    editedCourse.value = { ...course.value }; // Create a copy for editing
    editedCourse.value.editingField = field; // Keep track of the field being edited
  };
  
  const stopEditing = async (field) => {
    try {
      if (editedCourse.value[field] !== course.value[field]) {
        // If the value has changed, update it in the database
        await axios.put(`http://127.0.0.1:8000/courses/${route.params.id}`, {
          [field]: editedCourse.value[field],
        });
      }
      editing.value = false;
    } catch (error) {
      console.error(`Error updating ${field}:`, error);
    }
  };
  
  const updateCourse = async () => {
    try {
      await axios.put(`https://schoolmanagementapi-46c1c75befdd.herokuapp.com/courses/${route.params.id}`, editedCourse.value);
      // Assuming the API response contains course data
      course.value = { ...editedCourse.value };
      editing.value = false;
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };
  
  onMounted(async () => {
    try {
      const response = await axios.get(`https://schoolmanagementapi-46c1c75befdd.herokuapp.com/courses/${route.params.id}`);
      course.value = response.data;
      editedCourse.value = { ...course.value }; // Initialize editedCourse with course data
    } catch (error) {
      console.error('Error fetching course details:', error);
    }
  });
  </script>