<template>
	<div class="register">
		<navbar title="赶紧注册体验一下这个渣渣游戏吧"></navbar>
		<form>
			<ul>
				<li><input type="text" placeholder="昵称" v-model="username" /></li>
				<li><input type="text" placeholder="帐号" v-model="userz" /></li>
				<li><input type="password" placeholder="密码" v-model="userm" /></li>
				<li><input type="password" placeholder="确认密码" v-model="usermm" /></li>
			</ul>
			<div><input type="button" v-on:click="regist" value="注册" /></div>
		</form>
	</div>
</template>

<script>
	import navBar from "@/components/navbar";
	export default {
		name: "",
		data() {
			return {
				userm: "",
				userz: "",
				usermm: "",
				username:""
			};
		},
		components: {
			navbar: navBar
		},
		methods: {
			regist() {
				if(this.userm != this.usermm) {
					alert("密码与确认密码必须相同");
					return;
				}
				var userInfo = new Array();
				var localuserZ = localStorage.getItem("account") || ''; //获取已存帐号信息
				var len = 0;
				console.log(localuserZ);

				if(localuserZ) {
					localuserZ = JSON.parse(localuserZ);
					userInfo = localuserZ;
					len = localuserZ.length;
					for(var i = 0; i < localuserZ.length; i++) {
						if(localuserZ[i].unm == this.userz) {
							alert("帐号已存在");
							return;
						}
					}
				}
				userInfo.push({
					lid: len + 1,
					unm: this.userz,
					pwd: this.userm,
					attack: "3",
					health: "100",
					username: this.username
				});
				userInfo = JSON.stringify(userInfo);
				localStorage.setItem("account", userInfo);
				this.$router.replace("/main");
			}
		}
	};
</script>

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
</style>