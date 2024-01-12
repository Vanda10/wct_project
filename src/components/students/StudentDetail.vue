<template>
  <div class="main-content ml-[300px] p-8">
    <!-- Student Information Header -->
    <div class="flex justify-center text-4xl font-bold mt-10">
      <h1>Student Information</h1>
    </div>

    <!-- Student Profile -->
    <div class="flex justify-center overflow-hidden">
      <i class="bi bi-person-circle mt-3 inline-block text-[150px] text-black"></i>
    </div>

    <!-- Student Details -->
    <div class="flex justify-center">
      <!-- Display or Edit Student Information -->
      <div class="flex mt-5 ml-10" grow h-14>
        <!-- Display Mode -->
        <div v-if="!editing" class="grid grid-cols-2 text-gray-800 font-bold">
          <p class="mb-2" @dblclick="startEditing('first_name')">First Name: {{ student.first_name || 'N/A' }}</p>
          <p class="mb-2" @dblclick="startEditing('last_name')">Last Name: {{ student.last_name || 'N/A' }}</p>
          <p class="mb-2" @dblclick="startEditing('gender')">Gender: {{ student.gender || 'N/A' }}</p>
          <p class="mb-2" @dblclick="startEditing('dob')">Date of Birth: {{ student.dob || 'N/A' }}</p>
          <p class="mb-2" @dblclick="startEditing('phone_number')">Phone Number: {{ student.phone_number || 'N/A' }}</p>
          <p class="mb-2" @dblclick="startEditing('department_id')">Department ID: {{ student.department_id || 'N/A' }}</p>
          <p class="mb-2" @dblclick="startEditing('group_code')">Class ID: {{ student.group_code || 'N/A' }}</p>
          <p class="mb-2">Password: {{ student.password || 'N/A' }}</p>
          <p class="mb-2">Email: {{ student.email || 'N/A' }}</p>
          <p class="mb-2">Student ID: {{ student.id || 'N/A' }}</p>
        </div>


        <!-- Edit Mode -->
        <div v-else class="grid grid-cols-2 text-gray-400 font-bold">
          <div class="flex flex-col mb-3">
            <label class="block text-[#183D5C] mb-1" for="first-name">First Name</label>
            <input id="first-name" v-model="editedStudent.first_name" class="form-control w-full text-center" />
          </div>
          <div class="flex flex-col mb-3 ml-10">
            <label class="block text-[#183D5C] mb-1" for="last-name">Last Name</label>
            <input id="last-name" v-model="editedStudent.last_name" class="form-control w-full text-center" />
          </div>
          <div class="flex flex-col mb-3">
            <label class="block text-[#183D5C] mb-1" for="gender">Gender</label>
            <input id="gender" v-model="editedStudent.gender" class="form-control w-full text-center" />
          </div>
          <div class="flex flex-col mb-3 ml-10">
            <label class="block text-[#183D5C] mb-1" for="dob">Date of Birth</label>
            <input id="dob" v-model="editedStudent.dob" class="form-control w-full text-center" />
          </div>
          <div class="flex flex-col mb-3">
            <label class="block text-[#183D5C] mb-1" for="phone-number">Phone Number</label>
            <input id="phone-number" v-model="editedStudent.phone_number" class="form-control w-full text-center" />
          </div>
          <div class="flex flex-col mb-3 ml-10">
            <label class="block text-[#183D5C] mb-1">Department ID</label>
            <select v-model="editedStudent.department_id" class="form-control w-full">
              <option value="1">DSE</option>
              <option value="2">ITE</option>
              <option value="3">FTE</option>
              <option value="4">BIO</option>
              <option value="5">ASCE</option>
              <option value="6">TEED</option>
            </select>
          </div>
          <div class="flex flex-col mb-3">
            <label class="block text-[#183D5C] mb-1">Class ID</label>
            <select v-model="editedStudent.group_code" class="form-control w-full">
              <option v-for="classOption in classOptions" :key="classOption.id">{{ classOption.group_code }}</option>
            </select>
          </div>
          <div class="flex flex-col mb-3 ml-10 mt-3">
            <button @click="updateStudent" class="btn w-[100px] text-white bg-[#B22222] hover:bg-red-700 px-4 py-2.5">
              Update
            </button>
          </div>
        </div>
      </div>
    </div>


    <div class="flex justify-center text-xl font-bold mt-10">
      <label>Academic Information</label>
    </div>
    <div class="flex justify-center text-m font-bold mt-10 ">
      <p class="mb-3">Year: {{ academicInfo.year || 'N/A' }}</p>
      <p class="mb-3 ml-5">Semester: {{ academicInfo.semester || 'N/A' }}</p>
      <p class="mb-3 ml-5">Department ID: {{ academicInfo.department_id || 'N/A' }}</p>
    </div>

    <div class="flex justify-center text-m font-bold mt-3">
    <table class="table table-striped mt-2 mx-auto">
        <thead>
          <tr >
            <th scope="col">No</th>
            <th scope="col">Course Name</th>
            <th scope="Year">Year</th>
            <th scope="Semester">Semester</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(course, index) in courseRespone" :key="course.id">
            <td>{{ index + 1 }}</td>
            <td>{{ course.coursename || 'N/A' }}</td>
            <td>{{ course.year || 'N/A' }}</td>
            <td>{{ course.semester || 'N/A' }}</td>
          </tr>
        </tbody>
      </table>
    </div>


  </div>
</template>

  
<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

const student = ref({});
const editedStudent = ref({});
const editing = ref(false);
const route = useRoute();
const classOptions = ref([]);
const academicInfo = ref({});
const groupCode = ref("");

const startEditing = (field) => {
  editing.value = true;
  editedStudent.value = { ...student.value };
  editedStudent.value.editingField = field;
};

const stopEditing = async (field) => {
  try {
    if (editedStudent.value[field] !== student.value[field]) {
      await axios.put(`https://schoolmanagementapi-46c1c75befdd.herokuapp.com/students/${route.params.id}`, {
        [field]: editedStudent.value[field],
      });
    }
    editing.value = false;
  } catch (error) {
    console.error(`Error updating ${field}:`, error);
  }
};

const updateStudent = async () => {
  try {
    console.log(editedStudent.value)
    await axios.put(`https://schoolmanagementapi-46c1c75befdd.herokuapp.com/students/${route.params.id}`, editedStudent.value);
    student.value = { ...editedStudent.value };
    editing.value = false;

    groupCode.value = editedStudent.value.group_code;

    const academicResponse = await axios.get(`https://schoolmanagementapi-46c1c75befdd.herokuapp.com/classes/group/${groupCode.value}`);
    academicInfo.value = academicResponse.data;

    // Construct the URL for the course API call using academicInfo
    const courseUrl = `https://schoolmanagementapi-46c1c75befdd.herokuapp.com/courses/?department_id=${academicInfo.value.department_id}&semester=${academicInfo.value.semester}&year=${academicInfo.value.year}`;

    // Fetch course data from the API using the constructed URL
    const courseResponse = await axios.get(courseUrl);

    // Populate courseRespone with the retrieved course data
    courseRespone.value = courseResponse.data.data;

    console.log('Academic Info:', academicInfo.value);
    console.log('Course Response:', courseRespone.value);

    console.log(groupCode.value)

  } catch (error) {
    console.error('Error updating student:', error);
  }
};

const courseRespone = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get('https://schoolmanagementapi-46c1c75befdd.herokuapp.com/classes/');
    classOptions.value = response.data.data;
    
  } catch (error) {
    console.error('Error fetching class options:', error.message);
  }
});

onMounted(async () => {
  try {
    const response = await axios.get(`https://schoolmanagementapi-46c1c75befdd.herokuapp.com/students/${route.params.id}`);
    student.value = response.data;
    groupCode.value = student.value.group_code;
    editedStudent.value = { ...student.value };

    const academicResponse = await axios.get(`https://schoolmanagementapi-46c1c75befdd.herokuapp.com/classes/group/${groupCode.value}`);
    academicInfo.value = academicResponse.data;

    // Construct the URL for the course API call using academicInfo
    const courseUrl = `https://schoolmanagementapi-46c1c75befdd.herokuapp.com/courses/?department_id=${academicInfo.value.department_id}&semester=${academicInfo.value.semester}&year=${academicInfo.value.year}`;

    // Fetch course data from the API using the constructed URL
    const courseResponse = await axios.get(courseUrl);

    // Populate courseRespone with the retrieved course data
    courseRespone.value = courseResponse.data.data;

    console.log('Academic Info:', academicInfo.value);
    console.log('Course Response:', courseRespone.value);

    console.log(groupCode.value)
  } catch (error) {
    console.error('Error fetching student details:', error.message);
    console.error('Error fetching academic information:', error.message);
  }
});


</script>