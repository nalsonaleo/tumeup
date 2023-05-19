<template>
	<view class="container">
	   
		<view class="top-logo">
			<view class="l" @tap="jump('/pages/index/index')">
				<image src="../../static/imgs/logo/logo.png"></image>
			</view>
			<view class="lang">
			{{$t("pages.huiyuan.huiyuan")}}
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
				<!-- 标题栏和状态栏占位符 -->
				<view class="titleNview-placing"></view>
				<!-- 背景色区域 -->
				<!-- <view class="titleNview-background" :style="{backgroundColor:titleNViewBackground}"></view> -->
				<swiper class="carousel" autoplay circular @change="swiperChange">
					<swiper-item v-for="(item, index) in bannerList" :key="index" class="carousel-item" >
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
		<view class="menu-category-box" v-for="(itemList, index) in cate" :key="index" v-if="cate" :style="cate[0].length <= 4 ? `height:200rpx` : `height:360rpx`">
			<swiper
				class="menu-swiper-box"
				v-for="(itemList, index) in cate" :key="index"
				:style="cate[0].length <= 4 ? `height:200rpx` : `height:360rpx`"
				@change="onSwiper"
				:autoplay="false"
				:interval="3000"
				:duration="1000"
			>
				<swiper-item class="menu-swiper-item" v-for="(itemList, index) in cate" :key="index" :style="cate[0].length <= 4 ? `height:200rpx` : `height:340rpx`">
					<view class="menu-tab-box">
						<view class="tab-list y-f" :style="{ width: 690 / 4 + 'rpx' }" v-for="item in itemList" :key="item.c_name" @tap="toList(item.id)">
							<image class="tab-img" :style="{ width:'100rpx', height: '100rpx' }" :src="item.c_img"></image>
							<text>{{ item.c_name }}</text>
						</view>
					</view>
				</swiper-item>
			</swiper>
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
	<!-- 399专区 -->
		
		
		<!-- 普通产品区 -->
		<view class="bot_con" style="margin-top: 20px;">
			<view class="con">
				<view class="goodsCon">
					
					<navigator class="list" v-for="(item,index) in goods2" :key='index' :url="'/pages/goods/detail/index?id='+item.id">
						<image :src="item.g_img" class="goodsImg"></image>
						<view class="info">
							<view class="t">{{item.g_name}}</view>
							<view class="b">
								<view>
									<text style="font-weight: 600;">{{$t('money.symbol')}}{{item.g_price}}</text>
								</view>
								<image src="../../static/imgs/go.png"></image>
							</view>
						</view>
					</navigator>

				</view>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				titleNViewBackground: '',
				swiperCurrent: 0,
				swiperLength: 0,
				bannerList: [],
				cate:[],
				goods1:[],
				goods2:[]
			};
		},
		onPageScroll(e) {
			//兼容iOS端下拉时顶部漂移
			if (e.scrollTop >= 0) {
				this.headerPosition = 'fixed';
			} else {
				this.headerPosition = 'absolute';
			}
		},
		onLoad() {
			this.getList()
		},
		methods:{
			getList(){
				var that = this;
				that.$api.getGroup().then(res => {
					if(res.code == 1){
						that.bannerList = res.banner;
						that.swiperLength = res.banner.length;
						// that.cate = res.class;
						that.cate = that.sortData( res.class, 4 * 2);
						that.goods1 = res.goods.slice(0,3);
						that.goods2 = res.goods;
					}
				});
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
			// 分类进商品列表
			toList(id){
				uni.navigateTo({
					url: '/pages/goods/list?class_id='+id+'&type=1'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.topnav{top:0;left:0;position: relative;display:flex;width: 100% !important;justify-content: center;align-items:center;flex-direction: column;}
	.top-logo {
		//position: relative;	
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: fixed;
		width: 100vw;
		width: 100% !important;
		background: $zhuse;
		padding-top: var(--status-bar-height);
		top: 0;
		z-index: 9999;
		.lang {
			display: flex;			
			//float: left;
			font-size:0.8rem;font-weight:bold;
			color: #fff;
			display: block;
			width: 	50% !important;
			justify-content: center;align-items:center;flex-direction: column;
			
			image {
				width: 50upx;
				height: 80upx;
				display: block;
				width: 	33.3% !important;
				// margin-bottom: 6upx;
			}
		}
	
		.l {
			flex: 1;
			//margin-right: 20upx;
			margin-left: 20upx;
			width: 	33.3% !important;
			//padding: 0 10upx;
			height: 70upx;
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
				// margin-bottom: 6upx;
			}
	
			text {
				font-size: 16upx;
				color: #fff;
				display: block;
			}
		}
	}
	// 产品分类
	.menu-category-box {
		margin-bottom: 20rpx;
		padding: 24upx 20upx 0;
		border-radius: 12upx;
		// padding: 36rpx 30rpx 0 30rpx;
		// background: #fff;
	}
	.menu-swiper-box{background: #fff;
		border-radius: 12upx;}
	
	.menu-category-box,.menu-swiper-box {
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
				font-size: 26rpx;
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
	.topPlace {
		width: 100%;
		height: var(--status-bar-height);
		background: $zhuse;
	}
	/* 头部 轮播图 */
	.carousel-section {
		padding-top: 50upx;
		position: relative;
		
		.top{	
			width: 100%;
			padding: 14upx 20upx;
			background: $zhuse;
			padding-top: 40rpx;
			// #ifdef MP-WEIXIN
			padding-top: 50upx;
			padding-right: 28%;
			
			// #endif}
		.search{
			display: flex;
			align-items: center;
			justify-content: space-between;
			.l{
				flex: 1;
				margin-right: 40upx;
				border-radius: 30upx;
				padding: 0 30upx;
				height: 60upx;
				background: rgba(255,255,255,0.1);
				display: flex;
				align-items: center;
				image{width: 28upx;height: 28upx;}
				text{font-size: 26upx;color: #fff;margin-left: 10upx;}
				input{height: 100%;color: #fff;}
			}
			.r{
				display: flex;
				flex-direction: column;
				align-items: center;
				text-align: center;
				image{
					width: 36upx;
					height: 56upx;
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
		//position: relative;
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
		height: 280upx;
		padding: 30upx 20upx 0;
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
	.mid_con{width: 100%;padding: 30upx 30upx 6upx;
	// background: #fff;
		.list{
			width: 100%;
			margin-bottom: 30upx;
			background: #fff;
			.goodsImg{
				width: 100%;
				height: 300upx;
				border-radius: 8upx;
			}
			.info{
				padding:10upx 20upx 20upx;
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
	.bot_con{width: 100%;padding:0 30upx 30upx;
		.con{
			.gg{width: 100%;height: 260upx;border-radius: 20upx;margin-bottom: 30upx;}
			.goodsCon{
				display: flex;
				justify-content: space-between;flex-wrap: wrap;
				.list{width: 48%;margin-right: 4%;background: #fff;border-radius: 12upx;margin-bottom: 30upx;
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
