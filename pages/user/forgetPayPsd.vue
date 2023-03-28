<template>
	<view class="body">
		<view class="adsCon">
		<!-- 	<view class="list">
				<view>旧密码</view>
				<input type="text" placeholder="请输入旧密码" v-model="oldPsd" password maxlength="6">
			</view> -->
			<view class="list">
				<view>{{$t('user.forgetPayPsd.yzm')}}</view>
				<input type="text" :placeholder="$t('user.forgetPayPsd.yzm.placeholder')" v-model="code.y_code">
				<button class="cu-btn code-btn" :disabled="code.status" @tap="getCode">{{ code.text }}</button>
			</view>
			<view class="list">
				<view>{{$t('user.forgetPayPsd.szmm')}}</view>
				<input type="text" :placeholder="$t('user.forgetPayPsd.qsz.placehoder')" v-model="new_paypsd" password maxlength="6">
			</view>
			<view class="list">
				<view>{{$t('user.forgetPayPsd.qrmm')}}</view>
				<input type="text" :placeholder="$t('user.forgetPayPsd.qrmm.placeholder')" v-model="re_paypsd" password maxlength="6">
			</view>
		</view>
		<view class="subBtn"><view @click="submit">{{$t('user.forgetPayPsd.tj')}}</view></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				oldPsd:'',
				new_paypsd:'',
				re_paypsd:'',
				code: {
					text: this.$t('user.wallet.forgetPayPsd'),
					status: false,
					y_code: ''
				},
			}
		},
		onLoad() {
		
		},
		methods: {
			//验证码
			getCode() {
				let that = this;
				let countdown = 60;
				that.code.status = true;
				var data = { uid: uni.getStorageSync('p_uid') };
				that.$api.getCode(data).then(res => {
					if (res.code === 1) {
						that.code.text = countdown + that.$t('user.wallet.forgetPayPsd.m');
						that.code.status = true;
						let timer = setInterval(() => {
							if (countdown > 0) {
								that.code.text = countdown - 1 + that.$t('user.wallet.forgetPayPsd.m');
								countdown--;
							} else {
								clearInterval(timer);
								that.code.text = that.$t('user.wallet.forgetPayPsd');
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
				// if(!$this.oldPsd){
				// 	$this.$api.msg('请输入旧密码');
				// 	return;
				// }
				var reg = new RegExp(/^\d{6}$/);
				if(!$this.code.y_code){
					$this.$msg($this.$t('user.wallet.forgetPayPsd.qsryzm'));
					return;
				}
				if(!reg.test($this.new_paypsd)){
					$this.$msg($this.$t('user.wallet.forgetPayPsd.qsrwcsjzfmm'));
					return;
				}
				if(!$this.re_paypsd){
					$this.$msg($this.$t('user.wallet.forgetPayPsd.qqrzfmm'));
					return;
				}
				if($this.re_paypsd != $this.new_paypsd){
					$this.$msg($this.$t('user.wallet.forgetPayPsd.lcsrmmbt'));
					return;
				}
				var data = {
					uid: uni.getStorageSync('p_uid'),
					token: uni.getStorageSync('p_token'),
					code: $this.code.y_code,
					new_paypsd: $this.new_paypsd,
					re_paypsd:$this.re_paypsd,
				};
				$this.$api.forget_paypsd(data).then(res => {
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
