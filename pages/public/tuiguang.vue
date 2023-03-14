<template>
	<view>
		<scroll-view scroll-y="true" @scrolltolower="loadMore" class="scroll-box">
			<view class="list" v-for="(item, index) in list" :key="index">
				<view class="tit">
					<view>
						{{ item.m_title }}
						<text style="font-size: 26upx;color: #999;margin-left: 30rpx;">{{ item.m_time }}</text>
					</view>
					<image src="../../static/imgs/fz_icon.png" style="width: 34rpx;height: 34rpx;" @tap="onCopy(item.m_detail1)"></image>
				</view>
				<view class="imgs"><image v-for="(item2, index2) in item.m_imgs" :key="index2" :src="item2" @tap.stop="previewImage(item.m_imgs, index2)"></image></view>
				<view class="bot" @tap="onSucai(index)">{{ item.checked ? item.m_detail : item.m_detail2 }}</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
import h5Copy from '@/common/junyi-h5-copy/junyi-h5-copy.js';
export default {
	data() {
		return {
			list: [],
			page: 1,
			hasMore: true
		};
	},
	onLoad() {
		this.getInfo();
	},
	methods: {
		onSucai(index) {
			if (this.list[index].checked) {
				this.$set(this.list[index], 'checked', false);
			} else {
				this.$set(this.list[index], 'checked', true);
			}
		},
		// 复制
		onCopy(code) {
			let that = this;
			// #ifdef H5
			let content = code; // 复制内容，必须字符串，数字需要转换为字符串
			const result = h5Copy(content);
			if (result === false) {
				that.$msg('复制失败，请重试');
			} else {
				that.$msg('复制成功');
			}
			// #endif

			uni.setClipboardData({
				data: code,
				success: function(data) {
					that.$msg('复制成功');
				},
				fail: function(err) {},
				complete: function(res) {}
			});
		},
		// 预览图片
		previewImage(urls = [], current = 0) {
			var that = this;
			uni.previewImage({
				urls: urls,
				current: current,
				indicator: 'default',
				loop: true,
				longPressActions: {
					itemList: ['保存图片'],
					success: function(data) {
						uni.downloadFile({
							url: urls[current],
							success: res => {
								if (res.statusCode === 200) {
									uni.saveImageToPhotosAlbum({
										filePath: res.tempFilePath,
										success: function() {
											that.$msg('图片已保存到相册');
										},
										fail: function() {
											uni.showToast({
												title: '保存失败，请稍后重试',
												icon: 'none'
											});
										}
									});
								}
							}
						});
						
					},
					fail: function(err) {}
				},
				fail(err) {
					console.log('previewImage出错', urls, err);
				}
			});
		},
		getInfo() {
			var that = this;
			var data = {
				type: 3,
				page: that.page
			};
			that.$api.question(data).then(res => {
				if (res.code == 1) {
					res.data.forEach(function(item) {
						item['checked'] = false;
						item.m_detail1 = item.m_detail;
						item.m_detail = item.m_detail + '   收起';
						if (item.m_detail.length > 40) {
							item.m_detail2 = item.m_detail.substring(0, 40) + '...  查看更多';
						}
					});
					that.list = [...that.list, ...res.data];
					if (res.data.length != 0) {
						that.hasMore = true;
					} else {
						that.hasMore = false;
					}
				}
			});
		},
		// 加载更多
		loadMore() {
			if (this.hasMore) {
				this.page += 1;
				this.getInfo();
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.scroll-box {
	height: 100vh;
	overflow-y: auto;
}
.list {
	// display: flex;justify-content: space-between;
	padding: 30rpx;
	background: #fff;
	margin-bottom: 20rpx;
	.logo {
		width: 88rpx;
		height: 88rpx;
		border-radius: 100%;
		border: 1rpx solid #f5f5f5;
		display: block;
	}
	// .right{//margin-left: 30rpx;width: 84%;
	.tit {
		color: #000;
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
	}
	.imgs {
		display: flex;
		flex-wrap: wrap;
		margin-top: 30rpx;
		image:nth-child(3n + 3) {
			margin-right: 0;
		}
		image {
			width: 214rpx;
			height: 214rpx;
			margin-right: 20rpx;
		}
	}
	.bot {
		color: #333;
		line-height: 50rpx;
		margin-top: 20rpx;
	}
	// }
}
</style>
