<template>
	<view class="group-people">
		<block v-if="grouponTeamList.length">
			<view class="into-title x-bc">
				<text>{{$t("user.goods.detail.shprice.groupon.yy")}}{{ grouponData.sales }}{{$t("user.goods.detail.shprice.groupon.rcjhd")}}</text>
				<text class="cuIcon-right" @tap="onMoreGrouponTeam"></text>
			</view>
			<view class="into-item x-bc" v-for="(g, index) in grouponTeamList" :key="g.id" v-if="index < 2">
				<view class="x-f">
					<image class="into-img" :src="g.leader.user_avatar" mode="aspectFill"></image>
					<text class="into-name">{{ g.leader.user_nickname }}</text>
				</view>
				<view class="x-f">
					<view class="y-end">
						<view class="num">
							{{$t("user.goods.detail.shprice.groupon.hc")}}
							<text class="num-color">{{ g.num - g.current_num }}{{$t("user.goods.detail.shprice.groupon.people")}}</text>
							{{$t("user.goods.detail.shprice.groupon.ct")}}
						</view>
						<view class="time" v-if="g.expiretime && g.time">{{$t("user.goods.detail.shprice.groupon.sysj")}}{{ g.time.h }}:{{ g.time.m }}:{{ g.time.s }}</view>
					</view>
					<button class="cu-btn join-btn" @tap="jump('/pages/activity/groupon/detail', { id: g.id })">{{$t("user.goods.detail.shprice.groupon.qct")}}</button>
				</view>
			</view>
		</block>

		<!-- 拼团玩法 -->
		<view v-if="parseInt(grouponData.activity.richtext_id)" class="groupon-play x-bc" @tap="jump('/pages/public/richtext', { id: grouponData.activity.richtext_id })">
			<view class="x-f">
				<text class="title">{{$t('user.goods.detail.wanfa')}}</text>
				<view class="description one-t">{{ grouponData.activity.richtext_title || `${$t("user.goods.detail.shprice.groupon.kt")}/${$t("user.goods.detail.shprice.groupon.cant")}·${$t("user.goods.detail.shprice.groupon.yqhy")}·${$t("user.goods.detail.shprice.groupon.rmfh")}` }}</view>
			</view>
			<text class="cuIcon-right"></text>
		</view>
		<!-- 弹窗 -->
		<view class="cu-modal bottom-modal" :class="{ show: showModal }" @tap="hideModal">
			<view class="cu-dialog shop-modal" @tap.stop style="background: none;">
				<view class="modal-box page_box">
					<view class="modal-head x-bc">
						<text></text>
						<text class="head-title">{{$t("user.goods.detail.shprice.groupon.zzpt")}}</text>
						<text class="cuIcon-roundclosefill" @tap="hideModal"></text>
					</view>
					<view class="modal-content content_box y-f">
						<view class="into-item x-bc" v-for="g in grouponTeamList" :key="g.id">
							<view class="x-f">
								<image class="into-img" :src="g.leader.user_avatar" mode="aspectFill"></image>
								<text class="into-name">{{ g.leader.user_nickname }}</text>
							</view>
							<view class="x-f">
								<view class="y-end">
									<view class="num">
										{{$t("user.goods.detail.shprice.groupon.hc")}}
										<text class="num-color">{{ g.num - g.current_num }}{{$t("user.goods.detail.shprice.groupon.people")}}</text>
										{{$t("user.goods.detail.shprice.groupon.ct")}}
									</view>
									<view class="time" v-if="g.expiretime && g.time">{{$t("user.goods.detail.shprice.groupon.sysj")}}{{ g.time.h }}:{{ g.time.m }}:{{ g.time.s }}</view>
								</view>
								<button class="cu-btn join-btn" @tap="joinTeam('/pages/activity/groupon/detail', { id: g.id })">{{$t("user.goods.detail.shprice.groupon.qct")}}</button>
							</view>
						</view>
					</view>
					<view class="modal-foot x-c">{{$t("user.goods.detail.shprice.groupon.tippt")}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
let timer;
export default {
	components: {},
	data() {
		return {
			grouponTeamList: [], //原数组
			showModal: false
		};
	},
	props: {
		grouponData: {}
	},
	computed: {},
	beforeDestroy() {
		timer = null;
	},
	created() {
		this.getGrouponItem();
		let that = this;

		timer = setInterval(() => {
			that.grouponTeamList.forEach((item, index) => {
				let nowTime = new Date().getTime();
				let endTime = item.expiretime * 1000;
				let t = (endTime - nowTime) / 1000;
				let time = that.$tools.formatToHours(t);
				that.$set(that.grouponTeamList[index], 'time', time);
			});
		}, 1000);
	},
	methods: {
		hideModal() {
			this.showModal = false;
		},
		jump(path, parmas) {
			this.$Router.push({
				path: path,
				query: parmas
			});
		},
		joinTeam(path, parmas) {
			this.showModal = false;
			this.$Router.push({
				path: path,
				query: parmas
			});
		},
		onMoreGrouponTeam() {
			this.showModal = true;
		},
		// 拼购人
		getGrouponItem() {
			let that = this;
			that.$api('goods.grouponItem', {
				goods_id: that.grouponData.id,
				activity_id: that.grouponData.activity.id
			}).then(res => {
				if (res.code === 1) {
					that.grouponTeamList = res.data;
				}
			});
		}
	}
};
</script>

<style lang="scss">
// 拼团玩法
.groupon-play {
	height: 94rpx;
	background: #fff;
	.title {
		font-size: 28rpx;
		color: #999;
	}
	.description {
		font-size: 28rpx;
		margin-left: 30rpx;
	}
	.cuIcon-right {
		margin-left: 20rpx;
	}
}
// 弹窗
.modal-box {
	width: 750rpx;
	height: 800rpx;
	border-radius: 30rpx 30rpx 0 0;
	background: #fff;

	.modal-head {
		height: 92rpx;
		border-bottom: 1px solid rgba(223, 223, 223, 0.5);
		padding: 0 30rpx;
		.head-title {
			font-size: 32rpx;
			font-weight: bold;
		}

		.cuIcon-roundclosefill {
			font-size: 34rpx;
			color: #e0e0e0;
		}
	}

	.modal-content {
		padding: 0 30rpx;
	}
	.modal-foot {
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(153, 153, 153, 1);
		height: 80rpx;
		border-top: 1px solid rgba(223, 223, 223, 0.5);
	}
}
// 拼团人数
.group-people {
	background-color: #fff;
	padding: 0 20rpx;
	margin-top: 20rpx;

	.into-title {
		height: 80rpx;
		font-size: 26rpx;
		font-weight: bold;
	}
}
.into-item {
	height: 120rpx;
	width: 100%;
	border-bottom: 1rpx solid #dfdfdf;

	// &:last-child {
	// 	border-bottom: 0;
	// }

	.into-img {
		width: 60rpx;
		height: 60rpx;
		border-radius: 50%;
		margin-right: 23rpx;
		background-color: #ccc;
	}

	.into-name {
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(102, 102, 102, 1);
	}

	.num {
		font-size: 26rpx;
		color: #666;

		.num-color {
			font-size: 24rpx;
			color: #a8700d;
		}
	}

	.time {
		font-size: 22rpx;
		margin-top: 10rpx;
		color: #999;
	}
	.join-btn {
		width: 140rpx;
		height: 60rpx;
		background: linear-gradient(90deg, rgba(254, 131, 42, 1), rgba(255, 102, 0, 1));
		box-shadow: 0px 7rpx 6rpx 0px rgba(255, 104, 4, 0.22);
		border-radius: 30rpx;
		padding: 0;
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(255, 255, 255, 1);
		margin-left: 40rpx;
	}
}
</style>
