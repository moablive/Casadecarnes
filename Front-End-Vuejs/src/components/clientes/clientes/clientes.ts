import { defineComponent, ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import ClientService from '../../../services/ClientService';
import { Cliente } from '../../../interfaces/cliente';
import Navbar from '../../navbar/Navbar.vue';

export default defineComponent({
    name: 'Clientes',
    components: {
        Navbar,
    },
    setup() {
        const clientes = ref<Cliente[]>([]);  // Usa a tipagem correta de Cliente[]
        const searchTerm = ref('');
        const isLoading = ref(true); // Estado para controlar o carregamento
        const router = useRouter();
        const showModal = ref(false);
        const showDetailsModal = ref(false);
        const clienteSelecionado = ref<Cliente | null>(null);
        const clienteIdParaDeletar = ref<number | null>(null);

        // Função para buscar clientes e nomes de vendedores
        const fetchClients = async () => {
            try {
                const response = await ClientService.getAllClients();
                const clients: Cliente[] = response.data;  // Define o tipo como Cliente[]

                // Utiliza Promise.all para otimizar a busca dos nomes dos vendedores
                await Promise.all(clients.map(async (client: Cliente) => {
                    if (client.CODIGO_VENDEDOR) {
                        try {
                            const vendedorResponse = await ClientService.getVendedorNomeById(client.CODIGO_VENDEDOR);
                            client.NOME_VENDEDOR = vendedorResponse.data?.nome || 'N/A';
                        } catch (vendedorError) {
                            console.error(`Erro ao buscar nome do vendedor para código ${client.CODIGO_VENDEDOR}:`, vendedorError);
                            client.NOME_VENDEDOR = 'Erro ao buscar nome';
                        }
                    } else {
                        client.NOME_VENDEDOR = 'N/A';
                    }
                }));

                clientes.value = clients;
            } catch (error) {
                console.error('Erro ao buscar clientes:', error);
            } finally {
                isLoading.value = false; // Finaliza o carregamento
            }
        };

        const handleEditClient = (id?: number) => {
            if (id !== undefined) {
                router.push(`/editar-cliente/${id}`);
            } else {
                console.error('ID do cliente é indefinido');
            }
        };

        const handleOpenModal = (id?: number) => {
            if (id !== undefined) {
                clienteIdParaDeletar.value = id;
                showModal.value = true;
            } else {
                console.error('ID do cliente é indefinido');
            }
        };

        const handleShowDetails = (cliente: Cliente) => {
            if (cliente) {
                clienteSelecionado.value = cliente;
                showDetailsModal.value = true;
            } else {
                console.error('Cliente é indefinido');
            }
        };

        const closeModal = () => {
            showModal.value = false;
        };

        const closeDetailsModal = () => {
            showDetailsModal.value = false;
        };

        const confirmDelete = async () => {
            if (clienteIdParaDeletar.value !== null && clienteIdParaDeletar.value !== undefined) {
                try {
                    await ClientService.deleteClient(clienteIdParaDeletar.value);
                    fetchClients(); // Atualiza a lista após a exclusão
                    closeModal();
                } catch (error) {
                    console.error('Erro ao deletar cliente:', error);
                }
            }
        };

        const filteredClientes = computed(() => {
            return clientes.value.filter(cliente =>
                cliente.NOME?.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
                cliente.APELIDO?.toLowerCase().includes(searchTerm.value.toLowerCase())
            );
        });

        const filterClients = () => {
            // Ativa a reatividade para a propriedade filteredClientes
        };

        onMounted(fetchClients);

        return {
            clientes,
            searchTerm,
            filterClients,
            filteredClientes,
            handleEditClient,
            handleOpenModal,
            handleShowDetails,
            closeModal,
            closeDetailsModal,
            confirmDelete,
            showModal,
            showDetailsModal,
            isLoading,
            clienteSelecionado,
        };
    }
});