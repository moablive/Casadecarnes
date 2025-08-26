import { defineComponent, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import ClientService from '../../../services/ClientService';
import VendedorService from '../../../services/vendedorService';
import { Cliente } from '../../../interfaces/cliente';
import { Vendedor } from '../../../interfaces/vendedor';
import Navbar from '../../navbar/Navbar.vue';
import { UserGroupIcon } from '@heroicons/vue/24/solid';

export default defineComponent({
    name: 'CadastrarCliente',
    components: {
        Navbar,
        UserGroupIcon,
    },
    setup() {
        const cliente = ref<Cliente>({
            NOME: '',
            APELIDO: '',
            EMAIL: '',
            CNPJ: '',
            CONTATO: '',
            PAIS: '',
            ESTADO: '',
            CIDADE: '',
            BAIRRO: '',
            RUA_AV: '',
            NUMERO: '',
            COMPLEMENTO: '',
            CEP: '',
            CODIGO_TELECON: null,
            LATITUDE: null,
            LONGITUDE: null,
            CODIGO_VENDEDOR: null,
        });

        const router = useRouter();

        const showVendedorModal = ref(false);
        const vendedores = ref<Vendedor[]>([]);
        const vendedorSelecionado = ref<Vendedor | null>(null);

        onMounted(async () => {
            try {
                const response = await VendedorService.getAllVendedores();
                vendedores.value = response.data;
            } catch (error) {
                console.error('Erro ao carregar vendedores:', error);
            }
        });

        const selectVendedor = (vendedor: Vendedor) => {
            cliente.value.CODIGO_VENDEDOR = vendedor.ID;
            vendedorSelecionado.value = vendedor;
            showVendedorModal.value = false;
        };

        const saveClient = async () => {
            try {
                await ClientService.registerClient(cliente.value);
                router.push('/clientes');
            } catch (error) {
                console.error('Erro ao salvar cliente:', error);
            }
        };

        const cancel = () => {
            router.push('/clientes');
        };

        return {
            cliente,
            saveClient,
            cancel,
            showVendedorModal,
            vendedores,
            vendedorSelecionado,
            selectVendedor,
        };
    },
});