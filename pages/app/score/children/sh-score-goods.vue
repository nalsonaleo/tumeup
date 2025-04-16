<template>
	<navigator class="shop-list y-f" :url="'/pages/goods/detail/index?id='+scoreData.id">
		<view class="image-box"><image class="shop-img" :src="scoreData.g_img" mode="aspectFill"></image></view>
		<view class="shop-title one-t">{{ scoreData.g_name }}</view>
		<view class="num-box x-bc">
			<view class="beans-box x-f">
				<image class="bean-img" src="../../../../static/imgs/score.png" mode=""></image>
				{{ scoreData.g_integral3 }}{{$t("user.app.score.list.goods.fortunellaVenosa")}}+￥{{ scoreData.g_price }}
			</view>
			<view class="end-cash">{{$t("user.app.score.list.converted")}}{{ scoreData.g_sell }}{{$t("user.app.score.list.piece")}}</view>
		</view>
	</navigator>
</template>

<script>
export default {
	components: {},
	data() {
		return {};
	},
	computed: {},
	props: {
		scoreData: {}
	},
	methods: {
		jump(path, parmas) {
			this.$Router.push({
				path: path,
				query: parmas
			});
		}
	}
};
</script>

<style lang="scss">
.shop-list {
	width: 345upx;
	margin-bottom: 20upx;
	background-color: #fff;
	// padding-bottom: 30rpx;
	.image-box {
		margin-bottom: 20upx;
		width: 345upx;
		height: 345upx;
		border-radius: 20rpx 20rpx 0 0;
		overflow: hidden;
		.shop-img {
			width: 100%;
			height: 100%;
			background: #ccc;
		}
	}

	.shop-title {
		font-size: 28upx;
		line-height: 36rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(51, 51, 51, 1);
		line-height: 36upx;
		width: 300rpx;
		margin: 0 auto 20rpx;
		// height: 72rpx;
	}

	.num-box {
		width: 100%;
		padding: 0 20rpx;
		flex-wrap: wrap;
	}

	.beans-box {
		font-size: 30upx;
		font-family: SimHei;
		font-weight: bold;
		color: $zhuse;
		margin-bottom: 10rpx;

		.bean-img {
			width: 36upx;
			height: 36upx;
			margin-right: 8upx;
		}
	}

	.end-cash {
		font-size: 22upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(153, 153, 153, 1);
		margin-bottom: 10rpx;
	}
}
</style>
