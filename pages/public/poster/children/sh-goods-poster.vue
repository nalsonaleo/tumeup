<template>
	<view class="content">
		<view class="poster-box y-f" v-if="poster.finalPath">
			<image :src="poster.finalPath" mode="widthFix" class="posterImage"></image>
			<view class="share-box">
				<view class="share-list-box x-f">
					<!-- #ifdef MP-WEIXIN -->
					<button class="share-item share-btn y-f" open-type="share">
						<image class="share-img" src="http://shopro.7wpp.com/imgs/share_wx.png" mode=""></image>
						<text class="share-title">{{$t("order.payment.shGoodsPoster.wxhy")}}</text>
					</button>
					<!-- #endif -->
					<!-- #ifndef MP-WEIXIN || H5 -->
					<view class="share-item y-f" @tap="share">
						<image class="share-img" src="http://shopro.7wpp.com/imgs/share_wx.png" mode=""></image>
						<text class="share-title">{{$t("order.payment.shGoodsPoster.wxhy")}}</text>
					</view>
					<!-- #endif -->
					<view class="share-item y-f" @tap="saveImage">
						<image class="share-img" src="http://shopro.7wpp.com/imgs/save_img.png" mode=""></image>
						<text class="share-title">{{$t("order.payment.shGoodsPoster.bctp")}}</text>
					</view>
					<view class="share-item y-f" @tap="copyLink">
						<image class="share-img" src="http://shopro.7wpp.com/imgs/share_link.png" mode=""></image>
						<text class="share-title">{{$t("order.payment.shGoodsPoster.fzlj")}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="hideCanvasView">
			<canvas class="hideCanvas" canvas-id="goods_poster" :style="{ width: (poster.width || 1) + 'px', height: (poster.height || 1) + 'px' }"></canvas>
		</view>
	</view>
</template>

<script>
import _app from '../QS-SharePoster/app.js';
import { getSharePoster } from '../QS-SharePoster/QS-SharePoster.js';
import { BASE_URL } from '@/env.js';
import shoproShare from '@/common/mixins/shopro-share';
// #ifdef H5
import wxsdk from '@/common/wechat/sdk';
// #endif
import { mapMutations, mapActions, mapState } from 'vuex';
export default {
	components: {},
	mixins: ['shoproShare'],
	data() {
		return {
			poster: {},
			canvasId: 'goods_poster',
			goodsInfo: {},
			scene: ''
		};
	},
	computed: {
		...mapState({
			userInfo: state => state.user.userInfo,
			shareData: state => state.init.initData.share
		})
	},
	props: {},
	created() {
		let that = this;
		that.goodsInfo = that.$Route.query;
		that.goodsInfo.image = decodeURIComponent(that.$Route.query.image);
		that.setShareInfo({
			query: {
				url: 'goods-' + that.$Route.query.id
			},
			title: that.goodsInfo.title,
			image: that.goodsInfo.image
		});
		if (that.shareInfo) {
			setTimeout(function() {
				that.$emit('getShareInfo', that.shareInfo);
				that.scene = encodeURIComponent(that.shareInfo.path.split('?')[1]);
				that.shareFc();
			}, 100);
		}
	},
	methods: {
		async shareFc() {
			let that = this;
			try {
				console.log('准备生成:' + new Date());
				const d = await getSharePoster({
					_this: this, //若在组件中使用 必传
					// type: 'goodsPoster',
					backgroundImage: that.$tools.checkImgHttp(that.shareData.goods_poster_bg), //接口返回的背景图
					formData: {
						//访问接口获取背景图携带自定义数据
					},
					posterCanvasId: this.canvasId, //canvasId
					delayTimeScale: 20, //延时系数
					drawDelayTime: 500, //draw延时时间
					/* background: {
							width: 1080,
							height: 1920,
							backgroundColor: '#666'
						}, */
					drawArray: ({ bgObj, type, bgScale }) => {
						const dx = bgObj.width * 0.3;
						const fontSize = bgObj.width * 0.042;
						const lineHeight = bgObj.height * 0.04;
						//可直接return数组，也可以return一个promise对象, 但最终resolve一个数组, 这样就可以方便实现后台可控绘制海报
						return new Promise((rs, rj) => {
							rs([
								// {
								// 	type: 'custom',
								// 	setDraw(Context) {
								// 		Context.setFillStyle('black');
								// 		Context.setGlobalAlpha(1);
								// 		Context.fillRect(0, bgObj.height - bgObj.height * 0.2, bgObj.width, bgObj.height * 0.2);
								// 		Context.setGlobalAlpha(1);
								// 	}
								// },
								{
									type: 'image', //头像
									url: that.$tools.checkImgHttp(that.userInfo.avatar),
									alpha: 1,
									dx: bgObj.width * 0.06,
									dy: bgObj.width * 0.06,
									infoCallBack(imageInfo) {
										let scale = (bgObj.width * 0.1) / imageInfo.height;
										return {
											circleSet: {
												x: (imageInfo.width * scale) / 2,
												y: (bgObj.width * 0.1) / 2,
												r: (bgObj.width * 0.1) / 2
											}, // 圆形图片 , 若circleSet与roundRectSet一同设置 优先circleSet设置
											dWidth: imageInfo.width * scale, // 因为设置了圆形图片 所以要乘以2
											dHeight: bgObj.width * 0.1
											/* roundRectSet: { // 圆角矩形
													r: imageInfo.width * .1
												} */
										};
									}
								},
								{
									type: 'text', //昵称
									// fontStyle: 'italic',//倾斜
									text: that.userInfo.nickname,
									size: fontSize,
									color: 'black',
									alpha: 1,
									textAlign: 'middle',
									textBaseline: 'middle',
									infoCallBack(textLength) {
										_app.log('index页面的text的infocallback ，textlength:' + textLength);
										return {
											dx: bgObj.width * 0.2,
											dy: bgObj.width * 0.08
										};
									},
									serialNum: 0,
									id: 'tag1' //自定义标识
								},
								{
									type: 'text', //昵称
									// fontStyle: 'italic',//倾斜
									text: that.$t('pages.public.poster.children.text'),
									size: fontSize * 0.9,
									color: 'black',
									alpha: 1,
									textAlign: 'middle',
									textBaseline: 'middle',
									infoCallBack(textLength) {
										_app.log('index页面的text的infocallback ，textlength:' + textLength);
										return {
											dx: bgObj.width * 0.2,
											dy: bgObj.width * 0.15
										};
									},
									serialNum: 0,
									id: 'tag1' //自定义标识
								},
								{
									type: 'image', //商品图片
									url: that.$tools.checkImgHttp(that.goodsInfo.image),
									alpha: 1,
									drawDelayTime: 500, //draw延时时间
									dx: bgObj.width * 0.052,
									dy: bgObj.width * 0.22,
									infoCallBack(imageInfo) {
										return {
											dWidth: bgObj.width * 0.9,
											dHeight: bgObj.width * 0.9
											// roundRectSet: { // 圆角矩形
											// 	r: bgObj.width * 0.025
											// }
										};
									}
								},
								{
									type: 'text', //标题
									// fontStyle: 'italic',//倾斜
									text: that.goodsInfo.title,
									size: fontSize,
									color: 'black',
									alpha: 1,
									textAlign: 'left',
									textBaseline: 'middle',
									fontWeight: 'bold',
									lineFeed: {
										//换行
										maxWidth: bgObj.width * 0.89,
										lineHeight: bgObj.width * 0.07,
										lineNum: 2,
										dx: -1
									},
									infoCallBack(textLength) {
										_app.log('index页面的text的infocallback ，textlength:' + textLength);
										return {
											dx: bgObj.width * 0.052,
											dy: bgObj.width * 1.17
										};
									},
									serialNum: 0
								},
								{
									type: 'text', //价格
									// fontStyle: 'italic',//倾斜
									text: `${that.$t('money.symbol')}${that.goodsInfo.price}`,
									size: fontSize * 1.1,
									color: '#E1212B',
									alpha: 1,
									textAlign: 'left',
									textBaseline: 'middle',
									fontWeight: 'bold',
									infoCallBack(textLength) {
										_app.log('index页面的text的infocallback ，textlength:' + textLength);
										return {
											dx: bgObj.width * 0.052,
											dy: bgObj.width * 1.32
										};
									},
									serialNum: 0
								},
								{
									type: 'text', //价格
									// fontStyle: 'italic',//倾斜
									text: `${that.$t('money.symbol')}${that.goodsInfo.original_price}`,
									size: fontSize * 0.9,
									color: '#999999',
									alpha: 1,
									textAlign: 'left',
									textBaseline: 'middle',
									lineThrough: {
										style: '#999999'
									},
									infoCallBack(textLength) {
										_app.log('index页面的text的infocallback ，textlength:' + textLength);
										return {
											dx: bgObj.width * 0.3,
											dy: bgObj.width * 1.32
										};
									},
									serialNum: 0
								},
								// #ifdef MP-WEIXIN
								{
									type: 'image', //微信小程序码
									url: `${that.$API_URL}wechat/wxacode?scene=${that.scene}`,
									alpha: 1,
									drawDelayTime: 500, //draw延时时间
									dx: bgObj.width * 0.948 - bgObj.width * 0.2,
									dy: bgObj.height - bgObj.width * 0.052 - bgObj.width * 0.2,
									infoCallBack(imageInfo) {
										return {
											dWidth: bgObj.width * 0.2,
											dHeight: bgObj.width * 0.2
											// roundRectSet: { // 圆角矩形
											// 	r: imageInfo.width * 0.025
											// }
										};
									}
								},
								// #endif
								// #ifndef MP-WEIXIN
								{
									type: 'qrcode',
									text: `${that.shareInfo.path}`,
									size: bgObj.width * 0.16,
									dx: bgObj.width * 0.948 - bgObj.width * 0.18,
									dy: bgObj.height - bgObj.width * 0.052 - bgObj.width * 0.16
								}
								// #endif
							]);
						});
					},
					setCanvasWH: ({ bgObj, type, bgScale }) => {
						// 为动态设置画布宽高的方法，
						this.poster = bgObj;
					}
				});
				// console.log('海报生成成功, 时间:' + new Date() + '， 临时路径: ' + d.poster.tempFilePath);
				// this.poster.finalPath = d.poster.tempFilePath;
				this.$set(this.poster, 'finalPath', d.poster.tempFilePath);
			} catch (e) {
				_app.hideLoading();
				_app.showToast(JSON.stringify(e));
				console.log(JSON.stringify(e));
			}
		},
		// 保存图片
		saveImage() {
			let that = this;
			let platform = uni.getStorageSync('platform');
			if (platform === 'wxOfficialAccount') {
				that.$tools.toast(that.$t('pages.public.poster.children.catpbc'));
			} else {
				uni.saveImageToPhotosAlbum({
					filePath: that.poster.finalPath,
					success: res => {
						that.$tools.toast(that.$t('pages.public.poster.children.bccg'));
					},
					fail: err => {
						that.$tools.toast(that.$t('pages.public.poster.children.bcsb'));
					}
				});
			}
		},
		// 分享
		share() {
			let that = this;
			// #ifdef APP-PLUS
			uni.share({
				provider: 'weixin',
				scene: 'WXSceneSession',
				type: 0,
				href: that.shareInfo.path,
				title: that.shareInfo.title,
				summary: that.shareInfo.title,
				imageUrl: that.shareInfo.image,
				success: res => {
					console.log('success:' + JSON.stringify(res));
				},
				fail: err => {
					console.log('fail:' + JSON.stringify(err));
				}
			});
			// #endif
			// #ifdef H5
			wxsdk.share(
				{
					title: that.shareInfo.title,
					path: that.shareInfo.path,
					imageUrl: that.shareInfo.imageUrl
				},
				res => {
					that.$tools.toast(that.$t('pages.public.poster.children.fxcg'));
				}
			);
			// #endif
		},
		copyLink() {
			let that = this;
			uni.setClipboardData({
				data: that.shareInfo.copyLink,
				success: () => {
					//#ifdef H5
					that.$tools.toast(that.$t('pages.public.poster.children.yfzdjqb'));
					//#endif
				}
			});
		}
	}
};
</script>

<style lang="scss">
page {
	background: #fff;
}

.content {
	position: relative;
	width: 100%;
	height: 100%;

	.bg_img {
		width: 100%;
		height: 100%;
	}

	.poster-box {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		top: 50rpx;

		.posterImage {
			width: 680rpx;
			box-shadow: 0px 9rpx 26rpx 6rpx rgba(190, 190, 190, 0.31);
			border-radius: 35rpx;
			overflow: hidden;
		}
	}
}

.hideCanvasView {
	position: relative;
}

.hideCanvas {
	position: fixed;
	top: -99999upx;
	left: -99999upx;
	z-index: -99999;
}

.share-box {
	background: #fff;
	width: 750rpx;
	border-radius: 30rpx 30rpx 0 0;
	padding-top: 30rpx;
	position: relative;
	margin-top: 40rpx;

	.share-foot {
		font-size: 24rpx;
		color: #bfbfbf;
		height: 80rpx;
		border-top: 1rpx solid #eee;
	}

	.share-list-box {
		.share-btn {
			background: none;
			border: none;
			line-height: 1;
			padding: 0;
			&::after {
				border: none;
			}
		}
		.share-item {
			flex: 1;
			padding-bottom: 20rpx;

			.share-img {
				width: 70rpx;
				height: 70rpx;
				background: rgba(246, 246, 254, 1);
				border-radius: 50%;
				margin-bottom: 20rpx;
			}

			.share-title {
				font-size: 24rpx;
				color: #666;
			}
		}
	}
}
</style>
