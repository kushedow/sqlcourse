import { createApp } from 'vue'
import App from './components/app.vue'
import {createPinia, Pinia} from 'pinia'
import Vuejs3logger  from 'vuejs3-logger'

import router from './router'
const pinia: Pinia = createPinia();
const app = createApp(App);

const options = {
    isEnabled: true,
    logLevel : 'debug',
    stringifyArguments : false,
    showLogLevel : true,
    showMethodName : true,
    separator: '|',
    showConsoleColors: true
};


app.use(Vuejs3logger, options);

app.use(pinia)
app.use(router);
app.mount('#app');



