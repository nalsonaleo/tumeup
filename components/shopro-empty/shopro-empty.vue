<template>
	<view class="y-f" :class="{ 'shopro-empty': isFixed }">
		<image class="empty-img" :src="emptyData.img" mode="aspectFill"></image>
		<view class="empty-text">{{ emptyData.tip }}</view>
		<view class="btn-box" v-if="emptyData.path">
			<button @tap="toPage(emptyData.path)"  class="cu-btn empty-btn" >{{ emptyData.pathText }}</button>
		</view>
	</view>
</template>

<script>
export default {
	components: {},
	data() {
		return {
			tools: this.$tools
		};
	},
	props: {
		emptyData: {
			// img:空白页图片
			// tip:空白页提示语
			// path:空白页跳转路径
			// pathText:跳转按钮文本。
		},
		isFixed: {
			//是否开启绝对定位。
			type: Boolean,
			default: true
		}
	},
	computed: {},
	methods: {
		toPage(path){
			if(path == '/pages/index/index'){
				uni.switchTab({
					url:path
				})
			}else{
				uni.navigateTo({
					url:path
				})
			}
			// console.log(path)
		}
	}
};
</script>

<style lang="scss">
.shopro-empty {
	position: fixed;
	z-index: 11;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}
.empty-img {
	width: 540rpx;
	height: 290rpx;
}
.empty-text {
	font-size: 26rpx;
	color: #999;
}
.btn-box {
	margin-top: 100rpx;
	.empty-btn {
		width: 320rpx;
		height: 70rpx;
		background: $zhuse;
		border-radius: 35rpx;
		font-size: 28rpx;
		color: rgba(#fff, 0.9);
	}
}
</style>
