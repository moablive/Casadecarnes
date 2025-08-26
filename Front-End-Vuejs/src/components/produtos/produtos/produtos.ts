import { defineComponent, ref, onMounted } from "vue";
import ProdutoService from "../../../services/produtoService";
import { Produto } from "../../../interfaces/produto";
import Navbar from "../../navbar/Navbar.vue";
import { useRouter } from "vue-router";
import {
  CheckIcon,
  ExclamationTriangleIcon,
  TrashIcon,
  PencilIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  IdentificationIcon,
  ClipboardDocumentListIcon
} from "@heroicons/vue/24/solid";

export default defineComponent({
  name: "Produtos",
  components: {
    Navbar,
    CheckIcon,
    ExclamationTriangleIcon,
    TrashIcon,
    PencilIcon,
    PlusIcon,
    MagnifyingGlassIcon,
    IdentificationIcon,
    ClipboardDocumentListIcon
  },
  setup() {
    const produtos = ref<Produto[]>([]);
    const isLoading = ref(true);
    const showModal = ref(false);
    const searchDescricao = ref("");
    const searchCodigoProduto = ref("");
    const produtoIdParaDeletar = ref<number | null>(null);
    const router = useRouter();

    const fetchProdutos = async () => {
      try {
        isLoading.value = true;
        const response = await ProdutoService.getAllProdutos();
        produtos.value = response.data;
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      } finally {
        isLoading.value = false;
      }
    };

    const buscarPorDescricao = async () => {
      if (searchDescricao.value) {
        try {
          isLoading.value = true;
          const response = await ProdutoService.getProdutosByDescricao(
            searchDescricao.value
          );
          produtos.value = response.data;
        } catch (error) {
          console.error("Erro ao buscar por descrição:", error);
        } finally {
          isLoading.value = false;
        }
      }
    };

    const buscarPorCodigo = async () => {
      if (searchCodigoProduto.value) {
        try {
          isLoading.value = true;
          const response = await ProdutoService.getProdutoByCodigoProduto(
            searchCodigoProduto.value
          );
          produtos.value = [response.data];
        } catch (error) {
          console.error("Erro ao buscar por código de produto:", error);
        } finally {
          isLoading.value = false;
        }
      }
    };

    const obterTodosProdutos = async () => {
      try {
        isLoading.value = true;
        await fetchProdutos();
      } catch (error) {
        console.error("Erro ao obter todos os produtos:", error);
      } finally {
        isLoading.value = false;
      }
    };

    const editProduto = (id: number | undefined) => {
      if (id) {
        router.push(`/editar-produto/${id}`);
      }
    };

    const confirmDelete = (id: number | undefined) => {
      if (id) {
        produtoIdParaDeletar.value = id;
        showModal.value = true;
      }
    };

    const deleteProduto = async () => {
      if (produtoIdParaDeletar.value !== null) {
        try {
          await ProdutoService.deleteProduto(produtoIdParaDeletar.value);
          fetchProdutos();
          closeModal();
        } catch (error) {
          console.error("Erro ao deletar produto:", error);
        }
      }
    };

    const closeModal = () => {
      showModal.value = false;
    };

    onMounted(fetchProdutos);

    return {
      produtos,
      isLoading,
      showModal,
      confirmDelete,
      deleteProduto,
      closeModal,
      editProduto,
      searchDescricao,
      searchCodigoProduto,
      buscarPorDescricao,
      buscarPorCodigo,
      obterTodosProdutos,
    };
  },
});
