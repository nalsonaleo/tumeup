<template>
	<view class="page_box">
		<view class="head_box"></view>
		<view class="content_box">
			<view class="x-f wrapper-box">
				<scroll-view class="left y-f" scroll-y>
					<view class="type-list x-c" :class="[{ 'list-active': listId == item.id }]" v-for="(item, index) in categoryData" :key="index" @tap="onType(item.id)">
						<view class="line" :class="[{ 'line-active': listId == item.id }]"></view>
						{{ item.c_name }}
					</view>
				</scroll-view>
				<scroll-view scroll-y class="scroll-box" enable-back-to-top scroll-with-animation @scrolltolower='scrolltolower'>
					<view class="right" v-if="cateGoods.length">
						<!-- <image class="type-img" v-show="categoryData[listId].image" :src="categoryData[listId].image" mode=""></image> -->
						<view class="item-list" >
							<!-- <view class="type-box x-bc">
								<text class="type-title">{{ item.name }}</text>
							</view> -->
							<view class="item-box x-f">
								<navigator class="y-f goods-item" :url="'/pages/goods/detail/index?id='+item.id"  v-for="(item, index) in cateGoods" :key="index">
									<image class="item-img" lazy-load :src="item.g_img" mode="aspectFill"></image>
									<text class="item-title">{{ item.g_name }}</text>
								</navigator>
							</view>
							<uni-load-more :status='status'></uni-load-more>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
		<view class="foot_box"></view>
	</view>
</template>

<script>
import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
export default {
	components: {
		uniLoadMore
	},
	data() {
		return {
			listId: 0,
			categoryData: [],
			cateGoods:[],
			pagination: {
				total: 0,
				pageSize: 20,
				page: 1,
			},
			cateId: undefined,
			status: 'more',
		};
	},
	computed: {},
	onLoad() {
		this.init();
	},
	methods: {
		scrolltolower() {
			console.log("到底了");
			if(this.cateGoods.length < this.pagination.total) {
				this.pagination.page += 1;
				this.status = 'loading';
				this.getGoods(this.cateId);
			}
		},
		init() {
			return Promise.all([this.getCategory()]);
		},
		getCategory() {
			var that = this;
			that.$api.getCate().then(res => {
				if(res.code == 1){
					that.categoryData = res.data;
					that.listId = res.data[0].id;
					that.getGoods(that.listId);
				}
			});
		},
		getGoods(cateId){
			var that = this;
			this.cateId = cateId;
			var data = {class_id:cateId,...this.pagination}
			that.$api.getClassGoods(data).then(res => {
				if(res.code == 1){
					that.cateGoods = [...that.cateGoods, ...res.data.data];
					this.pagination.total = res.data.total;
					if(that.cateGoods.length < this.pagination.total) {
						this.status = 'more';
					} else {
						this.status = 'noMore';
					}
				}
			});
		},
		onType(id) {
			var that = this;
			that.listId = id;
			that.cateGoods = [];
			this.pagination.page = 1;
			this.pagination.total = 0;
			that.getGoods(id);
		},
		// 路由跳转
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
.content_box {
	margin-top: 1upx;
	display: flex;
	flex-direction: column;
	overflow: hidden;
}

.wrapper-box {
	flex: 1;
	margin-top: 1upx;
	height: 100%;
}

.scroll-box {
	height: 100%;
	flex: 1;
	background: #fff;
}

.left {
	width: 200upx;
	height: 100%;

	.list-active {
		background: #fff;
		color: #333333 !important;
		font-weight: bold !important;
	}

	.line-active {
		background: $zhuse;
	}

	.type-list {
		min-height: 84upx;
		padding: 20upx;
		position: relative;
		width: 200upx;
		font-size: 28upx;
		font-family: PingFang SC;
		box-sizing: border-box;
		font-weight: 400;
		justify-content: start;
		color: rgba(102, 102, 102, 1);

		.line {
			width: 10upx;
			height: 100%;
			position: absolute;
			left: 0;
		}
	}
}

.right {
	padding: 0 30upx;
	flex: 1;
	height: 100%;

	.type-img {
		width: 505rpx;
		height: 150rpx;
		background: #ccc;
		margin-top: 30rpx;
	}

	.item-list {
		.type-box {
			height: 84rpx;

			.type-title {
				font-size: 28rpx;
				font-weight: bold;
			}

			.more {
				font-size: 26rpx;
				color: #999;
			}
		}

		.item-box {
			flex-wrap: wrap;

			.goods-item {
				margin-right: 20rpx;
				margin-bottom: 20rpx;

				&:nth-child(3n) {
					margin-right: 0;
				}

				.item-img {
					width: 150rpx;
					height: 150rpx;
					// background: #ccc;
				}

				.item-title {
					font-size: 24rpx;
					line-height: 24rpx;
					margin-top: 10rpx;
					width: 150rpx;
					text-align: center;
					overflow: hidden;
					-webkit-line-clamp: 2;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
				}
			}
		}
	}
}
</style>
