<template>
	<view class="body">
		<view class="newsCon" >
			<scroll-view scroll-y="true" @scrolltolower="getMore">
			<!-- <view class="tit">{{item.time}}</view> -->
			<view class="list" v-for="(item,index) in faqList" :key='index' @click="toPath(item)">
				<view style="display: flex;align-items: center;justify-content: space-between;font-size: 26rpx;">
					<text style="color: #000;font-size: 30rpx;">{{item.m_title}}</text>
					<text style="color: #999;">{{item.m_time}}</text>
				</view>
				<view class="more-t" style="font-size: 26upx;color: #333;margin-top: 20rpx;" v-html="item.m_detail"></view>
			</view>
			
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				faqList: [],
				loadStatus: '', //loading,over
				page: 1,
				hasMore:true
			}
		},
		onLoad() {
			this.getFaqList();
		},
		methods:{
			toPath(item){
				uni.navigateTo({
					url:'/pages/index/newsD?id='+JSON.stringify(item)
				})
			},
			
			getFaqList() {
				let that = this;
				that.loadStatus = 'loading';
				var data = {
					type:2,
					page:that.page
				}
				that.$api.question(data).then(res => {
					if(res.code == 1){
						that.faqList = [...that.faqList, ...res.data];
						if (res.data.length != 0) {
							that.loadStatus = '';
							that.hasMore = true
						} else {
							that.hasMore = false;
							that.loadStatus = 'over';
						}
					}
				});
			},
			
		},
	}
</script>

<style lang="scss" scoped>
	page,.body{
		background: #fff;
		width: 100%;
	}
	.newsCon{
		padding: 0 30upx;
		scroll-view{
			height: 100%;
		}
		// .tit{
		// 	color: #666;
		// 	line-height: 88upx;
		// 	text-align: center;
		// }
		.list{
			width: 100%;
			padding: 36upx 0;
			// background: #f3f3f3;
			// border-radius: 20upx;
			border-bottom: 1rpx solid #f6f6f6;
		}
		// .list:last-child{margin-bottom: 0;}
	}
	.newsCon:nth-child(1){border-top: 2upx solid #f3f3f3;}
</style>
