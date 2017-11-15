<template>
	<div class="login">
		<navBar title="登录这款山寨的仿制的游戏"></navBar>
		<ul>
			<li><input type="text" placeholder="这里输入帐号" v-model="loginz"></li>
			<li><input type="password" placeholder="这里输密码" v-model="loginm"></li>
		</ul>
		<p>
			<span>还没有帐号？？</span>
			<router-link to="/register">
				<a>去注册</a>
			</router-link>

		</p>
		<div><input @click="login" class="login-button" type="button" value="登录" /></div>
	</div>
</template>

<script>
	import navBar from "@/components/navbar";
	export default {
		name: "",
		data() {
			return {
				loginz: this.loginz,
				loginm: this.loginm
			};
		},
		methods: {
			login() {
				var localuserZ = localStorage.getItem('account');
				if(localuserZ) {
					localuserZ = JSON.parse(localuserZ);
					for(var i = 0; i < localuserZ.length; i++) {
						if(localuserZ[i].unm == this.loginz) {
							if(localuserZ[i].pwd == this.loginm) {
								    
								this.$router.replace("/main");
							} else {
								alert('密码错误')
								return;
							} 
						} else {
							alert("没有这个帐号");
							return; 
						}
					}
				}
			}
		},
		components: {
			navBar: navBar
		}
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	li {
		display: flex;
		justify-content: center;
		margin: 0.3rem 0;
	}
	li input {
		width: 100%;
		height: 1rem;
	}
	p a {
		color: #007aff;
	}
	.login-button {
		width: 2rem;
		height: 0.7rem;
		line-height: 0.7rem;
	}
</style>