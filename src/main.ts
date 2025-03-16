import { createApp } from 'vue'
import App from './components/app.vue'
import {createPinia, Pinia} from 'pinia'

const pinia: Pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.mount('#app');





