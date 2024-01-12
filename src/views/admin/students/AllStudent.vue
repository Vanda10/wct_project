<template>
  <div class="main-content ml-[300px] p-8">
    <!-- First row -->
    <div class="flex justify-between">
      <p class="mt-2 ml-7 font-bold text-[20px]">All Students</p>
      <div class="flex mb-3 font-bold">
        <button @click="showAllStudents" class="btn text-white bg-[#B22222] hover:bg-red-700 font-medium rounded-lg text-sm me-0 mb-2">
          <i class="bi bi-people"></i> All Students
        </button>
        <button @click="downloadToExcel" class="btn text-white bg-[#4CAF50] hover:bg-green-700 font-medium rounded-lg text-sm me-0 mb-2 ml-2">
          <i class="bi bi-download"></i> Download Excel
        </button>
      </div>
    </div>

    <!-- Second row -->
    <div class="flex justify-center mt-1">
      <div class="p-2.5 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-gray-200 text-black flex-grow">
        <i class="bi bi-search text-sm"></i>
        <input v-model="searchQuery" type="text" placeholder="Search" class="text-[15px] ml-4 w-full bg-transparent focus:outline-none" @input="filterTable" />
      </div>
    </div>

    <!-- Third row - Class dropdown and Search button -->
    <div class="flex justify-between mt-3">
      <!-- Class Dropdown -->
      <div class="p-2.5 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-white text-black flex-grow">
        <i class="bi bi-list text-sm"></i>
        <select v-model="selectedGroup" @change="fetchStudentsByGroup" class="text-[15px] ml-4 w-full bg-transparent focus:outline-none">
          <option value="">Select Class</option>
          <option v-for="classOption in classOptions" :key="classOption.id" :value="classOption.group_code">
            {{ classOption.group_code }}
          </option>
        </select>
      </div>
      <button @click="searchStudents" class="btn text-white bg-[#B22222] hover:bg-red-700 font-medium rounded-lg text-sm me-0 mb-2 mt-[8px] ml-3">
          <i class="bi bi-search text-sm"></i> Search
        </button>
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
import ExcelJS from 'exceljs';

const students = ref([]);
const filteredStudents = ref([]);
const searchQuery = ref('');
const selectedGroup = ref('');
const classOptions = ref([]);
const router = useRouter();

onMounted(async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/classes/');
    classOptions.value = response.data.data; // Assuming the API response is an array of objects with 'id' and 'group_code' properties
  } catch (error) {
    console.error('Error fetching class options:', error);
  }
});

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

const showAllStudents = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/students/');
    students.value = response.data.data;
    filterTable();
  } catch (error) {
    console.error('Error fetching all students:', error);
  }
};

const downloadToExcel = async () => {
  try {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Students');

    // Add headers to the worksheet
    worksheet.addRow(['No', 'ID', 'Last Name', 'First Name', 'Email']);

    // Add data to the worksheet
    students.value.forEach((student, index) => {
      worksheet.addRow([index + 1, student.id, student.last_name || 'N/A', student.first_name || 'N/A', student.email || 'N/A']);
    });

    // Create a blob from the workbook
    const blob = await workbook.xlsx.writeBuffer();

    // Create a Blob and a link element to trigger the download
    const url = window.URL.createObjectURL(new Blob([blob]));
    const a = document.createElement('a');
    a.href = url;
    a.download = 'students.xlsx';
    a.click();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error creating Excel file:', error);
  }
};

const searchStudents = async () => {
  if (selectedGroup.value) {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/students/by_group/${selectedGroup.value}`);
      students.value = response.data.data;
      filterTable();
    } catch (error) {
      console.error('Error fetching students by group:', error);
    }
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
    const response = await axios.get('http://127.0.0.1:8000/students/');
    students.value = response.data.data;
    filterTable();
  } catch (error) {
    console.error('Error deleting student:', error);
  }
};

onMounted(async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/students/');
    students.value = response.data.data;
    filterTable();
  } catch (error) {
    console.error('Error fetching students:', error);
  }
});
</script>