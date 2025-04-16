<template>
	<view class="con">
		<view class="con">
			<!-- <view >{{info.kf_name}}{{info.kf_tel}}</view> -->
			<!-- <image :src="info.kf_img" style="width: 96%;min-height: 600px;"></image> -->
			<iframe width="100%" height="200px" src="https://www.youtube.com/embed/CeIfzyt5JU8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info:{}
			};
		},
		onLoad() {
			this.getInfo();
		},
		methods: {
			getInfo(){
				var that = this;
				var data = {
					uid:uni.getStorageSync('p_uid'),
					token:uni.getStorageSync('p_token'),
				}
				that.$api.kefu(data).then(res => {
					if(res.code == 1){
						that.info = res.data;
					}
				});
			},
		},
	}
</script>

<style lang="scss">
	page{background: #fff;}
	.con{border-top: 1rpx solid #f6f6f6;}
	.tit{text-align: center;font-size: 32upx;margin-top: 300rpx;}
	image{width: 300rpx;height: 300rpx;margin: 50rpx auto;display: block;}
</style>
