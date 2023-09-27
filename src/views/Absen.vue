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
                    <button @click="checkIn()" class="masuk" role="button" >Check-In</button>
                </div>
                <div class="checkout">
                    <button @click="checkOut()" class="keluar" role="button" >Check-Out</button>
                </div>
                <div class="footer">
                    <button  @click="logout()" class="logout-button">Logout</button>
                </div>
             
                
            </div>
            
        </div>
    </div>
    
</template>

<script>
import apiClient from '../axios/api.js'
import Swal from 'sweetalert2';
export default{
    data(){
        return{
            
            token: localStorage.getItem('Token'),
            userName: '',
            checkin: {
                absensi_id: 2,
                karyawan_id: 'arisanggara72@gmail.com'
            },
            checkout: {
                karyawan_id: 'arisanggara72@gmail.com',
                _method: 'patch'
            }
            
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
              
                localStorage.removeItem('Token');
                Swal.fire(
                'Success!',
                response.data.message,
                'success'
                );
                // Melempar pengguna ke halaman login menggunakan Vue Router
                this.$router.push({ name: 'Login' });
                
            })
            .catch(err =>{
                Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'Something went wrong!',
				});
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
            
        },
        checkIn(){
            const headers = {
                Authorization: `Bearer ${this.token}`
            };

            apiClient.post('/absensi', this.checkin, {headers})
            .then(response =>{
                console.log(response.data);
            })
            .catch(err =>{
                console.log(err.response.data);
            })
        },
        checkOut(){
            const headers = {
                Authorization: `Bearer ${this.token}`
            };

            apiClient.post('/absensi', this.checkout, {headers})
            .then(response =>{
                console.log(response.data);
            })
            .catch(err =>{
                console.log(err.response.data);
            })
        },
    },
    mounted() {
        this.getUserLogin(); // Panggil method getUserLogin() saat komponen dimuat
    },
};

</script>