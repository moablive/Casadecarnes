import { defineComponent, ref, onMounted } from "vue";
import VendedorService from "../../../services/vendedorService";
import { Vendedor } from "../../../interfaces/vendedor";
import Navbar from "../../navbar/Navbar.vue";
import router from '../../../router';
import BestPartner from "./bestPartner/bestPartner.vue";

export default defineComponent({
  name: "ListarVendedores",
  components: {
    Navbar,
    BestPartner
  },
  setup() {
    const vendedores = ref<Vendedor[]>([]);
    const isLoading = ref(true);
    const showModal = ref(false);
    const vendedorIdParaDeletar = ref<number | null>(null);

    const fetchVendedores = async () => {
      try {
        const response = await VendedorService.getAllVendedores();
        vendedores.value = response.data;
      } catch (error) {
        console.error("Erro ao buscar vendedores:", error);
      } finally {
        isLoading.value = false;
      }
    };

    const editVendedor = (id: number | undefined) => {
      if (id) {
        router.push(`/editar-vendedor/${id}`);
      }
    };

    const confirmDelete = (id: number | undefined) => {
      if (id) {
        vendedorIdParaDeletar.value = id;
        showModal.value = true;
      }
    };

    const deleteVendedor = async () => {
      if (vendedorIdParaDeletar.value !== null) {
        try {
          await VendedorService.deleteVendedor(vendedorIdParaDeletar.value);
          fetchVendedores();
          closeModal();
        } catch (error) {
          console.error("Erro ao deletar vendedor:", error);
        }
      }
    };

    const closeModal = () => {
      showModal.value = false;
    };

    onMounted(fetchVendedores);

    return {
      vendedores,
      isLoading,
      showModal,
      confirmDelete,
      deleteVendedor,
      closeModal,
      editVendedor,
    };
  },
});
