<template>
	<view class="">
		<view class="goods-box x-start" v-if="!type" @tap="jump('/pages/goods/detail/index?id='+detail.id)">
			<image class="goods-img" :src="detail.image" mode="aspectFill"></image>
			<view class="y-start">
				<view class="goods-title more-t">{{ detail.title }}</view>
				<slot name="tipTag"></slot>
				<view class="size-tip">{{ detail.goods_sku_text }}</view>
				<slot name="goodsBottom">
					<view class="price">￥{{ detail.price }}</view>
				</slot>
			</view>
		</view>
		<view class="goods-box x-start" v-if="type == 'sku'" @tap="jump('/pages/goods/detail/index?id='+detail.goods_id)">
			<image class="goods-img" :src="detail.img_path ? detail.img_path:detail.g_img" mode=""></image>
			<view class="y-start">
				<view class="goods-title more-t">{{ detail.g_name }}</view>
				<slot name="tipTag"></slot>
				<view class="size-tip" v-if="detail.sku_name">{{ detail.sku_name }}</view>
				<slot name="goodsBottom">
					<view class="price">￥{{ detail.g_price }}</view>
				</slot>
			</view>
		</view>
		<view class="goods-box x-start" v-if="type == 'favorite'" @tap="jump('/pages/goods/detail/index?id='+detail.goods_id)">
			<image class="goods-img" :src="detail.g_img" mode=""></image>
			<view class="y-start">
				<view class="goods-title more-t">{{ detail.g_name }}</view>
				<slot name="tipTag"></slot>
				<view class="sub-tip more-t">正品保证 放心购</view>
				<slot name="goodsBottom">
					<view class="price">￥{{ detail.g_price }}</view>
				</slot>
				
			</view>
		</view>
		<view v-if="type == 'order'">
			<view class="goods-box x-start" style="padding: 30upx 0; border-bottom: 1px solid #f6f6f6;" v-for="item in detail.data" :key='item.id'>
				<!-- <image v-if="detail.activity_type" class="order-goods__tag" :src="orderStatus[detail.activity_type]" mode=""></image> -->
				<image class="goods-img" :src="item.g_img" mode=""></image>
				<view class="y-start">
					<view class="goods-title more-t">{{ item.g_name }}</view>
					<view class="size-tip">{{ item.sku_name }}</view>
					<view class="order-goods flex align-center justify-between">
						<text class="order-price"><text v-if="item.o_type==3">{{item.o_t_integral3}}金豆+</text> ￥{{parseFloat(item.o_unit_price)}}</text>
						<text class="order-num">x{{ item.o_num }}</text>
					</view>
					<view class="sub-tip more-t" v-if="item.o_type==4" style="margin-top: 10px;display: flex;justify-content: space-between;">
					<view>{{ item.c_num }}人团</view>
					<view class="sss" v-if="item.back_money>0">返佣:{{item.back_money}}</view>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
export default {
	components: {},
	data() {
		return {
			routerTo: this.$Router,
			orderStatus: {
				seckill: '/static/imgs/seckill_tag.png',
				groupon: '/static/imgs/groupon_tag.png'
			}
		};
	},
	props: {
		detail: {},
		sku: {},
		type: ''
	},
	computed: {
		goodsId() {
			return this.detail.goods_id;
		}
	},
	created() {},
	methods: {
		// 路由跳转
		jump(path, parmas) {
			// console.log(parmas, this.detail);
			uni.navigateTo({
				url:path
			})
		}
	}
};
</script>

<style lang="scss">
// order
.sss {
    width: 6.16rem;
    height: 1.5rem;
    text-align: center;
    line-height: 1.5rem;
    color: #fff;
    -webkit-border-radius: .5rem;
    border-radius: .7rem;
    font-size: 0.8rem;
	 background-color: #ff1f44 !important;
}

   

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
</style>
