<template>
	<div class="register">
		<navbar title="赶紧注册体验一下这个渣渣游戏吧"></navbar>
		<form>
			<ul>
				<li><input type="text" placeholder="帐号" v-model="userz" /></li>
				<li><input type="password" placeholder="密码" v-model="userm" /></li>
				<li><input type="password" placeholder="确认密码" v-model="usermm" /></li>
			</ul>
			<div><input type="button" v-on:click="regist" value="注册" /></div>
		</form>
	</div>
</template>

<script>
	import navBar from '@/components/navbar';
	export default {
		name: '',
		data() {
			return {
				"userm": '',
				'userz': '',
				'usermm': ''
			}
		},
		components: {
			'navbar': navBar
		},
		methods: {
			regist() {
				if(this.userm != this.usermm){
					alert('请确认密码');
				}
				var localuserz = localStorage.getItem(this.userz)
				if(localuserz){
					alert('帐号已存在，请重新输入');
					return;
				}
				localStorage.setItem(this.userz, this.userm);
				
				
			}

		}
	}
</script>

<style scoped>
	ul {}
	
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
		color: #007AFF;
	}
</style>