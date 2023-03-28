<template>
	<view class="page_box">
		<view class="head_box"></view>
		<view class="content_box">
			<view class="y-f money-box">
				<!-- <text class="time" v-if="isPast">{{ timeText }}</text> -->
				<view class="money">{{ total_fee }}</view>
			</view>
			<radio-group @change="selPay" class="pay-box">
				<label class="x-bc pay-item" >
					<view class="x-f">
						<image class="pay-img" src="../../../static/imgs/wallet_pay.png" mode=""></image>
						<text>{{$t("order.payment.method.yezf")}}</text>
					</view>
					<radio value="1" :class="{ checked: pay_type == 1 }" class="pay-radio orange" :checked="pay_type == 1"></radio>
				</label>
				
			
				<label class="x-bc pay-item" v-if="g_type == 1">
					<view class="x-f">
						<image class="pay-img" src="../../../static/imgs/th.png" mode=""></image>
						<text>{{$t("order.payment.method.thmdh")}}</text>
					</view>
					<radio value="6" :class="{ checked: pay_type == 6 }" class="pay-radio orange" :checked="pay_type == 6"></radio>
				</label>
			</radio-group>
			<view class="form-item pay-item" v-if="pay_type == 6">
				<input placeholder-class="pl-input" class="item-input" type="text" placeholder="请输入提货码" v-model="goods_code">
			</view>
			<view class="x-c">
				<button class="cu-btn pay-btn" @tap="confirmPay">{{$t("order.payment.method.qrzf")}} {{$t('money.symbol')}}{{ total_fee }}</button>
			</view>
		</view>
		<view class="foot_box"></view>
		
		
		<!-- 输入支付密码 -->
		<view class="pay-password" v-if="flag">
			<view class="pwd-bg"></view>
			<view class="pwd-box">
				<view class="tit">
					<image src="@/static/imgs/back.png" @click="hide"></image>
					<text>{{$t("order.payment.method.srzfmm")}}</text>
				</view>
				<view class="pwd-list">
					<view>{{ password.length >= 1 ? '●' : '' }}</view>
					<view>{{ password.length >= 2 ? '●' : '' }}</view>
					<view>{{ password.length >= 3 ? '●' : '' }}</view>
					<view>{{ password.length >= 4 ? '●' : '' }}</view>
					<view>{{ password.length >= 5 ? '●' : '' }}</view>
					<view>{{ password.length >= 6 ? '●' : '' }}</view>
				</view>
				<view class="pwd-link"><navigator url="/pages/user/forgetPayPsd">{{$t("order.payment.method.wjzfmm")}}？</navigator></view>
				<view class="pwd-keys">
					<view @click="keysOn(1)">1</view>
					<view @click="keysOn(2)">2</view>
					<view @click="keysOn(3)">3</view>
					<view @click="keysOn(4)">4</view>
					<view @click="keysOn(5)">5</view>
					<view @click="keysOn(6)">6</view>
					<view @click="keysOn(7)">7</view>
					<view @click="keysOn(8)">8</view>
					<view @click="keysOn(9)">9</view>
					<view class="no-bg"></view>
					<view @click="keysOn(0)">0</view>
					<view class="no-bg" @click="keysOn('del')"><image class="iconfont slj-iconfontcha" src="@/static/imgs/delBtn.png" alt=""></image></view>
				</view>
			</view>
		</view>
		<!-- 输入支付密码end -->
	</view>
</template>

<script>
let timer;
export default {
	components: {},
	data() {
		return {
			total_fee:0,
			order_id:0,
			pay_type: 1,//1余额 2APP微信 3APP支付宝 4小程序微信 5公众号
			timeText: '',
			isPast: false, //是否显示订单倒计时。
			goods_code:'',
			g_type:'',
			isXcx:false,
			isWx:false,
			password: [],
			flag: false,
		};
	},

	onLoad(options) {
		// #ifdef MP-WEIXIN
		this.isXcx = true;
		// #endif
		// #ifdef H5
		// 检测是否为微信环境
		let ua = window.navigator.userAgent.toLowerCase();
		if (ua.indexOf('micromessenger') != -1) {
			this.isWx = true
		}
		// #endif
		// uni.removeStorageSync('orderInfo');
		if(uni.removeStorageSync('couponId')){
			uni.removeStorageSync('couponId');
		}
		// console.log(options)
		this.total_fee = options.total_fee;
		this.order_id = options.orderId;
		if(options.g_type){
			this.g_type = options.g_type;
		}
	},
	onHide() {
		clearInterval(timer);
	},
	methods: {
		selPay(e) {
			this.pay_type = e.detail.value;
		},
		// 倒计时
		countDown() {
			let that = this;
			let t = parseInt(that.orderDetail.ext_arr.expired_time * 1000) - parseInt(new Date().getTime());
			t = t / 1000;
			let timer = setInterval(() => {
				if (t > 0) {
					let time = that.$tools.format(t);
					that.timeText = `${that.$t("order.payment.method.zfsysj")} ${time.m}:${time.s}`;
					t--;
				} else {
					clearInterval(timer);
					that.timeText = `${that.$t("order.payment.method.ddygq")}!`;
				}
			}, 1000);
		},
		// 输入密码
		async keysOn(key) {
			var $this = this;
			if (key != 'del') {
				if ($this.password.length < 6) {
					$this.password.push(key);
					if ($this.password.length == 6) {
						// 密码输入完成
						var paypsd = $this.password.join('');
						var data = {
							uid: uni.getStorageSync('p_uid'),
							token: uni.getStorageSync('p_token'),
							order_id: $this.order_id,
							pay_type: $this.pay_type,
							goods_code:$this.goods_code,
							paypsd:paypsd
						};
						$this.$api.payment(data).then(res => {
							$this.flag = false;
							$this.password = [];
							if (res.code == 1) {
								$this.$msg(res.msg)
								setTimeout(function(){
									uni.switchTab({
										url: '/pages/index/user'
									});
								},800)
							}
							
						})
					}
				}
			} else {
				$this.password.pop();
			}
		},
		hide() {
			var $this = this;
			$this.flag = false;
			$this.password = [];
		},
		
		// 发起支付
		confirmPay() {
			let that = this;
			
			if(that.pay_type == 6 && !that.goods_code){
				// 提货码兑换
				that.$msg(that.$t("order.payment.method.txthm"));
				return;
			}
			if(that.pay_type == 1){
				// 余额支付
				// that.flag = true;
				var data = {
					uid: uni.getStorageSync('p_uid'),
					token: uni.getStorageSync('p_token'),
					order_id: that.order_id,
					pay_type: that.pay_type,
					goods_code:that.goods_code,
					paypsd:''
				};
				that.$api.payment(data).then(res => {
				
					if (res.code == 1) {
						that.$msg(res.msg)
						setTimeout(function(){
							uni.switchTab({
								url: '/pages/index/user'
							});
						},800)
					}
					
				})
				
				 return false;
			}
			if(that.pay_type == 3){
				// 余额支付
				uni.redirectTo({
					url: '/pages/user/wallet/chongzhi'
				});
				return;
			}
			var data = {
				uid: uni.getStorageSync('p_uid'),
				token: uni.getStorageSync('p_token'),
				order_id: that.order_id,
				pay_type: that.pay_type,
				goods_code:that.goods_code,
				paypsd:''
			};
			that.$api.payment(data).then(res => {
				if (res.code == 1) {
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
									console.log('fail:' + JSON.stringify(err));
								}
							});
					}
					if(that.pay_type == 5){
						var info = res.data;
						WeixinJSBridge.invoke(
						  'getBrandWCPayRequest', {
						    debug:true,
						    "appId":info.appId,     //公众号名称，由商户传入
						    "timeStamp":info.timeStamp,         //时间戳，自1970年以来的秒数
						    "nonceStr":info.nonceStr, //随机串
						    "package":info.package,
						    "signType":info.signType,         //微信签名方式：
						    "paySign":info.paySign //微信签名
						  },
						  function(data){
						    // this.$toast({ message: JSON.stringify(data), duration: 6000 });
						    if(data.err_msg == "get_brand_wcpay_request:ok" ){
						     setTimeout(function(){
						     	uni.switchTab({
						     		url: '/pages/index/user'
						     	});
						     },800)
						    }
						  });
					}
					// console.log(res)
					if(that.pay_type == 6){
						// 余额支付或提货码兑换
						that.$msg(res.msg)
						setTimeout(function(){
							uni.switchTab({
								url: '/pages/index/user'
							});
						},800)
					}
					if(that.pay_type == 2 || that.pay_type == 3){
						 //微信、支付宝订单数据
						var info = res.data;
						var provider;
						if (that.pay_type == 2) {
							provider = 'wxpay';
						} else if (that.pay_type == 3){
							provider = 'alipay';
						}
						uni.requestPayment({
							provider: provider,
							orderInfo: info,
							success: function(res) {
								// setTimeout(function(){
								uni.switchTab({
									url: '/pages/index/user'
								});
								// },800)
							},
							fail: function(err) {
								console.log('fail:' + JSON.stringify(err));
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
	page{background: #f3f3f3;}
.form-item {
	// padding: 0 30rpx;
	.item-input {
		width: 100%;
		height: 90upx;
		background: #fff;
		border-radius: 5px;
		border: 1px solid #eee;
		font-size: 28rpx;
		color: #333;
		padding-left: 20rpx;
		margin-top: 40rpx;
	}
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

		&::before {
			content: '￥';
			font-size: 46rpx;
		}
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
			width: 40rpx;
			height: 40rpx;
			// background: #ccc;
			margin-right: 25rpx;
		}
	}
}

.pay-btn {
	width: 690rpx;
	height: 80rpx;
	background: $zhuse!important;
	// background: linear-gradient(90deg, rgba(240, 199, 133, 1), rgba(246, 214, 157, 1));
	border-radius: 40rpx;
	color: rgba(#fff, 0.9);
	margin-top: 100rpx;
}
.pwd-bg {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.2);
}
.pwd-box {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 410px;
	background: #fff;
	color: #333;
	z-index: 999;
	.tit {
		display: flex;
		align-items: center;
		image {
			width: 20px;
			height: 20px;
			margin-left: 4%;
		}
		text {
			text-align: center;
			font-size: 18px;
			padding: 22px;
			flex: 1;
		}
	}
	.pwd-list {
		overflow: hidden;
		padding: 0 22px;
		display: flex;
		align-items: center;
		view {
			flex: 1;
			height: 50px;
			line-height: 50px;
			font-size: 30upx;
			background: #fff;
			border: 1px #f0f0f0 solid;
			border-left: none;
			text-align: center;
		}
		view:first-child {
			margin-left: 0;
			border-left: 1px #f0f0f0 solid;
		}
	}
	.pwd-link {
		margin-top: 10px;
		text-align: right;
		color: #7f8389;
		font-size: 28upx;
		padding: 0 22px;
	}
	.pwd-keys {
		width: 100%;
		background: #d1d5db;
		height: 225px;
		position: absolute;
		bottom: 0;
		padding-top: 5px;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		view {
			text-align: center;
			margin: 0 0 5px 5px;
			margin-top: 0;
			width: calc((100% - 20px) / 3);
			height: 50px;
			line-height: 50px;
			background: #fff;
			border-radius: 5px;
			border-bottom: 1px #999 solid;
			font-size: 36upx;
		}
		view.no-bg {
			background: none;
			border: none;
			// i{ font-size: @fontsize + 7;}
			image {
				width: 30px;
				height: 40upx;
			}
		}
		view:active {
			background: #f0f0f0;
		}
	}
}
.payShadow {
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	left: 0;
	background: rgba(0, 0, 0, 0.5);
	z-index: 99999;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	.payCon {
		width: 70%;
		padding: 40upx;
		text-align: center;
		background: #fff;
		border-radius: 10upx;
		// display: flex;align-items: flex-start;justify-content: center;flex-direction:column;
		.tit {
			font-size: 30upx;
			color: #333;
			margin-bottom: 60upx;
		}
		.list {
			display: flex;
			align-items: center;
			width: 70%;
			margin-left: 10%;
			margin-bottom: 40upx;
			.txt {
				display: flex;
				align-items: center;
				margin-left: 20upx;
			}
			image {
				width: 60upx;
				height: 60upx;
				margin-right: 12upx;
			}
		}
		.btn {
			width: 140upx;
			height: 70upx;
			margin-left: 33%;
			background: $zhuse;
			color: #fff;
			border-radius: 12upx;
			text-align: center;
			line-height: 70upx;
			margin-top: 60upx;
		}
	}
	.exitBtn {
		width: 46upx;
		height: 46upx;
		border-radius: 100%;
		border: 1px solid #f5f5f5;
		margin-top: 40upx;
		text-align: center;
		image {
			width: 36upx;
			height: 36upx;
			margin-top: 5upx;
		}
	}
}
</style>
