<template>
	<view class="bank-wrap">
		<view class="form-box">
			<view class="top">
				<view class="money">{{max}}</view>
				<view class="tit">可用余额</view>
			</view>
			<view class="line"></view>
			<label>
				<view class="form-item">
					<view class="item-title">提现金额:</view>
					<input class="item-input flex-sub" type="text" v-model="money"  placeholder="请输入提现金额" placeholder-class="pl-input" />
				</view>
			</label>
			<label>
				<view class="form-item" style="margin-top: 40upx;">
					<view class="item-title">提现方式:</view>
				</view>
			</label>
			<radio-group @change="selPay" class="pay-box">
				<label class="x-bc pay-item" style="display: none;">
					<view class="x-f">
						<image class="pay-img" src="../../../static/imgs/wx_pay.png" mode=""></image>
						<text>微信</text>
					</view>
					<radio value="1" :class="{ checked: pay_type == 1 }" class=" pay-radio orange" :checked="pay_type == 1"></radio>
				</label>
				<label class="x-bc pay-item" >
					<view class="x-f">
						<image class="pay-img" src="../../../static/imgs/ali_pay.png" mode=""></image>
						<text>支付宝</text>
					</view>
					<radio value="2" :class="{ checked: pay_type == 2 }" class="pay-radio orange" :checked="pay_type == 2"></radio>
				</label>
				<label class="x-bc pay-item" >
					<view class="x-f">
						<image class="pay-img" src="../../../static/imgs/yinlian.png" mode=""></image>
						<text>银联</text>
					</view>
					<radio value="3" :class="{ checked: pay_type == 3 }" class="pay-radio orange" :checked="pay_type == 3"></radio>
				</label>
				
			</radio-group>
			<label>
				<view class="form-item" style="margin-top: 40upx;">
					<view class="item-title">账号信息:</view>
					<input class="item-input flex-sub" type="text" v-if="pay_type == 1" v-model="account"  placeholder="请输入微信账号" placeholder-class="pl-input" />
					<input class="item-input flex-sub" type="text" v-if="pay_type == 2"  v-model="account" placeholder="请输入支付宝账号" placeholder-class="pl-input" />
					<input class="item-input flex-sub" style="margin-bottom: 30upx;" v-model="account"  type="text" v-if="pay_type == 3"  placeholder="请输入银行账号" placeholder-class="pl-input" />
					<input class="item-input flex-sub" type="text" v-if="pay_type == 3" v-model="name"  placeholder="请输入开户名" placeholder-class="pl-input" />
				</view>
			</label>
		</view>
		<view class="btn-box flex align-center justify-center"><button class="cu-btn confirem-btn" @tap="submit()">确定</button></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			pay_type:2,
			max:0,
			account:'',
			name:'',
			money:''
		};
	},
	onLoad(options) {
		this.max = options.max
	},
	methods: {
		// tixian
		selPay(e) {
			this.pay_type = e.detail.value;
		},
		submit(){
			var that = this;
			if(!that.money){
				that.$msg('请填写提现金额');
				return
			}
			if(parseFloat(that.money) > parseFloat(that.max)){
				that.$msg('最多可提现'+that.max);
				return
			}
			if(!that.account){
				that.$msg('请填写账号信息');
				return
			}
			if(that.pay_type == 3 && !that.name){
				that.$msg('请填写开户名');
				return
			}
			var data = {
				uid:uni.getStorageSync('p_uid'),
				token:uni.getStorageSync('p_token'),
				money:that.money,
				type:that.pay_type,
				account:that.account,
				name:that.name
			}
			that.$api.tixian(data).then(res => {
				if(res.code == 1){
					that.$msg(res.msg);
					setTimeout(function(){
						uni.navigateBack()
					},800)
				}
			});
		}
	}
};
</script>

<style lang="scss">
page{background: #fff;}
.form-box {
	.top{padding:30rpx;color: #333;font-size: 28rpx;
		.money{font-size: 36upx;color: #000;font-weight: 500;}
	}
	.line{width: 100%;height: 20rpx;background: #f6f6f6;}
	.form-item {
		padding: 0 30rpx;
		.item-title {
			color: #333;
			font-size: 30rpx;
			font-weight: 600;
			line-height: 100upx;
		}
		.item-input {
			width: 100%;
			height: 90upx;
			background: #f3f3f3;
			border-radius: 5px;
			border: 1px solid #eee;
			font-size: 28rpx;
			color: #333;
			padding-left: 20rpx;
		}
		.pl-input {
			color: #999;
		}
	}
}
.pay-box {
	padding: 0 30rpx;
	.pay-item {
		height: 90rpx;
		// padding: 0 30rpx;
		font-size: 26rpx;
		background: #fff;
		width: 690rpx;
		border-bottom: 1rpx solid #eeeeee;

		// &:last-child {
		// 	border-bottom: none;
		// }

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
.notice {
	color: #999;
	font-size: 24rpx;
	padding: 0 25rpx;
	height: 90rpx;
}
.btn-box {
	margin-top: 80rpx;
	.confirem-btn {
		width: 710rpx;
		height: 80rpx;
		background:$zhuse;
		// border: 1rpx solid rgba(238, 238, 238, 1);
		border-radius: 40rpx;
		font-size: 30rpx;
		color: rgba(#fff, 0.9);
	}
}
</style>
