<template>
	<view class="body">
		<view class="list" style="padding: 20rpx;">
			<view style="color: #000;font-size: 30rpx;">{{detail.m_title}}</view>
			<view style="color: #999;font-size: 26rpx;margin-top: 10rpx;">{{detail.m_time}}</view>
		</view>
		<view class="content">
			<view v-html="detail.m_detail"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:0,
				detail:""
			}
		},
		onLoad(options) {
			var info = JSON.parse(options.id);
			const regex = new RegExp('img', 'gi');
			info.m_detail = info.m_detail.replace(regex, 'img style="width:100%;height:auto"');
			this.detail = info;
		},
	}
</script>

<style lang="scss" scoped>
	page,.body{
		background: #fff;
		width: 100%;
	}
	.content{padding:30upx;color: #333;font-size: 30upx;border-top: 2upx solid #f3f3f3;}
</style>
