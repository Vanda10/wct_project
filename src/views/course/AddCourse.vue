<template>
    <div class="main-content ml-[300px] p-8">
        <!-- first row -->
      <div class="row text-4xl font-bold mt-20 ml-[100px]">
        <h1>Add Course</h1>
      </div>

      <div class="mt-5 container">
        <div class="row ml-20 mr-20">
            <!-- Faculty -->
            <div class="col-md-6 mb-3">
                <label for="faculty" class="form-text text-gray-900">Course Name</label>
                <div class="input-group">
                    <input type="text" class="form-control" id="courseName" aria-describedby="basic-addon4">
                </div>
            </div>
    
            <!-- Department -->
            <div class="col-md-6 mb-3">
                <label for="department" class="form-text text-gray-900">Course Cdoe</label>
                <div class="input-group">
                    <input type="text" class="form-control" id="courseCode" aria-describedby="basic-addon4">
                </div>
            </div>
        </div>
    
        <div class="row ml-20 mr-20">
            <!-- Class -->
            <div class="col-md-6 mb-3">
                <label for="class" class="form-text text-gray-900">Department</label>
                <div class="input-group">
                    <input type="text" class="form-control" id="department" aria-describedby="basic-addon4">
                </div>
            </div>
        </div>
      </div>
    

      <div class="flex mt-4 ml-[105px] mr-20">
        <button type="button" class="btn text-white bg-[#183D5C] hover:bg-sky-700 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
            <i class="bi bi-pencil-square"></i> Add Course
        </button>  
      </div>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>