<template>
	<view class="bank-wrap">
		<view class="form-box">
			<view class="top">
				<view class="money">{{max}}</view>
				<view class="tit">{{$t("user.wallet.tixian.balance")}}</view>
			</view>
			<view class="line"></view>
			<label>
				<view class="form-item">
					<view class="item-title">{{$t("user.wallet.tixian.withdrawCash.money")}}:</view>
					<input class="item-input flex-sub" type="text" v-model="money"  :placeholder="$t('user.wallet.tixian.withdrawCash.placeholder')" placeholder-class="pl-input" />
				</view>
			</label>
			<label>
				<view class="form-item" style="margin-top: 40upx;">
					<view class="item-title">{{$t("user.wallet.tixian.withdrawCash.mode")}}:</view>
				</view>
			</label>
			<radio-group @change="selPay" class="pay-box">
				
				<label class="x-bc pay-item" v-for='item in payTypeList' :key='item.id' >
					<view class="x-f">
						<image class="pay-img" :src="item.logo" mode=""></image>
						
						<text>{{item.title}}</text>
					</view>
					<radio value="2" :class="{ checked: pay_type == 2 }" class="pay-radio orange" :checked="pay_type == 2"></radio>
				</label>
				
				
			</radio-group>
			<label>
				<view class="form-item" style="margin-top: 40upx;">
					<view class="item-title">{{$t("user.wallet.tixian.accountInfo")}}:</view>
					<input class="item-input flex-sub" type="text" v-if="pay_type == 1" v-model="account"  :placeholder="$t('user.wallet.tixian.wx.placeholder')" placeholder-class="pl-input" />
					<input class="item-input flex-sub" type="text" v-if="pay_type == 2"  v-model="account" :placeholder="$t('user.wallet.tixian.zfb.placeholder')" placeholder-class="pl-input" />
					
					<input class="item-input flex-sub" style="margin-bottom: 30upx;" v-model="account"  type="text" v-if="pay_type == 3"  :placeholder="$t('user.wallet.tixian.yl.placeholder')" placeholder-class="pl-input" />
					<input class="item-input flex-sub" type="text" v-if="pay_type == 2" v-model="name"  :placeholder="$t('user.wallet.tixian.ylkhm.placeholder')" placeholder-class="pl-input" />
				</view>
			</label>
		</view>
		<view class="btn-box flex align-center justify-center"><button class="cu-btn confirem-btn" @tap="submit()">{{$t("user.wallet.tixian.confirm")}}</button></view>
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
			money:'',
			payTypeList:"",
		};
	},
	onLoad(options) {
		this.max = options.max
		this.$api.payType().then((res) => {
			this.payTypeList = res.data;
		});
	},
	methods: {
		// tixian
		selPay(e) {
			this.pay_type = e.detail.value;
		},
		submit(){
			var that = this;
			if(!that.money){
				that.$msg(that.$t('user.wallet.tixian.qtxtxje'));
				return
			}
			if(parseFloat(that.money) > parseFloat(that.max)){
				that.$msg(that.$t('user.wallet.tixian.zdktx')+that.max);
				return
			}
			if(!that.account){
				that.$msg(that.$t('user.wallet.tixian.qtxzhxx'));
				return
			}
			if(that.pay_type == 3 && !that.name){
				that.$msg(that.$t('user.wallet.tixian.qtxkhm'));
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
			margin-bottom: 20upx;
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
			width: 100rpx;
			height: 60rpx;
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
