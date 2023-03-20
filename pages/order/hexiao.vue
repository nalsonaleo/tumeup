<template>
	<view class="page_box">
		<view>
			<view class="head_box">
				<view class="flex-sub x-f" style="padding: 20rpx 30rpx;background: #fff;">
					<image :src="info.u_img" style="width: 100rpx;height: 100rpx;border-radius: 100%;"></image>
					<view style="margin-left: 30rpx;">
						<view style="font-weight: 500;font-size: 34rpx;">{{ info.u_name }}</view>
						<view>{{ info.u_phone }}</view>
					</view>
				</view>
			</view>
			
			<view class="goods-list" v-for="(g, index) in info.data" :key="index">
				<shopro-mini-card :detail="g" :sku="g.sku_price" :type="'sku'">
					<block slot="goodsBottom">
						<view class="goods-price x-bc">
							<view class="">
								<text v-if="g.o_type == 3">{{ g.o_unit_integral3 }}金豆+</text>
								<text>￥{{ g.sku_price ? g.sku_price : g.o_unit_price }}</text>
							</view>
							<text class="goods-num">x{{ g.o_num }}</text>
						</view>
					</block>
				</shopro-mini-card>
			</view>
			
			<!-- 订单信息 -->
			<view class="notice-box">
				<view class="notice-box__head">{{$t("order.hexiao.ddxx")}}</view>
				<view class="notice-box__content">
					<view class="notice-item--center x-f">
						<text class="title">{{$t("order.hexiao.ddbh")}}：</text>
						<text class="detail">{{ info.o_no }}</text>
						<!-- <button class="cu-btn copy-btn" @tap="onCopy(orderDetail.o_no)">复制</button> -->
					</view>
					<view class="notice-item x-f" v-if="info.o_yh_price > 0">
						<text class="title">{{$t("order.hexiao.yyh")}}：</text>
						<text class="detail">{{ info.o_yh_price }}</text>
					</view>
					<view class="notice-item x-f">
						<text class="title">{{$t("order.hexiao.hhm")}}：</text>
						<text class="detail">{{ info.hx_code }}</text>
					</view>
					<view class="notice-item x-f">
						<text class="title">{{$t("order.hexiao.xdsj")}}：</text>
						<text class="detail">{{ info.o_addtime }}</text>
					</view>
				</view>
			</view>
			
		</view>
		
		<view class="foot_box x-f">
			<text class="num">
				{{$t("order.hexiao.gong")}}
				<text>{{ info.o_total_num }}</text>
				{{$t("order.hexiao.jie")}}
			</text>
			<view class="all-money">
				<text>{{$t("order.hexiao.heji")}}：</text>
				<text class="price">￥{{ info.o_total_price }}</text>
			</view>
			<button class="cu-btn sub-btn" @tap="subOrder">{{$t("order.hexiao.qrhx")}}</button>
		</view>
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
			hx_code: '',
			info: {}
		};
	},
	onLoad(options) {
		var that = this;
		that.hx_code = options.hx_code;
		// that.hx_code =  'HL8PD1MK73';
		that.orderInfo();
	},
	methods: {
		// 提交订单
		subOrder() {
			let that = this;
			var data = {
				uid: uni.getStorageSync('p_uid'),
				token: uni.getStorageSync('p_token'),
				hx_code: that.hx_code
			};
			that.$api.hexiao(data).then(res => {
				that.$msg(res.msg)
				if (res.code == 1) {
					setTimeout(function(){
						uni.switchTab({
							url:'/pages/index/user'
						})
					},800)
				}
			});
		},

		// 订单信息
		orderInfo() {
			var that = this;
			var data = {
				uid: uni.getStorageSync('p_uid'),
				token: uni.getStorageSync('p_token'),
				hx_code: that.hx_code
			};
			that.$api.no_order(data).then(res => {
				if (res.code == 0) {
					that.$msg(res.msg);
					setTimeout(function(){
						uni.switchTab({
							url:'/pages/index/user'
						})
					},800)
				}
				if (res.code == 1) {
					that.info = res.data;
				}
			});
		}
	}
};
</script>

<style lang="scss">
// 收货信息、订单信息。
.notice-box {
	background: #fff;
	margin-bottom: 20rpx;
	.notice-box__head {
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(51, 51, 51, 1);
		line-height: 80rpx;
		border-bottom: 1rpx solid #dfdfdf;
		padding: 0 25rpx;
	}
	.notice-box__content {
		padding: 25rpx;
		.self-pickup-box {
			width: 100%;
			.self-pickup--img {
				width: 200rpx;
				height: 200rpx;
				margin: 40rpx 0;
			}
		}
	}
	.notice-item--center {
		margin-bottom: 10rpx;
	}
	.notice-item,
	.notice-item--center {
		margin-bottom: 10rpx;
		align-items: flex-start;
		.title {
			font-size: 28rpx;
			color: #999;
			text-align: justify;
			text-align-last: justify;
			text-justify: distribute-all-lines;
			width: 140rpx;
		}

		.detail {
			font-size: 28rpx;
			color: #333;
			flex: 1;
		}
		.copy-btn {
			width: 120rpx;
			height: 50rpx;
			// border: 1rpx solid rgba(223, 223, 223, 1);
			// border-radius: 25rpx;
			padding: 0;
			background: #fff;
			color: $zhuse;
			font-size: 26rpx;
			margin-left: 30rpx;
		}
	}
	.notice-item--center {
		align-items: center;
	}
}

.goods-radio {
	transform: scale(0.66);
	margin-right: 10rpx;
	// background:  #E9B564;
}
.add-address-box {
	height: 100rpx;
	background: #fff;
	position: relative;
	.address-bg {
		position: absolute;
		bottom: 0;
		height: 8rpx;
		width: 100%;
	}
	.select-notice {
		font-weight: 400;
		color: rgba(153, 153, 153, 1);
		line-height: 40rpx;
	}
}
.address-list {
	padding: 40rpx;
	background: #fff;
	position: relative;
	.address-bg {
		position: absolute;
		bottom: 0;
		height: 8rpx;
		width: 750rpx;
		left: 50%;
		transform: translateX(-50%);
	}
	.name,
	.phone {
		font-size: 30rpx;
		font-weight: 500;
	}
	.phone {
		margin: 0 20rpx;
	}
	.tag {
		background: rgba(239, 58, 58, 0.2);
		border-radius: 6rpx;
		padding: 0 16rpx;
		line-height: 38rpx;
		color: #a8700d;
		font-size: 22rpx;
	}
	.detail {
		.address {
			margin-top: 25rpx;
			width: 543rpx;
			font-size: 26rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: rgba(153, 153, 153, 1);
			line-height: 40rpx;
		}
	}
}
.goods-list {
	padding: 30rpx 20rpx;
	background: #fff;
	margin: 20rpx 0;
	position: relative;
	/deep/ .goods-title {
		width: 460rpx !important;
	}
	.tag-box {
		padding-top: 10rpx;
		.tag1 {
			line-height: 36rpx;
			padding: 0 8rpx;
			font-size: 18rpx;
			color: rgba(#fff, 0.9);
			background: #f39800;
			display: inline-block;
			box-sizing: border-box;
		}
		.tag2 {
			line-height: 34rpx;
			padding: 0 8rpx;
			font-size: 18rpx;
			color: rgba(#f39800, 0.9);
			background: #fff;
			border: 1rpx solid #f39800;
			display: inline-block;
			box-sizing: border-box;
		}
	}
	.goods-price {
		font-size: 30rpx;
		font-weight: 500;
		width: 480rpx;
		.goods-num {
			font-size: 28rpx;
			color: #c4c4c4;
		}
	}
	.goods-radio {
		transform: scale(0.7);
		margin-right: 20rpx;
	}
}
.item-list {
	height: 100rpx;
	background: #fff;
	padding: 0 25rpx;
	.item-title {
		font-size: 28rpx;
		margin-right: 20rpx;
	}
	.detail {
		font-size: 28rpx;
		color: #c4c4c4;
	}

	.price {
		font-size: 28rpx;
		color: $zhuse;
		margin-right: 20rpx;
	}
	.sel-coupon {
		font-size: 26rpx;
		color: #c4c4c4;
		margin-right: 20rpx;
	}
}
.remark-box {
	margin-bottom: 20rpx;
	background: #fff;
	padding: 25rpx;
	.remark-notice {
		font-size: 24rpx;
		color: #c4c4c4;
		padding: 0 20rpx;
	}
	.remark-inp {
		width: 700rpx;
		font-size: 28rpx;
		padding: 20rpx;
		height: 200rpx;
		background: #f5f5f5;
		border-radius: 20rpx;
		margin-top: 25rpx;
	}
}
.logistic,
.price-box,
.score {
	border-top: 1rpx solid rgba(#dfdfdf, 0.5);
	margin-bottom: 20rpx;
}
.foot_box {
	height: 100rpx;
	padding: 0 25rpx;
	justify-content: flex-end;
	background-color: #fff;
	.num {
		font-size: 26rpx;
		color: #999;
		text {
			color: $zhuse;
			font-weight: 500;
		}
	}
	.all-money {
		margin: 0 60rpx 0 20rpx;
		.price {
			color: $zhuse;
			font-weight: 500;
		}
	}
	.sub-btn {
		width: 210rpx;
		height: 70rpx;
		background: $zhuse;
		box-shadow: 0px 7rpx 6rpx 0px rgba(239, 58, 58, 0.22);
		// background: linear-gradient(90deg, rgba(233, 180, 97, 1), rgba(238, 204, 137, 1));
		// box-shadow: 0px 7rpx 6rpx 0px rgba(229, 138, 0, 0.22);
		border-radius: 35rpx;
		font-size: 28rpx;
		color: #fff;
	}
}
</style>
