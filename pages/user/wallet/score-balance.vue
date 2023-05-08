<template>
	<view class="page_box">
		<view class="head_box">
<!-- 			<cu-custom :isBack="true" style="color: #fff;">
				<block slot="backText">{{$t("user.wallet.scoreBalance.jindou")}}</block>
				<block slot="content"></block>
			</cu-custom> -->
			<image class="bg" src="../../../static/imgs/integral_bg.png" mode=""></image>
			<view class="all-box x-c">
				<text class="all-num">{{ score }}</text>
				<text class="all-title">{{$t("user.wallet.scoreBalance.nowjindou")}}</text>
			</view>
			<view class="tab-box x-f">
				<view class="tab-item y-f " @tap="onTab(0)"><text class="tab-name" :class="{ 'tab-active': tabDot == 0 }">{{$t("user.wallet.scoreBalance.all")}}</text></view>
				<view class="tab-item y-f " @tap="onTab(1)"><text class="tab-name" :class="{ 'tab-active': tabDot == 1 }">{{$t("user.wallet.scoreBalance.income")}}</text></view>
				<view class="tab-item y-f " @tap="onTab(2)"><text class="tab-name" :class="{ 'tab-active': tabDot == 2 }">{{$t("user.wallet.scoreBalance.expenditure")}}</text></view>
			</view>
		</view>
		<view class="content_box">
			<scroll-view scroll-y="true" @scrolltolower="loadMore" class="scroll-box">
				<view class="item-box x-bc" v-for="log in scoreLog" :key="log.id">
					<view class="y-start">
						<view class="name">{{ log.m_title }}</view>
						<view class="time">{{ log.m_addtime }}</view>
					</view>
					<view class="num" v-if="log.m_style == 1">+{{ log.m_money }}</view>
					<view class="num" v-else>-{{ log.m_money }}</view>
				</view>
				<view v-if="scoreLog.length" class="cu-load text-gray" :class="loadStatus"></view>
			</scroll-view>
			<!-- 空白 -->
			<shopro-empty v-if="!scoreLog.length" :emptyData="emptyData"></shopro-empty>
		</view>
		
		<view class="foot_box"></view>
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
				tip: this.$t("user.wallet.scoreBalance.tip")
			},
			tabDot: 0,
			scoreLog: [],
			// timestamp: this.$tools.timestamp,
			loadStatus: '', //loading,over
			page: 1,
			hasMore:true,
			score:0
		};
	},
	onLoad() {
		this.getScoreLog()
	},
	methods: {
		loadMore() {
			if (this.hasMore) {
				this.page += 1;
				this.getScoreLog();
			}
		},
		onTab(type) {
			this.tabDot = type;
			this.scoreLog = [];
			this.page = 1;
			this.getScoreLog();
		},
		// 金豆明细
		getScoreLog(type) {
			let that = this;
			that.loadStatus = 'loading';
			var data = {
				uid:uni.getStorageSync('p_uid'),
				token:uni.getStorageSync('p_token'),
				type:2,
				page:that.page,
				style:that.tabDot,
			}
			that.$api.walletMx(data).then(res => {
				if(res.code == 1){
					that.score = res.money;
					that.isLoading = false;
					that.scoreLog = [...that.scoreLog, ...res.data];
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
.scroll-box {
	flex: 1;
	height: 100%;
	padding: 0 30rpx;
}
.page_box {
	background: #fff;
	.head_box {
		width: 750rpx;
		height: 480rpx;
		//background: linear-gradient(180deg, #99CC00	 0%, #99CC66 57%, white 100%);
		 background: linear-gradient(180deg, rgba(239, 196, 128, 1) 0%, rgba(248, 220, 165, 1) 56.99999999999999%, rgba(255, 255, 255, 1) 100%);
		position: relative;
		.bg {
			position: absolute;
			left: 50%;
			top: 40%;
			transform: translate(-50%, -50%);
			width: 310rpx;
			height: 310rpx;
			
		}
		.all-box {
			position: absolute;
			left: 50%;
			top: 40%;
			transform: translate(-50%, -50%);
			width: 180rpx;
			height: 180rpx;
			.all-num {
				font-size: 50rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: rgba(255,255,255,0.9);
				margin-bottom: 20rpx;
			}
			.all-title {
				position: absolute;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: rgba(255, 255, 255, 0.8);
				line-height: 54rpx;
				text-align: center;
				width: 200rpx;
				height: 53rpx;
				//background: linear-gradient(90deg, #FFCC99, #FFCC00);
				background: linear-gradient(90deg, rgba(233, 180, 97, 1), rgba(238, 204, 137, 1));
				border-radius: 27rpx;
				bottom: -16rpx;
			}
		}
		.tab-box {
			position: absolute;
			left: 50%;
			bottom: 0;
			transform: translateX(-50%);
			width: 710rpx;
			height: 90rpx;
			background: rgba(255, 255, 255, 1);
			border-radius: 30rpx 30rpx 0px 0px;
			border-bottom: 1rpx solid #dfdfdf;
			padding: 0 30rpx;
			.tab-item {
				flex: 1;
				.tab-name {
					font-size: 30rpx;
					font-family: Noto Sans S Chinese;
					font-weight: 400;
					color: rgba(51, 51, 51, 1);
					border-bottom: 4rpx solid transparent;
					line-height: 86rpx;
				}
				.tab-active {
					border-bottom: 4rpx solid $zhuse;
				}
			}
		}
	}
}
.item-box {
	background: #fff;
	min-height: 150rpx;
	border-bottom: 1rpx solid #dfdfdf;
	padding: 30rpx;
	.name {
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(102, 102, 102, 1);
		line-height: 28rpx;
		margin-bottom: 20rpx;
	}
	.time {
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(196, 196, 196, 1);
		line-height: 24px;
	}
	.num {
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: $zhuse;
	}
}
</style>
