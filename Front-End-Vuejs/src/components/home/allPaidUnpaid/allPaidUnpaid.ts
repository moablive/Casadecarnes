import { defineComponent, ref, computed, onMounted } from "vue";
import EventoService from "../../../services/eventoService";
import { Evento } from "../../../interfaces/evento";
import { CheckIcon, ExclamationTriangleIcon } from "@heroicons/vue/24/solid";

export default defineComponent({
  name: "AllPaidUnpaid",
  components: {
    CheckIcon,
    ExclamationTriangleIcon,
  },
  setup() {
    const paidEvents = ref<Evento[]>([]);
    const unpaidEvents = ref<Evento[]>([]);
    const isLoading = ref(true);

    // Propriedade computada para somar o valor total dos eventos pagos
    const totalValorPago = computed(() => {
      return paidEvents.value.reduce((total, evento) => {
        return total + (evento.ValorNF || 0); // Somar o valor se existir
      }, 0);
    });

    // Propriedade computada para somar o valor total dos eventos não pagos
    const totalValorNaoPago = computed(() => {
      return unpaidEvents.value.reduce((total, evento) => {
        return total + (evento.ValorNF || 0); // Somar o valor se existir
      }, 0);
    });

    // Função para buscar eventos pagos
    const fetchPaidEvents = async () => {
      try {
        isLoading.value = true;
        const response = await EventoService.getAllPaidEvents();
        paidEvents.value = response.data; // Atribuir diretamente os eventos pagos
      } catch (error) {
        console.error("Erro ao buscar eventos pagos:", error);
      } finally {
        isLoading.value = false;
      }
    };

    // Função para buscar eventos não pagos
    const fetchUnpaidEvents = async () => {
      try {
        isLoading.value = true;
        const response = await EventoService.getAllUnpaidEvents();
        unpaidEvents.value = response.data;
      } catch (error) {
        console.error("Erro ao buscar eventos não pagos:", error);
      } finally {
        isLoading.value = false;
      }
    };

    onMounted(() => {
      fetchPaidEvents();
      fetchUnpaidEvents();
    });

    return {
      paidEvents,
      unpaidEvents,
      isLoading,
      totalValorPago,
      totalValorNaoPago,
    };
  },
});