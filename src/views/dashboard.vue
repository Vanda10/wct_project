<template>
  <div class="main-content ml-[300px]">
    <div class="rounded px-8 pt-6 pb-8 mb-4">

      <!-- Center and make the koala image bigger -->
      <div class="flex items-center justify-center">
        <img class="mt-3 w-auto" src="../assets/koala.png" alt="Koala Image">
      </div>

      <!-- Center the heading -->
      <div class="flex items-center justify-center mb-4">
        <h3 class="text-lg font-medium text-gray-900">Universities Statistics</h3>
        <svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20"></svg>
      </div>
      
      <!-- Updated grid class with responsive classes -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
        
        <!-- Faculties -->
        <div class="bg-white rounded-lg shadow-md p-4">
          <div class="flex items-center">
            <svg class="h-6 w-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20"></svg>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-900">Faculties</p>
              <p class="text-lg font-bold text-gray-900">12</p>
            </div>
          </div>
        </div>

        <!-- Department -->
        <div class="bg-white rounded-lg shadow-md p-4">
          <div class="flex items-center">
            <svg class="h-6 w-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20"></svg>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-900">Department</p>
              <p class="text-lg font-bold text-gray-900">12</p>
            </div>
          </div>
        </div>

        <!-- Students -->
        <div class="bg-white rounded-lg shadow-md p-4">
          <div class="flex items-center">
            <svg class="h-6 w-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20"></svg>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-900">Students</p>
              <p class="text-lg font-bold text-gray-900">{{ totalStudents }}</p>
            </div>
          </div>
        </div>

        <!-- Teachers -->
        <div class="bg-white rounded-lg shadow-md p-4">
          <div class="flex items-center">
            <svg class="h-6 w-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20"></svg>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-900">Teachers</p>
              <p class="text-lg font-bold text-gray-900">{{ totalTeachers }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from 'axios';

export default {
  data() {
    return {
      totalStudents: 0,
      totalTeachers: 0,
    };
  },
  mounted() {
    // Fetch the total number of students from the backend
    axios.get('https://schoolmanagementapi-46c1c75befdd.herokuapp.com/students/')
      .then(response => {
        // Assuming the response contains a 'data' object with a list of students
        // Get the length of the 'data' array to determine the total number of students
        this.totalStudents = response.data.data.length;
      })
      .catch(error => {
        console.error('Error fetching total students:', error);
      });

    // Fetch the total number of teachers from the backend
    axios.get('https://schoolmanagementapi-46c1c75befdd.herokuapp.com/teachers/')
      .then(response => {
        // Assuming the response contains a 'data' object with a list of teachers
        // Get the length of the 'data' array to determine the total number of teachers
        this.totalTeachers = response.data.data.length;
      })
      .catch(error => {
        console.error('Error fetching total teachers:', error);
      });
  },
};
</script>
