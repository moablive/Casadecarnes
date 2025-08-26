import { defineComponent } from 'vue';
import axios from 'axios';

export default defineComponent({
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    async handleSubmit() {
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/usuarios/login`, {
          username: this.username,
          password: this.password,
        });
        
        // Se o login for bem-sucedido, armazena o token e redireciona
        localStorage.setItem('token', response.data.token);
        this.$router.push('/home'); // Redireciona para a página Home

      } catch (error) {
        console.error('Erro ao fazer login:', error);
        alert('Usuário ou senha incorretos');
      }
    },
  },
});