import { defineComponent, ref } from "vue";
import VendedorService from "../../../services/vendedorService";
import { Vendedor } from "../../../interfaces/vendedor";
import { useRouter } from "vue-router";
import Navbar from '../../navbar/Navbar.vue';

export default defineComponent({
    name: "CadastrarVendedor",
    components: {
        Navbar,
    },
    setup() {
        const vendedor = ref<Vendedor>({
            NOME: '',
            EMAIL: '',
            CONTATO: ''
        });
        const router = useRouter();

        const saveVendedor = async () => {
            try {
                await VendedorService.registerVendedor(vendedor.value);
                router.push("/vendedores");
            } catch (error) {
                console.error("Erro ao cadastrar vendedor:", error);
            }
        };

        return {
            vendedor,
            saveVendedor,
        };
    },
});