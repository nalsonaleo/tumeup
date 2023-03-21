<template>
	<view class="container">
		<!-- 头部轮播 -->
		<view class="carousel-section">
			<!-- #ifdef APP-PLUS -->
			<view class="topPlace"></view>
			<!-- #endif -->
			<view class="top">
				<view class="top-logo">
					<view class="l" @tap="jump('/pages/index/news')">
						<image src="../../static/imgs/logo/logo.png"></image>
					</view>
					<view class="lang" >
						<mix-list-cell icon="icon-shouhuodizhi" iconColor="#00aa7f" :title="$t('user.title.language')" @eventClick="showLanguage"></mix-list-cell>
					</view> 
					<view class="r" @tap="jump('/pages/index/news')">
						<image src="../../static/imgs/news.png"></image>
					</view>
				</view>
				<view class="search">
					  
					<view class="l">
						<image src="../../static/imgs/search.png"></image>
						<input type="text" placeholder-class="pl-input" :placeholder="$t('pages.pages.search')" v-model="searchVal" @confirm="onSearch" confirm-type="搜索">
					</view>
			
				</view>
				
				<view class="keyword">
					<view class="hot" >Hot :</view>
					<view class="hot-keyword" >{{$t("index.index.hot.xz")}} | {{$t("index.index.hot.zq")}} </view>
				</view>
			</view>
			
			<view class="bot">
				<!-- 标题栏和状态栏占位符 -->
				<view class="titleNview-placing"></view>
				<!-- 背景色区域 -->
				<!-- <view class="titleNview-background" :style="{backgroundColor:titleNViewBackground}"></view> -->
				<swiper class="carousel" autoplay circular @change="swiperChange">
					<swiper-item v-for="(item, index) in banner" :key="index" class="carousel-item" >
						<image :src="item.cover" />
					</swiper-item>
				</swiper>
				<!-- 自定义swiper指示器 -->
				<view class="swiper-dots">
					<text class="num">{{swiperCurrent+1}}</text>
					<text class="sign">/</text>
					<text class="num">{{swiperLength}}</text>
				</view>
			</view>
			
		</view>
		<!-- 分类 -->
		<view class="menu-category-box" v-if="cate" :style="cate.length>0 && cate[0].length <= 4 ? `height:200rpx` : `height:360rpx`">
			<swiper
				class="menu-swiper-box"
				:style="cate.length>0 && cate[0].length <= 4 ? `height:200rpx` : `height:360rpx`"
				@change="onSwiper"
				:autoplay="false"
				:interval="3000"
				:duration="1000"
			>
				<swiper-item class="menu-swiper-item" v-for="(itemList, index) in cate" :key="index" :style="cate.length>0 && cate[0].length <= 4 ? `height:200rpx` : `height:340rpx`">
					<view class="menu-tab-box">
						<view class="tab-list y-f" :style="{ width: 690 / 4 + 'rpx' }" v-for="item in itemList" :key="item.c_name" @tap="toList(item.id)">
							<image class="tab-img" :style="{ width:'88rpx', height: '88rpx' }" :src="item.c_img"></image>
							<text>{{ item.c_name }}</text>
						</view>
					</view>
				</swiper-item>
			</swiper>
			<!-- <view class="menu-category-dots" v-if="cate.length > 1">
				<text :class="categoryCurrent == index ? 'category-dot-active' : 'category-dot'" v-for="(dot, index) in cate.length" :key="index"></text>
			</view> -->
		</view>
		<!-- <view class="cate-section">
			<view class="con">
				<view class="cate-item" v-for="(item,index) in cate" :key='index' @tap="toList(item.id)">
					<image :src="item.c_img"></image>
					<text>{{item.c_name}}</text>
				</view>
			</view>
		</view> -->
		<!-- 分类end -->
		
		<!-- 广告图 -->
		   <div class="top2_wrap" style="background-repeat:no-repeat;background-position:center;background-size:cover;display:block;height:120px;width:100%;border-radius:10px;">
		        
		        <navigator url="/pages/huiyuan/huiyuan" class="on"><img style="width:45%;height:55%;margin:20px 0px 5px 10px;float:left;border-radius:5px;background-color: grey" src="../../static/imgs/cat2.jpg"></navigator>
		<navigator url="/pages/user/team" class="on"><img style="width:45%;height:55%;margin:20px 0px 5px 10px;float:left;border-radius:5px;background-color: grey" src="../../static/imgs/cat3.jpg"></navigator>
		
		    </div>
			<div class="top2_wrap" style="background-repeat:no-repeat;background-position:center;background-size:cover;display:block;height:90px;width:100%;border-radius:10px;">
			     <navigator url="/pages/huiyuan/pintuan" class="on"><img style="width:45%;height:55%;margin:0px 0px 5px 10px;float:left;border-radius:5px;background-color: grey" src="../../static/imgs/cat4.jpg"></navigator>
			     <navigator url="/pages/app/score/list" class="on"><img style="width:45%;height:55%;margin:0px 0px 5px 10px;float:left;border-radius:5px;background-color: grey" src="../../static/imgs/cat1.jpg"></navigator>
			     
					
			 </div>
		<!-- <navigator url="/pages/huiyuan/huiyuan"  class="index_gg" ><image :src="gg1"></image></navigator> -->
		<!-- 399专区 -->
		<!-- <view class="mid_con">
			<navigator  :url="'/pages/goods/detail/index?id='+item.id" class="list" v-for="(item,index) in group" :key='index' >
				<image :src="item.g_img" class="goodsImg"></image>
				<view class="info">
					<view class="top">{{item.g_name}}</view>
					<view class="bot">
						<view class="l"><text style="font-weight: 600;">￥{{item.g_price}}</text><text>￥{{item.g_price1}}</text></view>
						<view class="r">立即拼团</view>
					</view>
				</view>
			</navigator>
		</view> -->
		
		<view class="bot_con">
				<view class="con">
					<image class="gg" :src="gg1"></image>
					<view class="goodsCon">
						<navigator class="list" :url="'/pages/goods/detail/index?id='+item.id" v-for="(item,index) in group" :key='index'>
							<image :src="item.g_img" class="goodsImg"></image>
							<view class="info">
								<view class="t">{{item.g_name}}</view>
								<view class="b">
									<view>
										<text style="font-weight: 600;">￥{{item.g_price}}</text>
										<!-- <text>￥{{item.g_price1}}</text> -->
									</view>
									<image src="../../static/imgs/go.png"></image>
								</view>
							</view>
						</navigator>
						
					</view>
				</view>
			</view>
		
		
		
		
		<!-- 普通产品区 -->
		<view class="bot_con">
			<view class="con">
				<image class="gg" :src="gg2"></image>
				<view class="goodsCon">
					<navigator class="list" :url="'/pages/goods/detail/index?id='+item.id" v-for="(item,index) in goods" :key='index'>
						<image :src="item.g_img" class="goodsImg"></image>
						<view class="info">
							<view class="t">{{item.g_name}}</view>
							<view class="b">
								<view>
									<text style="font-weight: 600;">￥{{item.g_price}}</text>
									<!-- <text>￥{{item.g_price1}}</text> -->
								</view>
								<image src="../../static/imgs/go.png"></image>
							</view>
						</view>
					</navigator>
					
				</view>
			</view>
		</view>
		<uni-popup ref="languagePopup" type="center">
			<view class="vipPopup " style="padding-top: 32rpx;">
				<radio-group name="" @change="changeLanguage">
					<block v-for="(item, index) in locales" :key="index">
						<label class="mix-list-cell b-b" style="display: flex;padding-bottom: 22rpx;">
							<text class="cell-tit clamp">{{ item.text }}</text>
							<radio :value="item.value" :checked="lang == item.value" />
						</label>
					</block>
				</radio-group>
			</view>
		</uni-popup>
	</view>
</template>

<script>

	
	import localeList from '@/locale/locales.js'
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
				cate:[],
				group:[],
				goods:[],
				gg1:'',
				gg2:"",
				searchVal:"",
				categoryCurrent: 0
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
			
			
		},
		getUrlParam(name) {
		     var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
		     var r = window.location.search.substr(1).match(reg); //匹配目标参数
		     if (r != null) return unescape(r[2]); return null; //返回参数值
		   },
		   computed: {
		   	...mapState(['hasLogin', 'shopId', 'userInfo']),
		   
		   	locales() {
		   		return Object.keys(localeList).map(e=>{
		   			return {
		   				text: this.$t('locale.'+e),
		   				value: e
		   			}
		   		})
		   	}
		   },
		methods:{
			...mapMutations(['login', 'logout', 'changeShopId']),
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
			getList(){
				var that = this;
				that.$api.getIndex().then(res => {
					if(res.code == 1){
						that.banner= res.banner;
						that.swiperLength = res.banner.length;
						// that.cate = res.class;
						that.cate = that.sortData( res.class, 4 * 2);
						that.group = res.group;
						that.goods = res.goods;
						that.gg1 = res.img2;
						that.gg2 = res.img3;
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
					url: '/pages/goods/list?keyword='+that.searchVal+'&type=2'
				})
			},
			// 分类进商品列表
			toList(id){
				uni.navigateTo({
					url: '/pages/goods/list?class_id='+id+'&type=2'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.topPlace{width: 100%;height: var(--status-bar-height);background: $zhuse;}
	// 产品分类
	.menu-category-box {
		// margin-bottom: 20rpx;
		padding: 24upx 20upx 0;
		border-radius: 12upx;
		// padding: 36rpx 30rpx 0 30rpx;
		// background: #fff;
	}
	.menu-swiper-box{background: #fff;
		border-radius: 12upx;}
	.menu-category-box,
	.menu-swiper-box {
		position: relative;
		// height: 340rpx!important;
		
		.menu-swiper-item {
			// background: #fff;
			height: 100%;
			width: 100%;
		}
		.menu-tab-box {
			display: flex;
			flex-wrap: wrap;
			margin-top: 30upx;
			.tab-list {
				font-size: 22rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: rgba(51, 51, 51, 1);
				padding-bottom: 30rpx;
	
				.tab-img {
					border-radius: 100%;
					margin-bottom: 10rpx;
				}
			}
		}
	
		.menu-category-dots {
			display: flex;
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
			bottom: 8rpx;
	
			.category-dot {
				width: 40rpx;
				height: 3rpx;
				background: #eeeeee;
				margin-right: 10rpx;
			}
	
			.category-dot-active {
				width: 40rpx;
				height: 3rpx;
				background: $zhuse;
				margin-right: 10rpx;
			}
		}
	}
	page {
		background: #f5f5f5;
	}
	/* 头部 轮播图 */
	.carousel-section {
		position: relative;
		.top{
			width: 100%;padding:14upx 20upx;background: $zhuse;
			// #ifdef MP-WEIXIN
			padding-top: 50upx;
			padding-right: 28%;
			// #endif
		}
		.top-logo{
			display: flex;
			align-items: center;
			justify-content: space-between;
			.lang{
				display: flex;
				margin-right: 20upx;
				font-size: 26upx;
				color: #fff;
				display: block;
				image{
					width: 50upx;
					height: 70upx;
					display: block;
					// margin-bottom: 6upx;
				}
			}
			.l{
				flex: 1;
				margin-right: 20upx;
				padding: 0 10upx;
				height: 80upx;
				display: flex;
				align-items: center;
				image{
					width: 140upx;
					height: 50upx;
					display: block;
					}
				text{font-size: 26upx;color: #fff;margin-left: 10upx;}
				input{height: 100%;color: #fff;font-size: 26upx;margin-left: 10upx;flex: 1;}
				.input-placeholder,.pl-input{color: #fff;}
			}
			.r{
				display: flex;
				flex-direction: column;
				align-items: center;
				text-align: center;
				image{
					width: 50upx;
					height: 50upx;
					display: block;
					// margin-bottom: 6upx;
				}
				text{
					font-size: 16upx;
					color: #fff;
					display: block;
				}
			}
		}
		.search{
			display: flex;
			align-items: center;
			justify-content: space-between;
			.lang{
				display: flex;
				margin-right: 20upx;
				font-size: 26upx;
				color: #fff;
				display: block;
				image{
					width: 50upx;
					height: 50upx;
					display: block;
					// margin-bottom: 6upx;
				}
			}
			.l{
				flex: 1;
				margin-right: 0upx;
				border-radius: 10upx;
				padding: 0 30upx;
				height: 60upx;
				background: rgba(255,255,255,0.1);
				display: flex;
				align-items: center;
				image{width: 28upx;height: 28upx;}
				text{font-size: 26upx;color: #fff;margin-left: 10upx;}
				input{height: 100%;color: #fff;font-size: 26upx;margin-left: 10upx;flex: 1;}
				.input-placeholder,.pl-input{color: #fff;}
			}
			.r{
				display: flex;
				flex-direction: column;
				align-items: center;
				text-align: center;
				image{
					width: 50upx;
					height: 50upx;
					display: block;
					// margin-bottom: 6upx;
				}
				text{
					font-size: 16upx;
					color: #fff;
					display: block;
				}
			}
		}
		.keyword{
			display: flex;
			align-items: center;
			justify-content: space-between;
			.hot{
				display: flex;
				margin-right: 1upx;
				margin-top: 10upx;
				font-size: 26upx;
				color: #fff;
				display: block;
				image{
					width: 50upx;
					height: 50upx;
					display: block;
					// margin-bottom: 6upx;
				}
			}
			.hot-keyword{
				flex: 1;
				margin-top: 10upx;
				color: #fff;
				font-size: 26upx;
				padding: 0 10upx;
				height: 30upx;
				display: flex;
				align-items: center;
				image{width: 28upx;height: 28upx;}
				text{font-size: 26upx;color: #fff;margin-left: 10upx;}
				input{height: 100%;color: #fff;font-size: 26upx;margin-left: 1upx;flex: 1;}
				.input-placeholder,.pl-input{color: #fff;}
			}
			
		}
		position: relative;
		// padding-top: 10px;
		.bot{position: relative;}
		.titleNview-placing {
			position: absolute;
			height: 40%;
			background: $zhuse;
			width: 100%;
		}
	
		.titleNview-background {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 426upx;
			transition: .4s;
		}
	}
	.carousel {
		width: 100%;
		height: 350upx;
		padding: 0 20upx;
		position: relative;
		z-index: 9;
		.carousel-item {
			width: 100%;
			height: 100%;
			// padding: 0 28upx;
			overflow: hidden;
		}
	
		image {
			width: 100%;
			height: 100%;
			border-radius: 10upx;
		}
	}
	.swiper-dots {
		display: flex;
		position: absolute;
		left: 60upx;
		bottom: 15upx;
		width: 72upx;
		height: 36upx;
		background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAABkCAYAAADDhn8LAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTk4MzlBNjE0NjU1MTFFOUExNjRFQ0I3RTQ0NEExQjMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTk4MzlBNjA0NjU1MTFFOUExNjRFQ0I3RTQ0NEExQjMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Q0E3RUNERkE0NjExMTFFOTg5NzI4MTM2Rjg0OUQwOEUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Q0E3RUNERkI0NjExMTFFOTg5NzI4MTM2Rjg0OUQwOEUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4Gh5BPAAACTUlEQVR42uzcQW7jQAwFUdN306l1uWwNww5kqdsmm6/2MwtVCp8CosQtP9vg/2+/gY+DRAMBgqnjIp2PaCxCLLldpPARRIiFj1yBbMV+cHZh9PURRLQNhY8kgWyL/WDtwujjI8hoE8rKLqb5CDJaRMJHokC6yKgSCR9JAukmokIknCQJpLOIrJFwMsBJELFcKHwM9BFkLBMKFxNcBCHlQ+FhoocgpVwwnv0Xn30QBJGMC0QcaBVJiAMiec/dcwKuL4j1QMsVCXFAJE4s4NQA3K/8Y6DzO4g40P7UcmIBJxbEesCKWBDg8wWxHrAiFgT4fEGsB/CwIhYE+AeBAAdPLOcV8HRmWRDAiQVcO7GcV8CLM8uCAE4sQCDAlHcQ7x+ABQEEAggEEAggEEAggEAAgQACASAQQCCAQACBAAIBBAIIBBAIIBBAIABe4e9iAe/xd7EAJxYgEGDeO4j3EODp/cOCAE4sYMyJ5cwCHs4rCwI4sYBxJ5YzC84rCwKcXxArAuthQYDzC2JF0H49LAhwYUGsCFqvx5EF2T07dMaJBetx4cRyaqFtHJ8EIhK0i8OJBQxcECuCVutxJhCRoE0cZwMRyRcFefa/ffZBVPogePihhyCnbBhcfMFFEFM+DD4m+ghSlgmDkwlOgpAl4+BkkJMgZdk4+EgaSCcpVX7bmY9kgXQQU+1TgE0c+QJZUUz1b2T4SBbIKmJW+3iMj2SBVBWz+leVfCQLpIqYbp8b85EskIxyfIOfK5Sf+wiCRJEsllQ+oqEkQfBxmD8BBgA5hVjXyrBNUQAAAABJRU5ErkJggg==);
		background-size: 100% 100%;
	
		.num {
			width: 36upx;
			height: 36upx;
			border-radius: 50px;
			font-size: 24upx;
			color: #fff;
			text-align: center;
			line-height: 36upx;
		}
	
		.sign {
			position: absolute;
			top: 0;
			left: 50%;
			line-height: 36upx;
			font-size: 12upx;
			color: #fff;
			transform: translateX(-50%);
		}
	}
	/* 分类 */
	.cate-section {
		padding: 24upx 20upx 0; 
		.con{
			display: flex;
			// justify-content: space-around;
			align-items: center;
			flex-wrap:wrap;
			background: #fff;
			padding: 24upx 20upx 0;
			border-radius: 12upx;
		}
		.cate-item {
			width: 25%;
			margin-bottom: 24upx;
			text-align: center;
			display: flex;
			flex-direction: column;
			align-items: center;
			font-size: $font-sm + 2upx;
			color: $font-color-dark;
		}
		/* 原图标颜色太深,不想改图了,所以加了透明度 */
		image {
			width: 100upx;
			height: 100upx;
			margin-bottom: 10upx;
			border-radius: 50%;
			// opacity: .7;
			// box-shadow: 4upx 4upx 20upx rgba(250, 67, 106, 0.3);
		}
	}
	.index_gg{
		padding:40upx 20upx 0;
		image{width: 100%;height: 220upx;}
	}
	.mid_con{width: 100%;padding: 30upx 40upx 6upx;background: #fff;
		.list{
			width: 100%;
			margin-bottom: 30upx;
			.goodsImg{
				width: 100%;
				height: 300upx;
				border-radius: 8upx;
			}
			.info{
				margin-top: 8upx;
				.top{font-size: 28upx;color: #434343;width: 100%;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;}
				.bot{
					display: flex;
					align-items: flex-end;
					justify-content: space-between;
					margin-top: 8upx;
					.l{font-size: 34upx;color: $zhuse; text:nth-child(2){font-size: 24upx;color: #999; text-decoration: line-through;margin-left: 20upx;}}
					.r{font-size: 24upx;color: #fff;border-radius: 8upx;padding: 10upx 20upx;background: $zhuse;}
				}
			}
		}
	}
	.bot_con{width: 100%;padding: 30upx;
		.con{
			.gg{width: 100%;height: 260upx;border-radius: 20upx;margin-bottom: 30upx;}
			.goodsCon{
				display: flex;flex-wrap: wrap;
				// justify-content: space-between;
				.list{width: 48%;margin-right: 4%;background: #fff;border-radius: 12upx;margin-bottom: 20upx;
					.goodsImg{
						width: 100%;
						height: 330upx;
						border-top-left-radius: 12upx;
						border-top-right-radius: 12upx;
					}
					.info{
						padding: 16upx;
						.t{font-size: 28upx;color: #434343;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;}
						.b{display: flex;align-items: flex-end;justify-content: space-between;margin-top: 10upx;
							view{font-size: 32upx;color: $zhuse; text:nth-child(2){font-size: 24upx;color: #999; text-decoration: line-through;margin-left: 20upx;}}
							image{width: 54upx;height: 54upx;}
						}
					}
				}
				.list:nth-child(2n+2){margin-right: 0;}
			}
		}
	}
</style>
<style lang="scss">
	%flex-center {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	%section {
		display: flex;
		justify-content: space-around;
		align-content: center;
		background: #fff;
		border-radius: 10upx;
	}

	.user-section {
		padding: 100upx 30upx 0upx;
		position: relative;

		.bg {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			filter: blur(1px);
			opacity: 0.7;
		}
	}

	.user-info-box {
		height: 180upx;
		display: flex;
		align-items: center;
		position: relative;
		z-index: 1;

		.portrait {
			width: 130upx;
			height: 130upx;
			border: 5upx solid #fff;
			border-radius: 50%;
			margin-right: 20upx;
		}

		.username {

			background: no-repeat;
			border: none;
			padding: 0;
			text-align: left;

			&::after {
				display: none;
			}
		}

		.account {

		}

		.invite {

			color: #606060;
		}
	}

	.vip-card-box {
		display: flex;
		flex-direction: column;
		color: #f7d680;
		height: 304upx;
		background: linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8));
		border-radius: 16upx 16upx 0 0;
		overflow: hidden;
		position: relative;
		padding: 20upx 24upx;

		.card-bg {
			position: absolute;
			top: 0upx;
			right: 0;
			width: 690rpx;
			height: 300rpx;
			z-index: 0;
		}

		.relative {
			position: relative;
		}

		.b-btn {
			position: absolute;
			right: 20upx;
			top: 16upx;
			height: 40upx;
			text-align: center;
			line-height: 40upx;
			font-size: 22upx;
			color: #36343c;
			border-radius: 20px;
			background: linear-gradient(to right, #f9e6af, #ffd465);
			z-index: 1;
			padding: 0 8upx;

			.price {
				font-size: 22upx;
			}
		}

		.tip-no {
			background: none;
			color: #f7d680;

		}

		.tit {
	
			color: #f7d680;
			margin-bottom: 16upx;

			.yticon {
				color: #f6e5a3;
				margin-right: 16upx;
			}
		}

		.e-b {

			color: #d8cba9;
			margin-top: 10upx;
		}

		.m-l {
			margin-left: 20upx;
		}
	}

	.vip-card-box-empty {
		height: 30rpx;
	}

	.cover-container {

		padding: 0 30upx;
		position: relative;
		background: #f5f5f5;
		padding-bottom: 20upx;

		.arc {
			position: absolute;
			left: 0;
			top: -34upx;
			width: 100%;
			height: 36upx;
		}
	}

	.tj-sction {
		@extend %section;

		.tj-item {
			@extend %flex-center;
			flex-direction: column;
			height: 140upx;

			color: #75787d;
			flex: 1;
		}

		.num {

			margin-bottom: 8upx;
		}
	}

	.order-header {
		display: flex;
		align-items: center;
		background: #FFFFFF;
		margin-top: 20upx;
		border-radius: 10upx 10upx 0 0;


		.cell-more {
			align-self: center;
			font-size: 30upx;

		}

		.cell-tit {
			flex: 1;

			margin-right: 10upx;
		}

		.cell-tip {

			max-width: 400upx;
			text-align: right;
			line-height: 1.2;
		}
	}

	.order-section {
		@extend %section;
		border-radius: 0 0 10upx 10upx;
		padding: 28upx 0;

		.order-item {
			@extend %flex-center;
			width: 120upx;
			height: 120upx;
			border-radius: 10upx;


			.yticon {
				position: relative;
			}

			.sub {
				position: absolute;
				top: -20upx;
				right: -18upx;
	
				color: #fff;
				background: #fa436a;
				border-radius: 50%;
				width: 36upx;
				height: 36upx;
				text-align: center;
				line-height: 36upx;
			}
		}

		.yticon {
			font-size: 48upx;
			margin-bottom: 18upx;
			color: #fa436a;
		}

		.icon-shouhoutuikuan {
			font-size: 44upx;
		}
	}

	.history-section {
		padding: 30upx 0 0;
		margin-top: 20upx;
		background: #fff;
		border-radius: 10upx;

		.sec-header {
			display: flex;
			align-items: center;

			line-height: 40upx;
			margin-left: 30upx;

			.yticon {
				font-size: 44upx;
				color: #5eba8f;
				margin-right: 16upx;
				line-height: 40upx;
			}
		}

		.h-list {
			white-space: nowrap;
			padding: 30upx 30upx 0;

			.h-list-image {
				display: inline-block;
				margin-right: 20upx;

				image {
					width: 160upx;
					height: 160upx;
					border-radius: 4%;
				}
			}
		}
	}

	.vipPopup {

		background: #FFFFFF;
		width: 700upx;
		padding: 20upx;
		border-radius: 12upx;

		.list-cell {
			display: flex;
			align-items: center;
		}

		.cell-tit {
			flex: 1;
		}
	}

	.admin-section {
		padding: 30upx 0 0 30upx;
		margin-top: 20upx;
		background: #fff;
		border-radius: 10upx;


		.admin-shops {
			display: flex;
			margin-top: 20upx;
			position: relative;
			padding-bottom: 20upx;
			//align-items: center;
			padding-right: 30upx;

			&:last-child::after {
				display: none;
			}
		}

		.right {
			display: flex;
			align-items: center;
			flex: 1;
		}

		image {
			width: 120upx;
			height: 120upx;
			border-radius: 4%;
			margin-right: 20upx;
		}

		.title {

		}

		.content {
			flex: 1;
			margin-right: 20upx;
		}

		.desc {
			margin-top: 12rpx;

		}

		.orders {
			display: flex;
			justify-content: space-between;
			padding-top: 12upx;

			view {
				display: flex;
				flex-direction: column;
				text-align: center;
			}
		}

		.num {

			font-weight: 500;
		}
	}
</style>