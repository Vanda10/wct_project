<template>
  <div class="sidebar fixed top-0 bottom-0 lg:left-0 md:left-0 p-2 w-[300px] overflow-y-auto text-center bg-[#6b1919]">
    <div class="p-2.5 mt-1 flex items-center justify-center">
      <div>
        <img class="mt-3 h-20 w-auto flex items-center" src="../assets/rupp_logo.png">
      </div>
    </div>

    <div class="mt-4 font-bold text-gray-100 text-l">ROYAL UNIVERSITY OF</div>
    <div class="font-bold text-gray-100 text-l mb-5">PHNOM PENH</div>

    <div class="my-4 bg-gray-500 h-[1px]"></div>

    <div class="p-2.5 mt-3 flex items-center rounded-md px-4 hover:bg-[#4f1d1d] text-gray-100">
      <router-link to="/admin">
        <i class="bi bi-bar-chart-fill"></i>
        <span class="text-[15px] ml-4 font-bold">HomePage</span>
      </router-link>
    </div>

    <div
      class="p-2.5 mt-3 flex items-center rounded-md px-4 hover:bg-[#4f1d1d] text-gray-100"
      @click="toggleDropdown('teacher')">
      <i class="bi bi-laptop"></i>
      <div class="flex justify-between w-full items-center">
        <span class="text-[15px] ml-4 font-bold">Teacher</span>
        <span class="text-sm rotate-180">
          <i v-if="teacher" class="bi bi-chevron-up"></i>
          <i v-else class="bi bi-chevron-down"></i>
        </span>
      </div>
    </div>

    <div
      v-if="teacher"
      class="text-left text-sm mt-2 w-4/5 mx-auto text-gray-100 font-bold">
      <h1 id="all-teachers" class="p-2 hover:bg-[#4f1d1d] rounded-md mt-1">
        <router-link to="/admin/all-teacher" replace>
          <i class="bi bi-caret-right-fill"></i>
          All teachers
        </router-link>
      </h1>
      <h1 id="add-teacher" class="p-2 hover:bg-[#4f1d1d] rounded-md mt-1">
        <router-link to="/admin/add-teacher" replace>
          <i class="bi bi-caret-right-fill"></i>
          Add teacher
        </router-link>
      </h1>
    </div>

    <div
      class="p-2.5 mt-3 flex items-center rounded-md px-4 hover:bg-[#4f1d1d] text-gray-100" @click="toggleDropdown('student')">
      <i class="bi bi-mortarboard-fill"></i>
      <div class="flex justify-between w-full items-center">
        <span class="text-[15px] ml-4 font-bold">Students</span>
        <span class="text-sm rotate-180">
          <i v-if="student" class="bi bi-chevron-up"></i>
          <i v-else class="bi bi-chevron-down"></i>
        </span>
      </div>
    </div>

    <div
      v-if="student"
      class="text-left text-sm mt-2 w-4/5 mx-auto text-gray-100 font-bold">
      <h1 class="p-2 hover:bg-[#4f1d1d] rounded-md mt-1">
        <router-link to="/admin/all-student">
          <i class="bi bi-caret-right-fill"></i>
          All students
        </router-link>
      </h1>
      <h1 class="p-2 hover:bg-[#4f1d1d] rounded-md mt-1">
        <router-link to="/admin/add-student">
          <i class="bi bi-caret-right-fill"></i>
          Add student
        </router-link>
      </h1>
    </div>
    <div class="p-2.5 mt-3 flex items-center rounded-md px-4 hover:bg-[#4f1d1d] text-gray-100" @click="toggleDropdown('classes')">
      <i class="bi bi-calendar2-date"></i>
      <div class="flex justify-between w-full items-center">
        <span class="text-[15px] ml-4 text-gray-100 font-bold">Classes</span>
        <span class="text-sm rotate-180">
          <i v-if="classes" class="bi bi-chevron-up"></i>
          <i v-else class="bi bi-chevron-down"></i>
        </span>
      </div>
    </div>
    <div v-if="classes"
      class="text-left text-sm mt-2 w-4/5 mx-auto text-gray-100 font-bold">
      <h1 class=" p-2 hover:bg-[#4f1d1d] rounded-md mt-1">
        <router-link to="/admin/all-class">
          <i class="bi bi-caret-right-fill"></i>
          All Classes
        </router-link>
      </h1>

      <h1 class=" p-2 hover:bg-[#4f1d1d] rounded-md mt-1">
        <router-link to="/admin/add-class">
          <i class="bi bi-caret-right-fill"></i>
          Add Class
        </router-link>
      </h1>

      <h1 class=" p-2 hover:bg-[#4f1d1d] rounded-md mt-1">
        <router-link to="/admin/manage-schedule">
          <i class="bi bi-caret-right-fill"></i>
          Class Schedule
        </router-link>
      </h1>
    </div>
    <div class="p-2.5 mt-3 flex items-center rounded-md px-4 hover:bg-[#4f1d1d] text-gray-100" @click="toggleDropdown('courses')">
      <i class="bi bi-easel2-fill"></i>
      <div class="flex justify-between w-full items-center">
        <span class="text-[15px] ml-4 text-gray-100 font-bold">Courses</span>
        <span class="text-sm rotate-180">
          <i v-if="courses" class="bi bi-chevron-up"></i>
          <i v-else class="bi bi-chevron-down"></i>
        </span>
      </div>
    </div>
    <div v-if="courses"
      class="text-left text-sm mt-2 w-4/5 mx-auto text-gray-100 font-bold">
      <h1 class=" p-2 hover:bg-[#4f1d1d] rounded-md mt-1">
        <router-link to="/admin/all-course">
          <i class="bi bi-caret-right-fill"></i>
          All Courses
        </router-link>
      </h1>
      <h1 class=" p-2 hover:bg-[#4f1d1d] rounded-md mt-1">
        <router-link to="/admin/add-course">
          <i class="bi bi-caret-right-fill"></i>
          Add course
        </router-link>
      </h1>
      <!-- <h1 class=" p-2 hover:bg-[#4f1d1d] rounded-md mt-1">
        <router-link to="/assign-course">
          <i class="bi bi-caret-right-fill"></i>
          Assign Course
        </router-link>
      </h1> -->
    </div>
    <div class="p-2.5 mt-3 flex items-center rounded-md px-4 hover:bg-[#4f1d1d] text-gray-100" @click="onLogout">
      <i class="bi bi-box-arrow-in-right"></i>
      <span class="text-[15px] ml-4 text-gray-100 font-bold">Logout</span>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';

const teacher = ref(false);
const student = ref(false);
const classes = ref(false);
const courses = ref(false);

function toggleDropdown(category) {
// Toggle the visibility of the selected dropdown
if (category === 'teacher') {
  teacher.value = !teacher.value;
} else if (category === 'student') {
  student.value = !student.value;
} else if (category === 'classes') {
  classes.value = !classes.value;
} else if (category === 'courses') {
  courses.value = !courses.value;
}
}
import auth from '../authService';

async function onLogout() {
  const { error } = await auth.signOut()
  if (error) {
    return
  }
}
</script>

<style scoped>
/* Add your scoped styles if needed */
</style>

