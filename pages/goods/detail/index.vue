<template>
<block>
<!--<view class="load-box" v-if="!goodsInfo.g_price">
    <shopro-skeletons :type="'detail'"></shopro-skeletons>
</view> -->
<view class="detail_box">
	<view class="detail-content">
		<view class="goodes_detail_swiper-box">
			<!-- 详情轮播 -->
			<swiper class="carousel" circular @change="swiperChange" :autoplay="true">
				<swiper-item v-for="(img, index) in goodsInfo.g_imgs" :key="index"
					class="carousel-item">
					<image class="swiper-image" :src="img" mode="aspectFill"
						lazy-load></image>
				</swiper-item>
			</swiper>
			<view v-if="goodsInfo.g_imgs" class="swiper-dots">{{ swiperCurrent + 1 }} /
				{{ goodsInfo.g_imgs.length }}
			</view>
		</view>

		<!-- 价格卡片组 -->
		<sh-price v-if="goodsInfo" :detail="goodsInfo" @change="getActivityRules"></sh-price>
		<view
			style="display: flex;justify-content: center;align-items: center;width: 100%;background-color: #fff;">
			<view>
				<view class="goods-title">{{ goodsInfo.g_name }}</view>
				<view
					style="display: flex;align-items: center;justify-content: space-between;">
					<view class="sub-title">{{$t("user.app.score.list.detail.tip")}}
					</view>
					<!-- <view style="font-size: 26upx;color: #ef3a3a;">【立即加入7人成团】</view> -->
				</view>
			</view>
		</view>

		<!-- 规格选择 -->
		<view class="sku-box" @tap="toShowgg()" v-if="goodsInfo.g_more == 1">
			<view class="x-bc">
				<view class="x-f">
					<text
						class="title">{{$t("user.goods.detail.specification")}}</text>
					<text
						class="tip">{{ currentSkuText || $t("user.goods.detail.specification.placeholder") }}</text>
				</view>
				<text class="cuIcon-right"></text>
			</view>
		</view>
		<shopro-sku v-model="showSku" :goodsInfo="goodsInfo" :buyType="buyType"
			:goodsType="detailType == 'goods'" @changeType="changeType"
			@getSkuText="getSkuText"></shopro-sku>
		<!-- 服务 -->
		<!-- <sh-serve v-model="showServe" :serveList="goodsInfo.service"></sh-serve> -->
		<!-- 优惠券 -->
		<view class="coupon-list" v-if="couponsCan.length && goodsInfo.g_type == 2"
			v-for="c in couponsCan" :key="c.id">
			<view class="coupon-wrap">
				<view class="coupon-item x-bc">
					<view class="coupon-left y-start ">
						<view class="sum-box">
							<text class="unit">{{$t('money.symbol')}}</text>
							<!-- 1代金券   2满减券  3折扣券  4兑换券 -->
							<text class="miso-font sum"
								v-if="c.coupon_type == 1 || c.c_type == 1">{{ c.coupon_price || c.c_price}}</text>
							<text class="miso-font sum"
								v-if="c.coupon_type == 2 || c.c_type == 2">{{ c.coupon_reduce || c.c_reduce}}</text>
							<text
								class="sub">{{ c.coupon_name || c.c_name}}</text>
						</view>
						<view class="notice"
							v-if="c.coupon_type == 2 || c.c_type == 2">
							{{$t("user.goods.detail.man")}}{{ c.coupon_full || c.c_full}}{{$t("user.goods.detail.yky")}}
						</view>
						<view class="notice"
							v-if="c.coupon_type == 3 || c.c_type == 3">
							{{ parseFloat(c.coupon_discount)  ||  parseFloat(c.c_discount) }}{{$t("user.goods.detail.zhe")}}
						</view>
						<view class="notice" v-if="c.type != 2">
							{{$t("user.goods.detail.yxq")}}：{{ c.coupon_start || c.c_start}}
							{{$t("user.goods.detail.zhi")}}
							{{ c.coupon_end || c.c_end}}
						</view>
					</view>
					<view class="coupon-right y-f">
						<view v-if="c.type == 1" style="font-size: 24upx;">
							{{$t("user.goods.detail.shopInfo")}}
						</view>
						<button class="cu-btn get-btn" v-if="c.type == 2"
							@tap="takeCoup(c.id)">
							{{$t("user.goods.detail.button.ljlq")}}</button>
					</view>
				</view>
			</view>
		</view>

		<!-- 选项卡 -->
		<view class="sticky-box">
			<view class="tab-box x-f">
				<view class="tab-item y-f x-c" @tap="onTab(tab.id)"
					v-for="tab in tabList" :key="tab.id">
					<view class="tab-title">{{ tab.title }}</view>
					<text class="tab-line"
						:class="{ 'line-active': tabCurrent == tab.id }"></text>
				</view>
			</view>
			<view class="tab-detail">
				<view class="rich-box" v-show="tabCurrent == 'tab0'">
					<view v-html="goodsInfo.g_detail"></view>
				</view>
				<view class="goods-comment" v-if="tabCurrent == 'tab2'">
					<block v-for="comment in commentList" :key="comment.id">
						<sh-comment :comment="comment"></sh-comment>
					</block>
					<view class="empty-box x-c" v-if="commentList.length == 0">
						<shopro-empty :isFixed="false"
							:emptyData="emptyData"></shopro-empty>
					</view>
					<view class="more-box x-c" v-if="commentList.length > 0">
						<button class="cu-btn more-btn x-f"
							@tap="jump('/pages/goods/comment-list?id='+goodsId)">
							{{$t("user.goods.detail.button.showAll")}}
							<text class="cuIcon-right"></text>
						</button>
					</view>
				</view>
			</view>
		</view>
	</view>
	<!-- 金豆商品foot -->
	<view class="score-foot-box x-f" v-if="goodsInfo.g_type == 3 && !showSku">
		<view class="left x-f">
			<view class="tools-item y-f" @tap="goHome">
				<image class="tool-img"
					src="../../../static/imgs/tabbar/tab-home-current.png" mode="">
				</image>
				<text class="tool-title">{{$t("user.goods.detail.footer.index")}}</text>
			</view>
		</view>
		<view class="right">
			<view class="btn-box x-ac">
			<button class="cu-btn  seckill-btn" @tap="goPay">
			{{$t("user.goods.detail.footer.ljdh")}}</button>
			</view>
		</view>
	</view>
	<!-- 其他商品foot -->
	<view class="detail-foot_box  x-f" v-if="goodsInfo.g_type != 3 && !showSku">
		<view class="left x-f">
			<view class="tools-item y-f" @tap="goHome">
				<image class="tool-img"
					src="../../../static/imgs/tabbar/tab-home-current.png" mode="">
				</image>
				<text class="tool-title">{{$t("user.goods.detail.footer.index")}}</text>
			</view>
                      <!-- Team up foot rules-->
			<view v-if="goodsInfo.g_type == 1" class="tools-item y-f" @tap="rules()">
				<image class="tool-img" :src="'../../../static/imgs/rule.png' " mode="">
				</image>
				<text class="tool-title">{{$t("user.goods.detail.footer.gz")}}</text>
			</view>
		      <!-- Team up foot End-->
                       <!-- Group foot rules-->
			<navigator url="/pages/user/rule" v-if="goodsInfo.g_type == 4"
				class="tools-item y-f">
				<image class="tool-img" :src="'../../../static/imgs/rule.png' " mode="">
				</image>
				<text class="tool-title">{{$t("user.goods.detail.footer.gz")}}</text>
			</navigator>
                        <!-- Group foot end-->
                        <!-- Share -->
			<view v-if="goodsInfo.g_type != 4 && goodsInfo.g_type != 1"
				class="tools-item y-f" @tap="onFavorite(goodsInfo.id)" >
				<image class="tool-img"
					:src="goodsInfo.collect == 0 ? '../../../static/imgs/favorite.png' : '../../../static/imgs/favorite_end.png'" mode=""></image>
				<text class="tool-title">{{$t("user.goods.detail.footer.sc")}}</text>
			</view>
			<view class="tools-item y-f"   @tap="onChat">
                             <image class="tool-img" src="../../../static/imgs/share.png" mode=""></image>
                            <text class="tool-title">{{$t("user.tabbar.chat")}}</text>
                        </view>
			<view class="tools-item y-f" @tap="onShare" v-if="goodsInfo.g_type != 2 ">
			     <image class="tool-img" src="../../../static/imgs/share.png" mode=""></image>
			    <text class="tool-title">{{$t("components.uniPopupShare.fxd")}}  </text>
			</view>
			 <!-- Share End -->
		</view>
		<view class="detail-right" style="flex: 2;">
			 <!-- Cart Buy button-->
			<view class="detail-btn-box x-ac" v-if="goodsInfo.g_type == 2  "
				style="justify-content: flex-end;">
				<button class="cu-btn tool-btn add-btn"
					@tap="addCart">{{$t("user.goods.detail.footer.addgwc")}}</button>
				<button class="cu-btn tool-btn pay-btn"
					@tap="goPay">{{$t("user.goods.detail.footer.ljgh")}}</button>
			</view>
                         <!-- Cart Buy button End -->
			<!-- TEAM UP AND GROUP Buy button -->
		      <view class="detail-btn-box x-ac" v-if="goodsInfo.g_type == 1 || goodsInfo.g_type==4">
				<view class="x-f">
					<button class="cu-btn tool-btn groupon-btn" style="width: 350upx;"
					@tap="goGroup">{{$t("user.goods.detail.footer.ljpt")}}</button>
				</view>
			</view>
			<!-- TEAM UP AND GROUP Buy button End-->
		</view>
	</view>
	<!-- 分享组件 -->
	<!-- <shopro-share v-model="showShare" :goodsInfo="goodsInfo" :posterType="'goods'"></shopro-share> -->
	<!-- 登录提示 -->
	<!-- <shopro-login-modal></shopro-login-modal> -->
</view>
</block>
</template>

<script>
	import shPrice from './children/sh-price.vue';
	import shServe from './children/sh-serve.vue';
	import shGroupon from './children/sh-groupon.vue';
	import shGrouponTip from './children/sh-groupon-tip.vue';
	import shCoupon from './children/sh-coupon.vue';
	import shComment from '../children/sh-comment.vue';
	import shoproSku from '@/components/shopro-sku/shopro-sku.vue';
	import shoproShare from '@/components/shopro-share/shopro-share.vue';
	import shoproParse from '@/components/parse/parse.vue';
	import shoproSkeletons from '@/components/shopro-skeletons/shopro-skeletons.vue';
	import shoproEmpty from '@/components/shopro-empty/shopro-empty.vue';
	import {
		mapMutations,
		mapActions,
		mapState
	} from 'vuex';
	export default {
		components: {
			shPrice,
			shServe,
			shGroupon,
			shCoupon,
			shGrouponTip,
			shoproSku,
			shoproShare,
			shComment,
			shoproParse,
			shoproSkeletons,
			shoproEmpty
		},
		data() {
			return {
				goodsId: '',
				goodsInfo: {},
				commentList: [],
				currentSkuText: '', //选中规格
				detailType: '',
				showShare: false,
				buyType: 'sku',
				grouponBuyType: 'alone', //拼团购买方式。
				showSku: false,
				showServe: false,
				// tools: this.$tools,
				couponsCan: [],
				couponsTake: [],
				favorite: false,
				activityRules: {},
				currentSkuList: [],
				confirmGoodsInfo: {},
				swiperCurrent: 0, //轮播下标
				tabCurrent: 'tab0',
				emptyData: {
					img: '/static/imgs/empty/comment_empty.png',
					tip: `${this.$t('goods.detail.emptyData.tip')}~`
				},
				tabList: [{
						id: 'tab0',
						title: this.$t('goods.detail.emptyData.spqx')
					},
					// {
					// 	id: 'tab1',
					// 	title: '规格参数'
					// },
					// {
					// 	id: 'tab2',
					// 	title: '用户评价'
					// }
				]
			};
		},
		computed: {},
		onLoad(options) {
			var that = this;
			that.goodsId = options.id;
			that.getGoodsDetail();
		},
		onShow() {
			if (uni.removeStorageSync('couponId')) {
				uni.removeStorageSync('couponId');
			}
		},
		methods: {
			// 选择规格弹窗
			toShowgg() {
				this.showSku = true;
				this.buyType = 'sku';
			},
			// 路由跳转
			jump(path, parmas) {
				this.showShare = false;
				uni.navigateTo({
					url: path
				})
			},
			rules() {
				let that = this;
				uni.showModal({
					title: that.$t('goods.detail.emptyData.ptgz'),
					content: that.$t('goods.detail.emptyData.ptgz.content'),
					success: function(res) {
						if (res.confirm) {

						} else if (res.cancel) {

						}
					}
				});
			},
			// 回到首页
			goHome() {
				uni.switchTab({
					url: '/pages/index/index'
				});
			},
			// 轮播图切换
			swiperChange(e) {
				const index = e.detail.current;
				this.swiperCurrent = index;
			},
			// 选项卡
			onTab(id) {
				var that = this;
				that.tabCurrent = id;
			},
			// 商品详情
			getGoodsDetail() {
				let that = this;
				var data;
				if (uni.getStorageSync('p_uid')) {
					data = {
						uid: uni.getStorageSync('p_uid'),
						token: uni.getStorageSync('p_token'),
						id: that.goodsId,
					};
				} else {
					data = {
						id: that.goodsId
					};
				}
				that.$api.goodsInfo(data).then(res => {
					if (res.code == 1) {
						const regex = new RegExp('img', 'gi');
						res.data.g_detail = res.data.g_detail.replace(regex,
							'img style="width:100%;height:auto"');
						that.goodsInfo = res.data;
						if (res.data.g_type == 2) {
							that.tabList = [{
								id: 'tab0',
								title: that.$t(
									'goods.detail.emptyData.spxq'
								)
							}, {
								id: 'tab2',
								title: that.$t(
									'goods.detail.emptyData.yhpj'
								)
							}];
							that.couponsCan = res.coupon;
							that.comment();
						}
					}
				});
			},

			// 获取评价
			comment() {
				var that = this;
				var data = {
					goods_id: that.goodsId,
					page: 1
				}
				that.$api.getComment(data).then(res => {
					if (res.code == 1) {
						that.commentList = res.data;
						// console.log(that.commentList)
					}
				});
			},

			// 领取优惠券
			takeCoup(id) {
				var that = this;
				var data = {
					uid: uni.getStorageSync('p_uid'),
					token: uni.getStorageSync('p_token'),
					id: id,
				};
				that.$api.takeCoupon(data).then(res => {
					if (res.code == 1) {
						that.$msg(res.msg);
						setTimeout(function() {
							that.getGoodsDetail();
						}, 800)
					}
				});
			},

			// 组件返回的type;
			changeType(e) {
				this.buyType = e;
			},
			// 组件返回的规格;
			getSkuText(e) {
				console.log(e)
				this.currentSkuText = e;
			},
			// 分享
			onShare() {
				// this.showShare = true;
				uni.navigateTo({
					url: '../../public/poster/index'
				})
			},
			// 分享
			onChat() {
				// this.showShare = true;
				uni.navigateTo({
					url: '../../user/kefu'
				})
			},
			// 加入购物车
			addCart() {
				var that = this;
				if (uni.getStorageSync('p_token')) {
					// if(that.goodsInfo.g_more == 0){
					// 关闭多规格
					// var data = {
					// 	uid:uni.getStorageSync('p_uid'),
					// 	token:uni.getStorageSync('p_token'),
					// 	goods_id:that.goodsId,
					// 	sku_id:0,
					// 	num:1,
					// };
					// that.$api.addCart(data).then(res => {
					// 	if(res.code == 1){
					// 		that.$msg(res.msg);
					// 	}
					// });
					// }else if(that.goodsInfo.g_more == 1){
					// 开启多规格
					that.buyType = 'cart';
					that.showSku = true;
					// }
				} else {
					that.$msg(that.$t('goods.detail.emptyData.qxdl'));
					setTimeout(function() {
						uni.redirectTo({
							url: '../../public/login'
						})
					}, 800)
				}
			},
			// 立即购买
			goPay() {
				var that = this;
				if (uni.getStorageSync('p_token')) {
					that.buyType = 'buy';
					that.showSku = true;
				} else {
					that.$msg(that.$t('goods.detail.emptyData.qxdl'));
					setTimeout(function() {
						uni.redirectTo({
							url: '../../public/login'
						})
					}, 800)
				}
			},
			// 立即拼团
			goGroup() {
				var that = this;
				var data = {
					uid: uni.getStorageSync('p_uid'),
					token: uni.getStorageSync('p_token'),
					goods_id: that.goodsId,
					sku_id: 0,
					num: 1,
				};
				that.$api.submitGoods(data).then(res => {
					if (res.code == 1) {
						uni.navigateTo({
							url: '/pages/order/confirm?goodsList=' +
								JSON.stringify(res.data) +
								'&from=goods&g_type=' + res
								.g_type,
						})
					}
				});
			},

			// 收藏
			onFavorite(goodsId) {
				let that = this;
				if (!uni.getStorageSync('p_token')) {
					that.$msg(that.$t('goods.detail.emptyData.qxdl'));
					setTimeout(function() {
						uni.redirectTo({
							url: '../../public/login'
						})
					}, 800)
					return
				}
				var data = {
					uid: uni.getStorageSync('p_uid'),
					token: uni.getStorageSync('p_token'),
					goods_id: that.goodsId
				}
				that.$api.toCollect(data).then(res => {
					if (res.code == 1) {
						that.$msg(res.msg);
						if (res.status == 1) {
							that.goodsInfo.collect = 1
						} else {
							that.goodsInfo.collect = 0
						}
					}
					
				});
			}
		}
	};
</script>

<style lang="scss">
	.comment-box {
		padding: 30rpx 0rpx;
		border-bottom: 1rpx solid #eee;
		background: #fff;

		.head {
			margin-bottom: 20rpx;

			.avatar {
				width: 52rpx;
				height: 52rpx;
				border-radius: 50%;
				background: #ccc;
			}

			.user-name {
				font-size: 26rpx;
				color: #999;
				margin: 0 20rpx;
			}

			.star-box {
				.cuIcon-favorfill {
					font-size: 30rpx;
					color: #dedede;
				}

				.star-active {
					color: #ffba00;
				}
			}

			.time {
				font-size: 24rpx;
				color: #c4c4c4;
			}
		}

		.detail {
			font-size: 26rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: rgba(102, 102, 102, 1);
			line-height: 42rpx;
		}

		.img-box {
			margin-top: 30rpx;
			position: relative;

			.mask {
				background: linear-gradient(270deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0) 100%);
				width: 100rpx;
				height: 100%;
				position: absolute;
				z-index: 10;
				right: 0;
			}

			.comment-img {
				width: 166rpx;
				height: 166rpx;
				background: #ccc;
				margin-right: 19rpx;
				margin-bottom: 19rpx;
			}
		}
	}

	.coupon-list {
		margin: 30rpx 20rpx;
	}

	// 未领取，已领取
	.coupon-wrap {
		background: url('http://shopro.7wpp.com/imgs/coupon_bg1.png') no-repeat;
		background-size: 100% 100%;
		position: relative;
		border-radius: 10rpx;
		width: 710rpx;

		.coupon-item {
			width: 100%;
			height: 180rpx;
			border-radius: 10rpx;

			.coupon-left {
				height: 100%;
				justify-content: center;
				padding-left: 40rpx;

				.unit {
					font-size: 24rpx;
					color: #4f3a1e;
				}

				.sum {
					font-size: 55rpx;
					font-weight: bold;
					color: #4f3a1e;
					line-height: 55rpx;
					padding-right: 10rpx;
				}

				.sub {
					font-size: 26rpx;
					color: #4f3a1e;
				}

				.notice {
					font-size: 22rpx;
					color: #a8700d;
					margin-top: 6rpx;
				}
			}

			.coupon-right {
				height: 100%;
				width: 220rpx;
				justify-content: center;
				align-items: center;

				.get-btn {
					width: 142rpx;
					height: 54rpx;
					background: linear-gradient(90deg, rgba(45, 34, 17, 1), rgba(84, 62, 32, 1));
					box-shadow: 0px 2rpx 5rpx 0px rgba(206, 158, 106, 0.46);
					border-radius: 27rpx;
					padding: 0;
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: rgba(239, 197, 130, 1);
				}

				.surplus-num {
					font-size: 22rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: rgba(168, 112, 13, 1);
					margin-top: 14rpx;
				}
			}
		}
	}

	.detail-content {
		padding-bottom: 100rpx;

		&::-webkit-scrollbar {
			width: 0;
			height: 0;
			color: transparent;
		}
	}

	.sticky-box {
		.tab-box {
			position: -webkit-sticky;
			position: sticky;
			top: 0;
			z-index: 99;
		}
	}

	// 商品图片轮播

	.goodes_detail_swiper-box {
		width: 750rpx;
		height: 750rpx;
		position: relative;

		.carousel {
			width: 750rpx;
			height: 100%;
		}

		.carousel-item {
			width: 750rpx;
			height: 100%;
		}

		.swiper-image {
			width: 750rpx;
			height: 100%;
			background: #ccc;
		}

		.swiper-dots {
			display: flex;
			position: absolute;
			right: 20rpx;
			bottom: 20rpx;
			line-height: 44rpx;
			border-radius: 22rpx;
			padding: 0 15rpx;
			background: rgba(#333, 0.3);
			font-size: 28rpx;
			color: rgba(#fff, 0.9);
		}
	}

	// 规格卡片
	.sku-box {
		line-height: 82rpx;
		background: #fff;
		padding: 0 20rpx;
		margin: 20rpx 0;
		font-size: 28rpx;

		.title {
			color: #999;
			margin-right: 20rpx;
		}

		.cuIcon-right {
			color: #bfbfbf;
			font-size: 36rpx;
		}
	}

	.goods-title {
		font-size: 28rpx;
		font-weight: 500;
		line-height: 42rpx;
		background-color: #fff;
		padding-bottom: 10rpx;
		padding: 10rpx 20rpx;
	}

	.sub-title {
		padding: 0 20rpx;
		color: #a8700d;
		font-size: 24rpx;
		font-weight: 500;
		line-height: 42rpx;
		background-color: #fff;
		padding-bottom: 10rpx;
	}

	// 选项卡
	.tab-box {
		height: 102rpx;
		background: #fff;
		border-bottom: 1rpx solid rgba(#dfdfdf, 0.8);
		margin-top: 20rpx;

		.tab-item {
			flex: 1;
			height: 100%;
			position: relative;
			font-size: 30rpx;
			font-weight: bold;

			.tab-line {
				width: 123rpx;
				height: 4rpx;
				left: 50%;
				bottom: 20rpx;
				transform: translateX(-50%);
				background: transparent;
				position: absolute;
				z-index: 2;
			}

			.line-active {
				background: rgba(168, 112, 13, 1);
			}
		}
	}

	.tab-detail {
		min-height: 300rpx;
		background: #fff;
		padding: 30rpx;
		background: #fff;

		.rich-box {

			// font-size: 0;//纯图片间隙问题，如果有文字详情，注释掉。
			image {
				margin-top: -1rpx; //富文本的图片之间的间隙，一般是空格造成，父级用size:0,可以解决，不行就hack一下
			}
		}

		.goods-size {
			padding-top: 30rpx;

			.table-box {
				width: 710rpx;
				margin: auto;
				background: rgba(255, 255, 255, 1);
				border: 1rpx solid rgba(223, 223, 223, 1);

				.t-tr {
					border-bottom: 1rpx solid rgba(223, 223, 223, 1);

					&:last-child {
						border-bottom: none;
					}

					.t-head {
						font-size: 26rpx;
						color: #999;
						flex: 1;
						padding: 15rpx 20rpx;
						height: 100%;
						border-right: 1rpx solid rgba(223, 223, 223, 1);
					}

					.t-detail {
						font-size: 26rpx;
						flex: 4;
						padding: 15rpx 20rpx;
						height: 100%;
					}
				}
			}
		}

		.goods-comment {

			// padding-top: 30rpx;
			.more-box {
				height: 100rpx;
				background: #fff;

				.more-btn {
					width: 200rpx;
					height: 60rpx;
					border: 1rpx solid rgba(213, 166, 90, 1);
					border-radius: 30rpx;
					font-size: 26rpx;
					font-weight: 400;
					color: rgba(168, 112, 13, 1);
					padding: 0;
					background: #fff;

					.cuIcon-right {
						font-size: 30rpx;
						margin-left: 10rpx;
					}
				}
			}
		}
	}

	// 推荐商品
	.guess-box {
		.guess-title {
			height: 90rpx;
			font-size: 30rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: rgba(51, 51, 51, 1);
			background: #fff;
			padding: 0 20rpx;
		}

		.goods-wrap {
			display: flex;
			flex-wrap: wrap;
			padding: 20rpx;

			.goods-item {
				margin-right: 20rpx;
				margin-bottom: 20rpx;

				&:nth-child(2n) {
					margin-right: 0;
				}
			}
		}
	}

	// 金豆底部栏
	.score-foot-box {
		height: 110rpx;
		background: rgba(255, 255, 255, 1);
		border-top: 1rpx solid rgba(238, 238, 238, 1);
		width: 100%;
		position: fixed;
		bottom: 0;
		z-index: 999;

		.left,
		.right {
			flex: 1;
		}

		.tools-item {
			flex: 1;
			height: 100%;

			.tool-img {
				width: 46rpx;
				height: 46rpx;
			}

			.tool-title {
				font-size: 22rpx;
				line-height: 22rpx;
				padding-top: 8rpx;
			}
		}

		.btn-box {
			flex: 1;

			.seckill-btn {
				width: 600rpx;
				height: 80rpx;
				background: linear-gradient(90deg, rgba(49, 133, 243, 1), rgba(80, 205, 242, 1));
				box-shadow: 0px 7px 6px 0px rgba(80, 205, 242, 0.2);
				border-radius: 40rpx;
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: rgba(255, 255, 255, 1);
				margin-right: 20rpx;
			}
		}
	}

	// 底部工具栏
	.detail-foot_box {
		height: 100rpx;
		background: rgba(255, 255, 255, 1);
		border-top: 1rpx solid rgba(238, 238, 238, 1);
		width: 100%;
		position: fixed;
		bottom: 0;
		z-index: 999;

		.left,
		{
			flex: 1;
			float: left;
			margin-left: 35rpx;
			}
		.detail-right {
			flex: 1;
			
		}

		.tools-item {
			flex: 1;
			height: 100%;
                        margin-right:25rpx ;
			.tool-img {
				width: 46rpx;
				height: 46rpx;
			}

			.tool-title {
				font-size: 22rpx;
				line-height: 22rpx;
				padding-top: 8rpx;
			}
		}

		.detail-btn-box {
			flex: 1;

			.tool-btn {
				font-size: 28rpx;
				font-weight: 500;
				color: rgba(#fff, 0.9);
				width: 210rpx;
				height: 70rpx;
				border-radius: 35rpx;
				padding: 0;
				margin-right: 20rpx;

				.price {
					font-size: 24rpx;
					font-weight: bold;
					color: rgba(#fff, 0.9);
				}

				.price-title {
					font-size: 20rpx;
					font-weight: 500;
					color: rgba(#fff, 0.9);
					padding-top: 8rpx;
				}
			}

			.add-btn {
				box-shadow: 0px 2rpx 5rpx 0px rgba(102, 103, 104, 0.46);
				background: linear-gradient(90deg, rgba(103, 104, 105, 1), rgba(82, 82, 82, 1));
			}

			.pay-btn {
				box-shadow: 0px 7rpx 6rpx 0px rgba(229, 138, 0, 0.22);
				// background:$zhuse;
				background: linear-gradient(90deg, rgba(233, 180, 97, 1), rgba(238, 204, 137, 1));
			}

			.seckill-btn {
				width: 432rpx;
				height: 70rpx;
				background: linear-gradient(93deg, rgba(208, 19, 37, 1), rgba(237, 60, 48, 1));
				box-shadow: 0px 7rpx 6rpx 0px rgba(#ed3c30, 0.22);
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: rgba(255, 255, 255, 1);
				border-radius: 35rpx;
				padding: 0;
				margin-right: 20rpx;
			}

			.seckilled-btn {
				width: 432rpx;
				height: 70rpx;
				background: rgba(221, 221, 221, 1);
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #999999;
				border-radius: 35rpx;
				padding: 0;
				margin-right: 20rpx;
			}

			.groupon-btn {
				width: 320rpx;
				height: 70rpx;
				background: linear-gradient(90deg, rgba(254, 131, 42, 1), rgba(255, 102, 0, 1));
				box-shadow: 0px 7rpx 6rpx 0px rgba(255, 104, 4, 0.22);
				border-radius: 35rpx;
			}
		}
	}
</style>