<template>
	<view class="faq-box">
		<view class="problem-item" v-for="(item, index) in faqList" :key="item.id" @tap="onProblem(index)">
			<view class="x-bc title-box">
				<view class="x-f">
					<view class="tag-box x-c">
						<text class="serial">{{ item.indexNum }}</text>
						<text class="triangle"></text>
					</view>
					<view class="title">{{ item.m_title }}</view>
				</view>
				<text class="cuIcon-unfold " :class="{ 'cuicon-active': item.checked }"></text>
			</view>
			<view class="detail" v-if="item.checked" v-html="item.m_detail"></view>
		</view>
		<view v-if="faqList.length" class="cu-load text-gray" :class="loadStatus"></view>
	</view>
</template>

<script>
export default {
	components: {},
	data() {
		return {
			faqList: [],
			loadStatus: '', //loading,over
			page: 1,
			hasMore:true
		};
	},
	computed: {},
	onLoad() {
		this.getFaqList();
	},
	methods: {
		onProblem(index) {
			if (this.faqList[index].checked) {
				this.$set(this.faqList[index], 'checked', false);
			} else {
				this.$set(this.faqList[index], 'checked', true);
			}
		},
		// 常见问题列表、
		getFaqList() {
			let that = this;
			that.loadStatus = 'loading';
			var data = {
				// uid:uni.getStorageSync('p_uid'),
				// token:uni.getStorageSync('p_token'),
				type:1,
				page:that.page
			}
			that.$api.question(data).then(res => {
				if(res.code == 1){
					res.data.forEach((faq, index) => {
						faq.indexNum = (index + 1).toString().padStart(2, '0');
					})
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
		// 加载更多
		loadMore() {
			if (this.hasMore) {
				this.page += 1;
				this.getFaqList();
			}
		}
	}
};
</script>

<style lang="scss">
page {
	background: #fff;
}
.faq-box {
	background: #fff;
	.problem-item {
		padding: 0 20rpx;
		border-bottom: 1rpx solid rgba(#dfdfdf, 0.5);
		.title-box {
			height: 98rpx;
		}
		.detail {
			width: 631rpx;
			font-size: 26rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: rgba(102, 102, 102, 1);
			line-height: 48rpx;
			padding-left: 40rpx;
			padding-bottom: 40rpx;
		}
		.tag-box {
			margin-right: 20rpx;
			width: 39rpx;
			height: 34rpx;
			background:$zhuse;
			border-radius: 6rpx;
			position: relative;
			z-index: 6;
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
		}
		.detail-box {
			flex: 1;
			.title {
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: rgba(51, 51, 51, 1);
			}
		}

		.cuIcon-unfold {
			transition: all ease-in-out 0.2s;
		}
		.cuicon-active {
			transform: rotate(180deg);
			transition: all ease-in-out 0.2s;
		}
	}
}
</style>
