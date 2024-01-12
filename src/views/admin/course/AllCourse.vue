<template>
  <div class="main-content ml-[300px] p-8">

    <div class="flex  justify-center  text-2xl font-bold mt-4">
      <h1>Course and Curriculum</h1>
    </div>


    <div class="flex flex-wrap justify-center mt-5 space-x-4">
    <!-- Department Dropdown -->
    <div class="relative">
      <label class="text-gray-700">Department:</label>
      <select v-model="selectedDepartment" class="form-control w-[200px]">
        <option value="">Select</option>
        <option value="1">DSE</option>
        <option value="2">ITE</option>
        <option value="3">FTE</option>
        <option value="4">BIO</option>
        <option value="5">ASCE</option>
        <option value="6">TEED</option>
        <!-- Add more department options as needed -->
      </select>
    </div>

    <!-- Semester Dropdown -->
    <div class="relative">
      <label class="text-gray-700">Semester:</label>
      <select v-model="selectedSemester" class="form-control w-[200px]">
        <option value="">Select</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <!-- Add more semester options as needed -->
      </select>
    </div>

    <!-- Year Dropdown -->
    <div class="relative">
      <label class="text-gray-700">Year:</label>
      <select v-model="selectedYear" class="form-control w-[200px]">
        <option value="">Select</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <!-- Add more year options as needed -->
      </select>
    </div>

    <!-- Search button -->
    <button
      type="button"
      class="btn text-white bg-[#007BFF] hover:bg-[#0056b3] font-medium rounded-lg text-sm mt-3 px-5 py-2.5 me-2 mb-2"
      @click="searchCourses">
      <i class="bi bi-search"></i> Search
    </button>
  </div>

    <!-- Third row table -->
    <table class="table table-striped mt-4">
      <thead>
        <tr>
          <th scope="col">No</th>
          <th scope="col">Course Name</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(course, index) in filteredCourses" :key="course.id">
          <td>{{ index + 1 }}</td>
          <td>{{ course.coursename || 'N/A' }}</td>
          <td>
            <button @click="editCourse(course)" class="link link-warning ml-2">
              Edit
            </button>
            <button @click="deleteCourse(course.id)" class="link link-danger ml-2">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const selectedDepartment = ref('');
const selectedSemester = ref('');
const selectedYear = ref('');
const courses = ref([]);
const filteredCourses = ref([]);
const searchQuery = ref('');

const filterTable = () => {
  if (searchQuery.value === '') {
    filteredCourses.value = courses.value;
  } else {
    filteredCourses.value = courses.value.filter(course =>
      (course.coursename && course.coursename.toLowerCase().includes(searchQuery.value.toLowerCase()))
    );
  }
};

const searchCourses = async () => {
  try {
    const response = await axios.get(`http://localhost:8000/courses/?department_id=${selectedDepartment.value}&semester=${selectedSemester.value}&year=${selectedYear.value}`);

    courses.value = response.data.data;
    
    filterTable();
  } catch (error) {
    console.error('Error fetching courses:', error);
    // Handle error, e.g., show an error message to the user
  }
};

const editCourse = async (course) => {
  const newCourseName = prompt('Enter new course name:', course.coursename);
  if (newCourseName !== null) {
    try {
      await axios.patch(`http://localhost:8000/courses/${course.id}?coursename=${newCourseName}`);
      await searchCourses();
    } catch (error) {
      console.error('Error editing course:', error);
      // Handle error, e.g., show an error message to the user
    }
  }
};


const deleteCourse = async (courseId) => {
  const shouldDelete = window.confirm('Are you sure you want to delete this course?');
  if (shouldDelete) {
    try {
      await axios.delete(`http://localhost:8000/courses/${courseId}`);
      await searchCourses();
    } catch (error) {
      console.error('Error deleting course:', error);
      // Handle error, e.g., show an error message to the user
    }
  }
};
</script>