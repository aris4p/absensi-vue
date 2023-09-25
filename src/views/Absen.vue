<template>
    <div class="limiter">
        <div class="container-login100">
            <div class="wrap-login100">
                <span class="login100-form-title p-b-26">
                    Absensi
                </span>
                <span class="login100-form-title ">
                    <img src="src/assets/images/finger.png" alt="finger" style="width: 50%;">
                </span>
                
                <span class="welcome-warn">Anda Belum checkin</span>
                <span class="welcome p-b-48">Selamat Datang</span>
                <span class="username">{{ userName.name || userName.nama_karyawan }}</span>
                <div class="checkin">
                    <button class="masuk" role="button" >Check-In</button>
                </div>
                <div class="checkout">
                    <button class="keluar" role="button" >Check-Out</button>
                </div>
                <div class="footer">
                    <button  @click="logout()" class="logout-button">Logout</button>
                </div>
                <!-- {{ getUserLogin() }} -->
                
            </div>
            
        </div>
    </div>
    
</template>

<script>
import apiClient from '../axios/api.js'

export default{
    data(){
        return{
            
            token: localStorage.getItem('Token'),
            userName: '',
            
        }
    },
    methods: {
        logout(){
            
            // Membuat objek header dengan token
            const headers = {
                Authorization: `Bearer ${this.token}`
            };
            
            apiClient.get('/logout', {headers})
            .then(response =>{
                //logout berhasil
                console.log(response.data);
                localStorage.removeItem('Token');
                // Melempar pengguna ke halaman login menggunakan Vue Router
                this.$router.push({ name: 'Login' });
            })
            .catch(err =>{
                console.log(err.response.data);
            })
        },
        getUserLogin(){
            const headers = {
                Authorization: `Bearer ${this.token}`
            };
            
            apiClient.get('/user', {headers})
            .then(response =>{
                
                this.userName = response.data.data;
                
            })
            .catch(err=>{
                console.log(err.response.data);
            })
        },
        getUserAbsen(){
            
        }
    },
    mounted() {
        this.getUserLogin(); // Panggil method getUserLogin() saat komponen dimuat
    },
};

</script>