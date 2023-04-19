<template >
	<view >
		<image :src="poster" class="bg"></image>
		<view class="con">
			<view class="codeCon">
				<image :src="qrcode"></image>
				<view class="code">{{u_code}}</view>
				<view class="txt">{{$t("public.poster.index.wdyqm")}}</view>
			</view>
			<view class=""  style="display: flex;justify-content: center;color: white;">{{$t("public.poster.index.cabctpdsj")}}</view>
			<view class="btn" style="margin-top: 30upx;background: #ffb311;" @click="copyVal()">{{$t("public.poster.index.fzlj")}}</view>
			
		</view>
		<!-- <sh-invite-poster v-if="posterType === 'user'" @getShareInfo="getShareInfo"></sh-invite-poster> -->
		<!-- <sh-goods-poster v-if="posterType === 'goods'" @getShareInfo="getShareInfo"></sh-goods-poster> -->
		<!-- <sh-groupon-poster v-if="posterType === 'groupon'" @getShareInfo="getShareInfo"></sh-groupon-poster> -->
	</view>
</template>

<script>
	 import h5Copy from '@/common/junyi-h5-copy/junyi-h5-copy.js'
// import shInvitePoster from './children/sh-invite-poster.vue';
// import shGoodsPoster from './children/sh-goods-poster.vue';
// import shGrouponPoster from './children/sh-groupon-poster.vue';
export default {
	components: {
		// shInvitePoster,
		// shGoodsPoster,
		// shGrouponPoster
	},
	data() {
		return {
			posterType: '',
			poster:"",
			u_code:"",
			qrcode:"",
			url:''
			// CustomBar: this.CustomBar
		};
	},
	computed: {},
	onLoad(options) {
		this.getInfo();
		// this.posterType = options.posterType;
		// switch (options.posterType) {
		// 	case 'user':
		// 		uni.setNavigationBarTitle({
		// 			title: '邀请好友'
		// 		});
		// 		break;
		// 	case 'goods':
		// 		uni.setNavigationBarTitle({
		// 			title: '商品海报'
		// 		});
		// 		break;
		// 	case 'groupon':
		// 		uni.setNavigationBarTitle({
		// 			title: '拼团海报'
		// 		});
		// 		break;
		// 	default:
		// 		uni.setNavigationBarTitle({
		// 			title: '海报'
		// 		});
		// }
	},
	methods: {
		getInfo() {
			var that = this;
			var data = {
				uid:uni.getStorageSync('p_uid'),
				token:uni.getStorageSync('p_token'),
			}
			that.$api.inviteCode(data).then(res => {
				if(res.code == 1){
					that.u_code = res.u_code;
					that.qrcode = res.qrcode;
					that.url = res.url;
					that.poster = res.poster;
				}
			});
		},
		// 复制邀请码
		copyVal() {
			let that = this;
			// #ifdef H5
			 let content = this.url // 复制内容，必须字符串，数字需要转换为字符串
			       const result = h5Copy(content)
			       if (result === false) {
			         this.$msg(that.$t("public.poster.index.fzsbqcs"));
			       } else {
			        this.$msg(that.$t("public.poster.index.fzcg"));
			       }
			// #endif
			uni.setClipboardData({
				data: this.url,
				success: () => {
					this.$msg(that.$t("public.poster.index.fzcg"));
				},
				fail: () => {
					this.$msg(that.$t("public.poster.index.fzsbqcs"));
				}
			});
		},
		// 保存海报
		saveImg() {
			var that = this;
			var data = {
				uid:uni.getStorageSync('p_uid'),
				token:uni.getStorageSync('p_token'),
			}
			that.$api.makeImg(data).then(res => {
				if(res.code == 200){
					var shareImg = res.path;
					uni.downloadFile({
						//下载图片
						url: shareImg,
						success: res => {
							console.log(res.tempFilePath);
							uni.saveImageToPhotosAlbum({
								//将图片保存在手机
								filePath: res.tempFilePath, //保存的位置
								success: res => {
									that.$msg(that.$t("ublic.poster.index.bccg"));
								}
							});
						}
					});
				}
			});
		},
	}
};
</script>

<style lang="scss">
	.bg{width: 100%;min-height: 133.7vh;position: relative;}
	.con{
		
		width: 100%;min-height: 133.7vh;position: absolute;z-index: 999;top: 0;left: 0;
		.codeCon{
			width: 58%;padding: 70upx 0 60upx;background: #fff;border-radius: 10upx;box-shadow: 0 0 10px #b58484;margin: 340upx auto 50upx;text-align: center;
			image{width: 270upx;height: 270upx;margin: 0 auto;display: block;}
			.code{font-size: 44upx;color: $zhuse;font-weight: 600;margin-top: 30upx;}
			.txt{color: #808080;}
		}
		.btn{width: 58%;height: 70upx;line-height: 70upx; border-radius: 10upx;text-align: center;background: #24b4ff;color: #fff;margin: 0 auto;}
	}
	uni-page-body{
		overflow: hidden;
		min-height: 940px;
		background-color: red;
	}
</style>
