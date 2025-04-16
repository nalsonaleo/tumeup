<template>
	<view class="container">				
		<view class="top-logo">
			<view class="l" @tap="jump('/pages/index/news')">
				<image src="../../static/imgs/logo/logo.png"></image>
			</view>
			<view class="lang">
				<mix-list-cell icon="icon-shouhuodizhi" iconColor="#007bff" :title="$t('user.title.language')" @eventClick="showLanguage" src="../../static/imgs/news.png">
				</mix-list-cell>
			</view>
			<view class="r" @tap="jump('/pages/index/news')">
				<image src="../../static/imgs/news.png"></image>
			</view>
		</view>
		<!-- 头部轮播 -->
		<view class="carousel-section">
			<!-- #ifdef APP-PLUS -->
			<view class="topPlace"></view>
			<!-- #endif -->
			<view class="top">

				<view class="search">

					<view class="l">
						<image src="../../static/imgs/search.png"></image>
						<input type="text" placeholder-class="pl-input" :placeholder="$t('pages.pages.search')"
							v-model="searchVal" @confirm="onSearch" confirm-type="$t('pages.pages.search')">
					</view>

				</view>

				<view class="keyword">
					<view class="hot">Hot :</view>
					<view class="hot-keyword">
						<text v-for='(item, index) in keywordsList' :key='item.id' @click='keyWordsSearch(item.keyword)'>
							{{item.keyword}} 
							<text v-if='index !== keywordsList.length - 1'> | </text> 
						</text>
					</view>
				</view>
			</view>
        <!--TOP BANNER START-->
		<view class="bot1">
			<!-- 标题栏和状态栏占位符 -->
			<view class="titleNview-placing1">
				
			</view>
			<!-- 背景色区域 -->
			<swiper class="carousel" >
				<swiper-item v-for="(item, index) in banner" :key="index" class="carousel-item">
					<image class="gg" src="../../static/imgs/index_banner.gif" style="height: 160rpx;">
					</image>	
				</swiper-item>
			</swiper>			
		</view>
		<!--TOP BANNER END-->
		<!--crypto features start-->
		<view class="crypto-features">
			<view class="crypto-header">
				<view class="crypto-icon">
					<image src="../../static/imgs/secunity.png" style="width:30rpx;height: 35rpx;"></image>
				</view>
				<view class="crypto-title">{{$t("Team up Shopping")}}</view>
				<view class="crypto-divider">|</view>
				<view class="crypto-icon">
					<image src="../../static/imgs/secunity.png" style="width:30rpx;height: 35rpx;"></image>
				</view>
				<view class="crypto-title">{{$t("Rebate")}} 50%</view>
			</view>
			
            <!-- 广告图 -->
            <view class="crypto-cards">
            	<navigator url="/pages/activity/groupon/my-groupon" class="crypto-card">
					<image :src="teamup_tag1"></image>
					<text>Trading</text>
				</navigator>
            	<navigator url="/pages/user/team" class="crypto-card">
					<image :src="teamup_tag2"></image>
					<text>Mining</text>
				</navigator>
            <navigator url="/pages/public/webview" class="crypto-card">
				<image :src="teamup_tag3"></image>
				<text>Wallet</text>
				</navigator>
            <navigator url="/pages/public/tuiguang" class="crypto-card">
				<image :src="teamup_tag4"></image>
				<text>Exchange</text>
			</navigator>
			</view>
			
			<view class="crypto-security">
				<navigator url="/pages/public/faq">
					<image src="../../static/imgs/secunity.png" style="width:30rpx;height: 35rpx;"></image>
					<text>Secure Transactions | Privacy Protection | Trading Insurance</text>
					<image src="../../static/imgs/next.png" style="width:30rpx;height:30rpx;"></image>
				</navigator>
			</view>
		</view>
		<!--crypto features end-->
		<!--INDEX BANNER START-->
			<view class="bot">
				<!-- 标题栏和状态栏占位符 -->
				<view class="titleNview-placing"></view>
				<!-- 背景色区域 -->
				<swiper class="carousel" autoplay circular @change="swiperChange">
					<swiper-item v-for="(item, index) in banner" :key="index" class="carousel-item">
						<image :src="item.cover" />
					</swiper-item>
				</swiper>
				<!-- 自定义swiper指示器 -->
				<view class="swiper-dots">
					<view class="num">{{swiperCurrent+1}}</view>
					<view class="sign">/</view>
					<view class="num">{{swiperLength}}</view>
				</view>
			</view>
            <!--INDEX BANNER END-->
		</view>
		<!--crypto products start -->
				<view class="crypto-products">
					<view class="products-header">
						<text>Top Trading Pairs</text>
						<text class="view-all">View All</text>
					</view>
					<view class="products-grid">
						<navigator class="product-card" :url="'/pages/goods/detail/index?id='+item.id" v-for="(item,index) in group" :key='index'>
							<view class="partners-tag">
		                        <text>{{ item.g_sell }} Partner</text>
							</view>
							<image :src="item.g_img" class="product-image"></image>
							<view class="product-info">
								<view class="product-name">{{item.g_name}}</view>
								<view class="product-price">
									<view class="price-info">
										<text class="price">
											{{$t('money.symbol')}}{{item.g_price}}
										</text>
										<text class="change">+2.45%</text>
									</view>
									
									<image src="../../static/imgs/go.png" class="arrow-icon"></image>
								</view>
							</view>
						</navigator>
					</view>
				</view>
		    <!--crypto products end -->

		<!--Language Start-->
		<uni-popup ref="languagePopup" type="center">
			<view class="language-popup">
				<radio-group name="" @change="changeLanguage">
					<block v-for="(item, index) in locales" :key="index">
						<label class="language-option">
							<text class="language-name">{{ item.text }}</text>
							<radio :value="item.value" :checked="lang == item.value" />
						</label>
					</block>
				</radio-group>
			</view>
		</uni-popup>
		<!--Language End-->
	</view>
</template>

<script>
	import localeList from '@/locale/locales.js';
	// #ifdef APP-PLUS
	import AppUpdate from '@/uni_modules/zhouWei-APPUpdate/js_sdk/appUpdate.js'
	// #endif
	import {
		mapState,
		mapMutations
	} from 'vuex';
	let startY = 0,
		moveY = 0,
		pageAtTop = true;
	export default {
		data() {
			return {
				lang: "",
				isLoaded: false,

				titleNViewBackground: '',
				swiperCurrent: 0,
				swiperLength: 0,
				banner: [],
				cate: [],
				group: [],
				goods: [],
				gg1: '',
				gg2: "",
				teamup_tag1: '',
				teamup_tag2: '',
				teamup_tag3: '',
				teamup_tag4: '',
				searchVal: "",
				categoryCurrent: 0,
				keywordsList: [],
			};
		},
		onLoad() {
			this.loadData();
			this.lang = uni.getLocale()
			uni.onLocaleChange((e) => {
				this.lang = e.locale;
			})
		},

		onShow() {
			this.getList()
			this.getKeywords();
			// #ifdef APP-PLUS
			AppUpdate();
			// #endif
		},
		getUrlParam(name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
			var r = window.location.search.substr(1).match(reg); //匹配目标参数
			if (r != null) return unescape(r[2]);
			return null; //返回参数值
		},
		computed: {
			...mapState(['hasLogin', 'shopId', 'userInfo']),

			locales() {
				return Object.keys(localeList).map(e => {
					return {
						text: this.$t('locale.' + e),
						value: e
					}
				})
			}
		},
		methods: {
			...mapMutations(['login', 'logout', 'changeShopId']),
			getKeywords() {
				this.$api.getKeywords().then((res) => {
					this.keywordsList = res.data;
				})
			},
			async loadData() {
				this.isLoaded = true;
			},

			showLanguage() {
				//切换语言,android设备会提示重启
			
				this.$refs.languagePopup.open()
				

			},
			changeLanguage(e) {
				console.log(e)
				this.isAndroid = this.systemInfo.platform.toLowerCase() === 'android';
				if (this.isAndroid) {
					uni.showModal({
						content: this.$t('user.language-change-confirm'),
						success: (res) => {
							if (res.confirm) {
								uni.setLocale(e.detail.value);
								this.$i18n.locale = e.detail.value;
							}
						}
					})
				} else {
				
					uni.setLocale(e.detail.value);
					this.$i18n.locale = e.detail.value;
					this.$forceUpdate();
					uni.redirectTo({
					    url: '/pages/index/index'
					});
				}
				this.$refs.languagePopup.close()
			},

			// 轮播
			onSwiper(e) {
				this.categoryCurrent = e.detail.current;
			},
			// 数据分层
			sortData(oArr, length) {
				let arr = [];
				let minArr = [];
				oArr.forEach(c => {
					if (minArr.length === length) {
						minArr = [];
					}
					if (minArr.length === 0) {
						arr.push(minArr);
					}
					minArr.push(c);
				});

				return arr;
			},
			getList() {
				var that = this;
				that.$api.getIndex().then(res => {
					if (res.code == 1) {
						that.banner = res.banner;
						that.swiperLength = res.banner.length;
						// that.cate = res.class;
						that.cate = that.sortData(res.class, 4 * 2);
						that.group = res.group;
						that.goods = res.goods;
						that.gg1 = res.img2;
						that.gg2 = res.img3;
						that.teamup_tag1 = res.img4;
						that.teamup_tag2 = res.img5;
						that.teamup_tag3 = res.img6;
						that.teamup_tag4 = res.img7;
					}
				});
			},
			jump(path, query) {
				uni.navigateTo({
					url: path
				});
			},
			//轮播图切换修改背景色
			swiperChange(e) {
				const index = e.detail.current;
				this.swiperCurrent = index;
				// this.titleNViewBackground = this.carouselList[index].background;
			},
			// 键盘搜索
			onSearch() {
				let that = this;
				uni.navigateTo({
					url: '/pages/goods/list?keyword=' + that.searchVal + '&type=2'
				})
			},
			// 关键字
			keyWordsSearch(value) {
				let that = this;
				uni.navigateTo({
					url: '/pages/goods/list?keyword=' + value + '&type=2'
				})
			},
			// 分类进商品列表
			toList(id) {
				uni.navigateTo({
					url: '/pages/goods/list?class_id=' + id + '&type=2'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	/* Variables for crypto theme colors */
	$primary-blue: #007bff;
	$secondary-blue: #0056b3;
	$dark-blue: #004085;
	$light-blue: #cce5ff;
	$crypto-dark: #12161c;
	$crypto-bg: #1a2233;
	$crypto-card: #212b3b;
	$crypto-text: #e0e3eb;
	$crypto-success: #00c087;
	$crypto-danger: #f6465d;

	.container {
		background-color: $crypto-bg;
		color: $crypto-text;
		min-height: 100vh;
	}

	.top-logo {
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: fixed;
		width: 100vw;
		background: $primary-blue;
		padding-top: var(--status-bar-height);
		top: 0;
		z-index: 9999;
		box-shadow: 0 2px 10px rgba(0,0,0,0.2);
		
		.lang {
			display: flex;
			margin-right: 10upx;
			font-size: 26upx;
			color: #fff;
			display: block;
	
			image {
				width: 50upx;
				height: 70upx;
				display: block;
			}
		}
	
		.l {
			flex: 1;
			margin-right: 20upx;
			margin-left: 20upx;
			padding: 0 10upx;
			height: 80upx;
			display: flex;
			align-items: center;
	
			image {
				width: 140upx;
				height: 50upx;
				display: block;
			}
	
			text {
				font-size: 26upx;
				color: #fff;
				margin-left: 10upx;
			}
	
			input {
				height: 100%;
				color: #fff;
				font-size: 26upx;
				margin-left: 10upx;
				flex: 1;
			}
	
			.input-placeholder,
			.pl-input {
				color: #fff;
			}
		}
	
		.r {
			display: flex;
			flex-direction: column;
			align-items: center;
			text-align: center;
			margin-right: 20upx;
	
			image {
				width: 50upx;
				height: 50upx;
				display: block;
			}
		}
	}

	/* Carousel section styling */
	.carousel-section {
		background-color: $crypto-bg;
		margin-top: 80upx;
		
		.top {
			padding: 20upx 30upx;
			
			.search {
				display: flex;
				align-items: center;
				height: 60upx;
				background-color: $crypto-card;
				border-radius: 30upx;
				padding: 0 20upx;
				
				.l {
					display: flex;
					align-items: center;
					width: 100%;
					
					image {
						width: 40upx;
						height: 40upx;
					}
					
					input {
						flex: 1;
						padding-left: 16upx;
						color: $crypto-text;
					}
					
					.pl-input {
						color: rgba(255,255,255,0.6);
					}
				}
			}
			
			.keyword {
				display: flex;
				align-items: center;
				padding: 20upx 0;
				font-size: 24upx;
				
				.hot {
					color: $primary-blue;
					font-weight: bold;
					margin-right: 10upx;
				}
				
				.hot-keyword {
					color: rgba(255,255,255,0.8);
					text {
						margin: 0 10upx;
						&:hover {
							color: $primary-blue;
						}
					}
				}
			}
		}
		
		.bot1 {
			height: 160rpx;
			margin: 0 30upx;
			border-radius: 16upx;
			overflow: hidden;
			
			.carousel {
				height: 100%;
				.carousel-item {
					height: 100%;
					image {
						width: 100%;
						height: 100%;
					}
				}
			}
		}
	}

	/* Crypto Features Section */
	.crypto-features {
		margin: 20upx 30upx;
		background-color: $crypto-card;
		border-radius: 16upx;
		padding: 24upx;
		box-shadow: 0 4px 12px rgba(0,0,0,0.1);
		
		.crypto-header {
			display: flex;
			align-items: center;
			background-color: rgba(0, 123, 255, 0.1);
			border-radius: 10upx;
			padding: 16upx;
			margin-bottom: 24upx;
			
			.crypto-icon {
				display: flex;
				align-items: center;
				justify-content: center;
			}
			
			.crypto-title {
				font-size: 26upx;
				font-weight: 500;
				margin-left: 10upx;
				color: $crypto-text;
			}
			
			.crypto-divider {
				margin: 0 20upx;
				color: rgba(255,255,255,0.5);
			}
		}
		
		.crypto-cards {
			display: flex;
			justify-content: space-between;
			margin-bottom: 24upx;
			
			.crypto-card {
				width: 22%;
				display: flex;
				flex-direction: column;
				align-items: center;
				
				image {
					width: 110upx;
					height: 110upx;
					border-radius: 16upx;
					background-color: rgba(0, 123, 255, 0.1);
					padding: 10upx;
					margin-bottom: 10upx;
				}
				
				text {
					font-size: 24upx;
					color: $primary-blue;
					margin-top: 10upx;
				}
			}
		}
		
		.crypto-security {
			border-top: 1px solid rgba(255,255,255,0.1);
			padding-top: 20upx;
			
			navigator {
				display: flex;
				align-items: center;
				
				image:first-child {
					margin-right: 10upx;
				}
				
				text {
					flex: 1;
					font-size: 22upx;
					color: rgba(255,255,255,0.7);
				}
				
				image:last-child {
					margin-left: 10upx;
				}
			}
		}
	}

	/* Bot Section (Main Banner) */
	.bot {
		margin: 30upx;
		height: 300upx;
		position: relative;
		border-radius: 16upx;
		overflow: hidden;
		box-shadow: 0 8px 16px rgba(0,0,0,0.2);
		
		.carousel {
			height: 100%;
			.carousel-item {
				height: 100%;
				image {
					width: 100%;
					height: 100%;
					border-radius: 16upx;
				}
			}
		}
		
		.swiper-dots {
			position: absolute;
			right: 20upx;
			bottom: 20upx;
			display: flex;
			background-color: rgba(0,0,0,0.4);
			border-radius: 30upx;
			padding: 6upx 16upx;
			
			.num {
				color: #fff;
				font-size: 24upx;
			}
			
			.sign {
				margin: 0 5upx;
				color: rgba(255,255,255,0.5);
			}
		}
	}

	/* Crypto Products Section */
	.crypto-products {
		margin: 20upx 30upx;
		
		.products-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 20upx;
			
			text {
				font-size: 32upx;
				font-weight: 600;
				color: $crypto-text;
			}
			
			.view-all {
				font-size: 24upx;
				color: $primary-blue;
			}
		}
		
		.products-grid {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			
			.product-card {
				width: 48%;
				background-color: $crypto-card;
				border-radius: 16upx;
				margin-bottom: 20upx;
				overflow: hidden;
				box-shadow: 0 4px 12px rgba(0,0,0,0.1);
				position: relative;
				
				.partners-tag {
					position: absolute;
					top: 10upx;
					left: 0;
					background-color: rgba(0,0,0,0.6);
					padding: 6upx 16upx;
					border-top-right-radius: 10upx;
					border-bottom-right-radius: 10upx;
					
					text {
						font-size: 20upx;
						color: #fff;
					}
				}
				
				.product-image {
					width: 100%;
					height: 200upx;
					background-color: $crypto-dark;
				}
				
				.product-info {
					padding: 16upx;
					
					.product-name {
						font-size: 26upx;
						font-weight: 500;
						color: $crypto-text;
						margin-bottom: 10upx;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}
					
					.product-price {
						display: flex;
						justify-content: space-between;
						align-items: center;
						
						.price-info {
							display: flex;
							flex-direction: column;
							
							.price {
								font-size: 28upx;
								font-weight: 600;
								color: $crypto-text;
							}
							
							.change {
								font-size: 20upx;
								color: $crypto-success;
							}
						}
						
						.arrow-icon {
							width: 36upx;
							height: 36upx;
						}
					}
				}
			}
		}
	}

	/* Language Popup */
	.language-popup {
		background-color: $crypto-card;
		border-radius: 16upx;
		padding: 30upx;
		width: 80vw;
		
		.language-option {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 20upx 0;
			border-bottom: 1px solid rgba(255,255,255,0.1);
			
			.language-name {
				font-size: 28upx;
				color: $crypto-text;
			}
			
			radio {
				transform: scale(0.8);
			}
		}
	}
</style>