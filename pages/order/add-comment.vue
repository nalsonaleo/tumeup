<template>
	<view class="page_box">
		<view class="head_box"></view> 
		<view class="content_box">
			<view class="goods-card">
				<view class="goods-box x-start" v-for="item in goodsDetail.data" :key="index" v-if="item.id == id" style="padding: 30upx 0;" >
					<image class="goods-img" :src="item.g_img" mode=""></image>
					<view class="y-start">
						<view class="goods-title more-t">{{ item.g_name }}</view>
						<view class="size-tip">{{ item.sku_name }}</view>
						<view class="order-goods flex align-center justify-between">
							<text class="order-price">{{$t('money.symbol')}} {{parseFloat(item.o_sum_price)}}</text>
							<text class="order-num">x{{ item.o_num }}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="form-item">
				<view class="star-box x-f">
					<view class="star-title">{{$t("order.addComment.msxf")}}</view>
					<view class=""><sh-star @changeStar="changeStar" :maxStar="5"></sh-star></view>
				</view>
				<view class="area-box">
					<textarea class="inp-area" v-model="info" :placeholder="$t('order.addComment.placeholder')" placeholder-class="pl-style" />
					<view class="img-box">
						<view class="preview-box" v-for="(item, index) in imgList" :key="index">
							<image class="preview-img" :src="item" mode="aspectFill"></image>
							<text class="cuIcon-close" @tap="DelImg(index)"></text>
						</view>
						<view class="choose-img x-c" @tap="onChooseImg" v-if="imgList.length < 3"><text class="cuIcon-cameraadd"></text></view>
					</view>
				</view>
			</view>
		</view>
		<view class="foot_box x-c"><button class="post-btn" @tap="subComment">{{$t("order.addComment.fb")}}</button></view>
	</view>
</template>

<script>
import shoproMiniCard from '@/components/goods/shopro-mini-card.vue';
import shStar from './children/sh-star.vue';
export default {
	components: {
		shoproMiniCard,
		shStar
	},
	data() {
		return {
			id:'',
			orderId:"",
			imgList: [],
			imgId:[],
			uploadImgList: [],
			star: 1,
			info: '',
			goodsDetail:{}
		};
	},
	computed: {},
	onLoad(options) {
		this.id = options.id;
		this.orderId = options.orderId;
		this.getOrderItemDetail();
	},
	methods: {
		// 订单详情
		getOrderItemDetail() {
			let that = this;
			var data = {
				uid: uni.getStorageSync('p_uid'),
				token: uni.getStorageSync('p_token'),
				order_id: that.orderId,
			}
			that.$api.orderInfo(data).then(res => {
				if(res.code == 1){
					that.goodsDetail = res.data;
				}
			});
		},
		// 评星
		changeStar(e) {
			this.star = e.curStar;
		},
		onChooseImg() {
			let that = this;
			uni.chooseImage({
				count: 1,
				sizeType: ['compressed'],
				sourceType: ['album'],
				success: chooseImageRes => {
					const tempFilePaths = chooseImageRes.tempFilePaths;
					that.imgList.push(tempFilePaths[0]);
					uni.uploadFile({
						url:this.global.baseUrl + 'index.php/index/home/up_img',
						filePath: tempFilePaths[0],
						name: 'file_name',
						success: uploadFileRes => {
							let res = JSON.parse(uploadFileRes.data);
							// console.log(res)
							if(res.code == 1){
								that.imgId.push(res.id);
							}
						}
					});
				}
			});
		},
		DelImg(index) {
			let that = this;
			uni.showModal({
				title: that.$t("order.addComment.sczp"),
				content: that.$t("order.addComment.confirm.del.pic"),
				cancelText: that.$t("order.addComment.cancel"),
				confirmText: that.$t("order.addComment.del"),
				success: res => {
					if (res.confirm) {
						this.imgList.splice(index, 1);
						this.imgId.splice(index, 1);
					}
				}
			});
		},
		subComment() {
			let that = this;
			// var files;
			// if(this.imgList.length > 0){
			// 	files=this.imgList.map((value,index)=>{
			// 		return{
			// 			name:'img'+(index+1),
			// 			uri:value
			// 		}
			// 	});
			// }
			var data = {
				uid: uni.getStorageSync('p_uid'),
				token: uni.getStorageSync('p_token'),
				d_id: that.id,
				star:that.star,
				info:that.info,
				img1:that.imgId[0],
				img2:that.imgId[1],
				img3:that.imgId[2]
			};
			that.$api.pingJia(data).then(res => {
				that.$msg(res.msg);
				if (res.code == 1) {
					setTimeout(function(){
						uni.navigateBack();
					},800)
				}
			});

		}
	}
};
</script>

<style lang="scss">
	.order-goods {
		width: 480rpx;
		.order-price {
			font-size: 26rpx;
			font-family: PingFang SC;
			font-weight: 600;
			color: rgba(51, 51, 51, 1);
		}
		.order-num {
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: rgba(153, 153, 153, 1);
		}
	}
	.goods-box {
		position: relative;
		.goods-img {
			width: 200rpx;
			height: 200rpx;
			background-color: #ccc;
			margin-right: 25rpx;
		}
		.order-goods__tag {
			position: absolute;
			top: 0;
			left: 0;
			z-index: 3;
			width: 60rpx;
			height: 30rpx;
		}
		.goods-title {
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: rgba(51, 51, 51, 1);
			width: 450rpx;
			line-height: 40rpx;
		}
	
		.size-tip {
			line-height: 40rpx;
			background: #f4f4f4;
			padding: 0 16rpx;
			font-size: 24rpx;
			color: #666;
			margin: 20rpx 0;
		}
		.sub-tip {
			width: 480rpx;
			line-height: 40rpx;
			// background: #F6F2EA;
			font-size: 24rpx;
			color: #a8700d;
			margin: 10rpx 0;
		}
	
		.price {
			color: $zhuse;
		}
	}
// 评价商品
.goods-card {
	margin: 10rpx 0;
	padding: 20rpx;
	background: #fff;
	.price-box {
		font-size: 26rpx;
		width: 510rpx;
		color: #999;

		.goods-price {
			color: #333;
		}
	}
}
// 评论，选择图片
.form-item {
	background: #ffff;
	padding-bottom: 30rpx;
	.star-box {
		height: 100rpx;
		padding: 0 25rpx;
	}
}
.area-box {
	width: 690rpx;
	min-height: 306rpx;
	background: rgba(249, 250, 251, 1);
	border-radius: 20rpx;
	padding: 28rpx;
	margin: auto;
	.pl-style {
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: rgba(153, 153, 153, 1);
		line-height: 42rpx;
	}
	.inp-area {
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #333;
		line-height: 50rpx;
		width: 100%;
	}
	.img-box {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		margin-top: 20rpx;
		.choose-img,
		.preview-box {
			width: 108rpx;
			height: 108rpx;
			background: rgba(249, 250, 251, 1);
			border: 1rpx solid rgba(223, 223, 223, 1);
			margin-right: 25rpx;
			margin-bottom: 25rpx;
			position: relative;
			&:nth-child(5n) {
				margin-right: 0;
			}
			.cuIcon-cameraadd {
				font-size: 50rpx;
				color: #dfdfdf;
			}
			.preview-img {
				width: 100%;
				height: 100%;
			}
			.cuIcon-close {
				background: $zhuse;
				border-radius: 50%;
				width: 40rpx;
				line-height: 40rpx;
				color: #fff;
				text-align: center;
				position: absolute;
				top: -10rpx;
				right: -10rpx;
			}
		}
	}
}
.post-btn {
	width: 690rpx;
	height: 80rpx;
	background: $zhuse;;
	// background: linear-gradient(90deg, rgba(240, 199, 133, 1), rgba(246, 214, 157, 1));
	border-radius: 40rpx;
	color: rgba(#fff, 0.9);
	margin-bottom: 30rpx;
}
</style>
