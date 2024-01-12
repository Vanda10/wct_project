<template>
  <div class="main-content ml-[300px] p-8">
    <!-- First row -->
    <div class="flex justify-between">
      <p class="mt-3 ml-3 font-bold text-m">Teachers</p>
      <router-link to="/admin/add-teacher">
      <button
        type="button"
        class="btn text-white bg-[#B22222] hover:bg-red-700 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
      >
        <i class="bi bi-pencil-square"></i> Add Teacher
      </button>
    </router-link>
    </div>

    <!-- Second row -->
    <div class="flex justify-center mt-3">
      <div class=" p-2.5 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-gray-200 text-black flex-grow">
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
          <th scope="col">ID</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(teacher, index) in filteredTeachers" :key="teacher.id">
          <th scope="row">{{ index + 1 }}</th>
          <th scope="row">{{ teacher.id }}</th>
          <td>{{ teacher.name || 'N/A' }}</td>
          <td>{{ teacher.email || 'N/A' }}</td>
          <td>
            <router-link :to="{ name: 'teacher_detail', params: { id: teacher.id }}">
              <button class="link link-primary">Edit</button>
            </router-link>
            <button @click="confirmDelete(teacher.id)" class="link link-danger ml-2">
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

const teachers = ref([]);
const filteredTeachers = ref([]);
const searchQuery = ref('');
const router = useRouter();

const filterTable = () => {
  if (searchQuery.value === '') {
    filteredTeachers.value = teachers.value;
  } else {
    filteredTeachers.value = teachers.value.filter(teacher =>
      (teacher.name && teacher.name.toLowerCase().includes(searchQuery.value.toLowerCase())) ||
      (teacher.email && teacher.email.toLowerCase().includes(searchQuery.value.toLowerCase()))
    );
  }
};

const confirmDelete = (teacherId) => {
  if (window.confirm("Are you sure you want to delete this teacher?")) {
    deleteTeacher(teacherId);
  }
};

const deleteTeacher = async (teacherId) => {
  try {
    await axios.delete(`http://localhost:8000/teachers/${teacherId}`);
    const response = await axios.get('http://localhost:8000/teachers/');
    teachers.value = response.data.data;
    filterTable();
  } catch (error) {
    console.error('Error deleting teacher:', error);
  }
};

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:8000/teachers/');
    teachers.value = response.data.data;
    filterTable();
  } catch (error) {
    console.error('Error fetching teachers:', error);
  }
});
</script>

