<template>
	
	<view class="list-box">
		<view class="head_box">
			<view class="" style="position:relative;z-index: 10; background: #fff;">
				<cu-custom :isBack="true">
					<block slot="backText">
						<view class="search-box flex align-center" @tap.stop>
							<input @confirm="onSearch" @input="onInput" confirm-type="搜索" class="search flex-sub" type="text" v-model="searchVal" placeholder="商品搜索" />
							<text v-show="searchVal" @tap="clearSearch" class="cuIcon-roundclosefill"></text>
						</view>
					</block>
				</cu-custom>
			</view>
			<view class="filter-item"><sh-filter @change="onFilter"></sh-filter></view>
		</view>
		<view class="content-box">
			<scroll-view scroll-y="true" @scrolltolower="loadMore" class="scroll-box">
				<view class="goods-list x-f">
					<view class="goods-item" v-for="goods in goodsList" :key="goods.id"><shopro-goods :detail="goods" :scrollTop="scrollTop"></shopro-goods></view>
				</view>
				<!-- 空白页 -->
				<shopro-empty v-if="!goodsList.length && !isLoading" :emptyData="emptyData"></shopro-empty>
				<!-- 加载更多 -->
				<view v-if="goodsList.length" class="cu-load text-gray" :class="loadStatus"></view>
				<!-- load -->
				<!-- <shoproLoad v-model="isLoading"></shoproLoad> -->
			</scroll-view>
		</view>
		<view class="foot_box"></view>
	</view>
	
</template>

<script>
import shFilter from './children/sh-filter.vue';
import shoproGoods from '@/components/goods/shopro-goods.vue';
import shoproEmpty from '@/components/shopro-empty/shopro-empty.vue';
import { mapMutations, mapActions, mapState } from 'vuex';
let timer = null;
export default {
	components: {
		shFilter,
		shoproGoods,
		shoproEmpty
	},
	data() {
		return {
			scrollTop:0,
			emptyData: {
				img: '/static/imgs/empty/empty_goods.png',
				tip: '暂无该商品，还有更多好货等着你噢~'
			},
			goodsList: [],
			searchVal: '',
			keywords: '',
			page: 1,
			sort:"",//排序
			min:'',//最低价
			max:'',//最高价
			isLoading: true, //loading和空白页。
			loadStatus: '', //loading,over
			lastPage: 0,
			hasMore:true,
			type:2,
			class_id:0
		};
	},
	computed: {},
	onLoad(options) {
		if (options.keyword) {
			this.searchVal = options.keyword;
		}
		if(options.class_id){
			this.class_id = options.class_id;
		}
		this.type = options.type;
		this.getGoodsList();
	},
	onPageScroll({scrollTop}) {

	            // 传入scrollTop值并触发所有easy-loadimage组件下的滚动监听事件
	     this.scrollTop = scrollTop; 
			
	        },
	methods: {

		onFilter(e) {
			// console.log(e)
			var that = this;
			that.sort = '';
			that.min = '';
			that.max = '';
			if(e.priceOrder){
				that.sort = e.priceOrder
			}else if(e.salesOrder){
				that.sort = e.salesOrder
			}
			that.min = e.pricemin;
			that.max = e.pricemax;
			that.page = 1;
			that.goodsList = [];
			that.getGoodsList();
		},
		// 键盘搜索
		onSearch() {
			let that = this;
			that.page = 1;
			that.goodsList = [];
			that.getGoodsList();
		},
		// 输入防抖搜索
		onInput() {
			let that = this;
			// that.listParams.category_id = 0;
			// 输入不及时
			setTimeout(() => {
				// that.listParams.keywords = that.searchVal;
			}, 0);
			// 防抖
			if (timer !== null) {
				clearTimeout(timer);
			}
			timer = setTimeout(() => {
				that.goodsList = [];
				that.getGoodsList();
			}, 1000);
		},
		// 清除搜索框
		clearSearch() {
			this.searchVal = '';
		},
		// 加载更多
		loadMore() {
			if (this.hasMore) {
				this.page += 1;
				this.getGoodsList();
			}
		},
		// 商品列表
		getGoodsList() {
			let that = this;
			that.isLoading = true;
			that.loadStatus = 'loading';
			var data = {
				sort:that.sort,
				min:that.min,
				max:that.max,
				keyword:that.searchVal,
				page:that.page,
				type:that.type,//2普通商品 1拼团商品
				class_id:that.class_id
			}
			that.$api.getScreenGoods(data).then(res => {
				if(res.code == 1){
					that.isLoading = false;
					that.goodsList = [...that.goodsList, ...res.data];
					// that.lastPage = res.data.last_page;
					if (res.data.length != 0) {
						that.hasMore = true;
						that.loadStatus = '';
					} else {
						that.hasMore = false;
						that.loadStatus = 'over';
					}
				}
			});
			// that.$api('goods.lists', that.listParams).then(res => {
			// 	if (res.code === 1) {
			// 		that.isLoading = false;
			// 		that.goodsList = [...that.goodsList, ...res.data.data];
			// 		that.lastPage = res.data.last_page;
			// 		if (that.listParams.page < res.data.last_page) {
			// 			that.loadStatus = '';
			// 		} else {
			// 			that.loadStatus = 'over';
			// 		}
			// 	}
			// });
		}
	}
};
</script>

<style lang="scss">
	page{
		height:auto;
	}
.head_box {
	position: -webkit-sticky;
	position: sticky;
	top: 0;
	z-index: 998;
	background: #fff;
}

.search-box {
	width: 661rpx;
	height: 60rpx;
	background: rgba(245, 245, 245, 1);
	border-radius: 30rpx;
	padding: 0 30rpx;
	// #ifdef MP
	width: 450rpx;
	// #endif
	.search {
		text-align: center;
		font-size: 28rpx;
	}

	.cuIcon-roundclosefill {
		color: $zhuse;
		padding: 0 10rpx;
	}
}

.content-box {
	padding: 20rpx;
}

.goods-list {
	flex-wrap: wrap;

	.goods-item {
		margin-right: 20rpx;
		margin-bottom: 20rpx;

		&:nth-child(2n) {
			margin-right: 0;
		}
	}
}

// 空白页
.empty-box {
	position: fixed;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
}
</style>
