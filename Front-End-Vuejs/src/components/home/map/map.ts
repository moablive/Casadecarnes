import { defineComponent, ref, onMounted, computed } from "vue";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import ClientService from "../../../services/ClientService";
import { Cliente } from "../../../interfaces/cliente";
import { ClientStatus } from "../../../interfaces/ClientStatus";

// CUSTOM MAP ICONS
import greenIconUrl from "../../../assets/icons/marker-icon-green.png";
import redIconUrl from "../../../assets/icons/marker-icon-red.png";
import yellowIconUrl from "../../../assets/icons/marker-icon-yellow.png";

// Define ícones customizados para verde, vermelho e amarelo
const greenIcon = L.icon({
  iconUrl: greenIconUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const redIcon = L.icon({
  iconUrl: redIconUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const yellowIcon = L.icon({
  iconUrl: yellowIconUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default defineComponent({
  name: "Map",
  setup() {
    const clients = ref<Cliente[]>([]);
    const defaultLat = ref<number>(-29.90275696187172);
    const defaultLon = ref<number>(-51.191230930169034);

    const clientStatus = ref<ClientStatus>({
      eventos_nao_pagos: 0,
      eventos_pagos: 0,
      total_pagos: 0,
      total_nao_pagos: 0,
      nfs_pagos: [],
      nfs_nao_pagos: [],
    });

    const showModal = ref<boolean>(false);

    const clientsWithCoordinates = computed(() => {
      return clients.value.filter(
        (client) => client.LATITUDE !== null && client.LONGITUDE !== null
      );
    });

    const fetchClients = async () => {
      try {
        // 1. Buscar todos os clientes
        const response = await ClientService.getAllClients();
        clients.value = response.data;

        // 2. Inicializar o mapa
        const map = L.map("map").setView(
          [defaultLat.value, defaultLon.value],
          13
        );
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
          map
        );

        // 3. Para cada cliente com coordenadas, fazer POST com CNPJ e logar os dados
        for (const client of clientsWithCoordinates.value) {
          if (client.CNPJ) {
            try {
              const status: ClientStatus = await ClientService.getClientStatus(
                client.CNPJ
              );
              console.log(`Status para CNPJ ${client.CNPJ}:`, status);

              // Determinar o ícone com base no status de pagamento
              let icon;
              if (status.eventos_nao_pagos > 0 && status.eventos_pagos > 0) {
                icon = yellowIcon; // Ambos pagos e não pagos
              } else if (status.eventos_nao_pagos > 0) {
                icon = redIcon; // Somente não pagos
              } else {
                icon = greenIcon; // Somente pagos
              }

              // Adicionar marcador com o ícone apropriado
              const marker = L.marker([client.LATITUDE!, client.LONGITUDE!], {
                icon,
              }).addTo(map);

              // Adicionar um ID único ao botão para facilitar a identificação
              const uniqueButtonId = `btn-${client.CNPJ}`;

              marker.bindPopup(`
                <strong>${client.NOME}</strong><br>
                <strong>CNPJ:</strong> ${client.CNPJ ?? "N/A"}<br>
                <strong>Contato:</strong> ${client.CONTATO ?? "N/A"}<br>
                <strong>Email:</strong> ${client.EMAIL ?? "N/A"}<br>
                <strong>Endereço:</strong> ${client.RUA_AV}, ${
                client.NUMERO
              }, ${client.COMPLEMENTO ?? ""} - ${client.BAIRRO ?? "N/A"}, ${
                client.CIDADE ?? "N/A"
              }<br>
                <strong>CEP:</strong> ${client.CEP ?? "N/A"}<br>
                <strong>Vendedor:</strong> ${client.NOME_VENDEDOR ?? "N/A"}<br>
                <button id="${uniqueButtonId}" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 mt-2">Ver eventos</button>
              `);

              // Adicionar evento para abrir a modal ao clicar no botão
              marker.on("popupopen", () => {
                const btn = document.getElementById(uniqueButtonId);
                btn?.addEventListener("click", () => {
                  // Atualizando o array de eventos com NFs pagas e não pagas
                  clientStatus.value = status;
                  showModal.value = true;
                  console.log("Eventos:", clientStatus.value); // Log eventos no console
                });
              });
            } catch (statusError) {
              console.error(
                `Erro ao obter status para CNPJ ${client.CNPJ}:`,
                statusError
              );
            }
          }
        }
      } catch (error) {
        console.error("Erro ao buscar clientes:", error);
      }
    };

    const fecharModal = () => {
      showModal.value = false;
    };

    onMounted(fetchClients);

    return {
      clientStatus,
      showModal,
      fecharModal,
      defaultLat,
      defaultLon,
    };
  },
});
