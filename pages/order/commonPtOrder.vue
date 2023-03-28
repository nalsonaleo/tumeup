<template>
	<view class="page_box">
		<view class="head_box">
			<view class="order-nav x-f">
				<view :class="{'nav-item': true, 'y-f':true, 'line-active': orderType === nav.type }" v-for="nav in orderState" :key="nav.id" @tap="onNav(nav.type)">
					<view class="item-title">{{ nav.title }}</view>
					<!-- <text class="nav-line" :class="{ 'line-active': orderType == nav.type }"></text> -->
				</view>
			</view>
		</view>
		<view class="content_box">
			<scroll-view scroll-y="true" @scrolltolower="loadMore" class="scroll-box">
			<view class="order-list" v-for="order in orderList" :key="order.id" @tap.stop="jump('/pages/order/detail?order_id='+order.id)">
				<view class="order-head x-bc">
					<text class="no">{{$t("order.commonPtOrder.orderNumber")}}：{{ order.o_no }}</text>
					<text class="state" v-if="orderType != 5">{{orderStatus[order.o_status]}}</text>
					<!-- <text class="state" v-else>{{order.o_exchange == 1?'退款中':'已退款'}}</text> -->
				</view>
				<view class="goods-order">
					<view class="order-content" ><shopro-mini-card :type="'order'" :detail="order"></shopro-mini-card></view>

					<view class="goods-bottom  x-f"  v-if="order.o_status == 2">
						<view class="btn-box" >
							
							<button @tap.stop="onConfirm(order.id)" class="cu-btn btn2">
								{{$t("order.commomPtOrder.confirmReceipt")}}
							</button>
						</view>
					</view>
					
					<view class="goods-bottom  x-f" style="margin-top: 5px;"  v-if="order.o_status == 7">
						<view class="btn-box" >
							<button class="cu-btn btn1"  @tap.stop="chargeIntegral(order.id)">
								{{$t("order.commomPtOrder.goldBeanExchange")}}
							</button>
							<button @tap.stop="tihuo(order.id)" class="cu-btn btn2">
								{{$t("order.commomPtOrder.pickUpTheGoods")}}
							</button>
						</view>
					</view>
					
				</view>
			
			</view>
			<!-- 空白页 -->
			<shopro-empty v-if="!orderList.length && !isLoading" :emptyData="emptyData"></shopro-empty>
			<!-- load -->
			<!-- <shoproLoad v-model="isLoading"></shoproLoad> -->
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
			orderStatus:['',this.$t("order.commonPtOrder.status.dtc"),this.$t("order.commonPtOrder.status.dsh"),this.$t("order.commonPtOrder.status.ywc"),'','',this.$t("order.commomPtOrder.status.ptsb"),this.$t("order.commomPtOrder.status.ptcg")],
			emptyData: {
				img: '/static/imgs/empty/empty_groupon.png',
				tip: this.$t("order.commomPtOrder.status.tips")
			},
			orderState: [
				{
					id: 0,
					title: this.$t("order.commomPtOrder.status.qb"),
					type: -1
				},
				{
					id: 1,
					title: this.$t("order.commomPtOrder.status.dfk"),
					type: 0
				},
				{
					id: 2,
					title: this.$t("order.commomPtOrder.status.ptxx"),
					type: -10
				},
				{
					id: 3,
					title: this.$t("order.commomPtOrder.status.dsh"),
					type: 2
				},
				{
					id: 4,
					title: this.$t("order.commomPtOrder.status.ywc"),
					type: 3
				},
				// {
				// 	id: 5,
				// 	title: '退款',
				// 	type: 5
				// }
			],
			page:1,
			hasMore:true,
		};
	},
	onLoad(options) {
		// this.orderType = options.type;
	},
	onShow() {
		this.page = 1;
		this.orderList = [];
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
				type:4,//1拼团订单 2普通商品 3金豆商品
			}
			that.$api.orderList(data).then(res => {
				if(res.code == 1){
					that.isLoading = false;
					that.orderList = [...that.orderList, ...res.data];
					if (res.data.length != 0) {
						that.hasMore = true;
						// that.loadStatus = '';
					} else {
						that.hasMore = false;
						// that.loadStatus = 'over';
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
		//提货
		tihuo(id) {
			let that = this;
			var data = {
				uid:uni.getStorageSync('p_uid'),
				token:uni.getStorageSync('p_token'),
				order_id:id,
			}
			that.$api.tihuo(data).then(res => {
				if(res.code == 1){
					that.page = 1;
					that.orderList = [];
					that.getOrderList();
				}
			});
		},
		//兑换金豆
		
		chargeIntegral(id) {
			let that = this;
			var data = {
				uid:uni.getStorageSync('p_uid'),
				token:uni.getStorageSync('p_token'),
				order_id:id,
			}
			that.$api.chargeIntegral(data).then(res => {
				if(res.code == 1){
					that.page = 1;
					that.orderList = [];
					that.getOrderList();
				}
			});
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
	min-height: 80rpx;
	.nav-item {
		min-width: 30rpx;
		min-height: 80rpx;
		padding: 0 10px;
		display: flex;
		justify-content: space-around;
		align-items: center;
		box-sizing: border-box;
		.item-title {
			font-size: 30rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: rgba(51, 51, 51, 1);
			display: -webkit-box;
			-webkit-line-clamp: 2;
			text-overflow: ellipsis;
			-webkit-box-orient: vertical;
			word-break: break-all;
		}
		.nav-line {
			width: 100rpx;
			height: 4rpx;
			background: #fff;
		}
	}
		.line-active {
			// background: $zhuse;
			
			border-bottom: 4rpx solid $zhuse;
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
