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
                <span class="username">Aris Anggara Putra</span>
                <div class="checkin">
                    <button class="masuk" role="button" >Check-In</button>
                </div>
                <div class="checkout">
                    <button class="keluar" role="button" >Check-Out</button>
                </div>
                <div class="footer">
                    <router-link to="/" class="logout-button">Logout</router-link>
                </div>
                
            </div>
            
		</div>
	</div>
	
</template>