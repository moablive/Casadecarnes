<template>
  <div>
      <Navbar />
      <div class="pt-16 max-w-3xl mx-auto mt-10">
          <h1 class="text-center text-3xl font-bold mb-8">Editar Vendedor</h1>
          <form @submit.prevent="updateVendedor" class="bg-white p-6 rounded-lg shadow-lg">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                      <label for="nome" class="block text-gray-700 font-semibold mb-2">Nome</label>
                      <input
                          type="text"
                          id="nome"
                          v-model="vendedor.NOME"
                          class="w-full p-2 border border-gray-300 rounded"
                          placeholder="Nome do Vendedor"
                          maxlength="255"
                          required
                      />
                  </div>
                  <div>
                      <label for="email" class="block text-gray-700 font-semibold mb-2">Email</label>
                      <input
                          type="email"
                          id="email"
                          v-model="vendedor.EMAIL"
                          class="w-full p-2 border border-gray-300 rounded"
                          placeholder="Email do Vendedor"
                          maxlength="255"
                          required
                      />
                  </div>
              </div>
              <div class="mb-6">
                  <label for="contato" class="block text-gray-700 font-semibold mb-2">Contato</label>
                  <input
                      type="text"
                      id="contato"
                      v-model="vendedor.CONTATO"
                      class="w-full p-2 border border-gray-300 rounded"
                      placeholder="Telefone de Contato"
                      maxlength="20"
                  />
              </div>
              <div class="text-center">
                  <button
                      type="submit"
                      class="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 mr-2"
                  >
                      Atualizar
                  </button>
                  <router-link
                      to="/vendedores"
                      class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                  >
                      Cancelar
                  </router-link>
              </div>
          </form>
      </div>
  </div>
</template>

<script lang="ts" src="./editarVendedor.ts"></script>
<style lang="css" src="./editarVendedor.css"></style>