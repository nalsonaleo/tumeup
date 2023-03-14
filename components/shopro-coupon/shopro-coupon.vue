<template>
	<view class="" v-if="couponData">
		<!-- 未领取，已领取 -->
		<view class="coupon-wrap" v-if="state !== 3">
			<view class="coupon-item x-bc">
				<view class="coupon-left y-start ">
					<view class="sum-box">
						<text class="unit" v-if="couponData.c_type == 1 || couponData.c_type == 2">￥</text>
						<!-- 1代金券   2满减券  3折扣券  4兑换券 -->
						<text class="miso-font sum"  v-if="couponData.c_type == 1">{{ couponData.c_price }}</text>
						<text class="miso-font sum"  v-if="couponData.c_type == 2">{{ couponData.c_reduce }}</text>
						<text class="sub">{{ couponData.c_name }}</text>
					</view>
					<view class="notice" v-if="couponData.c_type == 2">满{{ couponData.c_full }}元可用</view>
					<view class="notice" v-if="couponData.c_type == 3">{{ parseFloat(couponData.c_discount) }}折</view>
					<view class="notice" v-if="state != 0">有效期：{{ couponData.c_start }} 至 {{ couponData.c_end }}</view>
				</view>
				<view class="coupon-right y-f">
					<button class="cu-btn get-btn" v-if="state == 0" @tap="takeCoup(couponData.id)">立即领取</button>
					<text class="" v-if="state == 2">已使用</text>
					<button class="cu-btn get-btn" v-if="state == 1" @tap="jump('/pages/index/index')">去使用</button>
					<!-- <button class="cu-btn get-btn" v-if="state == 1">查看详情</button> -->
				</view>
			</view>
		</view>
		<!-- 失效 -->
		<view class="close-wrap" v-if="state == 3">
			<view class="coupon-item x-f">
				<view class="coupon-left y-start ">
					<view class="sum-box">
						<text class="unit">￥</text>
						<text class="miso-font sum"  v-if="couponData.c_type == 1">{{ couponData.c_price }}</text>
						<text class="miso-font sum"  v-if="couponData.c_type == 2">{{ couponData.c_reduce }}</text>
						<text class="sub">{{ couponData.c_name }}</text>
					</view>
					<view class="notice" v-if="couponData.c_type == 2">满{{ couponData.c_full }}元可用</view>
					<view class="notice" v-if="couponData.c_type == 3">{{ parseFloat(couponData.c_discount) }}折</view>
					<view class="notice">有效期：{{ couponData.c_start }} 至 {{ couponData.c_end }}</view>
				</view>
				<view class="coupon-right y-f">
					<button class="cu-btn get-btn">已失效</button>
					<view class="surplus-num"></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	components: {},
	data() {
		return {
			// tools: this.$tools
		};
	},
	props: {
		state: {}, //0:立即领取，1：去使用，2：查看详情，3：已失效。
		couponData: {}
	},
	computed: {},
	methods: {
		jump(path, parmas) {
			uni.switchTab({
				url:path
			})
		},
		// 领取优惠券
		takeCoup(id){
			var that = this;
			var data = {
				uid:uni.getStorageSync('p_uid'),
				token:uni.getStorageSync('p_token'),
				id:id,
			};
			that.$api.takeCoupon(data).then(res => {
				that.$msg(res.msg);
				if(res.code == 1){
					setTimeout(function(){
						that.$emit('hasTake', 1);
					},500)
				}
			});
		},
	}
};
</script>

<style lang="scss">
// 未领取，已领取
.coupon-wrap {
	background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAsYAAACoCAYAAADjCSi2AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ4IDc5LjE2NDAzNiwgMjAxOS8wOC8xMy0wMTowNjo1NyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIxLjAgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjc3MTMwOEM0RDJGMTExRUE4RDMyRTE2OUExMUJFMjkxIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjc3MTMwOEM1RDJGMTExRUE4RDMyRTE2OUExMUJFMjkxIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NzcxMzA4QzJEMkYxMTFFQThEMzJFMTY5QTExQkUyOTEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NzcxMzA4QzNEMkYxMTFFQThEMzJFMTY5QTExQkUyOTEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz79nM03AAAMo0lEQVR42uzd63LT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) no-repeat;
	background-size: 100% 100%;
	position: relative;
	border-radius: 10rpx;
	width: 710rpx;
	.coupon-item {
		width: 100%;
		height: 230rpx;
		border-radius: 10rpx;

		.coupon-left {
			height: 100%;
			justify-content: center;
			padding-left: 40rpx;

			.unit {
				font-size: 24rpx;
				color: #fff;
			}

			.sum {
				font-size: 55rpx;
				font-weight: bold;
				color: #fff;
				line-height: 55rpx;
				padding-right: 10rpx;
			}

			.sub {
				font-size: 26rpx;
				color:rgba(255,255,255,0.8);
			}

			.notice {
				font-size: 22rpx;
				color:rgba(255,255,255,0.8);
				margin-top: 6rpx;
			}
		}

		.coupon-right {
			height: 100%;
			width: 220rpx;
			justify-content: center;
			align-items: center;

			.get-btn {
				width: 142rpx;
				height: 54rpx;
				background: linear-gradient(90deg, #c31212, #a90e0e);
				box-shadow: 0px 2rpx 5rpx 0px rgba(206, 158, 106, 0.46);
				border-radius: 27rpx;
				padding: 0;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: rgba(239, 197, 130, 1);
			}

			.surplus-num {
				font-size: 22rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: rgba(168, 112, 13, 1);
				margin-top: 14rpx;
			}
		}
	}
}

// 失效
.close-wrap {
	position: relative;
	border-radius: 10rpx;
	background: url(data:image/png;base64,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) no-repeat;
	background-size: 100% 100%;

	.coupon-item {
		width: 100%;
		height: 230rpx;
		border-radius: 10rpx;

		.coupon-left {
			height: 100%;
			width: 480rpx;
			justify-content: center;
			padding-left: 40rpx;

			.unit {
				font-size: 24rpx;
				color: #838383;
			}

			.sum {
				font-size: 55rpx;
				font-weight: bold;
				color: #838383;
				line-height: 55rpx;
				padding-right: 10rpx;
			}

			.sub {
				font-size: 26rpx;
				color: #838383;
			}

			.notice {
				font-size: 22rpx;
				color: #a6a6a6;
			}
		}

		.coupon-right {
			height: 100%;
			flex: 1;
			justify-content: center;

			.get-btn {
				width: 142rpx;
				height: 54rpx;
				border-radius: 27rpx;
				background: #fff;
				padding: 0;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #838383;
			}

			.surplus-num {
				font-size: 22rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: rgba(168, 112, 13, 1);
				margin-top: 14rpx;
			}
		}
	}
}
</style>
