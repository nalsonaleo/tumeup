<template>
	<view class="container">
		<!-- titleview -->
		<!-- <view class="head-box"><cu-custom :isBack="true"></cu-custom></view> -->
		<view class="wrapper">
			<view style="font-size: 54upx;color: #333;margin-left: 60upx;font-weight: 500;margin-bottom: 40upx;">{{$t("public.register.zc")}}</view>
			<!-- 表单 -->
			<view class="login-box y-f">
				<view class="input-item x-c"><selectAreaCode v-model="areaCodeData"></selectAreaCode><input class="inp" v-model="u_phone" type="number" :placeholder="$t('public.register.qsrsjh')" placeholder-class="pl" /></view>
				<view class="input-item x-c"><input class="inp" v-model="u_nickname" type="text" :placeholder="$t('public.register.qsrnc')" placeholder-class="pl" /></view>
				<view class="input-item x-c">
					<input class="inp" v-model="code.y_code" type="number" :placeholder="$t('public.register.qsryzm')" placeholder-class="pl" />
					<button class="cu-btn code-btn" :disabled="code.status" @tap="getCode">{{ code.text }}</button>
				</view>
				<view class="input-item x-c"><input class="inp" password v-model="u_psd" type="text" :placeholder="$t('public.register.qsrdlmm')" placeholder-class="pl" /></view>
				<!-- <view class="input-item x-c">
					<text class="inp-title">密&emsp;码</text>
					<input class="inp" password v-model="password"  type="text" placeholder="请确认登录密码" placeholder-class="pl" />
				</view> -->
				<view class="input-item x-c"><input class="inp" v-model="u_code" type="text" :placeholder="$t('public.register.qsryqm')" placeholder-class="pl" /></view>
				<!-- <view class="tip-box" @tap="onTcp">
					<label class="x-f">
						<radio class="tcp-radio brown" :class="{ checked: isTcp }" :checked="isTcp"></radio>
						<view class="">
							我已阅读并遵守
							<text class="tcp" @tap="jump('/pages/public/richtext', { id: 1 })">《用户协议》</text>
						
						</view>
					</label>
				</view> -->
			</view>
			<!-- 登录按钮 -->
			<view class="x-c y-f"><button class="cu-btn login-btn" @tap="register">{{$t("public.register.ljzc")}}</button></view>
		</view>
	</view>
</template>

<script>
	import selectAreaCode from '@/components/selectAreaCode.vue';
	import localeList from '@/locale/locales.js';
export default {
	data() {
		return {
			areaCodeData: {},
			u_phone: '',
			code: {
				text: this.$t('public.register.hqyzm'),
				status: false,
				y_code: ''
			},
			u_nickname: '',
			u_psd: '',
			u_code: '',
			isTcp: false, //协议
			sysInfo: uni.getStorageSync('sysInfo')
		};
	},
	components: {
		selectAreaCode
	},
	onLoad(params) {
		if(params.t) {
			this.u_code = params.t;
		}
	},
	methods: {
		jump(path, parmas) {
			
			this.$router.push({
				path: path,
				query: parmas
			});
		},
		getCode() {
			let that = this;
			if (!/^\d{8,10}$/.test(that.u_phone)) {
				that.$msg(that.$t('public.register.qtxzqsjhm'));
				return false;
			}
			if(that.u_phone.length <= 0) {
				that.$msg(that.$t('public.register.qtxzqsjhm'));
				return;
			}
			let countdown = 60;
			that.code.status = true;
			var data = { phone: that.u_phone, type: 1, phonecode: that.areaCodeData.code};
			that.$api.getCode(data).then(res => {
				if (res.code === 1) {
					that.code.text = countdown + that.$t('public.register.miao');
					that.code.status = true;
					let timer = setInterval(() => {
						if (countdown > 0) {
							that.code.text = countdown - 1 + that.$t('public.register.miao');
							countdown--;
						} else {
							clearInterval(timer);
							that.code.text = that.$t('public.register.hqyzm');
							that.code.status = false;
						}
					}, 1000);
				} else {
					that.code.status = false;
				}
			});
		},

		register() {
		
			let that = this;
			if (!/^\d{8,10}$/.test(that.u_phone)) {
				that.$msg(that.$t("public.register.qtxzqsjhm"));
				return false;
			}
			if(!that.areaCodeData.code) {
				that.$msg(that.$t('components.selectAreaCode.qszqh'))
				return false;
			}
			if (!that.code.y_code) {
				that.$msg(that.$t("public.register.qtxyzm"));
				return false;
			}
			if (!that.u_nickname) {
				that.$msg(that.$t('public.register.qtxnc'));
				return false;
			}
			if (!that.u_psd) {
				that.$msg(that.$t("public.register.qszdlmm"));
				return false;
			}
			// if (!that.u_code) {
			// 	that.$msg('请填写邀请码');
			// 	return false;
			// }
			var data = { u_phone: that.u_phone, y_code: that.code.y_code, u_psd: that.u_psd, u_code: that.u_code,u_nickname:that.u_nickname, phonecode: that.areaCodeData.code,type: 1};
			that.$api.register(data).then(res => {
				if (res.code == 1) {
					that.$msg(res.msg);
					setTimeout(() => {
						uni.switchTab({
							url:'/pages/index/index'
						}) 
					}, 800);
					
				}
			});
		},

		onTcp() {
			this.isTcp = !this.isTcp;
		}
	}
};
</script>

<style lang="scss">
page {
	background: #fff;
}
.container {
	position: relative;
	width: 100vw;
	height: 100vh;
	overflow: hidden;
	// background: linear-gradient(180deg, rgba(239, 196, 128, 1) 0%, rgba(248, 220, 165, 1) 25%, rgba(255, 255, 255, 1) 98%);
	// titleview
	.head-box {
		padding-top: var(--status-bar-height);
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
}
.wrapper {
	position: absolute;
	z-index: 90;
	padding-bottom: 40upx;
	padding-top: 140upx;
	width: 100vw;
	height: 100vh;
	top: 0;
	// 输入
	.login-box {
		// margin-top: 140rpx;
		.input-item {
			height: 108rpx;
			border-bottom: 1rpx solid #f7f7f7;
			width: 608rpx;
			.inp-title {
				font-size: 30rpx;
				color: #845708;
				padding-right: 30rpx;
			}
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
				font-size: 30rpx;
				color: $zhuse;
				// border-left: 1rpx solid #d0b17b;
				border-radius: 0;
				height: 42rpx;
				width: 190rpx;
				padding: 0;
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
		color: #fff;
	}
	.tip-box {
		width: 630rpx;
		line-height: 108rpx;
		font-size: 24rpx;
		font-weight: 400;
		color: rgba(200, 150, 61, 1);
		.tcp-radio {
			transform: scale(0.5);
		}
		.tcp {
			text-decoration: underline;
		}
	}
}
</style>
