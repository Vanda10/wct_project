<template>
    <div class="main-content ml-[300px] p-8">
        <!-- first row -->
      <div class="row text-4xl font-bold mt-20 ml-[100px]">
        <h1>Manage Class</h1>
      </div>

      <div class="mt-5 container">
        <div class="row ml-20 mr-20">
            <div class="col-md-6 mb-3">
                <label for="faculty" class="form-text text-gray-900">Teacher ID</label>
                <div class="input-group">
                    <input type="text" class="form-control" id="teacherID" aria-describedby="basic-addon4">
                </div>
            </div>
    
            <div class="col-md-6 mb-3">
                <label for="department" class="form-text text-gray-900">Teacher's Name</label>
                <div class="input-group">
                    <input type="text" class="form-control" id="teacherName" aria-describedby="basic-addon4">
                </div>
            </div>
        </div>
    
        <div class="row ml-20 mr-20">
            <div class="col-md-6 mb-3">
                <label for="class" class="form-text text-gray-900">Class ID</label>
                <div class="input-group">
                    <input type="text" class="form-control" id="classID" aria-describedby="basic-addon4">
                </div>
            </div>
            <!-- Class -->
            <div class="col-md-6 mb-3">
                <label for="class" class="form-text text-gray-900">Class</label>
                <div class="input-group">
                    <input type="text" class="form-control" id="class" aria-describedby="basic-addon4">
                </div>
            </div>
        </div>
        <div class="flex ml-[95px] mt-4 mr-0">
        <!-- Button trigger modal -->
            <button type="button" class="btn text-white bg-[#183D5C] hover:bg-sky-700 px-4 py-2 me-2 mb-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
                <i class="bi bi-pencil-square"></i> Assign
            </button>
        </div>
      </div>
    </div>
</template>

<script setup>

</script>
