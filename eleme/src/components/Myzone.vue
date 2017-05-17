<template>
	<div class="myzone">
		<navTitle title='个人中心'></navTitle>
		<div class="myzone-top">
			<div class="myzone-info clearfix">
				<img src="../../static/img/myzone-user.jpeg" />
				<div class="myzone-user">
					<h3>张三四</h3>
					<p>13312312312</p>
				</div>
			</div>
		</div>
		<div class="three-lan">
			<a>
				<p><span class="three-lan1">0.00</span><span>元</span></p>
				<span class="three-lan-span">余额</span>
			</a>
			<a>
				<p><span class="three-lan2">3</span><span>个</span></p>
				<span class="three-lan-span">优惠卷</span>
			</a>
			<a>
				<p><span class="three-lan3">1234</span><span>分</span></p>
				<span class="three-lan-span">积分</span>
			</a>
		</div>
		<div class="myzone-list">
			<router-link to="/Order">
				<div class="myzonelist">
					<span class="v-md">我的订单</span>
				</div>
			</router-link>
			<div class="myzonelist">
				<span class="v-md">积分商城</span>
			</div>
			<div class="myzonelist">
				<span class="v-md">饿了么会员卡</span>
			</div>
			<div class="myzonelist">
				<span class="v-md">服务中心</span>
			</div>
			<div class="myzonelist">
				<span class="v-md">下载饿了么app</span>
			</div>
		</div>

	</div>

</template>

<script>
	import navTitle from '@/components/navbar'
	export default {

		components: {
			'navTitle': navTitle
		},
		methods: {

		}
	}
</script>

<style>
	.v-md {
		font-size: .7rem;
	}
	
	.myzone-list {
		margin-top: 1rem;
	}
	
	.myzonelist:nth-of-type(2) {
		margin-bottom: 1rem;
	}
	
	.myzonelist {
		text-align: left;
		border-top: 1px solid #dedede;
		background: #fff;
		font-size: 0.8rem;
		padding: .3rem 1rem;
	}
	
	.myzone-top {
		background: #0097ff;
		margin-top: 2rem;
		border-top: 1px solid #F4F4F4;
	}
	
	.myzone-top img {
		width: 2rem;
		height: 2rem;
	}
	
	.myzone-info {
		padding: 1rem;
		display: flex;
		align-items: center
	}
	
	.myzone-user {
		margin-left: 1rem;
	}
	
	.myzone-user h3 {
		font-size: 0.8rem;
		color: #fff;
		text-align: left;
	}
	
	.myzone-user p {
		font-size: 0.7rem;
		color: #fff;
	}
	
	.three-lan {
		display: flex;
		text-align: center;
	}
	
	.three-lan a {
		flex: 1;
		align-items: center;
		background: #FFFFFF;
	}
	
	.three-lan a:nth-of-type(2) {
		border-left: 1px solid rgb(221, 221, 221);
		border-right: 1px solid rgb(221, 221, 221);
	}
	
	.three-lan1 {
		color: rgb(255, 153, 0);
	}
	
	.three-lan2 {
		color: rgb(255, 95, 62);
	}
	
	.three-lan3 {
		color: rgb(106, 194, 11);
	}
	
	.three-lan p {
		padding-top: 0.3rem;
	}
	
	.three-lan a p span:nth-of-type(1) {
		font-size: 1rem;
		font-weight: bold;
	}
	
	.three-lan a p span:nth-of-type(2) {
		font-size: 0.6rem;
	}
	
	.three-lan-span {
		font-size: 0.5rem;
	}
</style>