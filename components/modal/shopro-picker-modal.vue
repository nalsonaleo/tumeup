<template>
	<view class="cu-modal bottom-modal" :class="{ show: showModal }" @tap="hideModal">
		<view class="cu-dialog shop-modal" @tap.stop style="background: none;">
			<view class="modal-box page_box">
				<view class="modal-head x-bc">
					<text></text>
					<text class="head-title">选择优惠券</text>
					<text class="cuIcon-roundclosefill" @tap="hideModal"></text>
				</view>
				<view class="modal-content content_box y-f">
					<label class="radio-item x-bc" @tap="selCoupon(0)">
						<text class="coupon-title">不使用优惠券</text>
						<radio class="orange coupon-radio" :class="{ checked: radioId == 0 }" :checked="radioId == 0"></radio>
					</label>
					<label class="radio-item x-bc" v-for="(radio, index) in pickerData.couponList" :key="radio.id" @tap="selCoupon(index + 1,radio.id)">
						<!-- 1代金券   2满减券  3折扣券  4兑换券 -->
						<text class="coupon-title"  v-if="radio.c_type == 1">{{ radio.c_name }}:{{radio.c_price}}</text>
						<text class="coupon-title"  v-if="radio.c_type == 2">{{ radio.c_name }}:{{ `满${radio.c_full}减${radio.c_reduce}` }}</text>
						<text class="coupon-title"  v-if="radio.c_type == 3">{{ radio.c_name }}:{{  parseFloat(radio.c_discount)  }}折</text>
						<text class="coupon-title"  v-if="radio.c_type == 4">{{ radio.c_name }}</text>
						<radio class="orange coupon-radio" :class="{ checked: radioId == index + 1 }" :checked="radioId == index + 1"></radio>
					</label>
				</view>
				<view class="modal-foot x-c"><button class="cu-btn serve-btn" @tap="saveCoupon">确定</button></view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	components: {},
	data() {
		return {
			radioId: 0,
			couponId:'',
			newCouponArr:[]
		};
	},
	props: {
		value: {},
		pickerData: {}
	},
	computed: {
		showModal: {
			get() {
				return this.value;
			},
			set(val) {
				this.$emit('input', val);
			}
		}
	},
	methods: {
		hideModal() {
			this.showModal = false;
			this.radioId = 0;
		},
		selCoupon(index,id) {
			var that = this;
			that.radioId = index;
			that.couponId = id;
			if(uni.getStorageSync('couponId')){
				JSON.parse(uni.getStorageSync('couponId')).forEach(function(item){
					that.$emit('changeCoupon', that.radioId - 1);
					if(item == id){
						that.$msg('该优惠券已被选择');
						return false;
					}else{
						
					}
				})
			}else{
				that.$emit('changeCoupon', that.radioId - 1);
			}
		},
		saveCoupon() {
			this.newCouponArr.push(this.couponId);
			// uni.sessionStorage('couponId',JSON.stringify(this.newCouponArr));
			uni.setStorageSync('couponId',JSON.stringify(this.newCouponArr));
			// console.log(this.newCouponArr)
			// console.log(JSON.parse(uni.getStorageSync('couponId')))
			this.showModal = false;
			this.radioId = 0;
		}
	}
};
</script>

<style lang="scss">
.modal-box {
	width: 750rpx;
	height: 700rpx;
	border-radius: 30rpx 30rpx 0 0;
	background: #fff;
	padding: 30rpx;

	.serve-btn {
		width: 690rpx;
		height: 80rpx;
		background: $zhuse;
		border-radius: 40rpx;
		color: rgba(#fff, 0.9);
		margin-top: 40rpx;
	}

	.modal-head {
		margin-bottom: 30rpx;

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
		.radio-item {
			width: 100%;
			padding: 10rpx 0;
			.coupon-title {
				font-size: 28rpx;
			}
			.coupon-radio {
				transform: scale(0.8);
			}
		}
	}
	.uni-radio-input-checked {
		background-color: #f37b1d !important;
		border: #f37b1d !important;
	}
}
</style>
