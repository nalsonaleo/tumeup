<template>
	<view class="page_box">
		<view class="head_box" v-if="syType==1">
			<view class="add-address-box flex-sub x-f" v-if="!addressId" @tap="jump('/pages/user/address/list', { from: 'order' })">
				<image class="address-bg" src="../../static/imgs/order_bot.png" mode=""></image>
				<view class="box-bg x-bc flex-sub pad">
					<text class="select-notice">{{$t("user.order.confirm.qxzmrdz")}}</text>
					<text class="cuIcon-right"></text>
				</view>
			</view>
			<view class="address-list" v-else @tap="jump('/pages/user/address/list', { from: 'order' })">
				<image class="address-bg" src="../../static/imgs/order_bot.png" mode=""></image>
				<view class="top x-f">
					<text class="name">{{ address.a_name }}</text>
					<text class="phone">{{ address.a_phone }}</text>
				</view>
				<view class="detail x-bc">
					<view class="address">{{ address.a_province }}{{ address.a_city }}{{ address.a_area }}{{ address.a_address }}</view>
					<text class="cuIcon-right"></text>
				</view>
			</view>
		</view>
		
		<view class="head_box" v-if="syType==2">
			<view class="address-list" >
				<!-- <image class="address-bg" src="../../static/imgs/order_bot.png" mode=""></image> -->
				<view class="top x-f">
					<text class="name">{{ storInfo.store_name }}</text>
					<text class="phone">{{ storInfo.store_tell }}</text>
				</view>
				<view class="detail x-bc">
					<view class="address">{{ storInfo.store_address}}</view>
					<!-- <text class="cuIcon-right"></text> -->
				</view>
			</view>
		</view>
		
		<view class="content_box">
			<view class="goods-list" v-for="(g, index) in goodsList" :key="g.sku_price_id">
				<shopro-mini-card :detail="g" :sku="g.sku_price" :type="'sku'">
					<block slot="goodsBottom">
						<view class="goods-price x-bc">
							<view class="">
								<text v-if="g.g_type == 3">{{ g.g_integral3 }}{{$t("user.order.confirm.jd")}}+</text>
								<text>￥{{ g.sku_price ? g.sku_price : g.g_price }}</text>
							</view>
							<text class="goods-num">x{{ g.num }}</text>
						</view>
					</block>
				</shopro-mini-card>
				<view class="coupon x-bc item-list" v-if="g_type == 2" style="height: 70upx;">
					<view class="item-title">{{$t("user.order.confirm.yhj")}}</view>
					<view class="x-f" v-if="g.coupon" @tap="selCoupon(g.coupon, index)">
						<text class="price" v-if="g.pickerData">{{$t('money.symbol')}}{{ g.pickerData.title }}</text>
						<text class="sel-coupon" v-else>{{$t("user.order.confirm.xzyhq")}}</text>
						<text class="cuIcon-right"></text>
					</view>
				</view>
			</view>

			<view class="logistic item-list x-bc">
				<view class="x-f">
					<view class="item-title">{{$t("user.order.confirm.psfs")}}</view>
					<!-- <view class="detail">普通配送</view> -->
				</view>
				<view>
					<checkbox-group class="block x-bc">
						<view class="x-f" style="margin-right: 40rpx;">
							<checkbox :checked="syType==1" :class="{ checked: syType==1 }" @tap="changeSy(1)" class="goods-radio round orange"></checkbox>
							<view class="item-title">{{$t("user.order.confirm.kdys")}}</view>
						</view>
						<view class="x-f" style="display: none;">
							<checkbox :checked="syType==2" :class="{ checked: syType==2 }" @tap="changeSy(2)"  class="goods-radio round orange"></checkbox>
							<view class="item-title">{{$t("user.order.confirm.ddzt")}}</view>
						</view>
					</checkbox-group>
					
				</view>
			</view>
			
			<view class="logistic item-list x-bc" v-if="syType==1">
				<view class="x-f">
					<view class="item-title">{{$t("user.order.confirm.yf")}}</view>
				</view>
				<view class="item-title">{{$t('money.symbol')}}{{ freight }}</view>	
			</view>
			
			<view class=" x-bc item-list">
				<view class="item-title">{{$t("user.order.confirm.spje")}}</view>
				<view class="x-f">
					<text class="price">{{$t('money.symbol')}}{{ total_fee || '0.00' }}</text>
				</view>
			</view>
			<view class="price-box x-bc item-list" v-if="yh_price > 0">
				<view class="item-title">{{$t("user.order.confirm.yyh")}}</view>
				<view class="x-f">
					<text class="price">{{$t('money.symbol')}}{{ yh_price }}</text>
				</view>
			</view>
			<view class="remark-box" style="display: none;">
				<view class="item-title">
					{{$t("user.order.confirm.remark")}}:
					<text class="remark-notice">{{$t("user.order.confirm.fontNumber")}}</text>
				</view>
				<textarea v-show="!showPicker" class="remark-inp" maxlength="100" v-model="remark" :placeholder="$t('user.order.confirm.remark.placeholder')" />
			</view>
		</view>
		<view class="foot_box x-f">
			<text class="num">
				{{$t("user.order.confirm.gong")}}
				<text>{{ total_num }}</text>
				{{$t("user.order.confirm.jie")}}
			</text>
			<view class="all-money">
				<text>{{$t("user.order.confirm.total")}}：</text>
				<text class="price" v-if="syType==1">{{$t('money.symbol')}}{{ total_fee + parseFloat(freight) || '0.00' }}</text>
				<text class="price" v-else-if="syType==2">{{$t('money.symbol')}}{{ total_fee || '0.00' }}</text>
			</view>
			<button class="cu-btn sub-btn" @tap="subOrder" :disabled="isSubOrder">
				<text v-if="isSubOrder" class="cuIcon-loading2 cuIconfont-spin"></text>
				{{$t("user.order.confirm.tjdd")}}
			</button>
		</view>
		<!-- pricker -->
		<shopro-picker-modal v-if="pickerData.couponList" @changeCoupon="changeCoupon" v-model="showPicker" :pickerData="pickerData"></shopro-picker-modal>
		<!-- 登录提示 -->
		<!-- <shopro-login-modal></shopro-login-modal> -->
	</view>
</template>

<script>
import shoproMiniCard from '@/components/goods/shopro-mini-card.vue';
import shoproPickerModal from '@/components/modal/shopro-picker-modal.vue';
// import { mapMutations, mapActions, mapState } from 'vuex';
export default {
	components: {
		shoproMiniCard,
		shoproPickerModal
	},
	data() {
		return {
			showPicker: false,
			isSubOrder: false,
			pickerData: {
				title: this.$t("user.order.confirm.xzyhq"),
				couponList: []
			},
			address: {
				is_default: 0
			},
			addressId: 0,
			from: '',
			orderType: '',
			grouponBuyType: 'alone',
			grouponId: 0,
			goodsList: [],
			goodsNew: [],
			remark: '',
			orderPre: {},
			couponId: 0,
			couponPrice: this.$t("user.order.confirm.xzyhq"),
			total_num: 0,
			total_fee: 0,
			userInfo: {},
			t_name: '',
			t_id: '',
			goodsIndex: 0,
			yh_price: 0,
			coupon_id: [],
			g_type: '',
			canUse: 0,
			syType:1,
			freight:0.00,
			storInfo:{}
		};
	},
	computed: {},
	watch: {
		address(val, oldVal) {
			if (this.address) {
				this.addressId = this.address.id;
			}
		},
		goodsList(val, oldVal) {
			// console.log(oldVal)
			if (val) {
				this.goodsNew = val;
			}
			// console.log(this.goodsNew)
		}
	},
	onLoad(options) {
		var that = this;
		that.from = options.from;
		that.g_type = options.g_type;
		
		// if(uni.getStorageSync('p_address')){
		// 	that.address = JSON.parse(uni.getStorageSync('p_address'));
		// 	that.addressId = JSON.parse(uni.getStorageSync('p_address')).id;
		// }
		
		if (options.from == 'cart') {
			that.goodsList = JSON.parse(options.goodsList);
			that.orderType = 2;
			that.g_type = 2;
		} else if (options.from == 'goods') {
			that.goodsList = [JSON.parse(options.goodsList)];
			that.orderType = 1;
		}
		that.goodsList.forEach(function(item, index) {
			// that.freight += parseFloat(item.g_freight);
			that.couponList(item.goods_id, index);
			that.total_num += parseFloat(item.num);
			if (item.sku_price) {
				that.total_fee += parseFloat(item.num * item.sku_price);
			} else {
				that.total_fee += parseFloat(item.num * item.g_price);
			}
		});
		var data = {
			uid: uni.getStorageSync('p_uid'),
			token: uni.getStorageSync('p_token'),
			
		};
		that.$api.defaultaddressInfo(data).then(res=>{
			if(res.data){
				that.address = res.data;
				that.addressId = res.data.id;
			}
		});
		that.storeInfo()
		// console.log(that.goodsList)
	},
	methods: {
		// 选择配送方式
		changeSy(num){
			var that = this;
			that.syType = num;
		},
		jump(path, parmas) {
			uni.navigateTo({
				url: path
			});
		},
		// 门店地址
		storeInfo(){
			var that = this;
			that.$api.store().then(res => {
				if (res.code == 1) {
					that.storInfo = res.data;
				}
			});
		},
		// 提交订单
		subOrder() {
			var that = this;
			if (!that.addressId && that.syType==1) {
				that.$msg(that.$t("user.order.confirm.qxzshdz"));
				return;
			}
			// console.log(that.goodsList)
			var orderData;
			if (that.orderType == 1) {
				orderData = that.goodsList[0];
			} else {
				orderData = that.goodsList;
			}
			var totalMoney;
			if(that.syType==1){
				totalMoney = that.total_fee +  parseFloat(that.freight);
			}else{
				totalMoney = that.total_fee;
			}
			var data = {
					uid: uni.getStorageSync('p_uid'),
					token: uni.getStorageSync('p_token'),
					a_id: that.addressId,
					data: JSON.stringify(orderData),
					info: that.remark,
					type: that.orderType,
					coupon_id: that.coupon_id,
					is_express:that.syType
				};
			that.$api.doorder(data).then(res=>{
						if (res.code == 1) {
							if (that.orderType == 1 && parseFloat(totalMoney) == 0) {
								// 如果为金豆商品并且需支付0元时
								uni.redirectTo({
									url: `/pages/index/user`
								});
							} else if (that.orderType == 1 && parseFloat(totalMoney) > 0) {
								// 如果为金豆商品并且需支付大于0元时
								uni.redirectTo({
									url: `/pages/order/payment/method?orderId=${res.order_id}&total_fee=${totalMoney}&g_type=${orderData.g_type}`
								});
							} else {
								uni.redirectTo({
									url: `/pages/order/payment/method?orderId=${res.order_id}&total_fee=${totalMoney}`
								});
							}
						}
			})
			// uni.request({
			// 	method: 'POST',
			// 	url:this.global.baseUrl +  'index.php/index/main/order',
			// 	data: {
			// 		uid: uni.getStorageSync('p_uid'),
			// 		token: uni.getStorageSync('p_token'),
			// 		a_id: that.addressId,
			// 		data: orderData,
			// 		info: that.remark,
			// 		type: that.orderType,
			// 		coupon_id: that.coupon_id,
			// 		is_express:that.syType
			// 	},
			// 	success(res) {
			// 		 console.log(res.data.code);
			// 		if (res.data.code == 1) {
			// 			if (that.orderType == 1 && parseFloat(totalMoney) == 0) {
			// 				// 如果为金豆商品并且需支付0元时
			// 				uni.redirectTo({
			// 					url: `/pages/index/user`
			// 				});
			// 			} else if (that.orderType == 1 && parseFloat(totalMoney) > 0) {
			// 				// 如果为金豆商品并且需支付大于0元时
			// 				uni.redirectTo({
			// 					url: `/pages/order/payment/method?orderId=${res.data.order_id}&total_fee=${totalMoney}&g_type=${orderData.g_type}`
			// 				});
			// 			} else {
			// 				uni.redirectTo({
			// 					url: `/pages/order/payment/method?orderId=${res.data.order_id}&total_fee=${totalMoney}`
			// 				});
			// 			}
			// 		}
			// 	}
			// });
		},

		// 可用优惠券
		couponList(id, index) {
			var that = this;
			var data = {
				uid: uni.getStorageSync('p_uid'),
				token: uni.getStorageSync('p_token'),
				goods_id: id
			};
			that.$api.getCoupon(data).then(res => {
				if (res.code == 1) {
					that.$set(that.goodsList[index], 'coupon', res.data);
					that.$set(that.goodsList[index], 'pickerData', { title: that.$t('pages.order.confirm.xzyhq'), couponList: [] });
					// that.goodsList[index]['coupon'] = res.data;
					// that.goodsList[index]['pickerData'] = {
					// 	title: '选择优惠券',
					// 	couponList: []
					// };
					// that.goodsList = that.goodsList
					// console.log(that.goodsList[index])
				}
			});
		},

		// 计算价格
		getPrice() {
			var that = this;
			var orderData;
			if (that.orderType == 1) {
				orderData = that.goodsList[0];
			} else {
				orderData = that.goodsList;
			}
			// console.log(that.coupon_id)
			uni.request({
				method: 'POST',
				url: this.global.baseUrl + 'index.php/index/main/count_price',
				data: {
					data: orderData,
					type: that.orderType,
					coupon_id: that.coupon_id
				},
				header: {
					'Content-Type': 'application/json;charset=UTF-8'
					// 'Content-Type': 'application/x-www-form-urlencoded',
				},
				success(res) {
					that.$msg(res.data.msg);
					// console.log(orderData);
					if (res.data.code == 1) {
						that.total_fee = res.data.t_price;
						that.yh_price = res.data.yh_price;
						that.canUse = 1;
					} else {
						that.canUse = 0;
					}
				}
			});
		},

		// 选择优惠券
		selCoupon(coupon, index) {
			// console.log(this.goodsList[index].coupon)
			if (this.goodsList[index].coupon) {
				this.goodsIndex = index;
				this.showPicker = true;
				this.goodsList[index].pickerData.couponList = this.goodsList[index].coupon;
				this.pickerData.couponList = this.goodsList[index].coupon;
			} else {
				this.$msg(that.$t('pages.order.confirm.zwyhq'));
			}
		},
		// 1代金券   2满减券  3折扣券  4兑换券
		changeCoupon(index) {
			var that = this;

			if (index >= 0) {
				if (uni.getStorageSync('couponId')) {
					JSON.parse(uni.getStorageSync('couponId')).forEach(function(item, index) {
						if (item == that.goodsList[that.goodsIndex].pickerData.couponList[index].id) {
							// console.log(uni.getStorageSync('couponId'))
							JSON.parse(uni.getStorageSync('couponId')).splice(item, 1);
							return false;
						}
					});
				}
				// var newCouponArr = [];
				var goodsId = that.goodsList[that.goodsIndex].goods_id;
				that.couponId = that.goodsList[that.goodsIndex].pickerData.couponList[index].id;
				that.coupon_id[goodsId] = that.couponId;
				that.getPrice();

				setTimeout(function() {
					if (that.canUse == 1) {
						if (that.goodsList[that.goodsIndex].pickerData.couponList[index].c_type == 1) {
							that.goodsList[that.goodsIndex].pickerData.title = '-'+ that.$t('money.symbol') + that.goodsList[that.goodsIndex].pickerData.couponList[index].c_price;
						} else if (that.goodsList[that.goodsIndex].pickerData.couponList[index].c_type == 2) {
							that.goodsList[that.goodsIndex].pickerData.title = '-'+ that.$t('money.symbol')  + that.goodsList[that.goodsIndex].pickerData.couponList[index].c_reduce;
						} else if (that.goodsList[that.goodsIndex].pickerData.couponList[index].c_type == 3) {
							that.goodsList[that.goodsIndex].pickerData.title = parseFloat(that.goodsList[that.goodsIndex].pickerData.couponList[index].c_discount) + that.$t('pages.order.confirm.zhe');
						} else {
							that.goodsList[that.goodsIndex].pickerData.title = that.$t('pages.order.confirm.dhq');
						}
					}
				}, 500);
			} else {
				that.couponId = 0;
				that.goodsList[that.goodsIndex].pickerData.title = that.$t('pages.order.confirm.xzyhq');
			}
		}
	}
};
</script>

<style lang="scss">
	.goods-radio {
		transform: scale(0.66);
		margin-right: 10rpx;
		// background:  #E9B564;
	}
.add-address-box {
	height: 100rpx;
	background: #fff;
	position: relative;
	.address-bg {
		position: absolute;
		bottom: 0;
		height: 8rpx;
		width: 100%;
	}
	.select-notice {
		font-weight: 400;
		color: rgba(153, 153, 153, 1);
		line-height: 40rpx;
	}
}
.address-list {
	padding: 40rpx;
	background: #fff;
	position: relative;
	.address-bg {
		position: absolute;
		bottom: 0;
		height: 8rpx;
		width: 750rpx;
		left: 50%;
		transform: translateX(-50%);
	}
	.name,
	.phone {
		font-size: 30rpx;
		font-weight: 500;
	}
	.phone {
		margin: 0 20rpx;
	}
	.tag {
		background: rgba(239, 58, 58, 0.2);
		border-radius: 6rpx;
		padding: 0 16rpx;
		line-height: 38rpx;
		color: #a8700d;
		font-size: 22rpx;
	}
	.detail {
		.address {
			margin-top: 25rpx;
			width: 543rpx;
			font-size: 26rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: rgba(153, 153, 153, 1);
			line-height: 40rpx;
		}
	}
}
.goods-list {
	padding: 30rpx 20rpx;
	background: #fff;
	margin: 20rpx 0;
	position: relative;
	/deep/ .goods-title {
		width: 460rpx !important;
	}
	.tag-box {
		padding-top: 10rpx;
		.tag1 {
			line-height: 36rpx;
			padding: 0 8rpx;
			font-size: 18rpx;
			color: rgba(#fff, 0.9);
			background: #f39800;
			display: inline-block;
			box-sizing: border-box;
		}
		.tag2 {
			line-height: 34rpx;
			padding: 0 8rpx;
			font-size: 18rpx;
			color: rgba(#f39800, 0.9);
			background: #fff;
			border: 1rpx solid #f39800;
			display: inline-block;
			box-sizing: border-box;
		}
	}
	.goods-price {
		font-size: 30rpx;
		font-weight: 500;
		width: 480rpx;
		.goods-num {
			font-size: 28rpx;
			color: #c4c4c4;
		}
	}
	.goods-radio {
		transform: scale(0.7);
		margin-right: 20rpx;
	}
}
.item-list {
	height: 100rpx;
	background: #fff;
	padding: 0 25rpx;
	.item-title {
		font-size: 28rpx;
		margin-right: 20rpx;
	}
	.detail {
		font-size: 28rpx;
		color: #c4c4c4;
	}

	.price {
		font-size: 28rpx;
		color: $zhuse;
		margin-right: 20rpx;
	}
	.price::before {
		content: "";
	}
	.sel-coupon {
		font-size: 26rpx;
		color: #c4c4c4;
		margin-right: 20rpx;
	}
}
.remark-box {
	margin-bottom: 20rpx;
	background: #fff;
	padding: 25rpx;
	.remark-notice {
		font-size: 24rpx;
		color: #c4c4c4;
		padding: 0 20rpx;
	}
	.remark-inp {
		width: 700rpx;
		font-size: 28rpx;
		padding: 20rpx;
		height: 200rpx;
		background: #f5f5f5;
		border-radius: 20rpx;
		margin-top: 25rpx;
	}
}
.logistic,
.price-box,
.score {
	border-top: 1rpx solid rgba(#dfdfdf, 0.5);
	margin-bottom: 20rpx;
}
.foot_box {
	height: 100rpx;
	padding: 0 25rpx;
	justify-content: flex-end;
	background-color: #fff;
	.num {
		font-size: 26rpx;
		color: #999;
		text {
			color: $zhuse;
			font-weight: 500;
		}
	}
	.all-money {
		margin: 0 60rpx 0 20rpx;
		.price {
			color: $zhuse;
			font-weight: 500;
		}
		.price::before {
			content: "";
		}
	}
	.sub-btn {
		width: 210rpx;
		height: 70rpx;
		background: $zhuse;
		box-shadow: 0px 7rpx 6rpx 0px rgba(239, 58, 58, 0.22);
		// background: linear-gradient(90deg, rgba(233, 180, 97, 1), rgba(238, 204, 137, 1));
		// box-shadow: 0px 7rpx 6rpx 0px rgba(229, 138, 0, 0.22);
		border-radius: 35rpx;
		font-size: 28rpx;
		color: #fff;
	}
}
</style>
