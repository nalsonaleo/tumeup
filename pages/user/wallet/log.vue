<template>
	<view class="container">
		<view class="wallet-list x-f" v-for="item in walletList" :key="item.id">
			<!-- <image class="head-img" :src="item.avatar" mode=""></image> -->
			<view class="list-content y-f">
				<view class="title-box x-bc">
					<text class="title one-t">{{item.m_detail}}</text>
					<view class="money">
						<text v-if="item.m_style == 1" class="add">+{{$t('money.symbol')}} {{ item.m_money }}</text>
						<text v-else class="minus">-{{$t('money.symbol')}} {{ item.m_money }}</text>
						
					</view>
					
				</view>
				<view class="tip-box x-bc">
					<text class="time">{{ item.m_addtime }}</text>
					<text class="from"></text>
				</view>
			</view>
		</view>
		<!-- 空白 -->
		<shopro-empty v-if="!walletList.length" :emptyData="emptyData"></shopro-empty>
		
		<view v-if="walletList.length" class="cu-load text-gray" :class="loadStatus"></view>
	</view>
</template>

<script>
	import shoproEmpty from '@/components/shopro-empty/shopro-empty.vue';
	export default {
		components: {
			shoproEmpty
		},
		data() {
			return {
				emptyData: {
					img: '/static/imgs/empty/empty_groupon.png',
					tip: `${this.$t('user.wallet.log.hmyqbmx')}~`
				},
				isBottom: false,
				walletList: [],
				type: {
					income: this.$t('user.wallet.log.sr'),
					withdraw: this.$t('user.wallet.log.tx'),
					consume: this.$t('user.wallet.log.xf'),
					transfer: this.$t('user.wallet.log.yehz')
				},
				loadStatus: '', //loading,over
				page: 1,
				hasMore:true,
			};
		},
		onPullDownRefresh() {
			this.isBottom = true;
		},
		onLoad() {
			this.getWalletLog();
		},
		onReachBottom() {
			if (this.hasMore) {
				this.page += 1;
				this.getWalletLog();
			}
		},
		methods: {
			// 钱包明细
			getWalletLog() {
				let that = this;
				that.loadStatus = 'loading';
				var data = {
					uid:uni.getStorageSync('p_uid'),
					token:uni.getStorageSync('p_token'),
					type:1,
					page:that.page,
					style:0,
				}
				that.$api.walletMx(data).then(res => {
					if(res.code == 1){
						that.isLoading = false;
						that.walletList = [...that.walletList, ...res.data];
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
			}
		}
	};
</script>

<style lang="scss">
	page {
		background: #fff;
	}

	.container {
		border-top: 1rpx solid #f5f5f5;
	}

	.wallet-list {
		width: 750rpx;

		.head-img {
			width: 100rpx;
			height: 100rpx;
			border-radius: 50%;
			background: #ccc;
			margin: 30rpx;
		}

		.list-content {
			height: 160rpx;
			justify-content: space-between;
			align-items: flex-start;
			flex: 1;
			padding: 30rpx;
			border-bottom: 1rpx solid #f5f5f5;
		}

		.title-box,
		.tip-box {
			width: 100%;
		}

		.title {
			width: 80%;
			font-size: 30rpx;
			width: 500rpx;
			position: relative;
			z-index: 999;
		}

		.money {
			font-size: 28rpx;
			font-weight: bold;
			//width: 20%;

			.add {
				color: $zhuse;
			}

			.minus {
				color: #000;
			}
		}

		.time {
			color: #999;
			font-size: 26rpx;
		}
	}
</style>
