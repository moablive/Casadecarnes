<template>
    <div>
        <Navbar />
        <div class="pt-16 max-w-3xl mx-auto mt-10">
            <h1 class="text-center text-3xl font-bold mb-8">Cadastrar Produto</h1>

            <!-- Formulário de cadastro de produto -->
            <form @submit.prevent="cadastrarProduto" class="bg-white p-6 rounded-lg shadow-lg">

                <!-- Grid de inputs -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

                    <!-- Código do Produto -->
                    <div>
                        <label for="codigoProduto" class="block text-gray-700 font-semibold mb-2">
                            Código do Produto
                        </label>
                        <input v-model="produto.codigo_produto" id="codigoProduto" type="text"
                            placeholder="Código do Produto" class="w-full p-2 border border-gray-300 rounded"
                            maxlength="255" required />
                    </div>

                    <!-- Categoria -->
                    <div>
                        <label for="categoria" class="block text-gray-700 font-semibold mb-2">
                            Categoria
                        </label>
                        <input v-model="produto.categoria" id="categoria" type="text" placeholder="Categoria"
                            class="w-full p-2 border border-gray-300 rounded" maxlength="255" required />
                    </div>
                </div>

                <!-- Descrição -->
                <div class="mb-6">
                    <label for="descricao" class="block text-gray-700 font-semibold mb-2">
                        Descrição
                    </label>
                    <input v-model="produto.descricao" id="descricao" type="text" placeholder="Descrição do Produto"
                        class="w-full p-2 border border-gray-300 rounded" maxlength="255" />
                </div>

                <!-- Preço de Venda -->
                <div class="mb-6">
                    <label for="valorVenda" class="block text-gray-700 font-semibold mb-2">
                        Preço de Venda
                    </label>
                    <input v-model="produto.valor_venda" id="valorVenda" type="number" placeholder="Preço de Venda"
                        class="w-full p-2 border border-gray-300 rounded" required />
                </div>

                <!-- Botões de Ação -->
                <div class="text-center">
                    <button type="submit"
                        class="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded">
                        Cadastrar Produto
                    </button>
                    <router-link to="/produtos"
                        class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 ml-2">
                        Cancelar
                    </router-link>
                </div>
            </form>
        </div>
    </div>
</template>

<script lang="ts" src="./cadastrarProduto.ts"></script>
<style lang="css" src="./cadastrarProduto.css"></style>