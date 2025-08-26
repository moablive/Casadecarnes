import apiClient from "./apiClient";
import { Cliente } from "../interfaces/cliente";
import { ClientStatus } from "../interfaces/ClientStatus";

export default {
  registerClient(clientData: Cliente) {
    return apiClient.post("/api/clientes/register", clientData);
  },
  getAllClients() {
    return apiClient.get("/api/clientes/getAll");
  },
  getClientById(id: number) {
    return apiClient.get(`/api/clientes/${id}`);
  },
  getVendedorNomeById(id: number) {
    return apiClient.get(`/api/clientes/vendedor/${id}`);
  },
  updateClient(id: number, clientData: Cliente) {
    return apiClient.put(`/api/clientes/${id}`, clientData);
  },
  deleteClient(id: number) {
    return apiClient.delete(`/api/clientes/${id}`);
  },

  // Adicionado: Função para obter o status 🗺️ do cliente usando POST 
  getClientStatus(cnpj: string): Promise<ClientStatus> {
    return apiClient
      .post<ClientStatus>("/api/clientes/status", { cnpj })
      .then((response) => response.data);
  },
};
