<template>
	<div class="dungeons-list">
		<navBar title="选择副本"></navBar>
		<ul class="fb-list">
			<li v-for="item in totalfb" :index="item" v-on:click="chosefb($event,item)">第{{item}}关</li>
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
				totalfb: 9,
				nandu: ''
			}
		},
		components: {
			navBar: navBar,
			shadowdiv: shadowdiv
		},
		methods: {
			chosefb(event,num) {
				let guanKa = num;
				this.$router.push({
					path:'/Dungeons',
					name:'Dungeons',
					query:{
						guanka:num,
						nandu:this.nandu
					}
				})
			}
		},
		mounted: function() {
			this.nandu = this.$route.query.nandu;
		}
	}
</script>

<style>
	input {
		height: 0.5rem;
		line-height: 0.5rem;
	}
	p {
		margin-left: 1rem;
	}
	.name {
		margin: 1rem;
	}
	.fb-list {
		margin: 1rem;
	}
	li {
		padding-bottom: 0.3rem;
	}
</style>