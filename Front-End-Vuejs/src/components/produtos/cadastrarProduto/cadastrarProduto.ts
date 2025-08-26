import { defineComponent, ref } from "vue";
import ProdutoService from "../../../services/produtoService";
import { Produto } from "../../../interfaces/produto";
import Navbar from "../../navbar/Navbar.vue";

export default defineComponent({
  name: "CadastrarProduto",
  components: {
    Navbar,
  },
  setup() {
    // Produto a ser cadastrado usando a interface Produto
    const produto = ref<Produto>({
      codigo_produto: "",  // Corrigido para 'codigo_produto' com 'p' minúsculo
      descricao: "",
      valor_venda: 0,
      categoria: "",
    });

    // Função para cadastrar o produto
    const cadastrarProduto = async () => {
      try {
        await ProdutoService.createProduto(produto.value);
        alert("Produto cadastrado com sucesso!");
        // Resetar o formulário após o cadastro
        produto.value = {
          codigo_produto: "",
          descricao: "",
          valor_venda: 0,
          categoria: "",
        };
      } catch (error) {
        console.error("Erro ao cadastrar o produto:", error);
        alert("Erro ao cadastrar o produto.");
      }
    };

    return {
      produto,
      cadastrarProduto,
    };
  },
});