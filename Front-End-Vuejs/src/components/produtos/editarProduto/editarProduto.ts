import { defineComponent, ref, onMounted } from "vue";
import ProdutoService from "../../../services/produtoService";
import Navbar from "../../navbar/Navbar.vue";
import { Produto } from "../../../interfaces/produto";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  name: "EditarProduto",
  components: {
    Navbar,
  },
  setup() {
    const produto = ref<Produto>({
      codigo_produto: "",
      descricao: "",
      valor_venda: 0,
      categoria: "",
    });

    const route = useRoute();
    const router = useRouter();
    const produtoId = route.params.id;

    const fetchProduto = async () => {
      try {
        const response = await ProdutoService.getProdutoById(Number(produtoId));
        produto.value = response.data;
      } catch (error) {
        console.error("Erro ao buscar o produto:", error);
        alert("Erro ao buscar o produto.");
      }
    };

    const editarProduto = async () => {
      try {
        await ProdutoService.updateProduto(Number(produtoId), produto.value);
        alert("Produto atualizado com sucesso!");
        router.push("/produtos");
      } catch (error) {
        console.error("Erro ao editar o produto:", error);
        alert("Erro ao editar o produto.");
      }
    };

    onMounted(fetchProduto);

    return {
      produto,
      editarProduto,
    };
  },
});
