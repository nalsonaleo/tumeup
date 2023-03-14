<template>
	<view class="page_box">
		<view class="content_box">
			<scroll-view scroll-y="true" @scrolltolower="loadMore" class="scroll-box">
				<view class="comment-list">
					<block v-for="comment in commentList" :key="comment.id"><sh-comment :comment="comment"></sh-comment></block>
				</view>
				<view class="cu-load text-gray" :class="loadStatus"></view>
			</scroll-view>
		</view>
		<view class="foot_box"></view>
	</view>
</template>

<script>
import shComment from './children/sh-comment.vue';
import shoproEmpty from '@/components/shopro-empty/shopro-empty.vue';
export default {
	components: {
		shComment,
		shoproEmpty
	},
	data() {
		return {
			id:'',
			commentList: [],
			loadStatus: '', //loading,over
			page: 1,
			hasMore:true,
		};
	},
	computed: {},
	onLoad(options) {
		this.id = options.id;
		this.getCommentList();
	},
	methods: {
		// 商品评论
		getCommentList() {
			let that = this;
			that.loadStatus = 'loading';
			var data = {
				goods_id:that.id,
				page:that.page
			}
			that.$api.getComment(data).then(res => {
				if(res.code == 1){
					that.commentList = [...that.commentList, ...res.data];
					if (res.data.length != 0) {
						that.hasMore = true;
						that.loadStatus = '';
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
				this.getCommentList();
			}
		}
	}
};
</script>

<style lang="scss">
.empty-box {
	position: fixed;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
}
.head_box {
	height: 114rpx;
	background-color: #fff;
	padding: 0 20rpx;
	.type-btn {
		width: 130rpx;
		height: 62rpx;
		background: rgba(238, 238, 238, 1);
		border-radius: 31rpx;
		border: none;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: rgba(153, 153, 153, 1);
		padding: 0;
		margin-right: 10rpx;
	}
	.btn-active {
		background: linear-gradient(90deg, rgba(233, 180, 97, 1), rgba(238, 204, 137, 1));
		box-shadow: 0px 7rpx 6rpx 0px rgba(229, 138, 0, 0.22);
		color: #a8700d;
	}
}
.comment-list {
	margin-top: 20rpx;
}
</style>
