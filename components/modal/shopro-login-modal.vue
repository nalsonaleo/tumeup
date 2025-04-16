<template>
	<view class="cu-modal " :class="[{ show: showModal }, modalType]" cathctouchmove @tap="hideModal">
		<view class="cu-dialog" @tap.stop style="background: none;overflow: visible;">
			<view class="modal-box">
				<image class="head-bg" src="../../static/imgs/tit_bg.png" mode=""></image>
				<view class="detail">
					<view class="title1">{{$t('components.shoproLoginModal.nhmydl')}}</view>
					<view class="title2">{{$t("components.shoproLoginModal.dljkkqpzsh")}}</view>
				</view>
				<view class="btn-box y-f">
					<button class="cu-btn login-btn" @tap="onLogin">{{$t('components.shoproLoginModal.ljdl')}}</button>
					<button class="cu-btn close-btn" @tap="hideModal">{{$t('components.shoproLoginModal.qx')}}</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { mapMutations, mapActions, mapState } from 'vuex';
export default {
	components: {},
	data() {
		return {};
	},
	props: {
		value: {},
		modalType: {
			type: String,
			default: ''
		}
	},
	computed: {
		...mapState({
			showLoginTip: state => uni.getStorageSync('p_token')
		}),
		showModal: {
			get() {
				return this.showLoginTip;
			},
			set(val) {
				// this.$store.commit('LOGIN_TIP', val);
			}
		}
	},
	methods: {
		hideModal() {
			this.showModal = false;
		},
		onLogin() {
			this.showModal = false;
			uni.navigateTo({
				url:'/pages/public/login'
			})
			// uni.setStorageSync('fromLogin', this.$Route);
			// this.$Router.push({
			// 	path: '/pages/public/login'
			// });
		}
	}
};
</script>

<style lang="scss">
// 登录提示
.modal-box {
	width: 610rpx;
	border-radius: 20rpx;
	background: #fff;
	position: relative;
	left: 50%;
	transform: translateX(-50%);
	padding-bottom: 30rpx;

	.head-bg {
		width: 100%;
		height: 210rpx;
	}

	.detail {
		.title1 {
			color: #46351b;
			font-size: 35rpx;
			font-weight: bold;
		}

		.title2 {
			font-size: 28rpx;
			color: #999;
			padding-top: 20rpx;
		}
	}

	.btn-box {
		margin-top: 80rpx;

		.login-btn {
			width: 492rpx;
			height: 70rpx;
			background: linear-gradient(90deg, #ea5454, #f77272);;
			box-shadow: 0px 7rpx 6rpx 0px rgba(239, 58, 58, 0.22);
			border-radius: 35rpx;
			font-size: 28rpx;
			color: rgba(#fff, 0.9);
		}

		.close-btn {
			width: 492rpx;
			height: 70rpx;
			color: #ef3a3a;
			font-size: 26rpx;
			margin-top: 20rpx;
			background: none;
		}
	}
}
</style>
