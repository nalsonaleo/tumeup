<template>
	<view class="success-page">
		<view class="success-box flex flex-direction align-center" v-if="orderDetail.total_fee">
			<image class="pay-img" :src="pay ? 'http://shopro.7wpp.com/imgs/pay_success.png' : 'http://shopro.7wpp.com/imgs/pay_fail.png'" mode=""></image>
			<text class="notice">{{ pay ? $t("order.payment.method.zfcg") : $t("order.payment.method.zfsb") }}</text>
			<text class="pay-money" v-if="pay && orderDetail.total_fee">￥{{ orderDetail.total_fee }}</text>
			<view class="btn-box flex justify-between">
				<block v-if="pay && orderDetail.activity_type === 'groupon' && orderDetail.ext_arr.buy_type === 'groupon'">
					<button
						class="cu-btn base-btn"
						v-if="orderDetail.ext_arr.groupon_id > 0"
						@tap="replace('/pages/activity/groupon/detail', { id: orderDetail.ext_arr.groupon_id })"
					>
						{{$t("order.payment.method.ptxq")}}
					</button>
					<button class="cu-btn base-btn" v-else @tap="replace('/pages/activity/groupon/my-groupon')">{{$t("order.payment.method.wdpt")}}</button>
				</block>

				<button class="cu-btn base-btn" v-else @tap="routerTo.pushTab('/pages/index/index')">{{$t("order.payment.method.fhsy")}}</button>
				<button class="cu-btn base-btn" @tap="onOrder">{{$t("order.payment.method.ckdd")}}</button>
				<button class="again-pay cu-btn" v-if="!pay" @tap="onPay">{{$t("order.payment.method.cxzf")}}</button>
			</view>
		</view>
		<view class="hot-box" v-if="false">
			<view class="hot-title flex align-center">{{$t("order.payment.method.wntj")}}</view>
			<view class="hot-wrap">
				<block v-for="n in 6" :key="n"><shopro-goods></shopro-goods></block>
			</view>
		</view>
	</view>
</template>

<script>
import shoproGoods from '@/components/goods/shopro-goods.vue';
// import ShoproPay from '@/common/shopro-pay';
import { mapMutations, mapActions, mapState } from 'vuex';
export default {
	components: {
		shoproGoods
	},
	data() {
		return {
			routerTo: this.$Router,
			orderDetail: {},
			pay: null
		};
	},
	computed: {},
	onLoad() {
		this.pay = +this.$Route.query.pay;
		if (this.pay) {
			this.getCartList();
		}
		this.getOrderDetail();
	},
	methods: {
		...mapActions(['getCartList']),
		jump(path, parmas) {
			this.$Router.push({
				path: path,
				query: parmas
			});
		},
		replace(path, parmas) {
			this.$Router.replace({
				path: path,
				query: parmas
			});
		},
		// 查看订单
		onOrder() {
			this.$Router.replace({
				path: '/pages/order/detail',
				query: { id: this.orderDetail.id }
			});
		},
		// 支付信息
		getOrderDetail() {
			let that = this;
			that.$api('order.detail', {
				order_sn: that.$Route.query.orderSn
			}).then(res => {
				if (res.code === 1) {
					that.orderDetail = res.data;
				}
			});
		},
		// 重新支付
		onPay() {
			let that = this;
			let pay = new ShoproPay(that.$Route.query.type, that.orderDetail);
		}
	}
};
</script>

<style lang="scss">
.success-box {
	background: #fff;
	width: 750rpx;
	padding: 40rpx 0;
	.pay-img {
		width: 128rpx;
		height: 76rpx;
	}
	.notice {
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(51, 51, 51, 1);
		line-height: 30rpx;
		margin-top: 30rpx;
	}
	.pay-money {
		font-size: 36rpx;
		color: #e1212b;
		font-weight: 600;
		margin-top: 20rpx;
	}
	.btn-box {
		margin-top: 30rpx;
		width: 660rpx;
		.base-btn {
			width: 320rpx;
			height: 70rpx;
			background: rgba(255, 255, 255, 1);
			border: 1rpx solid rgba(223, 223, 223, 0.5);
			border-radius: 35rpx;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: rgba(153, 153, 153, 1);
			padding: 0;
		}
		.again-pay {
			width: 320rpx;
			height: 70rpx;
			background: linear-gradient(90deg, rgba(233, 180, 97, 1), rgba(238, 204, 137, 1));
			box-shadow: 0px 7rpx 6rpx 0px rgba(229, 138, 0, 0.22);
			border-radius: 35rpx;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: rgba(255, 255, 255, 0.8);
			padding: 0;
		}
	}
}
.hot-box {
	background: #fff;
	padding: 20rpx;
	margin-top: 20rpx;
	.hot-title {
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(51, 51, 51, 1);
		height: 80rpx;
	}
}
</style>
