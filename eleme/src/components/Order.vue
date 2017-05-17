<template>
	<div class="ele-order">
		<navTitle title='订单中心'></navTitle>
		<div class="order-list">
			<div v-for=" (item, index) in falseOrder" class="order-forlist">
				<div class="order-forlist-img">
					<img src="../../static/img/shop-logo.png" />
				</div>
				<div class="order-forlist-status">
					<div>
						<p>{{item.store_name}}</p>
						<span>{{item.order_state}}</span>
					</div>
					<p class="order-forlist-status-time">
						{{item.order_birth_time}}
					</p>
					<div class="order-forlist-status-money">
						<p>{{item.order_brief_info}}</p>
						<span>￥{{item.order_price}}</span>
					</div>
				</div>
			</div>

		</div>

	</div>

</template>

<script>
	import navTitle from '@/components/navbar';

	export default {

		components: {
			'navTitle': navTitle,
		},
		methods: {

		},
		computed: {

		},
		data: function() {
			return {
				falseOrder: [{
						'restaurant_id': 's10001',
						'img_src': '',
						'store_name': '上沙麦当劳',
						'order_birth_time': '2017-02-17 18:36',
						'order_state': '订单已完成',
						'order_content': {},
						'order_brief_info': '麦香鸡腿堡',
						'order_price': 22.9
					},
					{
						'restaurant_id': 's10001',
						'img_src': '',
						'store_name': '下沙麦当劳',
						'order_birth_time': '2017-02-17 18:43',
						'order_state': '订单已完成',
						'order_content': {},
						'order_brief_info': '七虾堡等2件商品',
						'order_price': 20
					},
					{
						'restaurant_id': 's10001',
						'img_src': '',
						'store_name': '沙嘴麦当劳',
						'order_birth_time': '2017-02-17 18:45',
						'order_state': '订单已完成',
						'order_content': {},
						'order_brief_info': '麦香鸡腿堡等2件商品',
						'order_price': 23
					},
					{
						'restaurant_id': 's10001',
						'img_src': '',
						'store_name': '沙尾麦当劳',
						'order_birth_time': '2017-02-17 18:55',
						'order_state': '订单已完成',
						'order_content': {},
						'order_brief_info': '薯条等3件商品',
						'order_price': 31.9
					},
					{
						'restaurant_id': 's10001',
						'img_src': '',
						'store_name': '沙头麦当劳',
						'order_birth_time': '2017-02-17 17:36',
						'order_state': '订单已完成',
						'order_content': {},
						'order_brief_info': '麦香鸡腿堡',
						'order_price': 22.9
					}
				]
			}
		}
	}
	
	
</script>

<style>
	.order-list {
		margin-top: 2rem;
	}
	
	.order-forlist {
		background: #fff;
		margin-bottom: 5px;
		display: flex;
	}
	
	.order-forlist-img {
		width: 1.5rem;
		height: 1.5rem;
		padding: .4rem;
	}
	
	.order-forlist-img img {
		display: block;
		width: 100%;
		height: 100%;
	}
	
	.order-forlist-status {
		font-size: .7rem;
		flex: 1;
		padding: 0.4rem;
	}
	
	.order-forlist-status div:nth-of-type(1) {
		display: flex;
		justify-content: space-between;
	}
	
	.order-forlist-status div:nth-of-type(1) span {
		font-size: 0.5rem;
	}
	
	.order-forlist-status-time {
		font-size: 0.35rem;
		color: #999;
		padding: 0.15rem 0;
		border-bottom: 1px solid #ccc;
	}
	
	.order-forlist-status-money {
		display: flex;
		justify-content: space-between;
		padding: 0.2rem 0;
		font-size: 0.65rem;
	}
	
	.order-forlist-status-money p {
		color: #666;
	}
	
	.order-forlist-status-money span {
		color: red;
	}
</style>