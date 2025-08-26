import apiClient from "./apiClient";
import { Evento } from "../interfaces/evento";

export default {
  // Buscar todos os eventos
  getAllEventos() {
    return apiClient.get("/api/eventos/getAll");
  },

  // Buscar todos os eventos pagos
  getAllPaidEvents() {
    return apiClient.get("/api/eventos/getAll/paidEvents");
  },

  // Buscar todos os eventos não pagos
  getAllUnpaidEvents() {
    return apiClient.get("/api/eventos/getAll/unpaidEvents");
  },

  // Buscar eventos por mês e ano
  getEventosByMonthAndYear(month: string, year: string) {
    return apiClient.get(`/api/eventos/list/mes/${month}/${year}`);
  },

  // Buscar os próximos eventos que vencem nos próximos 5 dias
  getNextExpiration() {
    return apiClient.get("/api/eventos/getNextExpiration");
  },

  // Buscar um evento por ID
  getEventoById(id: number) {
    return apiClient.get(`/api/eventos/getbyid/${id}`);
  },

  // Atualizar um evento
  updateEvento(id: number, evento: Partial<Evento>) {
    return apiClient.put(`/api/eventos/update/${id}`, evento);
  },

  // Deletar um evento
  deleteEvento(id: number) {
    return apiClient.delete(`/api/eventos/delete/${id}`);
  },

  // Marcar um evento como pago com upload de comprovante (base64)
  marcarEventoComoPago(id: number, comprovanteBase64: string) {
    return apiClient.put(`/api/eventos/marcarComoPago/${id}`, {
      comprovanteBase64,
    });
  },

  // Marcar um evento como não pago e remover o comprovante
  marcarEventoComoNaoPago(id: number) {
    return apiClient.put(`/api/eventos/marcarComoNaoPago/${id}`);
  },

  // Função para download do comprovante no frontend
  downloadComprovante(id: number) {
    return apiClient.get(`/api/eventos/downloadComprovante/${id}`, {
      responseType: "blob",
    });
  },
};
