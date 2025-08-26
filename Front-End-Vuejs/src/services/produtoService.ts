import apiClient from './apiClient';

export default {
    // Criar um novo produto
    createProduto(produto: any) {
        return apiClient.post('/api/produtos/create', produto);
    },
    // Buscar todos os produtos
    getAllProdutos() {
        return apiClient.get('/api/produtos/getAll');
    },
    // Buscar um produto por ID
    getProdutoById(id: number) {
        return apiClient.get(`/api/produtos/getProdutoById/${id}`);
    },
    // Buscar um produto por código
    getProdutoByCodigoProduto(codigoProduto: string) {
        return apiClient.get(`/api/produtos/getProdutoByCodigoProduto/${codigoProduto}`);
    },
    // Buscar produtos por descrição
    getProdutosByDescricao(descricao: string) {
        return apiClient.get(`/api/produtos/getProdutosByDescricao/${descricao}`);
    },
    // Atualizar um produto
    updateProduto(id: number, produto: Partial<any>) {
        return apiClient.put(`/api/produtos/updateProdutoById/${id}`, produto);
    },
    // Deletar um produto
    deleteProduto(id: number) {
        return apiClient.delete(`/api/produtos/deleteProdutoById/${id}`);
    },
};