<template>
    <div>
        <Navbar />
        <div class="p-5 mt-16">
            <h1 class="text-2xl font-bold mb-4">Produtos</h1>

            <!-- Área de busca -->
            <div class="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-2 mb-4 custom-search-container">

                <!-- Busca por Descrição -->
                <div class="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2 w-full md:w-auto">
                    <input v-model="searchDescricao" placeholder="Buscar por descrição"
                        class="border rounded px-3 py-2 w-full md:w-auto" />
                    <button class="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 flex items-center w-full md:w-auto"
                        @click="buscarPorDescricao">
                        <MagnifyingGlassIcon class="w-5 h-5 inline-block mr-2" />
                        Buscar por Descrição
                    </button>
                </div>

                <!-- Busca por Código -->
                <div class="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2 w-full md:w-auto">
                    <input v-model="searchCodigoProduto" placeholder="Buscar por código"
                        class="border rounded px-3 py-2 w-full md:w-auto" />
                    <button class="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600 flex items-center w-full md:w-auto"
                        @click="buscarPorCodigo">
                        <IdentificationIcon class="w-5 h-5 inline-block mr-2" />
                        Buscar por Código
                    </button>
                </div>

                <!-- Botão para obter todos os produtos -->
                <div class="flex items-center w-full md:w-auto">
                    <button class="bg-gray-500 text-white px-3 py-2 rounded hover:bg-gray-600 flex items-center w-full md:w-auto"
                        @click="obterTodosProdutos">
                        <ClipboardDocumentListIcon class="w-5 h-5 inline-block mr-2" />
                        Obter Todos
                    </button>
                </div>
            </div>

            <!-- Loader durante o carregamento -->
            <div v-if="isLoading" class="flex justify-center items-center h-64">
                <div class="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
            </div>

            <!-- Tabela responsiva -->
            <div v-else class="overflow-x-auto bg-white rounded-lg shadow">
                <table class="min-w-full bg-white">
                    <thead class="bg-gray-800 text-white">
                        <tr>
                            <th class="py-2 px-3 text-left">Código</th>
                            <th class="py-2 px-3 text-left">Descrição</th>
                            <th class="py-2 px-3 text-left">Categoria</th>
                            <th class="py-2 px-3 text-left">Preço</th>
                            <th class="py-2 px-3 text-left">Ações</th>
                        </tr>
                    </thead>
                    <tbody class="text-gray-700">
                        <tr v-for="(produto, index) in produtos" :key="produto.id"
                            :class="index % 2 === 0 ? 'bg-gray-100' : 'bg-white'" class="border-b">
                            <td class="py-2 px-3">{{ produto.codigo_produto }}</td>
                            <td class="py-2 px-3">{{ produto.descricao }}</td>
                            <td class="py-2 px-3">{{ produto.categoria }}</td>
                            <td class="py-2 px-3">R$: {{ produto.valor_venda }}</td>
                            <td class="py-2 px-3 flex space-x-2">
                                <button class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                    @click="editProduto(produto.id)">
                                    Editar
                                </button>
                                <button class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                    @click="confirmDelete(produto.id)">
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
                    <p class="mb-4">Tem certeza de que deseja excluir este produto?</p>
                    <div class="flex justify-end">
                        <button class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mr-2"
                            @click="closeModal">
                            Cancelar
                        </button>
                        <button class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" @click="deleteProduto">
                            Deletar
                        </button>
                    </div>
                </div>
                <div class="fixed inset-0 bg-black opacity-50" @click="closeModal"></div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./produtos.ts"></script>
<style lang="css" src="./produtos.css"></style>