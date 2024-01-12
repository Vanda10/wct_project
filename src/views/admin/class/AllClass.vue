<template>
  <div class="main-content ml-[300px] p-8">
    <!-- First row -->
    <div class="flex justify-between">
      <p class="mt-2 ml-7">Classes</p>
    </div>

    <!-- Second row -->
    <div class="flex justify-center mt-3">
      <div class="ml-5 p-2.5 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-gray-200 text-black flex-grow">
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
    <table class="table table-striped mt-10">
      <thead>
        <tr>
          <th scope="col">No</th>
          <th scope="col">Class Code</th>
          <th scope="col">Department</th>
          <th scope="col">Year</th>
          <th scope="col">Semester</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(classItem, index) in filteredClasses" :key="classItem.id">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ classItem.group_code || 'N/A' }}</td>
          <td>{{ getDepartmentName(classItem.department_id) || 'N/A' }}</td>
          <td>{{ classItem.year || 'N/A' }}</td>
          <td>{{ classItem.semester || 'N/A' }}</td>
          <td>
            <button @click="editClass(classItem)" class="link link-primary ml-2">
              Edit
            </button>
            <button @click="confirmDelete(classItem.id)" class="link link-danger ml-2">
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

const classes = ref([]);
const filteredClasses = ref([]);
const searchQuery = ref('');
const router = useRouter();

const departmentNames = ref({
  1: 'DSE',
  2: 'ITE',
  3: 'FTE',
  4: 'BIO',
  5: 'ASCE',
  6: 'TEED',
});

const getDepartmentName = (departmentId) => {
  return departmentNames.value[departmentId];
};

const filterTable = () => {
  if (searchQuery.value === '') {
    filteredClasses.value = classes.value;
  } else {
    filteredClasses.value = classes.value.filter(classItem =>
      (classItem.group_code && classItem.group_code.toLowerCase().includes(searchQuery.value.toLowerCase()))
    );
  }
};

const editClass = async (classItem) => {
  const newSemester = prompt('Enter new semester:', classItem.semester);
  const newYear = prompt('Enter new year:', classItem.year);

  if (newSemester !== null && newYear !== null) {
    await updateClass(classItem.id, { semester: newSemester, year: parseInt(newYear) });
  }
};

const updateClass = async (classId, newData) => {
  try {
    const { semester, year } = newData;
    await axios.put(`http://127.0.0.1:8000/classes/${classId}/update-semester-year?semester=${semester}&year=${year}`);
    await fetchData();  // Fetch updated data after successful update
  } catch (error) {
    console.error('Error updating class:', error.response);
  }
};

const confirmDelete = (classId) => {
  if (window.confirm("Are you sure you want to delete this class?")) {
    deleteClass(classId);
  }
};

const deleteClass = async (classId) => {
  try {
    await axios.delete(`http://127.0.0.1:8000/classes/${classId}`);
    await fetchData();  // Fetch updated data after successful deletion
  } catch (error) {
    console.error('Error deleting class:', error);
  }
};

const fetchData = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/classes/');
    classes.value = response.data.data;
    filterTable();
  } catch (error) {
    console.error('Error fetching classes:', error);
  }
};

onMounted(() => {
  fetchData();
});
</script>
