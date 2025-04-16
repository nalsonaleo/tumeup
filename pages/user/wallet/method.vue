<template>
	<view class="page_box">
		<view class="head_box"></view>
		<view class="content_box">
			<view class="y-f money-box">
				<view class="money">{{$t('money.symbol')}}{{ total_fee }}</view>
			</view>
			<radio-group @change="selPay" class="pay-box">


				<!-- 				<label class="x-bc pay-item" >
					<view class="x-f">
						<image class="pay-img" src="../../../static/imgs/wx_pay.png" mode=""></image>
						<text>{{$t("user.wallet.wxzf")}}</text>
					</view>
					<radio value="8" :class="{ checked: pay_type == 8  }" class="pay-radio orange" :checked="pay_type == 8"></radio>
				</label> -->

				<label class="x-bc pay-item" v-for='item in payTypeList' :key='item.id'>
					<view class="x-f">
						<image class="pay-img" :src="item.logo" mode=""></image>
						<!-- <text>{{$t('user.wallet.zfbzf')}}</text> -->
						<text>{{item.title}}</text>
						<text>-</text>
						<text style="color:#c7c4bf;font-size: 0.8rem;">{{item.desc}}</text>
					</view>
					<radio :value="item.type_number"
						:class="{ checked: pay_type == item.type_number  }"
						class="pay-radio orange" :checked="pay_type == item.type_number">
					</radio>
				</label>


			</radio-group>
			<view class="x-c">
				<button class="cu-btn pay-btn" @tap="confirmPay">{{$t('user.wallet.qrzf')}}
					{{$t('money.symbol')}}{{ total_fee }}</button>
			</view>
		</view>
		<view class='maskBox' v-show='maskShow' @click='maskShow = false'>

		</view>
		<view :class='{"foot_box":true, "foot_box_active": maskShow}'>
			<view class='header'>
				<text class='header-title'>USDT PAY (TRC20)</text>
			</view>
			<view class='content-image'>
				<image :src="xnbData.pic" mode=""></image>
			</view>
			<view class='input-text'>
				<view class='text-style'>{{xnbData.wallet}}</view>
			</view>
			<button class='btn'
				@click="copyText(xnbData.wallet)">{{$t('user.wallet.method.fzqbdz')}}</button>
		</view>
	</view>
</template>

<script>
	let timer;
	export default {
		data() {
			return {
				total_fee: 0,
				order_id: 0,
				pay_type: 0, //1余额 2APP微信 3APP支付宝 4公众号小程序微信
				isXcx: false,
				isWx: false,
				maskShow: false,
				payTypeList: [],
				xnbData: {
					pic: undefined,
					wallet: undefined,
				}
			};
		},

		onLoad(options) {
			// #ifdef MP-WEIXIN
			this.isXcx = true;
			this.pay_type = 8;
			// #endif
			// #ifdef H5
			// 检测是否为微信环境
			let ua = window.navigator.userAgent.toLowerCase();
			if (ua.indexOf('micromessenger') != -1) {
				this.isWx = true;
				this.pay_type = 8;
			}
			// #endif
			// console.log(options)
			this.total_fee = options.money;
			this.order_id = options.orderId;

		},
		created() {
			this.loadPayTypelist();
		},
		methods: {
			loadPayTypelist() {
				this.$api.payType().then((res) => {
					this.payTypeList = res.data;
				});
			},
			copyText(val) {
				let that = this;
				uni.setClipboardData({
					data: val,
					success() {
						uni.showToast({
							title: that.$t(
								'user.wallet.method.fzcg'),
							duration: 2000,
							icon: "none",
							position: "center"
						})
					},
					fail: () => {
						uni.showToast({
							title: that.$t(
								'user.wallet.method.fzsb'),
							duration: 2000,
							icon: "none",
							position: "bottom"
						})
					}
				})
			},
			selPay(e) {
				this.pay_type = e.detail.value;
			},
			// 发起支付
			confirmPay() {
				let that = this;
				if (that.pay_type == 9) {
					let data = {
						uid: uni.getStorageSync('p_uid'),
						token: uni.getStorageSync('p_token')
					}
					that.$api.getAddressVirtual(data).then((res) => {
						console.log(res);
						this.xnbData = res.data;
						this.maskShow = true;
					})
					return;
				}
				if (that.pay_type == 6) {
					uni.redirectTo({
						url: '/pages/user/xianxia'
					});
					return;
				}
				var data = {
					uid: uni.getStorageSync('p_uid'),
					token: uni.getStorageSync('p_token'),
					r_id: that.order_id,
					pay_type: that.pay_type,
				};
				that.$api.recharge(data).then(res => {
					if (res.code == 1) {
						if (that.pay_type == 0) {
							/*H5跳转*/
							//var url = res.data;
							var url = res.url;
							if (typeof(plus) != 'undefined') {
								plus.runtime.openURL(url, function(res) {
									console.log('Fail',
										res);
								});
							} else {
								window.open(url, "_blank");
							}
							return;
                                                        /*H5跳转结束*/
							if (uni.getSystemInfoSync().platform == 'h5') {
								// 在浏览器环境中新开一个窗口
								window.open(url);
							} else {
								plus.runtime.openURL(url, );

							}

							return;
						}
						if (that.pay_type == 4) {
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
									uni.switchTab({
										url: '/pages/index/user'
									});
								},
								fail: function(err) {
									console.log('fail:' +
										JSON
										.stringify(
											err
											)
										);
								}
							});
						}
						if (that.pay_type == 5) {
							var info = res.data;
							WeixinJSBridge.invoke(
								'getBrandWCPayRequest', {
									debug: true,
									"appId": info
									.appId, //公众号名称，由商户传入
									"timeStamp": info
									.timeStamp, //时间戳，自1970年以来的秒数
									"nonceStr": info
									.nonceStr, //随机串
									"package": info.package,
									"signType": info
									.signType, //微信签名方式：
									"paySign": info.paySign //微信签名
								},
								function(data) {
									// this.$toast({ message: JSON.stringify(data), duration: 6000 });
									if (data.err_msg ==
										"get_brand_wcpay_request:ok"
										) {
										setTimeout(function() {
											uni.switchTab({
												url: '/pages/index/user'
											});
										}, 800)
									}
								});
						}
						if (that.pay_type == 7 || that.pay_type == 8) {
							var url = res.data;
							window.location.href = url
						}
						if (that.pay_type == 2 || that.pay_type == 3) {
							//微信、支付宝订单数据
							var info = res.data;
							var provider;
							if (that.pay_type == 2) {
								provider = 'wxpay';
							} else if (that.pay_type == 3) {
								provider = 'alipay';
							}
							uni.requestPayment({
								provider: provider,
								orderInfo: info,
								success: function(res) {
									uni.redirectTo({
										url: '/pages/index/user'
									});
								},
								fail: function(err) {
									console.log('fail:' +
										JSON
										.stringify(
											err
											)
										);
								}
							});
						}

					}
				});
			},

		}
	};
</script>

<style lang="scss">
	.maskBox {
		width: 100vw;
		height: 100vh;
		position: fixed;
		background: rgba(0, 0, 0, 0.8)
	}

	.foot_box {
		width: 100%;
		position: fixed;
		bottom: -1000rpx;
		background: white;
		height: 1000rpx;
		border-radius: 20rpx 20rpx 0 0;
		overflow: hidden;

		.header {
			width: 100%;
			height: 100rpx;
			display: flex;
			align-items: center;
			justify-content: center;

			.header-title {
				font-size: 48rpx;
				color: #333;
			}
		}

		.content-image {
			width: 100%;
			margin-top: 20rpx;
			display: flex;
			justify-content: center;

			&>image {
				width: 600rpx;
				height: 600rpx;
			}
		}

		.input-text {
			width: 100%;
			position: relative;
			margin-top: 20rpx;

			.text-style {
				max-width: 600rpx;
				background: #f7faff;
				word-wrap: break-word;
				margin: 0 auto;
				padding: 0 10rpx;
			}
		}

		.btn {
			width: 500rpx;
			min-height: 60rpx;
			margin-top: 20rpx;
			background: #ecf5ff !important;
			color: #2979ff !important;
			border: 2rpx solid #a0cfff !important;
			font-size: 28rpx;
			line-height: 60rpx;
			border-radius: 60rpx;
		}
	}

	.foot_box_active {
		transition: bottom linear 0.4s;
		bottom: 0;
	}

	.money-box {
		background: #fff;
		height: 250rpx;
		margin-bottom: 20rpx;
		padding-top: 30rpx;

		.time {
			font-size: 28rpx;
			color: #c4c4c4;
		}

		.money {
			color: #e1212b;
			font-size: 60rpx;
			margin-top: 60rpx;


		}
	}

	.pay-box {
		.pay-item {
			height: 90rpx;
			padding: 0 30rpx;
			font-size: 26rpx;
			background: #fff;
			width: 750rpx;
			border-bottom: 1rpx solid #eeeeee;

			&:last-child {
				border-bottom: none;
			}

			.pay-radio {
				transform: scale(0.8);
			}

			.pay-img {
				width: 100rpx;
				height: 60rpx;
				// background: #ccc;
				margin-right: 25rpx;
			}
		}
	}

	.pay-btn {
		width: 690rpx;
		height: 80rpx;
		background: $zhuse !important;
		// background: linear-gradient(90deg, rgba(240, 199, 133, 1), rgba(246, 214, 157, 1));
		border-radius: 40rpx;
		color: rgba(#fff, 0.9);
		margin-top: 100rpx;
	}
</style>