<template>
  <div class="main-content ml-[300px] p-8">
    <!-- First row -->
    <div class="flex justify-between">
      <p class="mt-2 ml-7 font-bold text-[20px]">All Students</p>
      <button @click="goToAddStudent" class="btn text-white bg-sky-600 hover:bg-sky-700 font-medium rounded-lg text-sm me-0 mb-2">
        <i class="bi bi-pencil-square"></i> Add Student
      </button>
    </div>

    <!-- Second row -->
    <div class="flex justify-center mt-3">
      <div class="p-2.5 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-gray-200 text-black flex-grow">
        <i class="bi bi-search text-sm"></i>
        <input v-model="searchQuery" type="text" placeholder="Search" class="text-[15px] ml-4 w-full bg-transparent focus:outline-none" @input="filterTable" />
      </div>
    </div>

    <!-- Third row table -->
    <table class="table table-striped mt-3">
      <thead>
        <tr>
          <th scope="col">No</th>
          <th scope="col">ID</th>
          <th scope="col">Last Name</th>
          <th scope="col">First Name</th>
          <th scope="col">Email</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(student, index) in filteredStudents" :key="student.id">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ student.id }}</td>
          <td>{{ student.last_name || 'N/A' }}</td>
          <td>{{ student.first_name || 'N/A' }}</td>
          <td>{{ student.email || 'N/A' }}</td>
          <td>
            <router-link :to="{ name: 'student_detail', params: { id: student.id }}">
              <button class="link link-primary">Edit</button>
            </router-link>
            <button @click="confirmDelete(student.id)" class="link link-danger ml-2">
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

const students = ref([]);
const filteredStudents = ref([]);
const searchQuery = ref('');
const router = useRouter();

const filterTable = () => {
  if (!searchQuery.value) {
    filteredStudents.value = students.value;
  } else {
    const query = searchQuery.value.toLowerCase();
    filteredStudents.value = students.value.filter(student =>
      ['last_name', 'first_name', 'email'].some(prop =>
        student[prop]?.toLowerCase().includes(query)
      )
    );
  }
};

const goToAddStudent = () => {
  router.push({ name: 'add_student' });
};

const confirmDelete = (studentId) => {
  if (window.confirm("Are you sure you want to delete this student?")) {
    deleteStudent(studentId);
  }
};

const deleteStudent = async (studentId) => {
  try {
    await axios.delete(`http://127.0.0.1:8000/students/${studentId}`);
    const response = await axios.get('http://127.0.0.1:8000/students');
    students.value = response.data.data;
    filterTable();
  } catch (error) {
    console.error('Error deleting student:', error);
  }
};

onMounted(async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/students');
    students.value = response.data.data;
    filterTable();
  } catch (error) {
    console.error('Error fetching students:', error);
  }
});
</script>