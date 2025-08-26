<template>
    <div class="container mx-auto p-8 mt-8">
        <h1 class="text-2xl font-bold mb-6">Vendas por Vendedor</h1>

        <!-- Loader enquanto os dados estão sendo carregados -->
        <div v-if="isLoading" class="flex justify-center items-center h-64">
            <div class="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
        </div>

        <!-- Tabela de Vendas por Vendedor -->
        <div v-else>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div v-for="venda in vendas" :key="venda.NomeVendedor" class="bg-white rounded-lg shadow p-6">
                    <div class="flex items-center mb-4">
                        <!-- Ícone do vendedor -->
                        <UserCircleIcon class="h-10 w-10 text-blue-500 mr-4" />
                        <div>
                            <h2 class="text-xl font-semibold">{{ venda.NomeVendedor }}</h2>
                            <p class="text-gray-600">{{ venda.EmailVendedor || 'Sem e-mail' }}</p>
                        </div>
                    </div>
                    <div class="flex items-center mb-2">
                        <!-- Ícone de telefone -->
                        <PhoneIcon class="h-6 w-6 text-gray-500 mr-2" />
                        <span>{{ venda.ContatoVendedor || 'Sem contato' }}</span>
                    </div>
                    <div class="flex justify-between items-center mt-4">
                        <div>
                            <p class="text-gray-600">Quantidade de Eventos:</p>
                            <p class="text-xl font-bold">{{ venda.QuantidadeEventos }}</p>
                        </div>
                        <div>
                            <p class="text-gray-600">Total de Vendas:</p>
                            <p class="text-xl font-bold text-green-500">
                                {{ formatCurrency(venda.TotalVendas) }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./bestPartner.ts"></script>
<style src="./bestPartner.css"></style>