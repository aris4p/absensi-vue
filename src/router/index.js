import { createRouter, createWebHistory } from "vue-router";
import LoginVue from "../views/Login.vue";
import AbsenVue from "../views/Absen.vue";
const routes = [
    {
        path:'', component: LoginVue,
       
    },
    {
        path:'/absen', component: AbsenVue
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router