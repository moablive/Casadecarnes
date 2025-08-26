import axios from 'axios';
import { createApp, ref } from 'vue';
import AlertToken from '../components/login/AlertToken.vue';

// Função para criar a modal de alerta
function createAlertModal() {
    const app = createApp(AlertToken);
    const showAlert = ref(false);
    const alertTitle = ref('');
    const alertMessage = ref('');
    const alertOnConfirm = ref<() => void>(() => {});
    const alertOnClose = ref<() => void>(() => {});

    app.provide('showAlert', showAlert);
    app.provide('alertTitle', alertTitle);
    app.provide('alertMessage', alertMessage);
    app.provide('alertOnConfirm', alertOnConfirm);
    app.provide('alertOnClose', alertOnClose);

    const modalMount = document.createElement('div');
    document.body.appendChild(modalMount);
    app.mount(modalMount);

    return {
        showAlert,
        alertTitle,
        alertMessage,
        alertOnConfirm,
        alertOnClose,
    };
}

// Cria uma instância Vue para controle de modal
const { showAlert, alertTitle, alertMessage, alertOnConfirm, alertOnClose } = createAlertModal();

function notifySessionExpired() {
    showAlert.value = true;
    alertTitle.value = 'Sessão Expirada';
    alertMessage.value = 'Sua sessão expirou. Por favor, faça login novamente.';
    alertOnConfirm.value = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    };
    alertOnClose.value = () => {
        showAlert.value = false;
    };
}

// Cria uma instância global do axios com interceptores
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL, // Define a URL base para todas as requisições
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor de request para adicionar token
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Interceptor de response para lidar com erros de autenticação
apiClient.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        // Token expirado ou inválido
        notifySessionExpired();
    }
    return Promise.reject(error);
});

export default apiClient;
