import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// CSS Global
import './style.css';

// leaflet MAP
import 'leaflet/dist/leaflet.css';

const app = createApp(App);

// Usando o router na aplicação
app.use(router);

// Montando a aplicação na div com id "app"
app.mount('#app');
