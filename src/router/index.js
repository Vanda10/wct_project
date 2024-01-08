import { createRouter, createWebHistory } from 'vue-router';

// Import your components
import dashboard from '../views/admin/dashboard.vue';
import AllTeacher from '../views/admin/teacher/AllTeacher.vue';
import AddTeacher from '../views/admin/teacher/AddTeacher.vue';
import TeacherDetail from '../views/admin/teacher/TeacherDetail.vue';
import AllStudent from '../views/admin/students/AllStudent.vue';
import AddStudent from '../views/admin/students/AddStudent.vue';
import StudentDetail from '../views/admin/students/StudentDetail.vue';
import AllClass from '../views/admin/class/AllClass.vue';
import AddClass from '../views/admin/class/AddClass.vue';
import ManageClass from '../views/admin/class/ManageClass.vue';
import AddCourse from '../views/admin/course/AddCourse.vue';
import AllCourse from '../views/admin/course/AllCourse.vue';
import AssignCourse from '../views/admin/course/AssignCourse.vue';
import CourseDetail from '../views/admin/course/CourseDetail.vue';
import Login from "../views/LoginForm.vue";
import AdminPage from"../views/admin/AdminPage.vue";
import Schedule from '../views/admin/class/Schedule.vue';

import StudentPage from"../views/student/StudentPage.vue";
import TeacherPage from"../views/teacher/TeacherPage.vue";

const routes = [
  { 
    path: '/admin', 
    component: AdminPage,
     children: [  
      { path: '/', component: dashboard }, // Add a route for the dashboard
      { path: '/admin/all-teacher', component: AllTeacher }, // Make the dashboard route a child of '/'
      { path: '/admin/add-teacher', component: AddTeacher },
      { path: '/admin/teacher-detail/:id', name: 'teacher_detail', component: TeacherDetail },
      { path: '/admin/all-student', component: AllStudent },
      { path: '/admin/add-student', component: AddStudent },
      { path: '/admin/student-detail/:id', name: 'student_detail', component: StudentDetail },
      { path: '/admin/all-class', component: AllClass },
      // { path: '/add-class', component: AddClass },
      { path: '/admin/manage-class', component: Schedule},
      { path: '/admin/add-course', component: AddCourse },
      { path: '/admin/all-course', component: AllCourse },
      { path: '/admin/adassign-course', component: AssignCourse },
      { path: '/admin/course-detail/:id', name: 'course_detail', component: CourseDetail },  
    ]
  },

  {
    path: '/student', 
    component: StudentPage,
     children: [  
      { path: '/', component: StudentPage }, 
    ]
  },
  { 
    path: '/teacher', 
    component: TeacherPage,
     children: [  
      { path: '/', component: TeacherPage}, 
    ]
  },

  { path: '/login', component: Login}
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;