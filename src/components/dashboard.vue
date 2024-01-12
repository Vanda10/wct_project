<template>
  <div class="main-content ml-[300px]">
    <div class="rounded px-8 pt-6 pb-8 mb-4">

      <div class="hero" style="background-image: url(https://scontent.fpnh1-2.fna.fbcdn.net/v/t39.30808-6/414687134_807968771134148_1448039420697061355_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=a73e89&_nc_eui2=AeHqoplHe7PFgzskrRmqGtQA-6xt-AybTkn7rG34DJtOScvSRnWd6-BzMQ3ZlmBQNg5pl1Vw7LY7VI28evXbZ_dM&_nc_ohc=fgg4z6tx7RkAX_YLiyh&_nc_ht=scontent.fpnh1-2.fna&oh=00_AfDbF1D_Mdt22GoZV7ZxY3HT4spSa-h6_AuZR5CHBy8IRQ&oe=65A51B02);">
        <div class="hero-overlay bg-opacity-60"></div>
        <div class="hero-content text-center text-neutral-content">
          <div class="max-w-md">
            <h1 class="mb-5 mt-10 text-5xl font-bold">Hello!!</h1>
            <br>
            <p class="mb-5"></p>
          </div>
        </div>
      </div>

      <!-- Center the heading -->
      <div class="flex items-center justify-center mb-4 mt-5">
        <h3 class="text-lg font-medium text-gray-900">Universities Data</h3>
        <svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20"></svg>
      </div>
      
      <!-- Updated grid class with responsive classes -->
      <div class="flex justify-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">

        <!-- Department -->
        <div class="bg-white rounded-lg shadow-md p-4">
          <div class="flex items-center">
            <svg class="h-6 w-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20"></svg>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-900">Department</p>
              <p class="text-lg font-bold text-gray-900">6</p>
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
      <div>
        <div class="mt-5">
          <h3 class="text-lg font-medium text-gray-900">Featured Video</h3>
          <!-- Add your iframe element here with the video link -->
          <iframe src="https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2Frupp.fe%2Fvideos%2F1538085607006466%2F&show_text=false&width=560&t=0" width="100%" height="540" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" allowFullScreen="true"></iframe>
        </div>
      </div>

      <footer class="w-full mt-5 footer p-10 bg-neutral text-neutral-content">
        <p>All Rights Reserved</p>
        <!-- <p class="">, Copyright © 2023 Royal University of Phnom Penh (RUPP)</p>
        <p class="">Russian Federation Boulevard, Toul Kork, Phnom Penh, Cambodia.</p>
        <p class=""></p> -->
        <nav>
          <header class="footer-title">Services</header> 
          <a class="link link-hover">Branding</a>
          <a class="link link-hover">Design</a>
          <a class="link link-hover">Marketing</a>
          <a class="link link-hover">Advertisement</a>
        </nav> 
        <nav>
          <header class="footer-title">Company</header> 
          <a class="link link-hover">About us</a>
          <a class="link link-hover">Contact</a>
          <a class="link link-hover">Jobs</a>
          <a class="link link-hover">Press kit</a>
        </nav> 
        <nav>
          <header class="footer-title">Legal</header> 
          <a class="link link-hover">Terms of use</a>
          <a class="link link-hover">Privacy policy</a>
          <a class="link link-hover">Cookie policy</a>
        </nav>
      </footer>
    </div>
  </div>
</template>
<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue'; // Import ref and onMounted


// Data properties
const totalStudents = ref(0);
const totalTeachers = ref(0);

// Fetch the total number of students from the backend
axios.get('https://schoolmanagementapi-46c1c75befdd.herokuapp.com/students/')
  .then(response => {
    // Assuming the response contains a 'data' object with a list of students
    // Get the length of the 'data' array to determine the total number of students
    totalStudents.value = response.data.data.length;
  })
  .catch(error => {
    console.error('Error fetching total students:', error);
  });

// Fetch the total number of teachers from the backend
axios.get('https://schoolmanagementapi-46c1c75befdd.herokuapp.com/teachers/')
  .then(response => {
    // Assuming the response contains a 'data' object with a list of teachers
    // Get the length of the 'data' array to determine the total number of teachers
    totalTeachers.value = response.data.data.length;
  })
  .catch(error => {
    console.error('Error fetching total teachers:', error);
  });
</script>
