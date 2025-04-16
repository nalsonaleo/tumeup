<template>
	<view class="body">
		<view class="adsCon">
			<view class="list">
				<view>{{$t('user.changePayPsd.ymm')}}</view>
				<input type="text" :placeholder="$t('user.changePayPsd.qsrymm')" v-model="old_paypsd" password maxlength="6">
				<text @click="jump('/pages/user/forgetPayPsd')">{{$t('user.changePayPsd.wjmm')}}</text>
			</view>
			<view class="list">
				<view>{{$t('user.changePayPsd.yzm')}}</view>
				<input type="text" :placeholder="$t('user.changePayPsd.yzm.placeholder')" v-model="code.y_code">
				<button class="cu-btn code-btn" :disabled="code.status" @tap="getCode">{{ code.text }}</button>
			</view>
			<view class="list">
				<view>{{$t('user.changePayPsd.szxmm')}}</view>
				<input type="text" :placeholder="$t('user.changePayPsd.qsz.placeholder')" v-model="new_paypsd" password maxlength="6">
			</view>
			<view class="list">
				<view>{{$t('user.changPayPsd.qrmm')}}</view>
				<input type="text" :placeholder="$t('user.changePayPsd.qqrmm.placeholder')" v-model="re_paypsd" password maxlength="6">
			</view>
		</view>
		<view class="subBtn"><view @click="submit">{{$t('user.changePayPsd.tj')}}</view></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				oldPsd:'',
				new_paypsd:'',
				re_paypsd:'',
				old_paypsd: undefined,
				code: {
					text: this.$t('user.changePayPsd.hqyzm'),
					status: false,
					y_code: ''
				},
			}
		},
		onLoad() {
		
		},
		methods: {
			jump(path){
				uni.navigateTo({
					url:path
				})
			},
			//验证码
			getCode() {
				let that = this;
				let countdown = 60;
				that.code.status = true;
				var data = { uid: uni.getStorageSync('p_uid') };
				that.$api.getCode(data).then(res => {
					if (res.code === 1) {
						that.code.text = countdown + that.$t("user.changePayPsd.m");
						that.code.status = true;
						let timer = setInterval(() => {
							if (countdown > 0) {
								that.code.text = countdown - 1 + that.$t("user.changePayPsd.m");
								countdown--;
							} else {
								clearInterval(timer);
								that.code.text = that.$t("user.changePayPsd.hqyzm");
								that.code.status = false;
							}
						}, 1000);
					} else {
						that.code.status = false;
					}
				});
			},
			submit(){
				var $this = this;
				if(!$this.old_paypsd){
					$this.$msg(that.$t("user.changePayPsd.qsrymm.msg"));
					return;
				}
				var reg = new RegExp(/^\d{6}$/);
				if(!$this.code.y_code){
					$this.$msg(that.$t("user.changePayPsd.qsryzm.msg"));
					return;
				}
				if(!reg.test($this.new_paypsd)){
					$this.$msg(that.$t("user.changePayPsd.qsrzfmm.msg"));
					return;
				}
				if(!$this.re_paypsd){
					$this.$msg(that.$t("user.changePayPsd.qqrzfmm.msg"));
					return;
				}
				if($this.re_paypsd != $this.new_paypsd){
					$this.$msg(that.$t("user.changePayPsd.lcsrmmbt.msg"));
					return;
				}
				var data = {
					uid: uni.getStorageSync('p_uid'),
					token: uni.getStorageSync('p_token'),
					old_paypsd:$this.old_paypsd,
					code: $this.code.y_code,
					new_paypsd: $this.new_paypsd,
					re_paypsd:$this.re_paypsd,
				};
				$this.$api.edit_paypsd(data).then(res => {
					$this.$msg(res.msg)
					if (res.code == 1) {
						setTimeout(function(){
							uni.navigateBack()
						},800)
					}
				})
			},
		},
	}
</script>

<style lang="scss" scoped>
	.code-btn {
		background: none!important;
		font-size: 30rpx;
		color: $zhuse!important;
		// border-left: 1rpx solid #d0b17b;
		border-radius: 0;
		height: 42rpx;
		width: 190rpx;
		padding: 0;
	}
	page,.body{
		background: #f3f3f3;
		width: 100%;
		height: 100vh;
		overflow-x: hidden;
		overflow-y: auto;
	}
	.adsCon{
		width: 100%;
		margin-top: 20upx;
		.list{
			font-size: 28upx;
			color: #333;
			padding: 0 30upx;
			height: 102upx;
			background: #fff;
			border-bottom: 2upx solid #f3f3f3;
			display: flex;
			align-items: center;
			view{
				width: 170upx;
			}
			input{
				height: 100%;
				flex: 1;
				font-family: '微软雅黑';
				font-size: 28upx;
				color: #333;
			}
			navigator,text{
				color: $zhuse;
			}
		}
	}
	.subBtn{
		padding: 0 20upx;
		margin-top: 80upx;
		view{
			width: 100%;
			height: 90upx;
			font-size: 32upx;
			color: #fff;
			background: $zhuse;
			border-radius: 60upx;
			text-align: center;
			line-height: 90upx;
		}
	}
</style>
