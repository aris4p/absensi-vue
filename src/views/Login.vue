<template>
	<div class="limiter">
		<div class="container-login100">
			<div class="wrap-login100">
				<form class="login100-form validate-form">
					<span class="login100-form-title p-b-26">
						Absensi
					</span>
					<span class="login100-form-title p-b-48">
						<img src="@/assets/images/finger.png" alt="finger" style="width: 50%;">
					</span>
					
					<div class="wrap-input100 validate-input" data-validate = "Valid email is: a@b.c">
						<input class="input100" type="text" name="email" v-model="credentials.email" :class="{ 'has-val': credentials.email }">
						<span class="focus-input100" data-placeholder="Email"></span>
					</div>
					
					<div class="wrap-input100 validate-input" data-validate="Enter password">
						<span class="btn-show-pass">
							<i class="zmdi zmdi-eye"></i>
						</span>
						<input class="input100" type="password" name="pass" v-model="credentials.password" :class="{ 'has-val': credentials.password }">
						<span class="focus-input100" data-placeholder="Password"></span>
					</div>
					
					<div class="container-login100-form-btn">
						<div class="wrap-login100-form-btn">
							<div class="login100-form-bgbtn"></div>
							<button class="login100-form-btn" @click.prevent="login">
								Login
							</button>
							
						</div>
					</div>
					
				</form>
			</div>
		</div>
	</div>
</template>

<script>
import apiClient from '../axios/api.js'
import Swal from 'sweetalert2';

export default {
	
	
	data() {
		return {
			credentials: {
				email: '',
				password: '',
			},
			title: 'Login',
		};
	},
	methods: {
		login() {
			apiClient.post('/login', this.credentials)
			.then(response => {
				//login berhasil
				
				localStorage.setItem('Token', response.data.token);
				//redirect to
				Swal.fire(
				'Success!',
				'Login Berhasil!',
				'success'
				)
				// Melempar pengguna ke halaman login menggunakan Vue Router
				this.$router.push({ name: 'Absen' });
			})
			.catch(error => {
				//login gagal
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: error.response.data.message,
				})
				// console.error(error.response.data);
			});
		},
	},
};
</script>
