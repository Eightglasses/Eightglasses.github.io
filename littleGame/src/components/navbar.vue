<template>
	<div class="back_box">
		<div class="back_arrow" @click="back_one">
			< </div>
				<h3>{{title}}</h3>
		</div>
</template>

<script>
	export default {
		name: 'back_bar',
		props: ['title'],
		data() {
			return {

			};
		},
		mounted() {

		},
		computed: {

		},
		methods: {
			back_one() {
				this.$router.go(-1);
			}
		}
	};
</script>

<style>
	.back_box {
		width: 100%;
		height: 1rem;
		line-height: 1rem;
/*		position: fixed;
*/		background:rgba(70,70,70,0.9);
		top: 0;
		left: 0;
		right: 0;
		z-index: 999;
	}
	
	.back_box h3 {
		color: #fff;
		width: 100%;
		font-size:0.3rem;
		text-align: center;
		font-weight: 700;
		margin: 0;
	}
	
	div.back_arrow {
		width: 1rem;
		height: 1rem;
		position: absolute;
		left: 0;
		top: 0;
		line-height:1rem;
		color: #fff;
		font-size: 0.5rem;
		margin-left: 0.5rem;
	}
</style>