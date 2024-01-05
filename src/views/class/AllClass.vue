<template>
    <div class="main-content ml-[300px] p-8">
      <!-- first row -->
      <div class="flex justify-between">
        <p class="mt-2 ml-7 font-bold">Class</p>
        <button type="button" 
            class="btn text-white bg-sky-600 hover:bg-sky-700 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
            <i class="bi bi-pencil-square"></i>
            Add Class
        </button>
      </div>
      <!-- second row -->
      <div class="flex justify-center mt-3">
        <div class="dropdown dropdown-bottom">
            <div tabindex="0" role="button" class="btn text-white bg-sky-600 hover:bg-sky-700 px-4 py-2.5">
            <i class="bi bi-caret-down-fill"></i>  Filtered
            </div>
            <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
            <li><a>ID</a></li>
            <li><a>Name</a></li>
            </ul>
        </div>
  
        <div class="ml-5 p-2.5 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-gray-200 text-black flex-grow">
          <i class="bi bi-search text-sm"></i>
          <input
            type="text"
            placeholder="Search"
            class="text-[15px] ml-4 w-full bg-transparent focus:outline-none"/>
        </div>
      </div>
    </div>
</template>

<script setup>

</script>