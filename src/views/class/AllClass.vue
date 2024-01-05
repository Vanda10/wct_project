<template>
  <div class="main-content ml-[300px] p-8">
    <!-- First row -->
    <div class="flex justify-between">
      <p class="mt-2 ml-7">Classes</p>
      <button
        type="button"
        class="btn text-white bg-sky-600 hover:bg-sky-700 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
      >
        <i class="bi bi-pencil-square"></i> Add Class
      </button>
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
          <th scope="col">Class Name</th>
          <th scope="col">Class ID</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(classItem, index) in filteredClasses" :key="classItem.id">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ classItem.classtype || 'N/A' }}</td>
          <td>{{ classItem.classid || 'N/A' }}</td>
          <td>
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

const filterTable = () => {
  if (searchQuery.value === '') {
    filteredClasses.value = classes.value;
  } else {
    filteredClasses.value = classes.value.filter(classItem =>
      (classItem.classtype && classItem.classtype.toLowerCase().includes(searchQuery.value.toLowerCase())) ||
      (classItem.classid && classItem.classid.toLowerCase().includes(searchQuery.value.toLowerCase()))
    );
  }
};

const confirmDelete = (classId) => {
  if (window.confirm("Are you sure you want to delete this class?")) {
    deleteClass(classId);
  }
};

const deleteClass = async (classId) => {
  try {
    await axios.delete(`https://schoolmanagementapi-46c1c75befdd.herokuapp.com/classes/${classId}`);
    const response = await axios.get('https://schoolmanagementapi-46c1c75befdd.herokuapp.com/classes/');
    classes.value = response.data.data;
    filterTable();
  } catch (error) {
    console.error('Error deleting class:', error);
  }
};

onMounted(async () => {
  try {
    const response = await axios.get('https://schoolmanagementapi-46c1c75befdd.herokuapp.com/classes/');
    classes.value = response.data.data;
    filterTable();
  } catch (error) {
    console.error('Error fetching classes:', error);
  }
});
</script>
