<template>
	<div class="page-bd chongzhi">
	        <!-- 页面内容-->
	        <div class="account">
	            <div class="text fs28">{{$t('user.upgrade.nxzyzfszf')}}</div>
	            <div class="oblock">
	                <div class="type"><img src="/static/imgs/wx_pay.png" alt=""><span class="fs28">{{$t('user.upgrade.wxskm')}}</span></div>
	                <img src="/static/imgs/wxpay.png" alt="" class="weixinCode">
	            </div>
	            <div class="oblock">
	                <div class="type"><img src="/static/imgs/ali_pay.png" alt=""><span class="fs28">{{$t('user.upgrade.zfbskm')}}</span></div>
	                <img src="/static/imgs/alipay.png" alt="" class="weixinCode">
	            </div>
	            <div class="oblock">
	                <div class="type"><img src="/static/imgs/yinlian.png" alt=""><span class="fs28">{{$t('user.upgrade.yhzh')}}</span></div>
	                <p class="fs32 fw_b color_3">{{$t('user.upgrade.zl')}}</p>
	                <view class="fs28 color_3" style="margin: 5px;">
						<span>{{bank_code}}</span>
						<span @click="copyVal()" style="margin-left: 5px;padding: 5px 10px;background-color: #00BFFF;">{{$t('user.upgrade.fzkh')}}</span>
					</view>
	                <div class="fs28 color_3"><span>{{$t('user.upgrade.jtyh')}}</span></div>
	            </div>
	        </div>
	       
	       
	    </div>
</template>

<script>
	import h5Copy from '@/common/junyi-h5-copy/junyi-h5-copy.js'
	export default {
		data() {
			return {
				info:{},
				bank_code:"6222 6208 1002 7727 078"
			};
		},
		onLoad() {
			this.getInfo();
		},
		methods: {
			getInfo(){
				var that = this;
				var data = {
					uid:uni.getStorageSync('p_uid'),
					token:uni.getStorageSync('p_token'),
				}
				that.$api.kefu(data).then(res => {
					if(res.code == 1){
						that.info = res.data;
					}
				});
			},
			copyVal() {
				let that = this;
				// #ifdef H5
				 let content = this.bank_code // 复制内容，必须字符串，数字需要转换为字符串
				       const result = h5Copy(content)
				       if (result === false) {
				         this.$msg(that.$t('user.upgrade.fzsb'));
				       } else {
				        this.$msg(that.$t('user.upgrade.fzcg'));
				       }
				// #endif
				uni.setClipboardData({
					data: this.bank_code,
					success: () => {
						this.$msg(that.$t('user.upgrade.fzcg'));
					},
					fail: () => {
						this.$msg(that.$t('user.upgrade.fzsb'));
					}
				});
			},
		},
	}
</script>

<style lang="scss">
	.payment .page-bd {
	    padding-bottom: 0.133333rem;
	}
	.account {
	    background-color: #fff;
	}
	.text {
	    padding: .2rem;
	}
	.fs28 {
	    font-size: 0.8rem;
	}
	.oblock {
	    display: flex;
	    align-items: center;
	    justify-content: center;
	    flex-direction: column;
	    padding: 1.2rem 0;
	    background-color: #ff00000a;
		margin: 0 .2rem .98rem;
		border-radius: .066667rem;
	}
	.oblock .type {
	    display: flex;
	    align-items: center;
	    margin-bottom: .133333rem;
	}
	
	.oblock .type img {
	    width: 1.266667rem;
	    height: 1.266667rem;
	    margin-right: .053333rem;
	}
	
	span {
	    touch-action: none;
	}
	.weixinCode {
	    width: 6.466667rem;
	    height: 6.466667rem;
	}
	page{background: #fff;}
	.con{border-top: 1rpx solid #f6f6f6;}
	.tit{text-align: center;font-size: 32upx;margin-top: 300rpx;}
	image{width: 300rpx;height: 300rpx;margin: 50rpx auto;display: block;}
</style>
