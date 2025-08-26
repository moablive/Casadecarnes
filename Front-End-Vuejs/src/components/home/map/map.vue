<template>
    <div>
        <div id="map" class="leaflet-map"></div>

        <!-- Modal para exibir os eventos -->
        <div v-if="showModal" class="modal-overlay">
            <div class="modal-content">
                <span class="close" @click="fecharModal">&times;</span>
                <h2>Eventos do Cliente</h2>
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr>
                            <th class="border-b p-2">Número NF</th>
                            <th class="border-b p-2">Status Pagamento</th>
                            <th class="border-b p-2">Valor NF</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- Exibir eventos pagos -->
                        <tr v-for="evento in clientStatus.nfs_pagos" :key="evento.numero_nf" class="text-green-600">
                            <td class="border-b p-2">{{ evento.numero_nf }}</td>
                            <td class="border-b p-2">{{ evento.status_pagamento }}</td>
                            <td class="border-b p-2">{{ evento.valor_nf }}</td>
                        </tr>

                        <!-- Exibir eventos não pagos -->
                        <tr v-for="evento in clientStatus.nfs_nao_pagos" :key="evento.numero_nf" class="text-red-600">
                            <td class="border-b p-2">{{ evento.numero_nf }}</td>
                            <td class="border-b p-2">{{ evento.status_pagamento }}</td>
                            <td class="border-b p-2">{{ evento.valor_nf }}</td>
                        </tr>
                    </tbody>
                </table>

                <div class="flex justify-end mt-4">
                    <button class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                        @click="fecharModal">Fechar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./map.ts"></script>
<style src="./map.css"></style>