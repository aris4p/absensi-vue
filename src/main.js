import './assets/css/main.css'
import './assets/css/util.css'
import './assets/fonts/font-awesome-4.7.0/css/font-awesome.min.css'
import './assets/vendor/bootstrap/css/bootstrap.min.css'
import './assets/images/icons/favicon.ico'
import './assets/fonts/iconic/css/material-design-iconic-font.min.css'
import './assets/vendor/animate/animate.css'
import './assets/vendor/css-hamburgers/hamburgers.min.css'




import { createApp } from 'vue'
import App from './App.vue'
import router from './router'


createApp(App).use(router).mount('#app').config.devtools = true;
