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
                
                <span class="welcome-warn" v-if="masuk === null">Anda Belum Check-In</span>
                <span class="welcome-success" v-else>Anda sudah checkin.</span>
                
                <span class="welcome p-b-48">Selamat datang</span>
                <span class="username">{{ userName.nama_karyawan }}</span>
                <div class="checkin">
                    <button @click="checkIn()" :disabled="masuk !== null" class="masuk" role="button">Check-In</button>
                </div>
                <div class="checkout">
                    <button @click="checkOut()" :disabled="keluar !== null" class="keluar" role="button" >Check-Out</button>
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
            
            idKaryawan: '',
            
            masuk: null,
            keluar: null,
            
            
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
                // Mendapatkan data pengguna dari endpoint '/user'
                const userResponse = await apiClient.get('/user', { headers });
                const userData = userResponse.data.data;
                
                // Mengatur properti userName dan ID karyawan
                this.userName = userData;
                const karyawanID = userData.id_karyawan;
                this.checkin.karyawan_id = karyawanID;
                this.checkout.karyawan_id = karyawanID;
                
                // Mendapatkan data absensi berdasarkan ID karyawan
                const absensiResponse = await apiClient.get(`/absensi/${karyawanID}`, { headers });
                const jam = absensiResponse.data.data;
                this.idKaryawan = jam;
                this.masuk = jam.jam_masuk;
                this.keluar = jam.jam_keluar;
            } catch (err) {
                console.log(err.response.data);
            }
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
                ).then(() => {
                    // Me-refresh halaman setelah tombol "OK" pada Swal.fire diklik
                    location.reload();
                });
            })
            .catch(err =>{
                console.log(err.response.data);
            })
        },
        checkOut() {
            const headers = {
                Authorization: `Bearer ${this.token}`
            };
            
            apiClient.post('/absensi', this.checkout, { headers })
            .then(response => {
                Swal.fire(
                'Success!',
                response.data.message,
                'success'
                ).then(() => {
                    // Me-refresh halaman setelah tombol "OK" pada Swal.fire diklik
                    location.reload();
                });
            })
            .catch(err => {
                console.log(err.response.data);
            })
        },
        
    },
    // computed: {
        //     checkAbsen(){
            //         return this.jam_masuk !== null ? '' : 'Anda Belum Check-In';
            //     },
            // },
            mounted() {
                this.getUserLogin(); // Panggil method getUserLogin() saat komponen dimuat
                // this.getUserAbsen(); // Panggil method getUserLogin() saat komponen dimuat
            },
        };
        
    </script>