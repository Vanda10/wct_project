<template>
    <div class="main-content ml-[300px] p-8">
      <div class="text-4xl font-bold mt-20 ml-20">
        <h1>Create Course</h1>
      </div>
  
      <div class="flex mt-10 ml-20">
        <div class="grid grid-cols-1 text-gray-400 font-bold">
          <div class="mb-3">
            <label class="block text-[#183D5C] mb-1">Course ID</label>
            <input v-model="newCourse.courseid" class="form-control w-[500px]" />
          </div>
          <div class="mb-3">
            <label class="block text-[#183D5C] mb-1">Course Name</label>
            <input v-model="newCourse.coursename" class="form-control" />
          </div>

        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import axios from 'axios';
  
  const newCourse = ref({
    courseid: '',
    coursename: '',
  });
  
  const courseIdExists = ref(false);
  
  const checkCourseId = async () => {
    try {
      const trimmedCourseId = newCourse.value.courseid.trim();
  
      const existingCourses = await axios.get('https://schoolmanagementapi-46c1c75befdd.herokuapp.com/courses/', {
        params: {
          courseid: trimmedCourseId,
        },
      });
  
      courseIdExists.value = existingCourses.data.length > 0;
    } catch (error) {
      console.error('Error checking course ID:', error);
    }
  };
  
  const addCourse = async () => {
    try {
      if (courseIdExists.value) {
        alert('Course ID already exists. Please choose a different Course ID.');
      } else {
        await axios.post('https://schoolmanagementapi-46c1c75befdd.herokuapp.com/courses/', newCourse.value);
        alert('Course added successfully');
        newCourse.value = {
          courseid: '',
          coursename: '',
          // Additional fields for Course
          // ...
        };
      }
    } catch (error) {
      console.error('Error adding course:', error);
    }
  };
  </script>