<template>
	<view class="comment-box">
		<view class="head x-bc">
			<view class="x-f">
				<image class="avatar" :src="comment.u_img" mode="aspectFill"></image>
				<view class="user-name">{{ comment.u_name }}</view>
				<view class="x-f star-box">
					<u-icon class="cuIcon-favorfill star-active" v-for="s in comment.c_star" :key="index"  ></u-icon>
					<u-icon class="cuIcon-favorfill" v-for="z in (5 - comment.c_star)" :key="index" ></u-icon>
				</view>
			</view>
			<text class="time">{{ comment.c_time }}</text>
		</view>
		<view class="detail">{{ comment.c_info }}</view>
		<view class="img-box">
			<view class="mask"></view>
			<view class="nav">
				<image v-for="(img, index) in comment.c_imgs" :key="index" @tap="imgSelect(index)" @tap.stop="previewImage(comment.c_imgs, index)" class="comment-img" :src="img" mode="aspectFill"></image>
			</view> 
		</view>
	</view>
</template>

<script>
export default {
	components: {},
	data() {
		return {
			scrollLeft: 0,
		};
	},
	props: {
		comment: {}
	},
	methods: {
		// 图片处理-预览图片
		previewImage(urls = [], current = 0) {
			uni.previewImage({
				urls: urls,
				current: current,
				indicator: 'default',
				loop: true,
				fail(err) {
					console.log('previewImage出错', urls, err)
				},
			})
		},
	}
};
</script>

<style lang="scss">
.comment-box {
	padding: 30rpx;
	border-bottom: 1rpx solid #eee;
	background: #fff;

	.head {
		margin-bottom: 20rpx;

		.avatar {
			width: 52rpx;
			height: 52rpx;
			border-radius: 50%;
			background: #ccc;
		}

		.user-name {
			font-size: 26rpx;
			color: #999;
			margin: 0 20rpx;
		}

		.star-box {
			.cuIcon-favorfill {
				font-size: 30rpx;
				color: #dedede;
			}

			.star-active {
				color: #ffba00;
			}
		}

		.time {
			font-size: 24rpx;
			color: #c4c4c4;
		}
	}

	.detail {
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(102, 102, 102, 1);
		line-height: 42rpx;
	}

	.img-box {
		margin-top: 30rpx;
		position: relative;

		.mask {
			background: linear-gradient(270deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0) 100%);
			width: 100rpx;
			height: 100%;
			position: absolute;
			z-index: 10;
			right: 0;
		}

		.comment-img {
			width: 166rpx;
			height: 166rpx;
			// background: #ccc;
			margin-right: 19rpx;
			margin-bottom: 19rpx;
		}
	}
}
</style>
