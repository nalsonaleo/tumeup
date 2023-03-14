<template>
	<view class="page_box">
		<view class="head_box">
			<view class="order-nav x-f">
				<view class="nav-item y-f" v-for="nav in orderState" :key="nav.id" @tap="onNav(nav.type)">
					<view class="item-title">{{ nav.title }}</view>
					<text class="nav-line" :class="{ 'line-active': orderType == nav.type }"></text>
				</view>
			</view>
		</view>
		<view class="content_box">
			<scroll-view scroll-y="true" @scrolltolower="loadMore" class="scroll-box">
			<view class="order-list" v-for="order in orderList" :key="order.id" @tap.stop="jump('/pages/order/detail?order_id='+order.id)">
				<view class="order-head x-bc">
					<text class="no">订单编号：{{ order.o_no }}</text>
					<text class="state">{{orderStatus[order.o_status]}}</text>
				</view>
				<view class="goods-order">
					<view class="order-content" style="padding-bottom: 30upx;"><shopro-mini-card :type="'order'" :detail="order"></shopro-mini-card></view>

					<view class="goods-bottom  x-f" v-if="order.o_status != 1">
						<view class="btn-box" >
							<!-- <button
								@tap.stop="jump('/pages/goods/detail/index', { id: goods.goods_id })"
								class="cu-btn btn1"
								:class="{ btn2: index + 1 === goods.btns.length }"
								v-if="btn === 'buy_again'"
							>
								再次购买
							</button> -->
							<button class="cu-btn btn2"  v-if="order.o_status == 0" @tap.stop="onPay(order.id, order.o_total_price)">
								立即付款
							</button>
							<button class="cu-btn btn1"  v-if="order.o_status == 0" @tap.stop="onCancel(order.id)">
								取消订单
							</button>
							<button class="cu-btn btn1"  v-if="order.o_status == 2" @tap.stop="checkExpress(order.id)">
								查看物流
							</button>
							<button @tap.stop="onConfirm(order.id)" class="cu-btn btn2" v-if="order.o_status == 2">
								确认收货
							</button>
							<!-- <button @tap.stop="onRefund(order.id)" class="cu-btn btn1" v-if="order.o_status == 2">
								申请退款
							</button>
							<button @tap.stop="onComment(order.id)" class="cu-btn btn1" v-if="order.o_status == 3">
								待评价
							</button> -->
						</view>
					</view>
				</view>
			
			</view>
			<!-- 空白页 -->
			<shopro-empty v-if="!orderList.length && !isLoading" :emptyData="emptyData"></shopro-empty>
			<!-- load -->
			<shoproLoad v-model="isLoading"></shoproLoad>
			</scroll-view>
			
		</view>
		<view class="foot_box"></view>
	</view>
</template>

<script>
import shoproLoad from '@/components/shopro-load/shopro-load.vue';
import shoproMiniCard from '@/components/goods/shopro-mini-card.vue';
export default {
	components: {
		shoproMiniCard,
		shoproLoad
	},
	data() {
		return {
			isLoading: true,
			orderType: -1,
			orderList: [],
			orderStatus:['待付款','待发货','待收货','待评价','已完成','售后中'],
			emptyData: {
				img: '/static/imgs/empty/empty_groupon.png',
				tip: '暂无商品，还有更多好货等着你噢~'
			},
			orderState: [
				{
					id: 0,
					title: '全部',
					type: -1
				},
				{
					id: 1,
					title: '待付款',
					type: 0
				},
				{
					id: 2,
					title: '待发货',
					type: 1
				},
				{
					id: 3,
					title: '待收货',
					type: 2
				},
				{
					id: 4,
					title: '待评价',
					type: 3
				},
				{
					id: 5,
					title: '退换货',
					type: 5
				}
			],
			page:1,
			hasMore:true,
		};
	},
	onLoad(options) {
		// this.orderType = options.type;
		this.getOrderList();
	},
	methods: {
		jump(path, parmas) {
			uni.navigateTo({
				url:path
			})
		},
		onNav(id) {
			this.orderType = id;
			this.page = 1;
			this.orderList = [];
			this.getOrderList();
		},
		getOrderList() {
			let that = this;
			that.isLoading = true;
			var data = {
				uid:uni.getStorageSync('p_uid'),
				token:uni.getStorageSync('p_token'),
				status:that.orderType,
				page:that.page,
				type:3,//2普通商品 3金豆商品
			}
			that.$api.orderList(data).then(res => {
				if(res.code == 1){
					that.isLoading = false;
					that.orderList = [...that.orderList, ...res.data];
					if (res.data.length != 0) {
						that.hasMore = true;
						that.loadStatus = '';
					} else {
						that.hasMore = false;
						that.loadStatus = 'over';
					}
				}
			});
		},
		// 加载更多
		loadMore() {
			if (this.hasMore) {
				this.page += 1;
				this.getOrderList();
			}
		},
		// 确认收货
		onConfirm(id) {
			let that = this;
			var data = {
				uid:uni.getStorageSync('p_uid'),
				token:uni.getStorageSync('p_token'),
				order_id:id,
			}
			that.$api.confirmOrder(data).then(res => {
				if(res.code == 1){
					that.page = 1;
					that.orderList = [];
					that.getOrderList();
				}
			});
		},
		// 申请退款
		onRefund(id, itemId) {
			let that = this;
			that.$api('order.refund', {
				id: id,
				order_item_id: itemId
			}).then(res => {
				if (res.code === 1) {
					that.$tools.toast('申请退款成功');
					that.getOrderList();
				}
			});
		},
		// 取消订单
		onCancel(id) {
			let that = this;
			var data = {
				uid:uni.getStorageSync('p_uid'),
				token:uni.getStorageSync('p_token'),
				order_id:id,
			}
			that.$api.delOrder(data).then(res => {
				if(res.code == 1){
					that.page = 1;
					that.orderList = [];
					that.getOrderList();
				}
			});
		},
		// 立即购买
		onPay(id,money) {
			var that = this;
			// #ifdef MP-WEIXIN
			var data = {
				uid: uni.getStorageSync('p_uid'),
				token: uni.getStorageSync('p_token'),
				order_id: id,
				pay_type: 4,
				goods_code:''
			};
			that.$api.payment(data).then(res => {
				// console.log(res)
				var info = res.data;
				uni.requestPayment({
					provider: 'wxpay',
					orderInfo: info, //微信、支付宝订单数据
					timeStamp: info.timeStamp,
					nonceStr: info.nonceStr,
					package: info.package,
					signType: info.signType,
					paySign: info.paySign,
					success: function(res) {
						that.page = 1;
						that.orderList = [];
						that.getOrderList();
					},
					fail: function(err) {
						console.log('fail:' + JSON.stringify(err));
					}
				});
			})
			// #endif
			// #ifdef H5
			uni.navigateTo({
				url: `/pages/order/payment/method?orderId=${id}&total_fee=${money}`
			});
			// #endif
			// #ifdef APP-PLUS
			uni.navigateTo({
				url: `/pages/order/payment/method?orderId=${id}&total_fee=${money}`
			});
			// #endif
			
		},
		// 待评价
		onComment(orderId, ordrderItemId) {
			this.jump('/pages/order/add-comment', { orderId: orderId, ordrderItemId: ordrderItemId });
		},
		// 查看物流,
		checkExpress(orderId) {
			uni.navigateTo({
				url:'/pages/order/express?orderId='+orderId
			})
		}
	}
};
</script>

<style lang="scss">
.order-nav {
	background: #fff;
	height: 80rpx;
	.nav-item {
		flex: 1;
		.item-title {
			font-size: 30rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: rgba(51, 51, 51, 1);
			line-height: 76rpx;
		}
		.nav-line {
			width: 100rpx;
			height: 4rpx;
			background: #fff;
		}
		.line-active {
			background: $zhuse;
		}
	}
}
.order-list {
	background: #fff;
	margin: 20rpx 0;
	.order-bottom {
		justify-content: flex-end;
		padding-bottom: 30rpx;
		.obtn1 {
			width: 160rpx;
			height: 60rpx;
			background: rgba(238, 238, 238, 1);
			border-radius: 30rpx;
			font-size: 26rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: rgba(51, 51, 51, 1);
			margin-right: 20rpx;
			padding: 0;
		}
		.obtn2 {
			width: 160rpx;
			height: 60rpx;
			background: rgba(239,58,58,0.8);
			// background: linear-gradient(90deg, rgba(233, 180, 97, 1), rgba(238, 204, 137, 1));
			box-shadow: 0px 7rpx 6rpx 0px rgba(239,58,58, 0.22);
			border-radius: 30rpx;
			margin-right: 20rpx;
			font-size: 26rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #fff;
			padding: 0;
		}
	}
	.order-head {
		padding: 0 25rpx;
		height: 77rpx;
		border-bottom: 1rpx solid #dfdfdf;
		.no {
			font-size: 26rpx;
			color: #999;
		}
		.state {
			font-size: 26rpx;
			color: $zhuse;
		}
	}
	.goods-order {
		border-bottom: 1px solid rgba(223, 223, 223, 0.5);
		padding: 20rpx 20rpx 0;
		margin-bottom: 20rpx;
	}
	.goods-bottom {
		background: #fff;
		padding-bottom: 30rpx;
		justify-content: flex-end;
		.btn-box {
			.btn1 {
				height: 60rpx;
				border: 1rpx solid rgba(223, 223, 223, 1);
				border-radius: 30rpx;
				font-size: 26rpx;
				background: #fff;
				padding: 0 20rpx;
				margin-right: 20rpx;
			}
			.btn2 {
				width: 160rpx;
				height: 60rpx;
				border: 1rpx solid $zhuse !important;
				border-radius: 30rpx;
				font-size: 26rpx;
				color: $zhuse !important;
				padding: 0;
				background: #fff;
				margin-right: 20rpx;
			}
		}
	}
}
</style>
