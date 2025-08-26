<template>
    <div>
        <Navbar />
        <div class="p-5 mt-16">
            <h1 class="text-2xl font-bold mb-4">Vendedores</h1>

            <!-- Tabela responsiva -->
            <div v-if="isLoading" class="flex justify-center items-center h-64">
                <div class="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
            </div>

            <div v-else class="overflow-x-auto bg-white rounded-lg shadow">
                <table class="min-w-full bg-white">
                    <thead class="bg-gray-800 text-white">
                        <tr>
                            <th class="py-2 px-3 text-left">Nome</th>
                            <th class="py-2 px-3 text-left">Email</th>
                            <th class="py-2 px-3 text-left">Contato</th>
                            <th class="py-2 px-3 text-left">Ações</th>
                        </tr>
                    </thead>
                    <tbody class="text-gray-700">
                        <tr v-for="(vendedor, index) in vendedores" :key="vendedor.ID"
                            :class="index % 2 === 0 ? 'bg-gray-100' : 'bg-white'" class="border-b">
                            <td class="py-2 px-3">{{ vendedor.NOME }}</td>
                            <td class="py-2 px-3">{{ vendedor.EMAIL }}</td>
                            <td class="py-2 px-3">{{ vendedor.CONTATO }}</td>
                            <td class="py-2 px-3 flex space-x-2">
                                <button class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                    @click="editVendedor(vendedor.ID)">
                                    Editar
                                </button>
                                <button class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                    @click="confirmDelete(vendedor.ID)">
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
                    <p class="mb-4">Tem certeza de que deseja excluir este vendedor?</p>
                    <div class="flex justify-end">
                        <button class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mr-2"
                            @click="closeModal">Cancelar</button>
                        <button class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                            @click="deleteVendedor">Deletar</button>
                    </div>
                </div>
                <div class="fixed inset-0 bg-black opacity-50" @click="closeModal"></div>
            </div>
        </div>
        <bestPartner />
    </div>
</template>

<script lang="ts" src="./vendedores.ts"></script>
<style lang="css" src="./vendedores.css"></style>