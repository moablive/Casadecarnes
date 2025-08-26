import { defineComponent, ref, onMounted } from "vue";
import eventoService from "../../../services/eventoService";
import { Evento } from "../../../interfaces/evento";

export default defineComponent({
  name: "ProximosVencimentos",
  setup() {
    const proximosEventos = ref<Evento[]>([]);
    const isLoading = ref(true);

    const fetchProximosEventos = async () => {
      try {
        const response = await eventoService.getNextExpiration();
        proximosEventos.value = response.data;
      } catch (error) {
        console.error("Erro ao buscar eventos próximos:", error);
      } finally {
        isLoading.value = false;
      }
    };

    onMounted(fetchProximosEventos);

    return {
      proximosEventos,
      isLoading,
    };
  },
});