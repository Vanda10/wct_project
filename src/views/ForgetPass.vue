<template>
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 mt-7">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <img class="mx-auto h-20 w-auto" alt="Your Company" src="../assets/rupp_logo.png">
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Reset Password</h2>
      </div>

      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form class="space-y-6" action="#" method="POST">

          <div>
            <label class="text-center block text-[15px] font-medium leading-6 text-gray-900">Fill up the Email to reset the password</label>
          </div>

          <div>
            <div class="mt-2">
              <!-- <input id="email" name="email" type="email" autocomplete="email" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"> -->
              <input placeholder="Email" id="email" name="email" type="email" autocomplete="email" required class="input input-bordered w-full">
            </div>
          </div>

          <div>
            <button class="btn bg-[#B22222] w-full text-white hover:bg-red-900 font-bold">Send Email</button>
          </div>          

        </form>
      </div>
    </div>
</template>