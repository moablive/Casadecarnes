import { defineComponent, ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import ClientService from '@/services/ClientService';
import VendedorService from '@/services/vendedorService';
import { Cliente } from '@/interfaces/cliente';
import { Vendedor } from '@/interfaces/vendedor';
import Navbar from '@/components/navbar/Navbar.vue';
import { UserGroupIcon } from '@heroicons/vue/24/solid';

export default defineComponent({
    name: 'EditarCliente',
    components: {
        Navbar,
        UserGroupIcon, // Ícone Heroicons
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
        });

        const router = useRouter();
        const route = useRoute();
        const clientId = Number(route.params.id);

        const vendedores = ref<Vendedor[]>([]); // Lista de vendedores
        const vendedorSelecionado = ref<Vendedor | null>(null); // Vendedor selecionado
        const showVendedorModal = ref(false); // Controle da modal

        const fetchClient = async () => {
            try {
                // Busca os dados do cliente pelo ID
                const response = await ClientService.getClientById(clientId);
                cliente.value = response.data;
        
                // Se o cliente tiver um CODIGO_VENDEDOR, busca o nome do vendedor
                if (cliente.value.CODIGO_VENDEDOR) {
                    try {
                        const vendedorResponse = await VendedorService.getVendedorById(cliente.value.CODIGO_VENDEDOR);
                        vendedorSelecionado.value = vendedorResponse.data || null; // Atualiza o vendedor selecionado
                    } catch (vendedorError) {
                        console.error('Erro ao buscar vendedor associado:', vendedorError);
                        vendedorSelecionado.value = null;
                    }
                } else {
                    vendedorSelecionado.value = null; // Nenhum vendedor associado
                }
            } catch (error) {
                console.error('Erro ao buscar cliente:', error);
            }
        };

        const fetchVendedores = async () => {
            try {
                const response = await VendedorService.getAllVendedores();
                vendedores.value = response.data;
            } catch (error) {
                console.error('Erro ao buscar vendedores:', error);
            }
        };

        const selectVendedor = (vendedor: Vendedor) => {
            cliente.value.CODIGO_VENDEDOR = vendedor.ID; // Atualiza o cliente com o ID do vendedor
            vendedorSelecionado.value = vendedor; // Atualiza o vendedor selecionado
            showVendedorModal.value = false; // Fecha a modal
        };

        const updateClient = async () => {
            try {
                await ClientService.updateClient(clientId, cliente.value);
                router.push('/clientes');
            } catch (error) {
                console.error('Erro ao atualizar cliente:', error);
            }
        };

        const cancel = () => {
            router.push('/clientes');
        };

        onMounted(() => {
            fetchClient();
            fetchVendedores();
        });

        return {
            cliente,
            vendedores,
            vendedorSelecionado,
            showVendedorModal,
            updateClient,
            cancel,
            selectVendedor,
        };
    },
});