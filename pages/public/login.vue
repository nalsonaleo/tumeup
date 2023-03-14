<template>
	<view class="container">
		<!-- titleview -->
		<view class="head-box"><cu-custom :isBack="false"></cu-custom></view>
		<view class="wrapper">
			<view style="font-size: 54upx;color: #333;margin-left: 60upx;font-weight: 500;margin-bottom: 40upx;">登录</view>
			<view class="login-box y-f">
				<view class="input-item x-c"><input class="inp" v-model="u_phone" type="number" placeholder="请输入账号" placeholder-class="pl" /></view>
				<view class="input-item x-c"><input class="inp" password v-model="u_psd" type="text" placeholder="请输入密码" placeholder-class="pl" /></view>
			</view>
			<!-- 登录按钮 -->
			<view class="x-c y-f">
				<!-- #ifdef MP-WEIXIN -->
				<button class="cu-btn login-btn" @getuserinfo="toLogin" open-type="getUserInfo">立即登录</button>
				<!-- #endif -->
				<!-- #ifndef MP-WEIXIN -->
				<button class="cu-btn login-btn" @tap="toLogin">立即登录</button>
				<!-- #endif -->
			
				<view class="tip-box">
					<view class="tip-btn" style="color: #999;margin: 28upx auto;border: 0;text-align: center;" @tap="jump('/pages/public/forgot')">忘记密码？</view>
				</view>
			</view>
			
		</view>
		<view class="third-party" @tap="jump('/pages/public/register')" style="position: absolute;z-index: 99; bottom: 40upx;text-align: center;width: 100%;">
			没有帐号？<text>注册一个吧！</text>
		</view>
	</view>
</template>

<script>
// import Wechat from '@/common/wechat/wechat';
import { mapMutations, mapActions, mapState } from 'vuex';
// import store from '@/common/store';
export default {
	data() {
		return {
			u_psd: '',
			u_phone: '',
			sysInfo:uni.getStorageSync('sysInfo')
		};
	},
	computed: {
		
	},
	onLoad() {
		
	},
	onShow() {},
	methods: {
		toLogin() {
			let that = this;
			if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(that.u_phone)) {
				that.$msg('请填写正确手机号码');
				return false;
			}
			if (!that.u_psd) {
				that.$msg('请填写登录密码');
				return false;
			}
			var data = { u_phone: that.u_phone,u_psd: that.u_psd};
			that.$api.login(data).then(res => {
				that.$msg(res.msg);
				if (res.code == 1) {
					// #ifdef APP-PLUS
						uni.setStorageSync('p_uid', res.uid);
						uni.setStorageSync('p_token', res.token);
						setTimeout(() => {
							uni.switchTab({
								url:'/pages/index/index'
							}) 
						}, 1000);
					// #endif
					// #ifdef H5
						uni.setStorageSync('p_uid', res.uid);
						uni.setStorageSync('p_token', res.token);
						// 检测是否为微信环境
						let ua = window.navigator.userAgent.toLowerCase();
						if (ua.indexOf('micromessenger') != -1) {
							if(res.url){
								window.location.href = res.url
							}else{
								setTimeout(() => {
									uni.switchTab({
										url:'/pages/index/index'
									}) 
								}, 800);
							}
						}else{
							setTimeout(() => {
								uni.switchTab({
									url:'/pages/index/index'
								}) 
							}, 800);
						}
					// #endif
					// #ifdef MP-WEIXIN
						uni.setStorageSync('p_uid', res.uid);
						uni.setStorageSync('p_token', res.token);
						if(res.is_auth == 0){
							uni.login({
								success: (res2) => {
									var code = res2.code
									uni.getUserInfo({
										success: (res3) => {
											var authInfo = res3;
											var data = {
												uid:uni.getStorageSync('p_uid'),
												token:uni.getStorageSync('p_token'),
												code:code,
												iv:authInfo.iv,
												rawData:authInfo.rawData,
												signature:authInfo.signature,
												encryptedData:authInfo.encryptedData,
											}
											that.$api.getAuth(data).then(res4 => {
												if(res4.code == 1){
													uni.switchTab({
														url:'/pages/index/index'
													}) 
												}
											})
										
										}
									})
								}
							})
						}else{
							setTimeout(() => {
								uni.switchTab({
									url:'/pages/index/index'
								}) 
							}, 1000);
						}
					// #endif
				}
			});
		},

		// 路由跳转
		jump(path, parmas) {
			uni.navigateTo({
				url: path
			});
		}
	}
};
</script>

<style lang="scss">
	page{background: #fff;}
	.third-party{font-size: 30upx;color: #aaa; text{color: $zhuse;}}
.container {
	position: relative;
	width: 100vw;
	height: 100vh;
	overflow: hidden;
	// background: linear-gradient(180deg, rgba(239, 196, 128, 1) 0%, rgba(248, 220, 165, 1) 25%, rgba(255, 255, 255, 1) 98%);

	// titleview
	.head-box {
		.cuIcon-back {
			font-size: 50rpx !important;
			font-weight: 500;
		}
	}

	// logo
	.logo {
		width: 330rpx;
		height: 120rpx;
	}

	.logo-bg {
		width: 640rpx;
		height: 300rpx;
	}
}

.wrapper {
	position: absolute;
	z-index: 90;
	padding-bottom: 40upx;
	padding-top: 140upx;
	width: 100vw;
	height: 100vh;
	top: 0;

	// 登录选项卡
	.tab-box {
		margin: 60rpx auto 30rpx;
		width: 608rpx;

		.tab-item {
			flex: 1;
			height: 80rpx;
			position: relative;

			.tab-title {
				font-size: 32rpx;
				font-weight: bold;
				color: #845708;
			}

			.line-box {
				position: absolute;
				width: 300rpx;
				height: 4rpx;
				background: rgba(233, 181, 98, 1);
				bottom: 0;
				left: 50%;
				transform: translateX(-50%);

				.triangle {
					position: absolute;
					bottom: 0;
					left: 50%;
					transform: translateX(-50%);
					disply: block;
					width: 0;
					height: 0;
					border-width: 10rpx;
					border-style: solid;
					border-color: transparent transparent #e9b562 transparent;
				}
			}
		}
	}

	// 输入
	.login-box {
		.input-item {
			height: 108rpx;
			border-bottom: 1rpx solid #f7f7f7;
			width: 608rpx;

			.inp {
				flex: 1;
				height: 100%;
				font-size: 30rpx;
				color: #5b6570;
			}

			.pl {
				color: #5b6570;
			}

			.code-btn {
				background: none;
				font-size: 28rpx;
				color: #845708;
			}
		}
	}

	// 登录
	.login-btn {
		width: 630upx;
		height: 80upx;
		border-radius: 40rpx;
		margin-top: 70upx;
		background: $zhuse;
		font-size: 32upx;
		// box-shadow: 0px 7rpx 6rpx 0px rgba(229, 138, 0, 0.22);
		color: #fff;
	}

	.tip-box {
		width: 630rpx;

		.tip-btn {
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 400;
			// text-decoration: underline;
			color: $zhuse;
			background: none;
		}
	}

	// 一键登录按钮
	.wx-logo-box {
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: rgba(200, 150, 61, 1);
		margin-top: 80rpx;
		background: none;
		display: block;
		&:hover {
			background: none;
		}
		.auto-login {
			width: 80rpx;
			height: 80rpx;
			overflow: hidden;
			margin-bottom: 10rpx;
		}
	}
}
</style>
