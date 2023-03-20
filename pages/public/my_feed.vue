<template>
	<form>
		<view class="page_box">
			<view class="con">
				<scroll-view scroll-y="true" @scrolltolower="getMore">
				<view class="list" v-for="(item,index) in list" :key="index" @click="onProblem(index)">
					<view class="top">
						<view style="display: flex;align-items: center;flex: 1;">
							<view class="tag-box x-c">
								<text class="serial">Q{{index+1}}</text>
								<text class="triangle"></text>
							</view>
							<view>{{item.f_type}}</view>
						</view>
						<text class="cuIcon-unfold " :class="{ 'cuicon-active': item.status }"></text>
					</view>
					<view class="bot" v-if="item.status">
						<view style="line-height: 40upx;margin-bottom: 10upx;color: #999;">问:{{item.f_info}}</view>
						<view  v-for="(i, index2) in item.data" :key='index2' style="line-height: 40upx;margin-bottom: 10upx;color: #000;">{{$t("public.myFeed.da")}}:{{i.f_info}}</view>
						<view v-if="item.data.length == 0" style="line-height: 40upx;margin-bottom: 10upx;color: #000;">{{$t("public.muFeed.zwrhhf")}}</view>
						<!-- <text style="font-size: 26upx;color: #666;">{{i.f_time}}</text> -->
					</view>
				</view>
				</scroll-view>
			</view>
			<view class="foot_box x-bc pad">
				<button class="cu-btn post-btn" @tap="jump('/pages/public/feedback')">{{$t("public.myFeed.wyfk")}}</button>
			</view>
		</view>
	</form>
</template>

<script>
export default {
	data() {
		return {
			page:1,
			hasMore:true,
			list: [],
		};
	},
	onShow() {
		this.getFeed();
	},
	methods: {
		onProblem(index) {
			if (this.list[index].status) {
				this.$set(this.list[index], 'status', false);
			} else {
				this.$set(this.list[index], 'status', true);
			}
		},
		getFeed(){
			var that = this;
			var data = {
				uid:uni.getStorageSync('p_uid'),
				token:uni.getStorageSync('p_token'),
				page:that.page,
			}
			that.$api.f_list(data).then(res => {
				if (res.code === 1) {
					res.data.forEach(function(item,i){
						item['status'] =false;
						// console.log(item.data)
					})
					// console.log(res.data)
					that.list = res.data;
				}
			});
		},
		jump(path){
			uni.navigateTo({
				url:path
			})
		}
	}
};
</script>

<style lang="scss">
.page_box {
	background: #fff;
}
.con{
	margin-top: 20upx;
	padding: 0 11px;
	margin-bottom: 130upx;
	scroll-view{height: 100%;}
}
	.list{
		background: #fff;
		padding: 30upx 10upx;
		border-radius: 12upx;
		// border-bottom: 2upx solid #f3f3f3;
		// margin-bottom: 32upx;
		.top{
			display: flex;
			// align-items: center;
			justify-content: center;
			.tag-box {
				margin-right: 20rpx;
				width: 39rpx;
				height: 34rpx;
				background:$zhuse;
				border-radius: 6rpx;
				position: relative;
				z-index: 6;
			}
			.serial {
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #fff;
				line-height: 24rpx;
			}
			.triangle {
				position: absolute;
				z-index: 5;
				width: 10rpx;
				height: 10rpx;
				background: $zhuse;
				transform: rotate(45deg);
				bottom: -4rpx;
			}
			.cuIcon-unfold {
				transition: all ease-in-out 0.2s;
			}
			.cuicon-active {
				transform: rotate(180deg);
				transition: all ease-in-out 0.2s;
			}
		}
		.bot{
			width: 87%;
			margin: 20upx auto 0;
			font-size: 28upx;
			color: #333;
			line-height: 40upx;
			padding-left: 28upx;
			transform: translateY(0%);
			transition: .3s;
			view{
				img,p img{width: 100%!important;height: auto;}
			}
			
		}
		
	}
.foot_box {
	border-top: 1rpx solid #eeeeee;
	height: 100rpx;
	.contact-btn {
		flex: 1;
		height: 70rpx;
		background: linear-gradient(90deg, rgba(103, 104, 105, 1), rgba(82, 82, 82, 1));
		box-shadow: 0px 2rpx 5rpx 0px rgba(102, 103, 104, 0.46);
		border-radius: 35rpx;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(255, 255, 255, 1);
	}
	.post-btn {
		flex: 1;
		height: 74rpx;
		background: $zhuse;
		box-shadow: 0px 7rpx 6rpx 0rpx rgba(239, 58, 58, 0.22);
		border-radius: 37rpx;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(255, 255, 255, 1);
	}
}

</style>
