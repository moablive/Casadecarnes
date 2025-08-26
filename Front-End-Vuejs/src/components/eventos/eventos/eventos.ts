import { defineComponent, ref, onMounted } from "vue";
import EventoService from "../../../services/eventoService";
import { Evento } from "../../../interfaces/evento";
import Navbar from "../../navbar/Navbar.vue";
import {
  CheckIcon,
  ExclamationTriangleIcon,
  TrashIcon,
  FunnelIcon,
  ArrowDownTrayIcon,
} from "@heroicons/vue/24/solid";

export default defineComponent({
  name: "Eventos",
  components: {
    Navbar,
    CheckIcon,
    ExclamationTriangleIcon,
    TrashIcon,
    FunnelIcon,
    ArrowDownTrayIcon,
  },
  setup() {
    const eventos = ref<Evento[]>([]);
    const isLoading = ref(true);
    const showModal = ref(false);
    const showPagamentoModal = ref(false);
    const eventoIdParaDeletar = ref<number | null>(null);
    const eventoIdParaPagamento = ref<number | null>(null);
    const selectedMonth = ref<string>("1");
    const selectedYear = ref<string>(new Date().getFullYear().toString());
    const comprovanteBase64 = ref<string | null>(null);

    const months = [
      { value: "1", label: "Janeiro" },
      { value: "2", label: "Fevereiro" },
      { value: "3", label: "Março" },
      { value: "4", label: "Abril" },
      { value: "5", label: "Maio" },
      { value: "6", label: "Junho" },
      { value: "7", label: "Julho" },
      { value: "8", label: "Agosto" },
      { value: "9", label: "Setembro" },
      { value: "10", label: "Outubro" },
      { value: "11", label: "Novembro" },
      { value: "12", label: "Dezembro" },
    ];

    const years = Array.from({ length: 10 }, (_, i) =>
      (new Date().getFullYear() - i).toString()
    );

    const fetchEventos = async () => {
      try {
        isLoading.value = true;
        const response = await EventoService.getEventosByMonthAndYear(
          selectedMonth.value,
          selectedYear.value
        );
        eventos.value = response.data;
      } catch (error) {
        console.error("Erro ao buscar eventos:", error);
      } finally {
        isLoading.value = false;
      }
    };

    const confirmDelete = (id: number | undefined) => {
      if (id) {
        eventoIdParaDeletar.value = id;
        showModal.value = true;
      }
    };

    const closeModal = () => {
      showModal.value = false;
    };

    const deleteEvento = async () => {
      if (eventoIdParaDeletar.value !== null) {
        try {
          await EventoService.deleteEvento(eventoIdParaDeletar.value);
          fetchEventos();
          closeModal();
        } catch (error) {
          console.error("Erro ao deletar evento:", error);
        }
      }
    };

    const abrirModalPagamento = (id: number | undefined) => {
      if (id) {
        eventoIdParaPagamento.value = id;
        showPagamentoModal.value = true;
      }
    };

    const fecharModalPagamento = () => {
      showPagamentoModal.value = false;
      comprovanteBase64.value = null; // Limpar o comprovante ao fechar a modal
    };

    const confirmarPagamento = async () => {
      if (eventoIdParaPagamento.value && comprovanteBase64.value) {
        try {
          await EventoService.marcarEventoComoPago(
            eventoIdParaPagamento.value,
            comprovanteBase64.value
          );
          fetchEventos();
          fecharModalPagamento();
        } catch (error) {
          console.error("Erro ao marcar evento como pago:", error);
        }
      }
    };

    const handleFileUpload = (event: Event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          comprovanteBase64.value = reader.result as string;
        };
        reader.readAsDataURL(file);
      }
    };

    const marcarComoNaoPago = async (id: number | undefined) => {
      if (id) {
        try {
          await EventoService.marcarEventoComoNaoPago(id);
          fetchEventos();
        } catch (error) {
          console.error("Erro ao marcar evento como não pago:", error);
        }
      }
    };

    const downloadComprovante = async (id: number, numeroNF: string) => {
      try {
        const response = await EventoService.downloadComprovante(id);

        // Criação de um blob a partir da resposta para garantir que o arquivo não venha corrompido
        const blob = new Blob([response.data], { type: "application/pdf" });

        // Criação da URL do blob para o download
        const url = window.URL.createObjectURL(blob);

        // Criação de um link para realizar o download
        const link = document.createElement("a");
        link.href = url;

        // Definir o nome do arquivo como o NumeroNF do evento
        link.setAttribute("download", `comprovante_${numeroNF}.pdf`);

        // Adicionar o link ao DOM e acionar o clique para baixar o arquivo
        document.body.appendChild(link);
        link.click();

        // Remover o link do DOM após o download
        document.body.removeChild(link);
      } catch (error) {
        console.error("Erro ao baixar comprovante:", error);
      }
    };

    onMounted(fetchEventos);

    return {
      eventos,
      isLoading,
      showModal,
      showPagamentoModal,
      abrirModalPagamento,
      fecharModalPagamento,
      confirmarPagamento,
      eventoIdParaDeletar,
      eventoIdParaPagamento,
      comprovanteBase64,
      handleFileUpload,
      confirmDelete,
      closeModal,
      deleteEvento,
      marcarComoNaoPago,
      downloadComprovante,
      fetchEventos,
      selectedMonth,
      selectedYear,
      months,
      years,
    };
  },
});
