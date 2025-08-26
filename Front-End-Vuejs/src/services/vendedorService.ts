import apiClient from "./apiClient";
import { Vendedor } from "../interfaces/vendedor";

export default {
  // Registrar um novo vendedor
  registerVendedor(vendedorData: Vendedor) {
    return apiClient.post("/api/vendedor/register", vendedorData);
  },
  // Buscar todos os vendedores
  getAllVendedores() {
    return apiClient.get("/api/vendedor/getAll");
  },
  // Buscar um vendedor por ID
  getVendedorById(id: number) {
    return apiClient.get(`/api/vendedor/getbyid/${id}`);
  },
  // Buscar vendas por vendedor
  getVendasPorVendedor() {
    return apiClient.get("/api/vendedor/vendas");
  },
  // Atualizar um vendedor
  updateVendedor(id: number, vendedorData: Vendedor) {
    return apiClient.put(`/api/vendedor/update/${id}`, vendedorData);
  },
  // Deletar um vendedor
  deleteVendedor(id: number) {
    return apiClient.delete(`/api/vendedor/delete/${id}`);
  },
};
