<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		name: 'app'
	}
</script>
	
<style>
	
	#app {
		font-family: '微软雅黑';
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		/*margin-top: 2rem;*/
	}
	
	.clearfix:after {
		content: ".";
		display: block;
		height: 0;
		clear: both;
		visibility: hidden;
	}
	
	.clearfix {
		*zoom: 1;
	}
	body,
div,
dl,
dt,
dd,
ul,
ol,
li,
h1,
h2,
h3,
h4,
h5,
h6,
pre,
code,
form,
fieldset,
legend,
input,
button,
textarea,
p,
blockquote,
th,
td,
a,
img {
	margin: 0;
	padding: 0;
}


</style>