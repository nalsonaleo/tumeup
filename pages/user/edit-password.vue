<template>
	<view class="bank-wrap">
		<view class="form-box">
			<label>
				<view class="form-item flex align-center justify-between">
					<view class="item-title">{{$t('user.editPassword.jmm')}}:</view>
					<input class="item-input flex-sub" password type="text" v-model="old_psd" :placeholder="$t('user.editPassword.jmm.placeholder')" placeholder-class="pl-input" />
				</view>
			</label>
			<label>
				<view class="form-item flex align-center justify-between">
					<view class="item-title">{{$t('user.editPassword.xmm')}}:</view>
					<input class="item-input flex-sub" password type="text" v-model="new_psd" :placeholder="$t('user.editPassword.xmm.placeholder')" placeholder-class="pl-input" />
				</view>
			</label>
			<label>
				<view class="form-item flex align-center justify-between">
					<view class="item-title">{{$t('user.editPassword.qrxmm')}}:</view>
					<input class="item-input flex-sub" password type="text" v-model="re_psd" :placeholder="$t('user.editPassword.qrxmm.placeholder')" placeholder-class="pl-input" />
				</view>
			</label>
		</view>
		<view class="btn-box flex align-center justify-center"><button class="cu-btn confirem-btn" @tap="editPassword">{{$t('user.editPassword.qrxg')}}</button></view>
	</view>
</template>

<script>
export default {
	components: {},
	data() {
		return {
			old_psd: '',
			new_psd: '',
			re_psd: ''
		};
	},
	onLoad() {},
	methods: {
		//修改密码
		editPassword() {
			let that = this;
			if (!that.old_psd) {
				that.$msg(that.$t('user.editPassword.qtxymm'));
				return false;
			}
			if (!that.new_psd) {
				that.$msg(that.$t('user.editPassword.qszxmm'));
				return false;
			}
			if (that.re_psd != that.new_psd) {
				that.$msg(that.$t('user.editPassword.xmmbyz'));
				return false;
			}
			var data = {
				uid:uni.getStorageSync('p_uid'),
				token:uni.getStorageSync('p_token'), 
				old_psd: that.old_psd, 
				new_psd: that.new_psd, 
				re_psd: that.re_psd ,
			};
			that.$api.editPsd(data).then(res => {
				if (res.code == 1) {
					that.$msg(res.msg);
					setTimeout(function(){
						uni.navigateBack();
					},800)
				}
			});
		}
	}
};
</script>

<style lang="scss">
.form-box {
	background: #fff;
	.form-item {
		height: 96rpx;
		border-bottom: 1rpx solid rgba(#dfdfdf, 0.9);
		padding: 0 25rpx;
		.item-title {
			color: #333;
			font-size: 28rpx;
			font-weight: 600;
		}
		.item-input {
			font-size: 28rpx;
			color: #333;
			padding-left: 20rpx;
		}
		.pl-input {
			color: #999;
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
	margin-top: 60rpx;
	.confirem-btn {
		width: 710rpx;
		height: 80rpx;
		background: $zhuse;
		// border: 1rpx solid rgba(238, 238, 238, 1);
		border-radius: 40rpx;
		font-size: 30rpx;
		color: rgba(#fff, 0.9);
	}
}
</style>
