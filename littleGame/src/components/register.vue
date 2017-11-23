<template>
	<div class="register">
		<navbar title="注册"></navbar>
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
				userm: "", //密码
				userz: "", //帐号
				usermm: "", //确认密码
				username: "" //名字
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
<<<<<<< HEAD
				if(this.userm.trim() == '' || this.userz.trim() == '' || this.usermm.trim() == '' || this.username.trim() == '') {
					alert('请填写完整')
					return false;
				}
				var userInfo = new Array();
				var localuserZ = localStorage.getItem("account") || ''; //获取已存帐号信息
				var len = 0;
=======
				var userInfo = new Array();
				var localuserZ = localStorage.getItem("account") || ''; //获取已存帐号信息
				var len = 0;
				console.log(localuserZ);
>>>>>>> 4efdfd7cfa65fda6cff42bb443081b2169dbe843

				if(localuserZ) {
					localuserZ = JSON.parse(localuserZ);
					userInfo = localuserZ;
					len = localuserZ.length;
					for(var i = 0; i < localuserZ.length; i++) {
						if(localuserZ[i].unm == this.userz) {
							alert("帐号已存在");
<<<<<<< HEAD
							return;
						}
						if(localuserZ[i].username == this.username) {
							alert("名称已存在");
=======
>>>>>>> 4efdfd7cfa65fda6cff42bb443081b2169dbe843
							return;
						}
					}
				}
<<<<<<< HEAD
				//用户数据数组
=======
>>>>>>> 4efdfd7cfa65fda6cff42bb443081b2169dbe843
				userInfo.push({
					lid: len + 1,
					unm: this.userz,
					pwd: this.userm,
					attack: "3",
					health: "100",
					username: this.username
<<<<<<< HEAD
				});
				//存下当前用户信息，方便获取
				var nowInfo = {
					lid: len + 1,
					unm: this.userz,
					pwd: this.userm,
					attack: "3",
					health: "100",
					username: this.username
				}
				userInfo = JSON.stringify(userInfo);
				nowInfo = JSON.stringify(nowInfo);
				localStorage.setItem("account", userInfo);
				localStorage.setItem("nowInfo", nowInfo);
				this.$router.push({
					path: "/main/",
					name: "main", //"要跳转的路径的 name,在 router 文件夹下的 index.js 文件内找",
					query: {
						username: this.username,
						userid: this.userz
					}
				});
=======
				});
				userInfo = JSON.stringify(userInfo);
				localStorage.setItem("account", userInfo);
				this.$router.replace("/main");
>>>>>>> 4efdfd7cfa65fda6cff42bb443081b2169dbe843
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