<template>
	<div class="login">
		<navBar title="home"></navBar>
		<div class="name">勇士:
			<span>{{username}}</span>
		</div>
		<p class="chose">选择副本</p>
		<ul class="fb-list">
			<li v-on:click="chosefb" index="pt">普通副本</li>
			<li v-on:click="chosefb" index="yx">英雄副本</li>
		</ul>
	</div>
</template>

<script>
	import navBar from "@/components/navbar";
	import shadowdiv from "@/components/shadowdiv";
	export default {
		name: "",
		data() {
			return {
				userid: "",
				username: "",
			};
		},
		computed: {},
		methods: {
			chosefb(e) {
				var nandu = e.target.getAttribute('index');
				this.$router.push({
					path: "/Dungeons_list.vue",
					name: "Dungeons_list",
					query: {
						nandu: nandu
					}
				});
			}
		},
		components: {
			navBar: navBar,
			shadowdiv: shadowdiv
		},
		mounted: function() {
			this.userid = this.$route.query.userid;
			this.username = this.$route.query.username;
		}
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	input {
		height: 0.5rem;
		line-height: 0.5rem;
	}
	.chose{ 
		margin-left: 1rem; 
	}
	.name {
		margin: 1rem;
	}
	.fb-list {
		margin: 1rem;
	}
	li {
		padding: 0.3rem;
		border-bottom: 1px solid #E2E2E2;
	}
</style>