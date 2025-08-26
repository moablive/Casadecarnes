<template>
  <div class="bg-cover bg-center bg-no-repeat h-screen flex justify-center items-center" style="background-image: url('#');">
    <div class="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-96">
      <h1 class="text-2xl font-bold text-center mb-6">Login</h1>
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label for="username" class="block text-sm font-medium text-gray-700">Usuário</label>
          <input type="text" id="username" v-model="username" required placeholder="Digite seu usuário"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
        </div>
        <div class="mb-6">
          <label for="password" class="block text-sm font-medium text-gray-700">Senha</label>
          <input type="password" id="password" v-model="password" required placeholder="Digite sua senha"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
        </div>
        <button type="submit"
          class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Entrar
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts" src="../../services/loginService.ts"></script>