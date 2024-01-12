<template>
  <div class="main-content ml-[300px] p-8">
    <!-- First row -->
    <div class="flex justify-center text-4xl font-bold mt-10">
      <h1>Teacher Information</h1>
    </div>

    <!-- Teacher details -->
    <div class="flex mt-10 ml-20 mr-20">
      <!-- Teacher profile -->
      <div class="flex -space-x-1 overflow-hidden">
        <i class="bi bi-person-circle mt-3 inline-block text-[150px] text-black"></i>
      </div>
      <!-- Teacher description -->
      <div class="flex mt-10 ml-20">
        <div v-if="!editing" class="flex-col text-gray-400 font-bold">
          <p class="mb-3 text-[#183D5C]">About</p>
          <p class="mb-3">Teacher ID: {{ teacher.id || 'N/A' }}</p>
          <p class="mb-3" @dblclick="startEditing('name')">Name: {{ teacher.name || 'N/A' }}</p>
          <p class="mb-3">Email: {{ teacher.email || 'N/A' }}</p>
          <p class="mb-3">Password: {{ teacher.password || 'N/A' }}</p>
        </div>
        <div v-else class="grid grid-cols-1 text-gray-400 font-bold">
          <input v-model="editedTeacher.name" class="mb-3 form-control w-[500px]" />
          <input v-model="editedTeacher.specialist" class="mb-3 form-control" />
          <button @click="updateTeacher" class="btn w-[100px] text-white bg-[#B22222] hover:bg-red-700 px-4 py-2.5 mt-2">
            Update
          </button>
        </div>
      </div>
    </div>

    <div class="flex justify-center text-xl font-bold mt-10">
      <label>Assigned Classes & Courses </label>
    </div>

    <!-- Add a simple modal for assigning teacher to class and course -->
    <div v-if="showAssignModal" class="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-gray-200 p-8 rounded-lg">
        <h2 class="text-xl font-bold mb-4">Assign Class and Course</h2>
        <label for="classCode">Class Code:</label>
        <select v-model="assignClassCode" class="form-control mb-4">
          <option v-for="classOption in classOptions" :key="classOption.group_code" :value="classOption.group_code">
            {{ classOption.group_code }}
          </option>
        </select>
        <label for="courseName">Course Name:</label>
        <input v-model="assignCourseName" class="form-control mb-4" placeholder="Enter course name" />
        <div class="flex justify-end">
          <button @click="assignTeacher" class="btn text-white bg-[#B22222] hover:bg-red-700 px-4 py-2">
            Assign
          </button>
          <button @click="closeAssignPopup" class="btn text-white bg-[#B22222] hover:bg-red-700 px-4 py-2 ml-2">
            Cancel
          </button>
        </div>
      </div>
    </div>

    <div class="flex justify-center text-m font-bold mt-3">
      <table class="table table-striped mt-2 mx-auto">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Class</th>
            <th scope="col">Course Name</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(course, index) in teachercourse" :key="course.id">
            <td>{{ index + 1 }}</td>
            <td>{{ course.group_code || 'N/A' }}</td>
            <td>{{ course.coursename || 'N/A' }}</td>
            <td>
              <button @click="editCourse(course)" class="link link-warning ml-2">
                Edit
              </button>
              <button @click="deleteCourse(course.id)" class="link link-danger ml-2">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Add button for assigning teacher to class and course -->
    <div class="flex justify-end mt-3">
      <button @click="showAssignPopup" class="btn w-[100px] text-white font-bold bg-[#B22222] hover:bg-red-700 ">
        <i class="bi bi-plus-circle"></i>
        Assign
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

const teacher = ref({});
const teachercourse = ref([]);
const editedTeacher = ref({});
const editing = ref(false);
const route = useRoute();

const showAssignModal = ref(false);
const assignClassCode = ref("");
const assignCourseName = ref("");
const assignTeacherID = ref("");
const classOptions = ref([]);

const startEditing = (field) => {
  editing.value = true;
  editedTeacher.value = { ...teacher.value };
  editedTeacher.value.editingField = field;
};

const stopEditing = async (field) => {
  try {
    if (editedTeacher.value[field] !== teacher.value[field]) {
      // If the value has changed, update it in the database
      await axios.put(`http://localhost:8000/teachers/${route.params.id}`, {
        [field]: editedTeacher.value[field],
      });
    }
    editing.value = false;
  } catch (error) {
    console.error(`Error updating ${field}:`, error);
  }
};

// Assume searchCourses is defined in the same component

const editCourse = async (course) => {
  const newCourseName = prompt('Enter new course name:', course.coursename);
  if (newCourseName !== null) {
    try {
      await axios.put(`http://127.0.0.1:8000/teacher-courses/${course.id}`, {
        teacher_id: course.teacher_id,
        group_code: course.group_code,
        coursename: newCourseName,
      });

      // Refresh the course data after a successful update
      const response = await axios.get(`http://127.0.0.1:8000/teacher-courses/`);
      teachercourse.value = response.data.data;
      console.log(teachercourse.value)
    } catch (error) {
      console.error('Error editing course:', error);
      // Handle error, e.g., show an error message to the user
    }
  }
};

const deleteCourse = async (courseId) => {
  const shouldDelete = window.confirm('Are you sure you want to delete this course?');
  if (shouldDelete) {
    try {
      await axios.delete(`http://127.0.0.1:8000/teacher-courses/${courseId}`);

      // Refresh the course data after a successful delete
      const response = await axios.get(`http://127.0.0.1:8000/teacher-courses/`);
      teachercourse.value = response.data.data;

      console.log(teachercourse.value)
    } catch (error) {
      console.error('Error deleting course:', error);
      // Handle error, e.g., show an error message to the user
    }
  }
};


const updateTeacher = async () => {
  try {
    await axios.put(`http://localhost:8000/teachers/${route.params.id}`, editedTeacher.value);
    // Assuming the API response contains teacher data
    teacher.value = { ...editedTeacher.value };
    editing.value = false;
  } catch (error) {
    console.error('Error updating teacher:', error);
  }
};

const showAssignPopup = async () => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/classes/`);
    classOptions.value = response.data.data;

    assignClassCode.value = "";
    assignCourseName.value = "";

    showAssignModal.value = true;

  } catch (error) {
    console.error('Error fetching class options:', error);
  }
};

const closeAssignPopup = () => {
  showAssignModal.value = false;
};

const assignTeacher = async () => {
  try {
    await axios.post(`http://127.0.0.1:8000/teacher-courses/`, {
      teacher_id: teacher.value.id,
      group_code: assignClassCode.value,
      coursename: assignCourseName.value,
    });

    const response = await axios.get(`http://127.0.0.1:8000/teacher-courses/`);
    teachercourse.value = response.data.data;
    console.log('teacher id is', teacher.value.id)
    showAssignModal.value = false;

  } catch (error) {
    console.error('Error assigning teacher to class and course:', error);
  }
};


const teacherid = ref("");  // Change this line

onMounted(async () => {
  try {
    const response = await axios.get(`http://localhost:8000/teachers/${route.params.id}`);
    teacher.value = response.data;
    teacherid.value = teacher.value.id;  // Storing teacher_id
    
    // Fetch teacher courses using teacher_id
    const response_course = await axios.get(`http://127.0.0.1:8000/teacher-courses/${teacherid.value}`);
    teachercourse.value = response_course.data.data;

    console.log('Teacher details:', teacher.value);
    console.log('Teacher ID:', teacherid.value);
    console.log('Teacher courses:', teachercourse.value);

  } catch (error) {
    console.error('Error fetching teacher details:', error);
  }
});

</script>