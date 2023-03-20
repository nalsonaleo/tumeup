<template>
	<view class="bank-wrap">
		<view class="form-box">
			<label>
				<view class="form-item flex align-center justify-between">
					<view class="item-title">{{$t('user.editPhone.sjh')}}:</view>
					<input class="item-input flex-sub" type="number" v-model="phone" :placeholder="$t('user.editPhone.sjh.placeholder')" placeholder-class="pl-input" />
				</view>
			</label>
			<view class="form-item flex align-center justify-between">
				<label>
					<view class="x-f">
						<view class="item-title">{{$t('user.editPhone.yzm')}}:</view>
						<input class="item-input flex-sub" type="text" v-model="code.value" :placeholder="$t('user.editPhone.yzm.placeholder')" placeholder-class="pl-input" />
					</view>
				</label>
				<button class="cu-btn code-btn" :disabled="code.status" @tap.stop="getCode">{{ code.text }}</button>
			</view>
		</view>

		<view class="btn-box flex align-center justify-center"><button class="cu-btn confirem-btn" @tap="editChangemobile">{{$t('user.editPhone.tj')}}</button></view>
	</view>
</template>

<script>
import { mapMutations, mapActions, mapState } from 'vuex';
export default {
	components: {},
	data() {
		return {
			code: {
				text: this.$t('user.editPhone.hqyzm'),
				status: false,
				value: ''
			},
			phone: ''
		};
	},
	computed: {},
	onLoad() {
		let that = this;
		const fromType = this.$Route.query.fromType;
		switch (fromType) {
			case 'bind':
				uni.setNavigationBarTitle({
					title: that.$t('user.editPhone.bdsjh')
				});
				break;
			default:
				uni.setNavigationBarTitle({
					title: that.$t('user.editPhone.xgsjh')
				});
		}
	},
	methods: {
		...mapActions(['getUserInfo']),
		//修改手机号
		editChangemobile() {
			let that = this;
			that.$api('user.changemobile', {
				mobile: that.phone,
				captcha: that.code.value
			}).then(res => {
				if (res.code === 1) {
					that.$tools.toast(that.$t('user.editPhone.xgsjhcg'));
					that.getUserInfo();
					setTimeout(() => {
						that.$Router.replace('pages/user/info');
					}, 1000);
				}
			});
		},

		// 获取短信
		getCode() {
			let that = this;
			that.code.status = true;
			let countdown = 60;
			that.$api('sms.send', {
				mobile: that.phone,
				event: 'changemobile'
			}).then(res => {
				if (res.code === 1) {
					that.code.text = countdown + that.$t('user.editPhone.miao');
					that.code.status = true;
					let timer = setInterval(() => {
						if (countdown > 0) {
							that.code.text = countdown - 1 + that.$t('user.editPhone.miao');
							countdown--;
						} else {
							clearInterval(timer);
							that.code.text = that.$t('user.editPhone.hqyzm');
							that.code.status = false;
						}
					}, 1000);
				} else {
					that.code.status = false;
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
		position: relative;
		.item-title {
			color: #333;
			font-size: 28rpx;
			font-weight: 600;
		}
		.item-input {
			font-size: 28rpx;
			color: #333;
			padding-left: 20rpx;
			width: 300rpx;
		}
		.pl-input {
			color: #999;
		}
		.code-btn {
			background: none;
			font-size: 28rpx;
			color: $zhuse;
			position: absolute;
			top: 50%;
			padding: 0;
			transform: translateY(-50%);
			right: 30rpx;
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
		background: rgba(239,58,58,0.8);
		// background: linear-gradient(90deg, rgba(233, 180, 97, 1), rgba(238, 204, 137, 1));
		border: 1rpx solid rgba(239, 58, 58, 0.22);
		border-radius: 40rpx;
		font-size: 30rpx;
		color: rgba(#fff, 0.9);
	}
}
</style>
