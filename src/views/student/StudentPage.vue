<template>
   <div>
    <router-view />
    <div class="sidebar fixed top-0 bottom-0 lg:left-0 md:left-0 p-2 w-[300px] overflow-y-auto text-center bg-[#6b1919]">
    <div class="p-2.5 mt-1 flex items-center justify-center">
      <div>
        <img class="mt-3 h-20 w-auto flex items-center" src="/src/assets/rupp_logo.png">
      </div>
    </div>

    <div class="mt-4 font-bold text-gray-100 text-l">ROYAL UNIVERSITY OF</div>
    <div class="font-bold text-gray-100 text-l mb-5">PHNOM PENH</div>

    <div class="my-4 bg-gray-500 h-[1px]"></div>

    <div class="p-2.5 mt-3 flex items-center rounded-md px-4 hover:bg-[#4f1d1d] text-gray-100">
      <router-link to="/student">
        <i class="bi bi-house-door-fill"></i>
        <span class="text-[15px] ml-4 font-bold">HomePage</span>
      </router-link>
    </div>

    <div class="p-2.5 mt-3 flex items-center rounded-md px-4 hover:bg-[#4f1d1d] text-gray-100">
      <router-link to="/student/all-course">
        <i class="bi bi-easel2-fill"></i>
        <span class="text-[15px] ml-4 font-bold">Course</span>
      </router-link>
    </div>

    <div class="p-2.5 mt-3 flex items-center rounded-md px-4 hover:bg-[#4f1d1d] text-gray-100">
      <router-link to="/student/all-teacher">
        <i class="bi bi-calendar-date"></i>
        <span class="text-[15px] ml-4 font-bold">Teacher</span>
      </router-link>
    </div>

    <div class="p-2.5 mt-3 flex items-center rounded-md px-4 hover:bg-[#4f1d1d] text-gray-100">
      <router-link to="/student/schedule">
        <i class="bi bi-people-fill"></i>
        <span class="text-[15px] ml-4 font-bold">Room Schedule</span>
      </router-link>
    </div>


    <div class="p-2.5 mt-3 flex items-center rounded-md px-4 hover:bg-[#4f1d1d] text-gray-100" @click="onLogout">
      <i class="bi bi-box-arrow-in-right"></i>
      <span class="text-[15px] ml-4 text-gray-100 font-bold">Logout</span>
    </div>
  </div>
   </div>
</template>

<script setup>
import auth from '../../authService';

async function onLogout() {
  const { error } = await auth.signOut()
  if (error) {
    return
  }
}
</script>