<template>
    <div v-if="isOpen" class="modal-overlay">
      <div class="modal-container">
        <div class="modal-header">
          <h3>Confirmation</h3>
          <button @click="closeModal">Close</button>
        </div>
        <div class="modal-body">
          <p>Are you sure you want to delete this teacher?</p>
        </div>
        <div class="modal-footer">
          <button @click="confirmDelete">Yes, Delete</button>
          <button @click="closeModal">Cancel</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, defineProps, defineEmits } from 'vue';
  
  const props = defineProps(['isOpen']);
  const emits = defineEmits(['close', 'confirm']);
  
  const closeModal = () => {
    emits.close();
  };
  
  const confirmDelete = () => {
    emits.confirm();
    closeModal();
  };
  </script>
  
  <style scoped>
  </style>
  