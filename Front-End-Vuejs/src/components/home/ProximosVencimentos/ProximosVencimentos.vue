<template>
    <div class="container mx-auto p-8 mt-8">
        <div class="bg-white text-gray-800 p-6 rounded-lg shadow-lg">
            <h2 class="text-3xl font-bold mb-6">Vencimento nos Próximos 5 Dias</h2>
            <div v-if="isLoading" class="flex justify-center items-center h-32">
                <div class="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
            </div>
            <div v-else>
                <ul v-if="proximosEventos.length > 0" class="max-h-64 overflow-y-auto">
                    <li v-for="(evento, index) in proximosEventos.slice(0, 5)" :key="evento.Id"
                        class="mb-4 p-4 bg-gray-100 text-gray-800 rounded-lg shadow-md">
                        <h3 class="text-2xl font-semibold mb-2">
                            {{ evento.TituloEvento }}
                        </h3>
                        <div class="flex justify-between mt-4">
                            <p class="text-lg">
                                <strong>Data de Vencimento:</strong>
                                {{
                                    evento.DataVencimento
                                        ? new Date(evento.DataVencimento).toLocaleDateString()
                                        : "N/A"
                                }}
                            </p>
                            <p :class="{
                                'text-green-500': evento.status_pagamento === 'pago',
                                'text-red-500': evento.status_pagamento !== 'pago',
                            }" class="text-lg font-bold">
                                {{ evento.status_pagamento }}
                            </p>
                        </div>
                        <div class="flex justify-between mt-4">
                            <p class="text-lg">
                                <strong>Valor da NFe:</strong>
                                {{ evento.ValorNF ? evento.ValorNF.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : "N/A" }}
                            </p>
                        </div>
                    </li>
                </ul>
                <p v-else class="text-gray-800 text-center text-xl">
                    Nenhum evento com vencimento nos próximos 5 dias.
                </p>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./ProximosVencimentos.ts"></script>
<style src="./ProximosVencimentos.css"></style>