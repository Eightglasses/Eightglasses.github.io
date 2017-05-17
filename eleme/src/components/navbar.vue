<template>
	<!-- 我只是个头 -->
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
		width: 16rem;
		height: 2rem;
		line-height: 2rem;
		position: fixed;
		background: #0096ff;
		top: 0;
		left: 0;
		right: 0;
		z-index: 999;
	}
	
	.back_box h3 {
		color: #fff;
		width: 100%;
		font-size: .52rem;
		text-align: center;
		font-weight: 700;
		margin: 0;
		font-size: 0.7rem;
	}
	
	div.back_arrow {
		width: 2rem;
		height: 2rem;
		position: absolute;
		left: 0;
		top: 0;
		line-height: 2rem;
		color: #fff;
		font-size: 1rem;
		margin-left: 0.5rem;
	}
</style>