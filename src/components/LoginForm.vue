<template>
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <img class="mx-auto h-20 w-auto" alt="Your Company" src="../assets/rupp_logo.png">
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">Sign in to your account</h2>
      </div>

      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form class="space-y-6" action="#" method="POST">

          <div>
            <label for="role" class="block text-sm font-medium leading-6 text-gray-900 dark:text-white">Role</label>
            <div class="mt-2">
              <select id="role" name="role" v-model="getRole" v-on:change="process()" required class="select select-bordered block w-full">
                <option value="admin">Admin</option>
                <option value="teacher">Teacher</option>
                <option value="student">Student</option>
              </select>
            </div>
          </div>

          <div>
            <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
            <div class="mt-2">
              <!-- <input id="email" name="email" type="email" autocomplete="email" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"> -->
              <input id="email" name="email" type="email" autocomplete="email" required class="input input-bordered w-full">
            </div>
          </div>

          <div>

            <div class="flex items-center justify-between">
              <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
              <div class="text-sm">
                <a href="#" class="font-semibold text-red-500 hover:text-red-300">Forgot password?</a>
              </div>
            </div>

            <div class="mt-2">
              <input id="password" name="password" type="password" autocomplete="current-password" required class="input input-bordered w-full">
            </div>

          </div>

          <div>
            <button type="submit" class="btn btn-error w-full text-white">Sign in</button>
          </div>          

        </form>
      </div>
    </div>
</template>
<script setup>
import { ref, onMounted, watch } from 'vue'
const getRole = ref('admin')

const process = () => {
  console.log('Role changed:', getRole.value)
}

// Log the initial value on component mount
onMounted(() => {
  console.log(`Initial role value: ${getRole.value}`)
})

defineProps({
    
})

</script>