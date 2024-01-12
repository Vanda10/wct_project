import { createRouter, createWebHistory } from 'vue-router';

// Import your components
import AddClass from '../components/class/AddClass.vue';
import AllClass from '../components/class/AllClass.vue';
import ManageClass from '../components/class//ManageClass.vue';

import AddCourse from '../components/course/AddCourse.vue';
import AllCourse from '../components/course/AllCourse.vue';
import AssignCourse from '../components/course/AssignCourse.vue';
import CourseDetail from '../components/course/CourseDetail.vue';

import AllStudent from '../components/students/AllStudent.vue';
import AddStudent from '../components/students/AddStudent.vue';
import StudentDetail from '../components/students/StudentDetail.vue';

import AllTeacher from '../components/teacher/AllTeacher.vue';
import AddTeacher from '../components/teacher/AddTeacher.vue';
import TeacherDetail from '../components/teacher/TeacherDetail.vue';


import Schedule from '../components/Schedule.vue';
import dashboard from '../components/dashboard.vue';

import Login from "../views/LoginForm.vue";

import AdminPage from"../views/admin/AdminPage.vue";

import StudentPage from"../views/student/StudentPage.vue";
import StuSchedule from "../views/student/StuSchedule.vue";
import ViewTeacher from "../views/student/AllTeacher.vue"

import TeacherPage from"../views/teacher/TeacherPage.vue";
import ViewStudent from "../views/teacher/AllStudent.vue"

const routes = [
  { 
    path: '/admin', 
    component: AdminPage,
     children: [  
      { path: '/admin', component: dashboard }, // Add a route for the dashboard
      { path: '/admin/all-teacher', component: AllTeacher }, // Make the dashboard route a child of '/'
      { path: '/admin/add-teacher', component: AddTeacher },
      { path: '/admin/teacher-detail/:id', name: 'teacher_detail', component: TeacherDetail },
      { path: '/admin/all-student', component: AllStudent },
      { path: '/admin/add-student', component: AddStudent },
      { path: '/admin/student-detail/:id', name: 'student_detail', component: StudentDetail },
      { path: '/admin/all-class', component: AllClass },
      { path: '/admin/add-class', component: AddClass },
      { path: '/admin/manage-schedule', component: Schedule},
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
      { path: '/student', component: dashboard },
      { path: '/student/schedule', component: StuSchedule}, 
      { path: '/student/all-course', component: AllCourse}, 
      { path: '/student/all-teacher', component: ViewTeacher}, 

    ]
  },
  { 
    path: '/teacher', 
    component: TeacherPage,
     children: [  
      { path: '/teacher', component: dashboard}, 
      { path: '/teacher/all-student', component: ViewStudent}, 
      { path: '/teacher/manage-schedule', component: Schedule}, 
    ]
  },

  { path: '/login', component: Login}
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;