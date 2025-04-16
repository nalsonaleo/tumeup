<template>
	<view class="page_box">
		<view class="head_box"></view>
		<view class="content_box">
			<view class="detail-head">
				<view class="state-box x-f">
					<image class="state-img" src="/static/imgs/order_state1.png" mode=""></image>
					<text v-if="orderDetail.o_exchange == 0 && orderDetail.o_type !=4">{{ orderStatus[orderDetail.o_status] }}</text>
					<text class="state" v-else>{{orderDetail.o_exchange == 1?$t("user.order.list.refund"):$t("user.order.list.refunded")}}</text>
				</view>
			</view>
			<view class="detail-goods">
				<!-- 订单信息 -->
				<view class="order-list">
					<view v-for="item in orderDetail.data" :key='item.id' style="border-bottom: 20upx solid #f5f5f5;padding: 0 20rpx;">
						<view class="goods-box x-start" style="padding: 30upx 0; border-bottom: 1px solid #f6f6f6;" >
							<image class="goods-img" :src="item.g_img" mode=""></image>
							<view class="y-start">
								<view class="goods-title more-t">{{ item.g_name }}</view>
								<view class="size-tip">{{ item.sku_name }}</view>
								<view class="order-goods flex align-center justify-between">
									<text class="order-price"><text v-if="item.o_type==3">{{item.o_t_integral3}}{{$t("order.commomPtOrder.detail.jd")}}+</text> {{$t('money.symbol')}} {{parseFloat(item.o_unit_price)}}</text>
									<text class="order-num">x{{ item.o_num }}</text>
								</view>
							</view>
						</view>
						
						<view class="order-bottom  x-f" v-if="(item.o_status == 3  || item.o_status == 1)  && orderDetail.o_type == 2">
							<view class="btn-box">
								
								<button @tap.stop="onComment(item.id,orderDetail.id)" class="cu-btn btn1" v-if="item.o_status == 3">
									{{$t("order.commomPtOrder.detail.qpj")}}
								</button>
							</view>
						</view>
					</view>
				
					<view class="order-bottom  x-f" style="margin-top: -20upx;margin-bottom: 20upx;" >
						<view class="btn-box" >
							<button class="cu-btn btn2"  v-if="orderDetail.o_status == 0" @tap.stop="onPay(orderDetail.id, orderDetail.o_total_price)">
								{{$t("order.commomPtOrder.detail.ljfk")}}
							</button>
							<button class="cu-btn btn1"  v-if="orderDetail.o_status == 0" @tap.stop="onCancel(orderDetail.id)">
								{{$t("order.commomPtOrder.detail.qxdd")}}
							</button>
							<button class="cu-btn btn1"  v-if="orderDetail.o_status == 2" @tap.stop="checkExpress(orderDetail.id)">
								{{$t("order.commomPtOrder.detail.ckwl")}}
							</button>
							<button @tap.stop="onConfirm(orderDetail.id)" class="cu-btn btn2" v-if="orderDetail.o_status == 2">
								{{$t("order.commomPtOrder.detail.qrsh")}}
							</button>
							<button @tap.stop="onRefund(orderDetail.id)" class="cu-btn btn2" v-if="orderDetail.o_status == 1">
							{{orderDetail.o_exchange == 0 ? $t("order.commomPtOrder.detail.Request.refund"):$t("user.order.list.refund")}}
								
							</button>
						</view>
					</view>
				</view>
			</view>
			<!-- 收货信息 -->
			<view class="notice-box" v-if="orderDetail.is_express == 1">
				<view class="notice-box__head">{{$t("order.commomPtOrder.detail.shxx")}}</view>
				<view class="notice-box__content">
					<view class="x-f notice-item">
						<text class="title">{{$t("order.commomPtOrder.detail.shr")}}：</text>
						<text class="detail">{{ orderDetail.a_name }} {{ orderDetail.a_phone }}</text>
					</view>
					<view class="x-f notice-item">
						<text class="title">{{$t("order.commomPtOrder.detail.shdz")}}：</text>
						<text class="detail">{{ orderDetail.a_address }}</text>
					</view>
				</view>
			</view>
			<!-- 配送信息 -->
			<view class="notice-box" v-if="orderDetail.express_num">
				<view class="notice-box__head">{{$t("order.commomPtOrder.detail.kdxx")}}</view>
				<view class="notice-box__content">
					<view class="x-f notice-item--center">
						<text class="title">{{$t("order.commomPtOrder.detail.kdgs")}}：</text>
						<text class="detail">{{ orderDetail.express_name }}</text>
					</view>
					<view class="x-f notice-item">
						<text class="title">{{$t("order.commomPtOrder.detail.kddh")}}：</text>
						<text class="detail">{{ orderDetail.express_num }}</text>
					</view>
				</view>
			</view>
			
			<!-- 订单信息 -->
			<view class="notice-box">
				<view class="notice-box__head">{{$t("order.commomPtOrder.detail.ddxx")}}</view>
				<view class="notice-box__content">
					<view class="notice-item--center x-f">
						<text class="title">{{$t("order.commomPtOrder.detail.ddbh")}}：</text>
						<text class="detail">{{ orderDetail.o_no }}</text>
						<button class="cu-btn copy-btn" @tap="onCopy(orderDetail.o_no)">{{$t("order.commomPtOrder.detail.copy")}}</button>
					</view>
					<view class="notice-item--center x-f" v-if="orderDetail.hx_code && orderDetail.is_express == 2">
						<text class="title">{{$t("order.commomPtOrder.detail.hxm")}}：</text>
						<text class="detail">{{ orderDetail.hx_code }}</text>
						<button class="cu-btn copy-btn" v-if="orderDetail.o_status == 1" @tap="onCopy(orderDetail.hx_code)">{{$t("order.commomPtOrder.detail.fz")}}</button>
						<text class="cu-btn copy-btn" v-if="orderDetail.o_status != 1">{{$t("order.commomPtOrder.detail.ysy")}}</text>
					</view>
					<view class="notice-item x-f">
						<text class="title">{{$t("order.commomPtOrder.detail.xdsj")}}：</text>
						<text class="detail">{{ orderDetail.o_addtime }}</text>
					</view>
					<view class="notice-item x-f" v-if="orderDetail.hx_code && orderDetail.o_status == 1  && orderDetail.is_express == 2">
						<text class="title">{{$t("order.commomPtOrder.detail.hxm")}}：</text>
						<image :src="codeImg" style="width: 260rpx;height: 260rpx;"></image>
					</view>
				</view>
			</view>
			
			<!-- 商家信息 -->
			<view class="notice-box" v-if="orderDetail.is_express == 2">
				<view class="notice-box__head">{{$t("order.commomPtOrder.detail.cjxx")}}</view>
				<view class="notice-box__content">
					<view class="notice-item--center x-f">
						<text class="title">{{$t("order.commomPtOrder.detail.name")}}：</text>
						<text class="detail">{{ storInfo.store_name }}</text>
					</view>
					<view class="notice-item--center x-f">
						<text class="title">{{$t("order.commomPtOrder.detail.dz")}}：</text>
						<text class="detail">{{ storInfo.store_address }}</text>
					</view>
					<view class="notice-item x-f">
						<text class="title">{{$t("order.commomPtOrder.detail.dh")}}：</text>
						<text class="detail">{{ storInfo.store_tell }}</text>
					</view>
				</view>
			</view>
		</view>
		
		<view class="foot_box">
			<view class="money-box x-f justify-end">
				<text class="money-title">{{$t("order.commomPtOrder.detail.gong")}}{{ orderDetail.o_total_num }}{{$t("order.commomPtOrder.detail.jsp")}} {{$t("order.commomPtOrder.detail.hj")}}:</text>
				<!-- <text class="all-price" v-if="orderDetail.o_type == 2">￥{{ orderDetail.o_total_price }}</text> -->
				<text class="all-price" v-if="orderDetail.o_type == 3">{{ orderDetail.data[0].o_t_integral3 }}{{$t("order.commomPtOrder.detail.jd3")}}+{{$t('money.symbol')}} {{ orderDetail.o_total_price }}</text>
				<text class="all-price" v-else>{{$t('money.symbol')}}{{ orderDetail.o_total_price }}</text>
			</view>
		</view>
	</view>
</template>

<script>
import shoproMiniCard from '@/components/goods/shopro-mini-card.vue';
 import h5Copy from '@/common/junyi-h5-copy/junyi-h5-copy.js'
 import QR from "@/common/utils/wxqrcode.js"
export default {
	components: {
		shoproMiniCard
	},
	data() {
		return {
			time: 0,
			order_id:'',
			orderDetail: {},
			orderStatus:[this.$t("order.commomPtOrder.detail.dfk"),this.$t("order.commomPtOrder.detail.dfh"),this.$t("order.commomPtOrder.detail.dsh"),this.$t("order.commomPtOrder.detail.ysh"),this.$t("order.commomPtOrder.detail.ywc")],
			orderStatus1:[this.$t("order.commomPtOrder.detail.dfk"),this.$t("order.commomPtOrder.detail.dct"),this.$t("order.commomPtOrder.detail.status.dsh"),this.$t("order.commomPtOrder.detail.status.ywc"),'','',this.$t("order.commomPtOrder.detail.status.ptsb"),this.$t("order.commomPtOrder.detail.status.ptcg")],
			codeImg:"",
			storInfo:{}
		};
	},
	onShow() {
		this.getOrderDetail();
	},
	onLoad(options) {
		this.order_id = options.order_id;
		this.storeInfo();
	},
	methods: {
		jump(path, parmas) {
			uni.navigateTo({
				url:path
			})
		},
		// 门店地址
		storeInfo(){
			var that = this;
			that.$api.store().then(res => {
				if (res.code == 1) {
					that.storInfo = res.data;
				}
			});
		},
		// 订单详情
		getOrderDetail() {
			let that = this;
			var data = {
				uid: uni.getStorageSync('p_uid'),
				token: uni.getStorageSync('p_token'),
				order_id: that.order_id,
			}
			that.$api.orderInfo(data).then(res => {
				if(res.code == 1){
					that.orderDetail = res.data;
					that.codeImg = QR.createQrCodeImg(this.global.baseUrl +'index.html#/pages/order/hexiao?hx_code='+res.data.hx_code, {  
					     size: parseInt(300)//二维码大小  
					})
					console.log(that.codeImg)
				}
			});
		},
		// 复制
		onCopy(code) {
			let that = this;
			// #ifdef H5
			let content = code ;// 复制内容，必须字符串，数字需要转换为字符串
			const result = h5Copy(content)
			if (result == false) {
			    that.$msg(that.$t("order.commomPtOrder.detail.status.fzsbqcs"));
			} else {
			    that.$msg(that.$t("order.commomPtOrder.detail.status.fzcg"));
			}
			// #endif
			// #ifndef H5
			uni.setClipboardData({
				data: code,
				success: function(data) {	
					that.$msg(that.$t("order.commomPtOrder.detail.status.yfzdjqb"));
				},
				fail: function(err) {},
				complete: function(res) {}
			});
			// #endif
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
					that.$msg(res.msg);
					setTimeout(function(){
						that.getOrderDetail();
					},800)
				}
			});
		},
		// 申请退款
		onRefund(id) {
			let that = this;
			var data = {
				uid:uni.getStorageSync('p_uid'),
				token:uni.getStorageSync('p_token'),
				d_id:id,
			}
			that.$api.refund(data).then(res => {
				if(res.code == 1){
					that.$msg(res.msg);
					setTimeout(function(){
						that.getOrderDetail();
					},800)
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
					that.$msg(res.msg);
					setTimeout(function(){
						uni.navigateBack()
					},800)
				}
			});
		},
		// 立即购买
		onPay(id,money) {
			var that = this;
			uni.navigateTo({
				url: `/pages/order/payment/method?orderId=${id}&total_fee=${money}`
			});	
		},
		// 待评价
		onComment(id, orderId) {
			uni.navigateTo({
				url:'/pages/order/add-comment?id='+id+'&orderId='+orderId
			})
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
	.order-goods {
		width: 480rpx;
		.order-price {
			font-size: 26rpx;
			font-family: PingFang SC;
			font-weight: 600;
			color: rgba(51, 51, 51, 1);
		}
		.order-num {
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: rgba(153, 153, 153, 1);
		}
	}
	.goods-box {
		position: relative;
		.goods-img {
			width: 200rpx;
			height: 200rpx;
			background-color: #ccc;
			margin-right: 25rpx;
		}
		.order-goods__tag {
			position: absolute;
			top: 0;
			left: 0;
			z-index: 3;
			width: 60rpx;
			height: 30rpx;
		}
		.goods-title {
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: rgba(51, 51, 51, 1);
			width: 450rpx;
			line-height: 40rpx;
		}
	
		.size-tip {
			line-height: 40rpx;
			background: #f4f4f4;
			padding: 0 16rpx;
			font-size: 24rpx;
			color: #666;
			margin: 20rpx 0;
		}
		.sub-tip {
			width: 480rpx;
			line-height: 40rpx;
			// background: #F6F2EA;
			font-size: 24rpx;
			color: #a8700d;
			margin: 10rpx 0;
		}
	
		.price {
			color: $zhuse;
		}
	}
.detail-head {
	background: linear-gradient(0deg, #66CC66 0%, $zhuse 100%) no-repeat;
	background-size: 100% 134rpx;

	.state-box {
		padding: 30rpx 40rpx;
		color: rgba(#fff, 0.9);

		.state-img {
			width: 60rpx;
			height: 60rpx;
			// background: #ccc;
			margin-right: 40rpx;
		}
	}
}

.detail-goods {
	padding: 20rpx 0 0;
	background: #fff;
	// margin-bottom: 20rpx;

	.order-list {
		.refund_msg {
			font-size: 28rpx;
			color: #999;
			flex: 1;
			text-align: left;
		}
		.order-bottom {
			background: #fff;
			padding-bottom: 20rpx;
			justify-content: flex-end;
			padding-top: 20rpx;
			.btn1 {
				width: 160rpx;
				height: 60rpx;
				border: 1rpx solid rgba(223, 223, 223, 1);
				border-radius: 30rpx;
				font-size: 26rpx;
				background: #fff;
				padding: 0;
				margin-right: 20rpx;
			}
			.btn2 {
				width: 160rpx;
				height: 60rpx;
				border: 1rpx solid $zhuse !important;
				border-radius: 30rpx;
				font-size: 26rpx;
				color: $zhuse;
				padding: 0;
				background: #fff;
				margin-right: 20rpx;
			}
		}
	}
}
// 拼团项目
.group-box {
	background: #fff;
	padding: 40rpx 0;
	height: 250rpx;
	margin-bottom: 20rpx;
	.tip-box {
		font-size: 28rpx;

		.cuIcon-roundcheckfill {
			color: #ecbe60;
			font-size: 34rpx;
			margin-right: 20rpx;
		}
	}
	.title-box {
		font-size: 26rpx;
		font-weight: bold;
		color: #333;
		.group-num {
			color: #f8002c;
		}
		.count-down-tip {
			font-size: 24rpx;
			padding-left: 10rpx;
		}
		.time-box {
			font-size: 18rpx;
			.count-text {
				display: inline-block;
				background-color: #383a46;
				color: #fff;
				font-size: 18rpx;
				border-radius: 2rpx;
				padding: 0 5rpx;
				height: 28rpx;
				text-align: center;
				line-height: 28rpx;
				margin: 0 6rpx;
			}
		}
	}

	.group-people {
		.img-box {
			position: relative;
			margin-right: 20rpx;
			.tag {
				position: absolute;
				line-height: 36rpx;
				background: linear-gradient(132deg, rgba(243, 223, 177, 1), rgba(243, 223, 177, 1), rgba(236, 190, 96, 1));
				border-radius: 18rpx;
				padding: 0 10rpx;
				white-space: nowrap;
				font-size: 24rpx;
				color: #784f06;
				z-index: 2;
				top: -10rpx;
			}
			.avatar {
				width: 80rpx;
				height: 80rpx;
				border-radius: 50%;
				background: #ccc;
			}
		}
	}
}

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
			text-align: center;
			text-align-last: right;
			width: 200rpx;
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

.foot_box {
	width: 750rpx;
	min-height: 100rpx;
	background: rgba(255, 255, 255, 1);
	border: 1rpx solid rgba(238, 238, 238, 1);
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	justify-content: center;
	.money-box {
		height: 60rpx;
		padding: 0 20rpx;
		.money-title {
			font-size: 26rpx;
			color: #999999;
		}
		.all-price {
			color: $zhuse;
			font-size: 32rpx;
		}
	}
	.btn-box {
		justify-content: flex-end;
		margin-bottom: 20rpx;
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
			background: linear-gradient(90deg, rgba(233, 180, 97, 1), rgba(238, 204, 137, 1));
			box-shadow: 0px 7rpx 6rpx 0px rgba(229, 138, 0, 0.22);
			border-radius: 30rpx;
			margin-right: 20rpx;
			font-size: 26rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: rgba(168, 112, 13, 0.9);
			padding: 0;
		}
	}
}
</style>
