import { createRouter, createWebHistory } from "vue-router";
import LoginVue from "../views/Login.vue";
import AbsenVue from "../views/Absen.vue";
const routes = [
    {
        path:'',
        name: 'Login',
        component: LoginVue,
        
    },
    {
        path:'/absen',
        name: 'Absen',
        component: AbsenVue,
        meta: {
            requiresAuth: true
        }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

const isAuthenticated = true;
router.beforeEach((to, from, next) => {
    document.title = to.name;
    if (to.meta.requiresAuth) {
        const token = localStorage.getItem('Token');
       
        if (!token) {
            // Token tidak ada, navigasikan ke halaman 'Login'
            next({ name: 'Login' });
        } else {
            // Token ada, navigasikan ke halaman 'Absen'
            next();
        }
        
    } else if (to.name === 'Login') {
        // Jika pengguna mencoba mengakses halaman 'Login' ketika sudah memiliki token,
        // alihkan mereka ke halaman lain (misalnya, 'Absen')
        const token = localStorage.getItem('Token');
        if (token) {
            next({ name: 'Absen' });
        } else {
            next();
        }
    } else {
        // Jika halaman tidak memerlukan otentikasi, lanjutkan
        next();
    }
});


export default router