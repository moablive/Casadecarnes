import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

// LOGIN
import Login from './components/login/login.vue';

// HOME PAGE
import Home from './components/home/home.vue';

// Components de Cliente
import Clientes from './components/clientes/clientes/clientes.vue';
import CadastrarCliente from './components/clientes/cadastrarCliente/cadastrarCliente.vue';
import EditarCliente from './components/clientes/editarCliente/editarCliente.vue';

// Components de Vendedor
import Vendedores from './components/vendedores/vendedores/vendedores.vue';
import EditarVendedor from './components/vendedores/editarVendedor/editarVendedor.vue';
import CadastrarVendedor from './components/vendedores/cadastrarVendedor/cadastrarVendedor.vue';

// Components de Evento
import Eventos from './components/eventos/eventos/eventos.vue';

// Components de Produto
import Produtos from './components/produtos/produtos/produtos.vue';
import CadastrarProduto from './components/produtos/cadastrarProduto/cadastrarProduto.vue';
import EditarProduto from './components/produtos/editarProduto/editarProduto.vue';

// Função que verifica se o usuário está autenticado
function isAuthenticated() {
  // Exemplo: Checa se o token JWT existe no localStorage
  return !!localStorage.getItem('token');
}

// ROTAS
const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'login', component: Login },
  { path: '/home', name: 'Home', component: Home },
  { path: '/clientes', name: 'Clientes', component: Clientes },
  { path: '/cadastrar-cliente', name: 'CadastrarCliente', component: CadastrarCliente },
  { path: '/editar-cliente/:id', name: 'EditarCliente', component: EditarCliente, props: true },
  { path: '/vendedores', name: 'Vendedores', component: Vendedores },
  { path: '/editar-vendedor/:id', name: 'EditarVendedor', component: EditarVendedor, props: true },
  { path: '/cadastrar-vendedor', name: 'CadastrarVendedor', component: CadastrarVendedor },
  { path: '/eventos', name: 'Eventos', component: Eventos },
  { path: '/produtos', name: 'Produtos', component: Produtos },
  { path: '/cadastrar-produto', name: 'CadastrarProduto', component: CadastrarProduto },
  { path: '/editar-produto/:id', name: 'EditarProduto', component: EditarProduto, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Adiciona o navigation guard
router.beforeEach((to, from, next) => {
  // Permitir acesso à rota de login
  if (to.name === 'login') {
    next();
  } else if (isAuthenticated()) {
    // Se autenticado, permitir acesso
    next();
  } else {
    // Se não autenticado, redirecionar para a página de login
    next({ name: 'login' });
  }
});

export default router;