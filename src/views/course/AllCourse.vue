<template>
  <div class="main-content ml-[300px] p-8">
    <!-- First row -->
    <div class="flex justify-between">
      <p class="mt-2 ml-3 font-bold text-m">Courses</p>
      <button
        type="button"
        class="btn text-white bg-[#B22222] hover:bg-red-700 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
      >
        <i class="bi bi-pencil-square"></i> Add Course
      </button>
    </div>

    <!-- Second row -->
    <div class="flex justify-center mt-3">
      <div class="p-2.5 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-gray-200 text-black flex-grow">
        <i class="bi bi-search text-sm"></i>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search"
          class="text-[15px] ml-4 w-full bg-transparent focus:outline-none"
          @input="filterTable"
        />
      </div>
    </div>

    <!-- Third row table -->
    <table class="table table-striped mt-2">
      <thead>
        <tr>
          <th scope="col">No</th>
          <th scope="col">Course Name</th>
          <th scope="col">Course ID</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(course, index) in filteredCourses" :key="course.id">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ course.coursename || 'N/A' }}</td>
          <td>{{ course.courseid || 'N/A' }}</td>
          <td>
            <router-link :to="{ name: 'course_detail', params: { id: course.id }}">
              <button class="link link-primary">Edit</button>
            </router-link>
            <button @click="confirmDelete(course.id)" class="link link-danger ml-2">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>  
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const courses = ref([]);
const filteredCourses = ref([]);
const searchQuery = ref('');
const router = useRouter();

const filterTable = () => {
  if (searchQuery.value === '') {
    filteredCourses.value = courses.value;
  } else {
    filteredCourses.value = courses.value.filter(course =>
      (course.coursename && course.coursename.toLowerCase().includes(searchQuery.value.toLowerCase())) ||
      (course.courseid && course.courseid.toLowerCase().includes(searchQuery.value.toLowerCase()))
    );
  }
};

const confirmDelete = (courseId) => {
  if (window.confirm("Are you sure you want to delete this course?")) {
    deleteCourse(courseId);
  }
};

const deleteCourse = async (courseId) => {
  try {
    await axios.delete(`https://schoolmanagementapi-46c1c75befdd.herokuapp.com/courses/${courseId}`);
    const response = await axios.get('https://schoolmanagementapi-46c1c75befdd.herokuapp.com/courses/');
    courses.value = response.data.data;
    filterTable();
  } catch (error) {
    console.error('Error deleting course:', error);
  }
};

onMounted(async () => {
  try {
    const response = await axios.get('https://schoolmanagementapi-46c1c75befdd.herokuapp.com/courses/');
    courses.value = response.data.data;
    filterTable();
  } catch (error) {
    console.error('Error fetching courses:', error);
  }
});
</script>