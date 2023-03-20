<template>
	<view class="page_box">
		<view class="head_box"></view>
		<view class="content_box">
			<scroll-view scroll-y="true" class="scroll-box" @scrolltolower="loadMore" enable-back-to-top scroll-with-animation>
				<view class="goods-box">
					<view class="goods-list" v-if="goods" v-for="goods in scoreList" :key="goods.id"><sh-score-goods :scoreData="goods"></sh-score-goods></view>
				</view>
				<!-- 空白页 -->
				<shopro-empty v-if="!scoreList.length && !isLoading" :emptyData="emptyData"></shopro-empty>
				<!-- 加载更多 -->
				<view v-if="scoreList.length" class="cu-load text-gray" :class="loadStatus"></view>
				<!-- load -->
				<!-- <shoproLoad v-model="isLoading"></shoproLoad> -->
			</scroll-view>
		</view>
		<view class="foot_box"></view>
	</view>
</template>

<script>
import shScoreGoods from './children/sh-score-goods.vue';
export default {
	components: {
		shScoreGoods
	},
	data() {
		return {
			scoreList: [],
			emptyData: {
				img: '/static/imgs/empty/empty_goods.png',
				tip: this.$t("user.app.score.list.tip"),
				path: '/pages/index/index',
				pathText: this.$t("user.coupon.list.button"),
			},
			loadStatus: '', //loading,over
			page: 1,
			isLoading: true,
			hasMore:true,
		};
	},
	onLoad() {
		this.getScoreShopsList();
	},
	computed: {},
	methods: {
		// 加载更多
		loadMore() {
			if (this.hasMore) {
				this.page += 1;
				this.scoreList();
			}
		},
		//金豆商品列表
		getScoreShopsList() {
			let that = this;
			that.loadStatus = 'loading';
			var data = {
				uid: uni.getStorageSync('p_uid'),
				token: uni.getStorageSync('p_token'),
			}
			that.$api.jfShop(data).then(res => {
				if(res.code == 1){
					that.isLoading = false;
					that.scoreList = [...that.scoreList, ...res.data];
					// that.lastPage = res.data.last_page;
					if (res.data.length != 0) {
						that.hasMore = true;
						that.loadStatus = '';
					} else {
						that.hasMore = false;
						that.loadStatus = 'over';
					}
				}
			})
			
		}
	}
};
</script>

<style lang="scss">
page {
	background: #fff;
}
.goods-box {
	display: flex;
	flex-wrap: wrap;
	padding: 20rpx;
	background-color: #fff;
	.goods-list {
		margin-right: 20rpx;
		margin-bottom: 20rpx;
		box-shadow: 0px 0px 20rpx 4rpx rgba(199, 199, 199, 0.22);
		border-radius: 20rpx;
		overflow: hidden;
		&:nth-child(2n) {
			margin-right: 0;
		}
	}
}
</style>
