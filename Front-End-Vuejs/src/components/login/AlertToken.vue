<template>
    <div v-if="show" class="fixed inset-0 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-lg p-8 relative z-50 max-w-md w-full">
        <h2 class="text-xl font-bold mb-4">{{ title }}</h2>
        <p class="mb-4">{{ message }}</p>
        <div class="flex justify-end">
          <button class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mr-2" @click="closeModal">
            Cancelar
          </button>
          <button class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" @click="confirmAction">
            Confirmar
          </button>
        </div>
      </div>
      <div class="fixed inset-0 bg-black opacity-50" @click="closeModal"></div>
    </div>
</template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'AlertModal',
    props: {
      show: {
        type: Boolean,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      message: {
        type: String,
        required: true,
      },
      onConfirm: {
        type: Function,
        required: true,
      },
      onClose: {
        type: Function,
        required: true,
      },
    },
    methods: {
      confirmAction() {
        this.onConfirm();
      },
      closeModal() {
        this.onClose();
      },
    },
  });
  </script>
  
  <style scoped>
  /* Estilos adicionais para a modal */
  </style>
  