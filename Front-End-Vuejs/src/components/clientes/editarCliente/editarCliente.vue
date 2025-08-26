<template>
    <div>
        <Navbar />
        <div class="pt-16 max-w-3xl mx-auto mt-10">
            <h1 class="text-center text-3xl font-bold mb-8">Editar Cliente</h1>
            <form @submit.prevent="updateClient" class="bg-white p-6 rounded-lg shadow-lg">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label for="nome" class="block text-gray-700 font-semibold mb-2">Nome</label>
                        <input v-model="cliente.NOME" type="text" id="nome"
                            class="w-full p-2 border border-gray-300 rounded" placeholder="Nome do Cliente" maxlength="255" required />
                    </div>
                    <div>
                        <label for="apelido" class="block text-gray-700 font-semibold mb-2">Apelido</label>
                        <input v-model="cliente.APELIDO" type="text" id="apelido"
                            class="w-full p-2 border border-gray-300 rounded" placeholder="Apelido do Cliente" maxlength="255" />
                    </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label for="email" class="block text-gray-700 font-semibold mb-2">Email</label>
                        <input v-model="cliente.EMAIL" type="email" id="email"
                            class="w-full p-2 border border-gray-300 rounded" placeholder="Email do Cliente" maxlength="255" required />
                    </div>
                    <div>
                        <label for="cnpj" class="block text-gray-700 font-semibold mb-2">CNPJ</label>
                        <input v-model="cliente.CNPJ" type="text" id="cnpj"
                            class="w-full p-2 border border-gray-300 rounded" placeholder="00.000.000/0000-00" maxlength="14" />
                    </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label for="contato" class="block text-gray-700 font-semibold mb-2">Contato</label>
                        <input v-model="cliente.CONTATO" type="text" id="contato"
                            class="w-full p-2 border border-gray-300 rounded" placeholder="Telefone de Contato" maxlength="20" />
                    </div>
                    <div>
                        <label for="codigo_telecon" class="block text-gray-700 font-semibold mb-2">Código TELECON</label>
                        <input v-model="cliente.CODIGO_TELECON" type="text" id="codigo_telecon"
                            class="w-full p-2 border border-gray-300 rounded" placeholder="Código TELECON" />
                    </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div>
                        <label for="pais" class="block text-gray-700 font-semibold mb-2">País</label>
                        <input v-model="cliente.PAIS" type="text" id="pais"
                            class="w-full p-2 border border-gray-300 rounded" placeholder="País" maxlength="100" />
                    </div>
                    <div>
                        <label for="estado" class="block text-gray-700 font-semibold mb-2">Estado</label>
                        <input v-model="cliente.ESTADO" type="text" id="estado"
                            class="w-full p-2 border border-gray-300 rounded" placeholder="Estado" maxlength="100" />
                    </div>
                    <div>
                        <label for="cidade" class="block text-gray-700 font-semibold mb-2">Cidade</label>
                        <input v-model="cliente.CIDADE" type="text" id="cidade"
                            class="w-full p-2 border border-gray-300 rounded" placeholder="Cidade" maxlength="100" />
                    </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label for="bairro" class="block text-gray-700 font-semibold mb-2">Bairro</label>
                        <input v-model="cliente.BAIRRO" type="text" id="bairro"
                            class="w-full p-2 border border-gray-300 rounded" placeholder="Bairro" maxlength="100" />
                    </div>
                    <div>
                        <label for="rua_av" class="block text-gray-700 font-semibold mb-2">Rua/Av</label>
                        <input v-model="cliente.RUA_AV" type="text" id="rua_av"
                            class="w-full p-2 border border-gray-300 rounded" placeholder="Rua ou Avenida" maxlength="255" />
                    </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div>
                        <label for="numero" class="block text-gray-700 font-semibold mb-2">Número</label>
                        <input v-model="cliente.NUMERO" type="text" id="numero"
                            class="w-full p-2 border border-gray-300 rounded" placeholder="Número" maxlength="50" />
                    </div>
                    <div>
                        <label for="complemento" class="block text-gray-700 font-semibold mb-2">Complemento</label>
                        <input v-model="cliente.COMPLEMENTO" type="text" id="complemento"
                            class="w-full p-2 border border-gray-300 rounded" placeholder="Complemento" maxlength="255" />
                    </div>
                    <div>
                        <label for="cep" class="block text-gray-700 font-semibold mb-2">CEP</label>
                        <input v-model="cliente.CEP" type="text" id="cep"
                            class="w-full p-2 border border-gray-300 rounded" placeholder="00000-000" maxlength="9" />
                    </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label for="latitude" class="block text-gray-700 font-semibold mb-2">Latitude</label>
                        <input v-model="cliente.LATITUDE" type="number" id="latitude"
                            class="w-full p-2 border border-gray-300 rounded" placeholder="Latitude" step="any" />
                    </div>
                    <div>
                        <label for="longitude" class="block text-gray-700 font-semibold mb-2">Longitude</label>
                        <input v-model="cliente.LONGITUDE" type="number" id="longitude"
                            class="w-full p-2 border border-gray-300 rounded" placeholder="Longitude" step="any" />
                    </div>
                </div>
                <div class="grid grid-cols-1 gap-6 mb-6">
                    <div>
                        <label for="vendedor" class="block text-gray-700 font-semibold mb-2">Vendedor</label>
                        <div class="flex items-center gap-2">
                            <div
                                class="w-full p-2 border border-gray-300 rounded"
                                :class="{ 'bg-green-200': vendedorSelecionado }"
                            >
                                {{ vendedorSelecionado?.NOME || 'Nenhum vendedor selecionado' }}
                            </div>
                            <button type="button" @click="showVendedorModal = true" 
                                class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center gap-2">
                                <UserGroupIcon class="w-5 h-5" /> Selecionar Vendedor
                            </button>
                        </div>
                    </div>
                </div>
                <div class="text-center">
                    <button class="bg-green-500 text-white font-semibold py-2 px-4 rounded hover:bg-green-600 mr-2"
                        type="submit">Salvar Alterações</button>
                    <button class="bg-gray-500 text-white font-semibold py-2 px-4 rounded hover:bg-gray-600"
                        type="button" @click="cancel">Cancelar</button>
                </div>
            </form>

            <!-- Modal -->
            <div v-if="showVendedorModal" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                    <h2 class="text-xl font-bold mb-4">Selecionar Vendedor</h2>
                    <div class="overflow-y-auto max-h-60">
                        <ul>
                            <li v-for="vendedor in vendedores" :key="vendedor.ID" class="flex justify-between items-center mb-2">
                                <span>{{ vendedor.NOME }}</span>
                                <button @click="selectVendedor(vendedor)" 
                                    class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                                    Selecionar
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div class="text-right mt-4">
                        <button @click="showVendedorModal = false" 
                            class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
                            Fechar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./editarCliente.ts"></script>
<style src="./editarCliente.css"></style>