import { defineComponent, ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Navbar from '../../navbar/Navbar.vue';
import VendedorService from '../../../services/vendedorService';
import { Vendedor } from '../../../interfaces/vendedor';

export default defineComponent({
  name: 'EditarVendedor',
  components: {
    Navbar,
  },
  setup() {
    const vendedor = ref<Vendedor>({});
    const router = useRouter();
    const route = useRoute();

    const fetchVendedor = async (id: number) => {
      try {
        const response = await VendedorService.getVendedorById(id);
        vendedor.value = response.data;
      } catch (error) {
        console.error('Erro ao buscar vendedor:', error);
      }
    };

    const updateVendedor = async () => {
      try {
        if (vendedor.value.ID) {
          await VendedorService.updateVendedor(vendedor.value.ID, vendedor.value);
          router.push('/vendedores');
        }
      } catch (error) {
        console.error('Erro ao atualizar vendedor:', error);
      }
    };

    onMounted(() => {
      const id = Number(route.params.id);
      fetchVendedor(id);
    });

    return {
      vendedor,
      updateVendedor,
    };
  },
});