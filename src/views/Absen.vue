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
                <span class="username">{{ userName.nama_karyawan }} {{ getUserLogin() }}</span>
                <div class="checkin">
                    <button @click="checkIn()" :disabled="jam_masuk !== null" class="masuk" role="button" >Check-In</button>
                </div>
                <div class="checkout">
                    <button @click="checkOut()" :disabled="jam_keluar !== null" class="keluar" role="button" >Check-Out</button>
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
                karyawan_id: ''
            },
            checkout: {
                karyawan_id: '',
                _method: 'patch'
            },
            
            id_karyawan: this.getUserLogin(),
            
            jam_masuk: '',
            jam_keluar: '',
            
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
        async getUserLogin() {
            const headers = {
                Authorization: `Bearer ${this.token}`,
            };
            
            try {
                const response = await apiClient.get('/user', { headers });
                this.userName = response.data.data;
                this.checkin.karyawan_id = response.data.data.id_karyawan;
                this.checkout.karyawan_id = response.data.data.id_karyawan;
                return 'PG001';
            } catch (err) {
                console.log(err.response.data);
            }
        },
        
        getUserAbsen(){
            const id_karyawan = this.checkin.karyawan_id;
            const headers = {
                Authorization: `Bearer ${this.token}`
            };
            
            
            
            apiClient.get("/absensi/"+this.checkin.karyawan_id, { headers })
            .then(response =>{
                
                
                this.jam_masuk = response.data.data;
                console.log(this.checkin.karyawan_id);
                this.jam_keluar = response.data.data.jam_keluar;
                console.log(response.data.data.jam_keluar);
            })
            .catch(err =>{
                
            })
        },
        checkIn(){
            const headers = {
                Authorization: `Bearer ${this.token}`
            };
            
            apiClient.post('/absensi', this.checkin, {headers})
            .then(response =>{
                console.log(this.checkin.karyawan_id);
                Swal.fire(
                'Success!',
                response.data.message,
                'success'
                );
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
                
                Swal.fire(
                'Success!',
                response.data.message,
                'success'
                );
            })
            .catch(err =>{
                console.log(err.response.data);
            })
        },
    },
    mounted() {
        this.getUserLogin(); // Panggil method getUserLogin() saat komponen dimuat
        this.getUserAbsen(); // Panggil method getUserLogin() saat komponen dimuat
    },
};

</script>