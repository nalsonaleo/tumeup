<template>
	<view class="page_box">
		<view class="head_box">
			<cu-custom :isBack="true">
				<block slot="backText">{{$t("order.groupon.myGroupon.yhqxq")}}</block>
				<block slot="content"></block>
			</cu-custom>
		</view>
		<view class="content_box">
			<scroll-view class="scroll-box" scroll-y="true" scroll-with-animation enable-back-to-top :scroll-into-view="scrollId" @scroll="onScroll">
				<view class="coupon-box">
					<view class="top y-f">
						<view class="img-box x-c"><image class="coupon-img" src="http://shopro.7wpp.com/imgs/coupon.png" mode=""></image></view>
						<view class="title">{{ couponDetail.amount }}{{$t("order.groupon.myGroupon.yyhq")}}</view>
						<view class="tip">{{$t("order.groupon.myGroupon.man")}}{{ couponDetail.enough }}{{$t("order.groupon.myGroupon.yky")}}</view>
						<button class="cu-btn use-btn" @tap="goScroll">{{state===2?$t("app.coupon.detail.ysy"):$t("app.coupon.detail.ljsy")}}</button>
						<button class="cu-btn fail-btn" v-if="couponGoods.usetimeend - nowTime <= 0">{{$t("app.coupon.detail.ysx")}}</button>
						<view class="time" v-if="couponDetail.usetime">
							{{$t("app.coupon.detail.yxq")}}：{{ tools.timestamp(couponDetail.usetime.start) }} {{$t("app.coupon.detail.zhi")}} {{ tools.timestamp(couponDetail.usetime.end) }}
						</view>
					</view>
					<view class="bottom y-start">
						<view class="notice-item y-start">
							<view class="notice-title">{{$t("app.coupon.detail.yjqsm")}}</view>
							<text class="notice-detail">{{ couponDetail.description }}</text>
						</view>
					</view>
				</view>
				<view class="coupon-goods" v-if="couponGoods.length">
					<view class="coupon-goods-title x-f" id="couponGoods">{{$t("app.coupon.detail.sysp")}}</view>
					<view class="goods-list" v-for="goods in couponGoods" :key="goods.id"><shopro-mini-card :detail="goods"></shopro-mini-card></view>
				</view>
			</scroll-view>
		</view>
		<view class="foot_box"></view>
	</view>
</template>

<script>
import shoproMiniCard from '@/components/goods/shopro-mini-card.vue';
export default {
	components: {
		shoproMiniCard
	},
	data() {
		return {
			couponDetail: {},
			tools: this.$tools,
			couponGoods: [],
			scrollId: '',
			nowTime: new Date().getTime(),
			state:0
		};
	},
	computed: {},
	onLoad() {
		this.state = this.$Route.query.state;
		this.getCouponDetail();
		this.getCouponGoods();
	},
	methods: {
		// 优惠券详情
		getCouponDetail() {
			let that = this;
			that.$api('coupons.detail', {
				id: that.$Route.query.couponId
			}).then(res => {
				if (res.code === 1) {
					that.couponDetail = res.data;
					let useTime = res.data.usetimeend;
				}
			});
		},
		// 适用商品
		getCouponGoods() {
			let that = this;
			that.$api('coupons.goods', {
				id: that.$Route.query.couponId
			}).then(res => {
				if (res.code === 1) {
					that.couponGoods = res.data.data;
				}
			});
		},
		onScroll() {
			this.scrollId = '';
		},
		goScroll() {
			this.scrollId = 'couponGoods';
		}
	}
};
</script>

<style lang="scss">
.page_box {
	background: linear-gradient(180deg, rgba(240, 199, 133, 1), rgba(246, 214, 157, 1));
}
.coupon-box {
	margin: 100rpx 30rpx 0;
	background: #fff;
	border-radius: 20rpx;
	.top {
		border-radius: 20rpx 20rpx 0 0;
		background-image: radial-gradient(circle at bottom left, #f0c785, #f0c785 16rpx, transparent 17rpx),
			radial-gradient(circle at bottom right, #f0c785, #f0c785 16rpx, transparent 17rpx);
		padding: 110rpx 0 40rpx 0;
		border-bottom: 1rpx dashed #f3ce90;
		position: relative;
		.img-box {
			width: 140rpx;
			height: 140rpx;
			border-radius: 50%;
			background: #fff;
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
			top: -70rpx;
			.coupon-img {
				width: 100rpx;
				height: 100rpx;
			}
		}
		.title {
			font-size: 40rpx;
			font-weight: bold;
			line-height: 40rpx;
			margin-bottom: 30rpx;
		}
		.tip {
			font-size: 28rpx;
			font-weight: 500;
			margin-bottom: 50rpx;
		}
		.use-btn {
			width: 386rpx;
			height: 80rpx;
			background: linear-gradient(90deg, rgba(240, 199, 133, 1), rgba(246, 214, 157, 1));
			border-radius: 40rpx;
			color: rgba(#fff, 0.9);
			margin-bottom: 30rpx;
		}
		.fail-btn {
			width: 386rpx;
			height: 80rpx;
			background: rgba(245, 245, 245, 1);
			border-radius: 40rpx;
			font-size: 30rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: rgba(188, 188, 188, 1);
			margin-bottom: 30rpx;
		}
		.time {
			color: #999;
			font-size: 26rpx;
		}
	}
	.bottom {
		border-radius: 0 0 20rpx 20rpx;
		background-image: radial-gradient(circle at top left, #f0c785, #f0c785 16rpx, transparent 17rpx),
			radial-gradient(circle at top right, #f0c785, #f0c785 16rpx, transparent 17rpx);
		padding: 40rpx 30rpx;
		.notice-item {
			border-bottom: 1rpx solid #eeeeee;
			height: 90rpx;
			width: 100%;
			.notice-title {
				font-weight: 500;
				font-size: 26rpx;
			}
			.notice-detail {
				font-size: 24rpx;
				color: #666;
				margin-top: 10rpx;
			}
		}
	}
}
// 优惠券商品
.coupon-goods {
	background: #fff;
	margin: 20rpx;
	padding: 20rpx;
	border-radius: 20rpx;
	/deep/.goods-title {
		width: 420rpx;
	}
	.goods-list {
		padding: 20rpx 0;
		border-bottom: 1rpx solid rgba(223, 223, 223, 0.5);
	}
	.coupon-goods-title {
		font-size: 30rpx;
		font-weight: bold;
		height: 80rpx;
	}
}
</style>
