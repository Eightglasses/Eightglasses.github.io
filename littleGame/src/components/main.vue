<template>
	<div class="login">
		<navBar title="home"></navBar>
		<shadowdiv>
			<div slot="modeldiv">
				<p>勇士输入你的大名</p>
				<input type="text"/>
			</div>
		</shadowdiv>
	</div>
</template>

<script>
	import navBar from '@/components/navbar'
	import shadowdiv from '@/components/shadowdiv'
	export default {
		name: '',
		data() {
			return {
				
			}
		},
		methods:{
			
		},
		components: {
			'navBar': navBar,
			'shadowdiv':shadowdiv
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	input{
		height:0.5rem;line-height:0.5rem;
	}
</style>