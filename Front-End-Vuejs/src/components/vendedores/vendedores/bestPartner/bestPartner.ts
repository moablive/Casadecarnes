import { defineComponent, ref, onMounted } from "vue";
import VendedorService from "../../../../services/vendedorService";
import {
    UserCircleIcon,
    PhoneIcon,
} from "@heroicons/vue/24/solid";

export default defineComponent({
  name: "BestPartner",
  components: {
    UserCircleIcon,
    PhoneIcon,
  },
  setup() {
    const vendas = ref<any[]>([]);
    const isLoading = ref(true);

    const fetchVendas = async () => {
      try {
        const response = await VendedorService.getVendasPorVendedor();
        vendas.value = response.data;
      } catch (error) {
        console.error("Erro ao buscar vendas por vendedor:", error);
      } finally {
        isLoading.value = false;
      }
    };

    const formatCurrency = (value: number) => {
      return value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    };

    onMounted(fetchVendas);

    return {
      vendas,
      isLoading,
      formatCurrency,
    };
  },
});