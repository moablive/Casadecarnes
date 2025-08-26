import { Vendedor } from '@/interfaces/vendedor';
<template>
    <div>
        <Navbar />
        <div class="p-5 mt-16">
            <br>
            <h1 class="text-2xl font-bold mb-4">Clientes</h1>

            <!-- Campo de busca -->
            <div class="mb-4">
                <input 
                    v-model="searchTerm" 
                    @input="filterClients" 
                    type="text" 
                    placeholder="Buscar por nome ou apelido..."
                    class="w-full p-2 border border-gray-300 rounded"
                />
            </div>

            <!-- Spinner de carregamento -->
            <div v-if="isLoading" class="flex justify-center items-center">
                <div class="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
                    <span class="visually-hidden">Carregando...</span>
                </div>
            </div>

            <!-- Tabela responsiva -->
            <div v-else class="overflow-x-auto bg-white rounded-lg shadow">
                <table class="min-w-full bg-white">
                    <thead class="bg-gray-800 text-white">
                        <tr>
                            <th class="py-2 px-3 text-left">Razão social</th>
                            <th class="py-2 px-3 text-left">Apelido</th>
                            <th class="py-2 px-3 text-left">CNPJ</th>
                            <th class="py-2 px-3 text-left">TELECON</th>
                            <th class="py-2 px-3 text-left">Vendedor</th>
                            <th class="py-2 px-3 text-left">Ações</th>
                        </tr>
                    </thead>
                    <tbody class="text-gray-700">
                        <tr v-for="(cliente, index) in filteredClientes" :key="cliente.ID"
                            :class="index % 2 === 0 ? 'bg-gray-100' : 'bg-white'" class="border-b">
                            <td class="py-2 px-3">{{ cliente.NOME }}</td>
                            <td class="py-2 px-3">{{ cliente.APELIDO }}</td>
                            <td class="py-2 px-3">{{ cliente.CNPJ }}</td>
                            <td class="py-2 px-3">{{ cliente.CODIGO_TELECON }}</td>
                            <td class="py-2 px-3">{{ cliente.NOME_VENDEDOR }}</td>
                            <td class="py-2 px-3 flex space-x-2">
                                <button class="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                                    @click="handleShowDetails(cliente)">
                                    Mostrar Dados
                                </button>
                                <button class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                    @click="handleEditClient(cliente.ID)">
                                    Editar
                                </button>
                                <button class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                    @click="handleOpenModal(cliente.ID)">
                                    Deletar
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Modal de Confirmação -->
            <div v-if="showModal" class="fixed inset-0 flex items-center justify-center z-50">
                <div class="bg-white rounded-lg shadow-lg p-8 relative z-50">
                    <h2 class="text-xl font-bold mb-4">Confirmar Exclusão</h2>
                    <p class="mb-4">Tem certeza de que deseja excluir este cliente?</p>
                    <div class="flex justify-end">
                        <button class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mr-2"
                            @click="closeModal">Cancelar</button>
                        <button class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                            @click="confirmDelete">Deletar</button>
                    </div>
                </div>
                <div class="fixed inset-0 bg-black opacity-50" @click="closeModal"></div>
            </div>

            <!-- Modal de Mostrar Dados -->
            <div v-if="showDetailsModal" class="fixed inset-0 flex items-center justify-center z-50">
                <div class="bg-white rounded-lg shadow-lg p-8 relative z-50">
                    <h2 class="text-xl font-bold mb-4">Detalhes do Cliente</h2>
                    <div class="mb-4">
                        <p><strong>Nome:</strong> {{ clienteSelecionado?.NOME }}</p>
                        <p><strong>Apelido:</strong> {{ clienteSelecionado?.APELIDO }}</p>
                        <p><strong>CNPJ:</strong> {{ clienteSelecionado?.CNPJ }}</p>
                        <p><strong>TELECON:</strong> {{ clienteSelecionado?.CODIGO_TELECON }}</p>
                        <p><strong>Contato:</strong> {{ clienteSelecionado?.CONTATO }}</p>
                        <p><strong>Email:</strong> {{ clienteSelecionado?.EMAIL }}</p>
                        <p><strong>Vendedor:</strong> {{ clienteSelecionado?.NOME_VENDEDOR || 'N/A' }}</p>
                    </div>
                    <div class="flex justify-end">
                        <button class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                            @click="closeDetailsModal">Fechar</button>
                    </div>
                </div>
                <div class="fixed inset-0 bg-black opacity-50" @click="closeDetailsModal"></div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./clientes.ts"></script>
<style src="./clientes.css"></style>