<template>
    <div>
        <div class="p-5 mt-16">
            <!-- Loader enquanto os eventos são carregados -->
            <div v-if="isLoading" class="flex justify-center items-center h-64">
                <div class="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
            </div>

            <!-- Exibir eventos pagos -->
            <div v-else class="mb-8">
                <div class="flex justify-between items-center mb-4">
                    <h2 class="text-xl font-semibold flex items-center">
                        <CheckIcon class="w-6 h-6 text-green-600 mr-2" />
                        Total Pagos: {{ paidEvents.length }}&nbsp;
                        <span class="text-blue-600 font-bold">
                            {{ totalValorPago.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}
                        </span>
                    </h2>
                </div>

                <div class="overflow-x-auto bg-white rounded-lg shadow">
                    <div class="max-h-64 overflow-y-auto">
                        <table class="min-w-full bg-white">
                            <thead class="bg-green-600 text-white">
                                <tr>
                                    <th class="py-2 px-3 text-left">Título</th>
                                    <th class="py-2 px-3 text-left">Razão Social</th>
                                    <th class="py-2 px-3 text-left">Data de Emissão</th>
                                    <th class="py-2 px-3 text-left">Data de Vencimento</th>
                                    <th class="py-2 px-3 text-left">Vendedor</th>
                                    <th class="py-2 px-3 text-left">Valor NF</th>
                                    <th class="py-2 px-3 text-left">Status</th>
                                </tr>
                            </thead>
                            <tbody class="text-gray-700">
                                <tr v-for="evento in paidEvents" :key="evento.Id" class="border-b bg-white">
                                    <td class="py-2 px-3">{{ evento.TituloEvento }}</td>
                                    <td class="py-2 px-3">{{ evento.RazaoSocial }}</td>
                                    <td class="py-2 px-3">{{ evento.DataEmissao ? new
                                        Date(evento.DataEmissao).toLocaleDateString() : 'N/A' }}</td>
                                    <td class="py-2 px-3">{{ evento.DataVencimento ? new
                                        Date(evento.DataVencimento).toLocaleDateString() : 'N/A' }}</td>
                                    <td class="py-2 px-3">{{ evento.NOME_VENDEDOR || 'N/A' }}</td>
                                    <!-- Exibir o nome do vendedor -->
                                    <td class="py-2 px-3">{{ evento.ValorNF ? evento.ValorNF.toLocaleString('pt-BR', {
                                        style: 'currency', currency: 'BRL' }) : 'N/A' }}</td>
                                    <td class="py-2 px-3 text-green-600">Pago</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- Exibir eventos não pagos -->
            <div>
                <div class="flex justify-between items-center mb-4">
                    <h2 class="text-xl font-semibold flex items-center">
                        <ExclamationTriangleIcon class="w-6 h-6 text-red-600 mr-2" />
                        Não Pagos: {{ unpaidEvents.length }}&nbsp;
                        <span class="text-red-600 font-bold">
                            {{ totalValorNaoPago.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}
                        </span>
                    </h2>
                </div>

                <div class="overflow-x-auto bg-white rounded-lg shadow">
                    <div class="max-h-64 overflow-y-auto">
                        <table class="min-w-full bg-white">
                            <thead class="bg-red-600 text-white">
                                <tr>
                                    <th class="py-2 px-3 text-left">Título</th>
                                    <th class="py-2 px-3 text-left">Razão Social</th>
                                    <th class="py-2 px-3 text-left">Data de Emissão</th>
                                    <th class="py-2 px-3 text-left">Data de Vencimento</th>
                                    <th class="py-2 px-3 text-left">Vendedor</th>
                                    <th class="py-2 px-3 text-left">Valor NF</th>
                                    <th class="py-2 px-3 text-left">Status</th>
                                </tr>
                            </thead>
                            <tbody class="text-gray-700">
                                <tr v-for="evento in unpaidEvents" :key="evento.Id" class="border-b bg-white">
                                    <td class="py-2 px-3">{{ evento.TituloEvento }}</td>
                                    <td class="py-2 px-3">{{ evento.RazaoSocial }}</td>
                                    <td class="py-2 px-3">{{ evento.DataEmissao ? new
                                        Date(evento.DataEmissao).toLocaleDateString() : 'N/A' }}</td>
                                    <td class="py-2 px-3">{{ evento.DataVencimento ? new
                                        Date(evento.DataVencimento).toLocaleDateString() : 'N/A' }}</td>
                                    <td class="py-2 px-3">{{ evento.NOME_VENDEDOR || 'N/A' }}</td>
                                    <!-- Exibir o nome do vendedor -->
                                    <td class="py-2 px-3">{{ evento.ValorNF ? evento.ValorNF.toLocaleString('pt-BR', {
                                        style: 'currency', currency: 'BRL' }) : 'N/A' }}</td>
                                    <td class="py-2 px-3 text-red-600">Não Pago</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./allPaidUnpaid.ts"></script>
<style src="./allPaidUnpaid.css"></style>
