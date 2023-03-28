<template>
	<view class="container">

		<view class="wrapper">
			<!-- 表单 -->
			<view class="login-box y-f">
				<view class="input-item x-c">
					<text class="inp-title">{{$t("public.forgot.sjh")}}</text>
					<input class="inp" v-model="u_phone" type="number" :placeholder="$t('public.forgot.sjh.placeholder')" placeholder-class="pl" />
				</view>
				<view class="input-item x-c">
					<text class="inp-title">{{$t("public.forgot.yzm")}}</text>
					<input class="inp" v-model="code.y_code" type="text" :placeholder="$t('public.forgot.yzm.placeholder')" placeholder-class="pl" />
					<button class="cu-btn code-btn" :disabled="code.status" @tap="getCode">{{ code.text }}</button>
				</view>
				<view class="input-item x-c">
					<text class="inp-title">{{$t('public.forgot.xmm')}}</text>
					<input class="inp" password v-model="u_psd" type="text" :placeholder="$t('public.forgot.xmm.placeholder')" placeholder-class="pl" />
				</view>
				<view class="input-item x-c">
					<text class="inp-title">{{$t("public.forgot.qrmm")}}</text>
					<input class="inp" password v-model="re_psd" type="text" :placeholder="$t('public.forgot.qrmm.placeholder')" placeholder-class="pl" />
				</view>
			</view>
			<!-- 登录按钮 -->
			<view class="x-c y-f">
				<button class="cu-btn login-btn" @tap="restPassword">{{$t("public.forgot.tj")}}</button>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			code: {
				text: this.$t("public.forgot.hqyzm"),
				status: false,
				y_code: ''
			},
			u_phone: '',
			u_psd: '',
			re_psd:'',
			sysInfo: uni.getStorageSync('sysInfo')
		};
	},
	onLoad() {},
	methods: {
		// 路由跳转
		jump(path, parmas) {
			this.$Router.push({
				path: path,
				query: parmas
			});
		},
		// 重置密码
		restPassword() {
			let that = this;
			if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(that.u_phone)) {
				that.$msg(that.$t("public.forgot.qtxzqsjhm"));
				return false;
			}
			if (!that.code.y_code) {
				that.$msg(that.$t("public.forgot.qtxyzm"));
				return false;
			}
			if (!that.u_psd) {
				that.$msg(that.$t('public.forgot.qszdlmm'));
				return false;
			}
			if (!that.re_psd) {
				that.$msg(that.$t('public.forgot.qqrdlmm'));
				return false;
			}
			var data = { u_phone: that.u_phone, y_code: that.code.y_code, u_psd: that.u_psd, re_psd: that.re_psd };
			that.$api.forgetPsd(data).then(res => {
				if (res.code == 1) {
					that.$msg(res.msg);
					setTimeout(function(){
						uni.redirectTo({
							url:'/pages/public/login'
						})
					},800)
					
				}
			});
		},
		getCode() {
			let that = this;
			if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(that.u_phone)) {
				that.$msg(that.$t('public.forgot.qtxzqsjhm'));
				return false;
			}
			let countdown = 60;
			that.code.status = true;
			var data = { phone: that.u_phone };
			that.$api.getCode(data).then(res => {
				if (res.code === 1) {
					that.code.text = countdown + that.$t('public.forgot.miao');
					that.code.status = true;
					let timer = setInterval(() => {
						if (countdown > 0) {
							that.code.text = countdown - 1 + that.$t('public.forgot.miao');
							countdown--;
						} else {
							clearInterval(timer);
							that.code.text = that.$t("public.forgot.hqyzm");
							that.code.status = false;
						}
					}, 1000);
				} else {
					that.code.status = false;
				}
			});
		},
	}
};
</script>

<style lang="scss">
	page{background: #fff;}
.container {
	// position: relative;
	// width: 100vw;
	// height: 100vh;
	// overflow: hidden;
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
		width: 410rpx;
		height: 120rpx;
	}

	.logo-bg {
		width: 640rpx;
		height: 300rpx;
	}
	// 标题
	.tab-item {
		flex: 1;
		height: 80rpx;
		position: relative;
		margin-top: 80rpx;
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

.wrapper {
	// position: absolute;
	// z-index: 90;
	// padding-bottom: 40upx;
	// padding-top: 115px;
	// width: 100vw;
	// height: 100vh;
	// top: 0;

	// 输入
	.login-box {
		// margin-top: 80rpx;
		.input-item {
			height: 108rpx;
			border-bottom: 1rpx solid #f7f7f7;
			width: 94%;
			
			.inp-title {
				font-size: 30rpx;
				color: #333;
				padding-right: 30rpx;
			}

			.inp {
				flex: 1;
				height: 100%;
				font-size: 30rpx;
				color: #333;
			}

			.pl {
				color: #999;
			}

			.code-btn {
				background: none;
				font-size: 30rpx;
				color: $zhuse;
				border-radius: 0;
				height: 42rpx;
				width: 190rpx;
				padding: 0;
			}
		}
	}

	// 登录
	.login-btn {
		width: 94%;
		height: 80upx;
		border-radius: 40rpx;
		margin-top: 70upx;
		background:$zhuse;
		font-size: 30upx;
		// box-shadow: 0px 7rpx 6rpx 0px rgba(229, 138, 0, 0.22);
		color: #fff;
	}

	.tip-btn {
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 400;
		text-decoration: underline;
		color: rgba(200, 150, 61, 1);
		background: none;
	}
}
</style>
