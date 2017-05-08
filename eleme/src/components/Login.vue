// index.vue
<template>

	<div class="login">
		<navTitle></navTitle>
		<form>
			<div id="app-login">
				<input type="text" v-model="uname" placeholder="请输入用户名" maxlength="18"  @enter="app_check"/>
				<input type="password" v-model='passw' placeholder="请输入密码" maxlength="18"  @enter="app_check"/>
			</div>

			<div id="app-dl"><button @click="app_check">登录</button></div>
		</form>

	</div>
</template>
<script>
	import navTitle from '@/components/navbar'

	export default {
		data() {
			return {
				uname: '',
				passw: ''
			}
		},
		components: {
			'navTitle': navTitle
		},
		methods: {
			app_check() {
				if(this.uname === '' || this.passw === '') {
					alert('用户名或密码不能为空');
					return;
				}
				if(this.uname !== 'admin' && this.passw !== 'admin') {
					alert('用户名或密码错误');
					return;
				} else {
//					this.$store.dispatch('setLogin', true);
					this.$router.replace('/Myzone');
				}
			}
		}
	}
</script>
<style type="text/css">
	body {
		background: #F4F4F4;
		margin: 0;
	}
	.login{margin-top: 2rem;}
	#app-login input {
		width: 100%;
		height: 1.8rem;
		line-height: 1.8rem;
		font-size: 0.8rem;
		border: none;
		outline: none;
		padding: 0.5rem;
		box-sizing: border-box;
		color: #333;
		;
	}
	
	#app-login input:first-child {
		border-bottom: 1px solid #F4F4F4;
	}
	
	#app-dl {
		width: 100%;
		;
	}
	
	#app-dl button {
		margin: .6rem auto;
		display: block;
		width: 9rem;
		height: 1.5rem;
		font-size: .7rem;
		background: #4cd964;
		border: none;
		outline: none;
		color: #fff;
		border-radius: .1rem;
		letter-spacing: 5px;
	}
	
</style>