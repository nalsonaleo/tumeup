<script>
	// import checkUpdate from "@/uni_modules/uni-upgrade-center-app/utils/check-update"
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import Vue from 'vue';
	  import {
		client,
		auth
	 } from '@/common/cloud.js';
	import {
		checkAppUpdate, 
		cloudUser
	} from '@/common/functions.js';
	import {
		micLogin
	} from '@/common/request.js';

	const pushClientInfoKey = 'pushClientInfo';
	const userInfoKey = 'userInfo';
	let isCheckLogin = false;
	let hideTime = 0;

export default {
	computed: {
		...mapState(['inviteCode'])
	},
	methods: {
		init(options) {
			return Promise.all([this.setAppInfo()]);
		},
			...mapMutations(['login', 'checkStoreLogin', 'setUserLocation', 'setAdminShop', 'setStateAttr', 'updatePush']),
			/**
			 * 存储设备信息 参考colorUI
			 * @param {Object} 
			 */
			initSize(e) {
				const systemInfo = e;
				let navigationBarHeight;
				let custom = {};
				// #ifndef MP
				custom = {
					height: 36,
					width: 88
				};
				navigationBarHeight = 44;
				// #endif
				// #ifdef MP-WEIXIN
				custom = wx.getMenuButtonBoundingClientRect();
				navigationBarHeight = custom.bottom + custom.top - e.statusBarHeight * 2;
				// #endif	
				// #ifdef MP-TOUTIAO
				custom = tt.getMenuButtonBoundingClientRect();
				navigationBarHeight = custom.bottom + custom.top - e.statusBarHeight * 2;
				// #endif	
				systemInfo.custom = custom;
				systemInfo.navigationBarHeight = navigationBarHeight;
				systemInfo.development = process.env.NODE_ENV == "development";
				console.log(systemInfo);
				Vue.prototype.systemInfo = systemInfo;
			},
			/**
			 * 初始化一键登录
			 */
			async initUniverify() {
				uni.preLogin({
					provider: 'univerify',
					success() { //预登录成功
						// 显示一键登录选项
						console.log("一键登录初始化成功")
					},
					fail(res) { // 预登录失败
						// 不显示一键登录选项（或置灰）
						// 根据错误信息判断失败原因，如有需要可将错误提交给统计服务器
						console.log(res.errCode)
						console.log(res.errMsg)
					}
				})
			},
			/**
			 * 初始化push相关
			 */
			async initPush() {
				console.log('初始化push message');
				let isMessageClick = false;
				plus.push.addEventListener('receive', msg => {
					console.log('收到透传消息', msg);
					let payload = msg.payload;
					if (typeof payload === 'string') {
						msg.payload = JSON.stringify(payload);
					}
					//显示未读红点//给消息图标打点点
					if (msg.payload.notice) {
						uni.$emit("getNewMessage")
					}
					//只有打开APP的状态下，点击通知，跳转到指定页面，否则透传消息早于点击事件
					if (isMessageClick && msg.payload.page) {
						//由后台来确定是否需要打开页面这里不需要设置默认打开页面
						isMessageClick = false;
						//跳转指定页面
						uni.navigateTo({
							url: msg.payload.page
						})
					}
				});
				plus.push.addEventListener('click', msg => {
					console.log('click push message', msg);
					//可能需要调整到指定页面，但是无页面参数
					isMessageClick = true;
				});
				plus.push.getClientInfoAsync(
					info => {
						console.log('push.getClientInfoAsync', info);
						//提交到服务器保存，第一步存到本地缓存
						uni.setStorage({
							key: pushClientInfoKey,
							data: info
						});
						this.updatePush(info)
					},
					err => {
						console.log('push.getClientInfoAsync', err);
					}
				);
			},
			//初始化店铺管理id
			async loadAdminShopId() {
				console.log("loadAdminShopId")
				uni.getStorage({
					key: 'adminShopId',
					success: info => {
						if (info.data && info.data > 0) {
							this.setAdminShop(info.data);
						}
					}
				});
			},
			//小程序如果用户曾经
			async micLogin() {
				console.log("小程序用户自动登录开始")
				uni.getProvider({
					service: 'oauth',
					success: (res) => {
						console.log(res)
						let provider = res.provider[0];
						uni.login({
							provider: provider,
							success: (loginRes) => {
								console.log('loginRes', loginRes);
								console.log('inviteCode', this.inviteCode);
								//小程序自动登录
								micLogin({
									inviteCode: this.inviteCode,
									code: loginRes.code
								}, provider).then(res => {
									console.log("login success", res);
									this.login(res);
								}, err => {
									console.log("小程序自动登录失败！")
								});
							}
						});
					}
				});
			},
			checkLogin() {
				console.log("checkLogin");
				//设置登录状态
				let token = uni.getStorageSync("uni_id_token");
				let tokenExpired = uni.getStorageSync("uni_id_token_expires");
				console.log(token, tokenExpired)
				//#ifdef MP
				//由于微信存在sessionKey，有效期未知，所以这里必须每次打开就登录
				this.micLogin();
				//#endif
				if (token && tokenExpired > new Date().getTime()) {
					//本地已经登录过，不再调用登录接口，有效期至少保证有1天时间
					this.checkStoreLogin({
						"token": token,
						"tokenExpired": tokenExpired
					});
				}
				setTimeout(() => {
					isCheckLogin = true;
				}, 100)
			}
		},
		onLaunch: function(options) {
			console.log('App.vue start');
			//console.log(options);
			//邀请者
			if (options.query.u) {
				this.setStateAttr({
					inviteCode: options.query.u 
				})
			}
			//分享过来的店铺id，正常访问是没有的，这里可以防止分类页面没有店铺id的尴尬
			if (options.query.shopid) {
				this.setStateAttr({
					shopFixedId: +options.query.shopid
				})
			}

			let info = uni.getSystemInfoSync();
			this.initSize(info);
			//#ifdef APP-PLUS
			//检查应用更新，每日一次，新版本升级程序替换
			//checkAppUpdate(false, this.systemInfo);
			//#endif
			this.loadAdminShopId();
			let userLocationInfo = uni.getStorageSync('userLocationInfo') || {};
			if (userLocationInfo.latitude > 0) {
				this.setUserLocation(userLocationInfo);
			}
			this.checkLogin();
			//#ifdef APP-PLUS
			// //检测更新
			// checkUpdate().then(res => {
			// 	console.log("检查更新结果", res)
			// });
			// //初始化一键登录
			// this.initUniverify();
			// //初始化推送
			// this.initPush();
			//#endif
		},
		onShow: function() {
			console.log('App Show');
			//#ifdef MP
			if (isCheckLogin) {
				if (hideTime + 3600 * 1000 < Date.now()) {
					this.checkLogin();
				}
			}
			//#endif
		},
		onHide: function() {
			console.log('App Hide');
			//#ifdef MP
			isCheckLogin = true;
			hideTime = Date.now();
			//#endif
		}
};
</script>

<style lang="scss">
@import 'static/colorui/main.css';
@import 'static/colorui/icon.css';
@import 'static/font/shopro-icon.css';
@import 'common/css/font_4dhwvcc4uaf/iconfont.css';

// 其他scss集成在uni.scss,(变量,class,minix)

page {
	-webkit-overflow-scrolling: touch; //ios滑动不流畅
	height: 100%;
	background: #f6f6f6;
	width: 100%;
	font-size: 30upx;
	// font-family: NotoSansHans-Bold;
	font-family: PingFang SC;
	color: #333;
	overflow-x: hidden;
}
::-webkit-scrollbar {
	width: 0;
	height: 0;
	color: transparent;
	display: none;
}
</style>
<style lang="scss">
	@import url("./common/css/icon.css");
	@import url("./common/css/font_taobao.css");
	@import url("./common/css/colorui/main.css");
	@import url("./common/css/colorui/icon.css");
	@import url("./common/css/base.css");

	view,
	scroll-view,
	swiper,
	swiper-item,
	cover-view,
	cover-image,
	icon,
	text,
	rich-text,
	progress,
	button,
	checkbox,
	form,
	input,
	label,
	radio,
	slider,
	switch,
	textarea,
	navigator,
	audio,
	camera,
	image,
	video {
		box-sizing: border-box;
	}

	/* 骨架屏替代方案 */
	.Skeleton {
		background: #f3f3f3;
		padding: 20upx 0;
		border-radius: 8upx;
	}

	.image-content {
		position: relative;

		image {
			position: relative;
			z-index: 1;
		}

		&:after {
			content: '';
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			// background-image: url('/static/loadingbg.jpg');
			background-size: 100% 100%;
			opacity: 0.3;
		}
	}

	/* 图片载入替代方案 */
	.image-wrapper {
		font-size: 0;
		background: #f3f3f3;
		border-radius: 4px;

		image {
			width: 100%;
			height: 100%;
			transition: 0.6s;
			opacity: 0;

			&.loaded {
				opacity: 1;
			}
		}
	}

	.lazyload {
		position: relative;

		&.lazypic {
			&:after {
				content: '';
				position: absolute;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
				// background-image: url('/static/loadingbg.jpg');
				background-size: 100% 100%;
				opacity: 0.3;
			}
		}

		image {
			position: relative;
			z-index: 1;
			opacity: 0;
		}

		&.loaded image {
			transition: .7s;
			opacity: 1 !important;
		}
	}

	.clamp {
		/* #ifdef APP-PLUS-NVUE */
		lines: 1;
		/* #endif */
		/* #ifndef APP-PLUS-NVUE */
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		display: block;
		/* #endif */
	}

	.clamp2 {
		/* #ifdef APP-PLUS-NVUE */
		lines: 2;
		/* #endif */
		/* #ifndef APP-PLUS-NVUE */
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		/* #endif */
	}

	/* 布局 */
	.row {
		/* #ifndef APP-PLUS-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
	}

	.column {
		/* #ifndef APP-PLUS-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
	}

	.center {
		/* #ifndef APP-PLUS-NVUE */
		display: flex;
		/* #endif */
		align-items: center;
		justify-content: center;
	}

	.fill {
		flex: 1;
	}

	/* input */
	.placeholder {
		color: #999 !important;
	}

	.common-hover {
		background: #f5f5f5;
	}

	/*边框*/
	.b-b:after,
	.b-t:after {
		position: absolute;
		z-index: 3;
		left: 0;
		right: 0;
		height: 0;
		content: '';
		transform: scaleY(0.5);

	}

	.b-b:after {
		bottom: 0;
	}

	.b-t:after {
		top: 0;
	}

	/* button样式改写 */
	uni-button,
	button {
		height: 70upx;
		line-height: 70upx;

		font-weight: normal;

		&.no-border:before,
		&.no-border:after {
			border: 0;
		}
	}

	uni-button[type='default'],
	button[type='default'] {

	}

	/* input 样式 */
	.input-placeholder {
		color: #999999;
	}

	.placeholder {
		color: #999999;
	}

	.tags {
		margin-top: 6upx;
	}

	/* 标签 */
	.tag {

		margin-right: 10upx;

		border-radius: 4upx;
		padding: 2upx 6upx;
		line-height: 1;
		display: inline-block;

		&.info {}

		&.warning {

		}
	}

	/* 价格 */
	.price {

		margin-right: 12upx;

		&:before {
			content: '￥';
			font-size: 0.85em;
		}

		&.del {

			text-decoration: line-through;

			&:before {
	
			}
		}

		&.emphasis {

		}

		&.warning {

		}
	}

	.cny {
		.price:before {
			content: '￥';
		}
	}

	.aud {
		.price:before {
			content: 'A$';
		}
	}

	.usd {
		.price:before {
			content: '$';
		}
	}

	.cad {
		.price:before {
			content: 'C$';
		}
	}

	.eur {
		.price:before {
			content: '€';
		}
	}

	.nzd {
		.price:before {
			content: 'NZ$';
		}
	}

	.jpy {
		.price:before {
			content: 'JP¥';
		}
	}

	.krw {
		.price:before {
			content: '₩';
		}
	}

	.gbp {
		.price:before {
			content: '£';
		}
	}

	.fixed-add-btn {
		position: fixed;
		left: 5%;
		bottom: 20rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 90%;
		height: 70upx;
		margin: 20upx auto;
		color: #fff;
		border-radius: 10upx;
		z-index: 20;
	}

	.fixed-area {
		position: fixed;
		background: #FFFFFF;
		left: 0;
		bottom: 20rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		z-index: 20;
	}
</style>
