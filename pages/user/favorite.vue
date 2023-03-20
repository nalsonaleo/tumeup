<template>
	<view class="page_box">
		<view class="head_box x-bc" v-if="favoriteList.length">
			<view class="count-box">
				{{$t('user.editPhone.gong')}}
				<text class="all-num">{{ total }}</text>
				{{$t('user.editPhone.jsp')}}
			</view>
			<button class="cu-btn set-btn" @tap="onSet">{{ isSel ? $t('user.editPhone.wc') : $t('user.editPhone.bj') }}</button>
		</view>
		<view class="content_box">
			<scroll-view scroll-y="true" @scrolltolower="loadMore" class="scroll-box">
				<checkbox-group @change="onSel" v-if="favoriteList.length">
					<view class="collect-list x-f" v-for="f in favoriteList" :key="f.id">
						<checkbox v-if="isSel" :value="f.id.toString()" :checked="f.checked" :class="{ checked: f.checked }" class="goods-radio round orange"></checkbox>
						<shopro-mini-card :detail="f" :type="'favorite'"></shopro-mini-card>
					</view>
				</checkbox-group>
				<!-- 缺省页 -->
				<shopro-empty  v-if="!favoriteList.length" :emptyData="emptyData"></shopro-empty>
				<!-- 更多 -->
				<view v-if="favoriteList.length" class="cu-load text-gray" :class="loadStatus"></view>
			</scroll-view>
		</view>
		<view class="foot_box ">
			<view class="tools-box x-bc" v-if="isSel && favoriteList.length">
				<label class="check-all" @tap="onAllSel">
					<radio :checked="allSel" :class="{ checked: allSel }" class="check-all-radio orange"></radio>
					<text>{{$t('user.editPhone.qx')}}</text>
				</label>
				<button class="cu-btn close-btn" @tap="cancelFavorite">{{$t('user.editPhone.qxsc')}}</button>
			</view>
		</view>
	</view>
</template>

<script>
import shoproMiniCard from '@/components/goods/shopro-mini-card.vue';
import shoproEmpty from '@/components/shopro-empty/shopro-empty.vue';
export default {
	components: {
		shoproMiniCard,
		shoproEmpty
	},
	data() {
		return {
			isSel: false,
			allSel: false,
			selList: [],
			emptyData: {
				img: '/static/imgs/empty/empty_goods.png',
				tip: `${that.$t('user.editPhone.zwscsp')}~`
			},
			favoriteList: [],
			total: 0,
			loadStatus: '', //loading,over
			page: 1,
			hasMore:true
		};
	},
	onLoad() {
		this.getFavoriteList();
	},
	methods: {
		onSel(e) {
			let items = this.favoriteList,
				values = e.detail.value;
			this.selList = values;
			items.forEach(i => {
				if (values.includes(i.id.toString())) {
					this.$set(i, 'checked', true);
				} else {
					this.$set(i, 'checked', false);
				}
			});
			if (this.selList.length < items.length) {
				this.allSel = false;
			} else {
				this.allSel = true;
			}
		},
		onSet() {
			this.isSel = !this.isSel;
		},
		onAllSel() {
			this.allSel = !this.allSel;
			this.selList = [];
			const { favoriteList } = this;
			favoriteList.forEach(i => {
				if (this.allSel) {
					this.$set(i, 'checked', true);
					this.selList.push(i.id);
				} else {
					this.$set(i, 'checked', false);
				}
			});
		},
		// 加载更多
		loadMore() {
			if (this.hasMore) {
				this.page += 1;
				this.getFavoriteList();
			}
		},
		// 收藏列表
		getFavoriteList() {
			let that = this;
			that.loadStatus = 'loading';
			var data = {
				uid:uni.getStorageSync('p_uid'),
				token:uni.getStorageSync('p_token'),
				c_type:1,
				page:that.page
			}
			that.$api.myCollect(data).then(res => {
				if(res.code == 1){
					that.favoriteList = [...that.favoriteList, ...res.data];
					that.total = that.favoriteList.length;
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
		// 取消收藏
		cancelFavorite() {
			let that = this;
			let ids = that.selList;
			const { favoriteList } = this;
			var data = {
				uid:uni.getStorageSync('p_uid'),
				token:uni.getStorageSync('p_token'),
				ids:ids.join(',')
			}
			that.$api.delCollect(data).then(res => {
				if(res.code == 1){
					if (that.allSel) {
						that.favoriteList = [];
					} else {
						that.favoriteList = favoriteList.filter(f => !ids.includes(f.id.toString()));
						that.total = favoriteList.length;
					}
				}
			});
			
		}
	}
};
</script>

<style lang="scss">
.head_box {
	height: 70rpx;
	padding: 0 30rpx;

	.count-box {
		font-size: 26rpx;
		color: #999;

		.all-num {
			color: $zhuse;
		}
	}

	.set-btn {
		background: none;
		font-size: 26rpx;
		color: $zhuse;
	}
}

.collect-list {
	padding: 30rpx 20rpx;
	background: #fff;
	margin-bottom: 20rpx;

	.goods-radio {
		transform: scale(0.7);
		margin-right: 20rpx;
	}
}

.tools-box {
	height: 100rpx;
	width: 750rpx;
	padding: 0 20rpx;
	background: #fff;

	.check-all {
		font-size: 26rpx;

		.check-all-radio {
			transform: scale(0.7);
		}
	}

	.close-btn {
		width: 200rpx;
		height: 70rpx;
		background: $zhuse;
		// background: linear-gradient(90deg, rgba(233, 180, 97, 1), rgba(238, 204, 137, 1));
		box-shadow: 0px 7rpx 6rpx 0px rgba(239, 58, 58, 0.22);
		border-radius: 35rpx;
		padding: 0;
		color: rgba(#fff, 0.9);
	}
}
</style>
