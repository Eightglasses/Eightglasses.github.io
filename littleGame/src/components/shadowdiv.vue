<template>
	<div class="shadow" v-show="isShow">

		<div class="shadowbox">
			<div class="close"><span @click="close">X</span></div>
			<slot name="modeldiv">

			</slot>
			<div><input class="shadowOk" type="button" value="确定" /></div>
		</div>

	</div>
</template>

<script>
	export default {
		name: '',
		props: ['letter'],
		data() {
			return {
				isShow: true
			}
		},
		methods: {
			close() {
				this.isShow = false
			}
		},
		components: {

		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.shadow {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		flex-direction: row
	}
	
	.close {
		display: flex;flex-direction: column;align-items: flex-end;width: 100%;
	}
	.close span{margin-right: 1rem;}
	
	.shadow .shadowbox {
		position: absolute;
		height: auto;
		width: 90%;
		background: #F1F1F1;
		border-radius: 0.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		font-size: 0.4rem;
		padding: 0.5rem 0;
		margin-top: 2rem;
	}
	
	.shadowOk {
		margin: 0.3rem 0 0 0;
		width: 2rem;
		height: 0.7rem;
	}
</style>