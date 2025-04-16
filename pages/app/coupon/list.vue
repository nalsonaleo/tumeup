<template>
	<view class="page_box">
		<view class="head_box">
			<view class="coupon-nav x-f">
				<view :class="{'nav-item': true, 'y-f':true, 'line-active': stateCurrent === nav.id }" v-for="nav in couponsState" :key="nav.id" @tap="onNav(nav.id)">
					<view class="item-title">{{ nav.title }}</view>
					<!-- <text class="nav-line" :class="{ 'line-active': stateCurrent === nav.id }"></text> -->
				</view>
			</view>
		</view>
		<view class="content_box">
			<view class="coupon-list" v-for="c in couponList" :key="c.id">
				<shoprp-coupon :state="stateCurrent" :couponData="c" @hasTake="hasTake"></shoprp-coupon>
			</view>
			<!-- 空白 -->
			<shopro-empty v-if="!couponList.length && !isLoading" :emptyData="emptyData"></shopro-empty>
		</view>
		<view class="foot_box"></view>
	</view>
</template>

<script>
import shoprpCoupon from '@/components/shopro-coupon/shopro-coupon.vue';
import shoproEmpty from '@/components/shopro-empty/shopro-empty.vue';
export default {
	components: {
		shoprpCoupon,
		shoproEmpty
	},
	data() {
		return {
			emptyData: {
				img: '/static/imgs/empty/empty_goods.png',
				tip: this.$t("user.coupon.list.tip"),
				path: '/pages/index/index',
				pathText: this.$t("user.coupon.list.button"),
			},
			stateCurrent: 0,
			page:1,
			isLoading: true,
			hasMore:true,
			couponsState: [
				{
					id: 0,
					title: this.$t("user.coupon.list.lqzx")
				},
				{
					id: 1,
					title: this.$t("user.coupon.list.ksy")
				},
				{
					id: 2,
					title: this.$t("user.coupon.list.ysy")
				},
				{
					id: 3,
					title: this.$t("user.coupon.list.ysx")
				}
			],
			couponList: []
		};
	},
	computed: {},
	onLoad() {
		this.getCouponList();
	},
	methods: {
		onNav(id) {
			this.stateCurrent = id;
			this.page = 1;
			this.couponList = [];
			this.getCouponList();
		},
		jump(path, parmas) {
			uni.navigateTo({
				url:path
			})
		},
		hasTake(){
			this.page = 1;
			this.couponList = [];
			this.getCouponList();
		},
		getCouponList() {
			let that = this;
			var data = {
				uid:uni.getStorageSync('p_uid'),
				token:uni.getStorageSync('p_token'),
				status:that.stateCurrent,
				page:that.page,
			}
			that.$api.couponList(data).then(res => {
				if(res.code == 1){
					that.isLoading = false;
					that.couponList = [...that.couponList, ...res.data];
					if (res.data.length != 0) {
						that.hasMore = true;
						// that.loadStatus = '';
					} else {
						that.hasMore = false;
						// that.loadStatus = 'over';
					}
				}
			});
		}
	}
};
</script>

<style lang="scss">
.page_box {
	background: #fff;
}
.coupon-nav {
	background: #fff;
	min-height: 80rpx;

	.nav-item {
		// min-width: 30rpx;
		flex: 1;
		min-height: 80rpx;
		
		padding: 0 10px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		box-sizing: border-box;
		.item-title {
			font-size: 30rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: rgba(51, 51, 51, 1);
			display: -webkit-box;
			-webkit-line-clamp: 2;
			overflow: hidden;
			text-overflow: ellipsis;
			-webkit-box-orient: vertical;
			word-break: break-all;
		}

		.nav-line {
			width: 120rpx;
			height: 4rpx;
			background: #fff;
		}

	}
		.line-active {
			// background: $zhuse;
			
			border-bottom: 4rpx solid $zhuse;
		}
}
.coupon-list {
	margin: 30rpx 20rpx;
}
</style>
