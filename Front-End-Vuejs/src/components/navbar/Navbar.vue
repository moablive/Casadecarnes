<template>
  <nav class="bg-custom-red p-4 fixed w-full z-10 top-0 shadow">
    <div class="container mx-auto flex items-center justify-between flex-wrap">
      <!-- Logo -->
      <router-link to="/home" class="text-white font-bold text-lg">
        <img src="../../assets/logo2.png" alt="Logo" class="h-8 w-auto">
      </router-link>

      <!-- Botão hambúrguer para mobile -->
      <button @click="isMenuOpen = !isMenuOpen" class="text-white block md:hidden focus:outline-none">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
        </svg>
      </button>

      <!-- Links do menu -->
      <div :class="{ 'block': isMenuOpen, 'hidden': !isMenuOpen }" class="hidden md:flex items-center space-x-4">
        <!-- Menu Clientes -->
        <div class="relative">
          <button @click="toggleMenu('clientes')"
            class="text-white px-3 py-2 rounded-md text-sm font-medium focus:outline-none">
            <UserGroupIcon class="w-5 h-5 inline-block mr-2" />
            Clientes
          </button>
          <div v-show="activeMenu === 'clientes'"
            class="absolute left-0 bg-white text-black shadow-lg rounded-md mt-2 py-2 transition-opacity duration-300 ease-in-out">
            <router-link to="/clientes" class="block px-4 py-2 hover:bg-gray-100">
              <UserGroupIcon class="w-5 h-5 inline-block mr-2" />
              Listar Clientes
            </router-link>
            <router-link to="/cadastrar-cliente" class="block px-4 py-2 hover:bg-gray-100">
              <UserIcon class="w-5 h-5 inline-block mr-2" />
              Cadastrar Cliente
            </router-link>
          </div>
        </div>

        <!-- Menu Vendedores -->
        <div class="relative">
          <button @click="toggleMenu('vendedores')"
            class="text-white px-3 py-2 rounded-md text-sm font-medium focus:outline-none">
            <BriefcaseIcon class="w-5 h-5 inline-block mr-2" />
            Vendedores
          </button>
          <div v-show="activeMenu === 'vendedores'"
            class="absolute left-0 bg-white text-black shadow-lg rounded-md mt-2 py-2 transition-opacity duration-300 ease-in-out">
            <router-link to="/vendedores" class="block px-4 py-2 hover:bg-gray-100">
              <UserGroupIcon class="w-5 h-5 inline-block mr-2" />
              Listar Vendedores
            </router-link>
            <router-link to="/cadastrar-vendedor" class="block px-4 py-2 hover:bg-gray-100">
              <UserIcon class="w-5 h-5 inline-block mr-2" />
              Cadastrar Vendedor
            </router-link>
          </div>
        </div>

        <!-- Menu Eventos -->
        <div class="relative">
          <button @click="toggleMenu('eventos')"
            class="text-white px-3 py-2 rounded-md text-sm font-medium focus:outline-none">
            <CalendarIcon class="w-5 h-5 inline-block mr-2" />
            Eventos
          </button>
          <div v-show="activeMenu === 'eventos'"
            class="absolute left-0 bg-white text-black shadow-lg rounded-md mt-2 py-2 transition-opacity duration-300 ease-in-out">
            <router-link to="/eventos" class="block px-4 py-2 hover:bg-gray-100">
              <CalendarIcon class="w-5 h-5 inline-block mr-2" />
              Listar Eventos
            </router-link>
          </div>
        </div>

        <!-- Menu Produtos -->
        <div class="relative">
          <button @click="toggleMenu('produtos')"
            class="text-white px-3 py-2 rounded-md text-sm font-medium focus:outline-none">
            <TagIcon class="w-5 h-5 inline-block mr-2" />
            Produtos
          </button>
          <div v-show="activeMenu === 'produtos'"
            class="absolute left-0 bg-white text-black shadow-lg rounded-md mt-2 py-2 transition-opacity duration-300 ease-in-out">
            <router-link to="/produtos" class="block px-4 py-2 hover:bg-gray-100">
              <TagIcon class="w-5 h-5 inline-block mr-2" />
              Listar Produtos
            </router-link>
            <router-link to="/cadastrar-produto" class="block px-4 py-2 hover:bg-gray-100">
              <PlusIcon class="w-5 h-5 inline-block mr-2" />
              Cadastrar Produto
            </router-link>
          </div>
        </div>

        <!-- Btn Logout -->
        <button class="text-white px-3 py-2 rounded-md text-sm font-medium focus:outline-none hover:bg-custom-red-dark"
          @click="logout">
          <ArrowRightOnRectangleIcon class="w-5 h-5 inline-block" />
          Logout
        </button>
      </div>
    </div>

    <!-- Menu Mobile -->
    <div :class="{ 'block': isMenuOpen, 'hidden': !isMenuOpen }" class="md:hidden">
      <div class="flex flex-col space-y-2 mt-4">
        <!-- Menu Clientes Mobile -->
        <router-link to="/clientes" class="text-white px-4 py-2 hover:bg-gray-700">
          <UserGroupIcon class="w-5 h-5 inline-block mr-2" />
          Listar Clientes
        </router-link>
        <router-link to="/cadastrar-cliente" class="text-white px-4 py-2 hover:bg-gray-700">
          <UserIcon class="w-5 h-5 inline-block mr-2" />
          Cadastrar Cliente
        </router-link>

        <!-- Menu Vendedores Mobile -->
        <router-link to="/vendedores" class="text-white px-4 py-2 hover:bg-gray-700">
          <BriefcaseIcon class="w-5 h-5 inline-block mr-2" />
          Listar Vendedores
        </router-link>
        <router-link to="/cadastrar-vendedor" class="text-white px-4 py-2 hover:bg-gray-700">
          <UserIcon class="w-5 h-5 inline-block mr-2" />
          Cadastrar Vendedor
        </router-link>

        <!-- Menu Eventos Mobile -->
        <router-link to="/eventos" class="text-white px-4 py-2 hover:bg-gray-700">
          <CalendarIcon class="w-5 h-5 inline-block mr-2" />
          Listar Eventos
        </router-link>

        <!-- Menu Produtos Mobile -->
        <router-link to="/produtos" class="text-white px-4 py-2 hover:bg-gray-700">
          <TagIcon class="w-5 h-5 inline-block mr-2" />
          Listar Produtos
        </router-link>
        <router-link to="/cadastrar-produto" class="text-white px-4 py-2 hover:bg-gray-700">
          <PlusIcon class="w-5 h-5 inline-block mr-2" />
          Cadastrar Produto
        </router-link>

        <!-- Logout Mobile -->
        <button @click="logout" class="text-white px-4 py-2 hover:bg-custom-red-dark focus:outline-none">
          <ArrowRightOnRectangleIcon class="w-5 h-5 inline-block mr-2" />
          Logout
        </button>
      </div>
    </div>
  </nav>
</template>


<script lang="ts" src="./Navbar.ts"></script>
<style src="./Navbar.css"></style>