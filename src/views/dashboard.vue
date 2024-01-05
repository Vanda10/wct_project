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
              <p class="text-lg font-bold text-gray-900">12</p>
            </div>
          </div>
        </div>

        <!-- Teachers -->
        <div class="bg-white rounded-lg shadow-md p-4">
          <div class="flex items-center">
            <svg class="h-6 w-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20"></svg>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-900">Teachers</p>
              <p class="text-lg font-bold text-gray-900">12</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
