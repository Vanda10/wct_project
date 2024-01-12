<template>
  <div class="main-content ml-[300px] p-8">
    <div class="text-4xl font-bold mt-20 ml-20">
      <h1>Create Course</h1>
    </div>

    <div class="flex mt-10 ml-20">
      <div class="grid grid-cols-1 text-gray-400 font-bold">
        <div class="mb-3">
          <label class="block text-[#183D5C] mb-1">Department</label>
          <select v-model="newCourse.department_id" class="form-control w-[500px]">
            <option value="1">DSE</option>
            <option value="2">ITE</option>
            <option value="3">FTE</option>
            <option value="4">BIO</option>
            <option value="5">ASCE</option>
            <option value="6">TEED</option>
          </select>
        </div>
        <div class="mb-3">
          <label class="block text-[#183D5C] mb-1">Course Name</label>
          <input v-model="newCourse.coursename" class="form-control" />
        </div>
        <div class="mb-3">
          <label class="block text-[#183D5C] mb-1">Semester</label>
          <select v-model="newCourse.semester" class="form-control w-[500px]">
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
        </div>
        <div class="mb-3">
          <label class="block text-[#183D5C] mb-1">Year</label>
          <select v-model="newCourse.year" class="form-control w-[500px]">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>

        <button @click="addCourse" class="btn w-[150px] text-white bg-[#B22222] hover:bg-red-700 px-4 py-2.5 mt-2">
          Add Course
        </button>
      </div>
    </div>
  </div>
</template>

  
  <script setup>
  import { ref } from 'vue';
  import axios from 'axios';
  
  const newCourse = ref({
    department_id: '',
    coursename: '',
    semester: '',
    year: '',
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
          department_id: '',
          coursename: '',
          semester: '',
          year: '',
        };
      }
    } catch (error) {
      console.error('Error adding course:', error);
    }
  };
  </script>