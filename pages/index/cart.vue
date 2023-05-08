<template>
	<view class="page_box">
		<view class="head_box" v-if="cartList.length">

			<view class="tool-box x-bc">
				<view class="count-box">
					{{$t("index.cart.gong")}}
					<text class="all-num">{{ cartList.length }}</text>
					{{$t("index.cart.jsp")}}
				</view>
				<view class="cu-btn set-btn" @tap="onSet">{{ isTool ? $t("index.cart.wc") : $t("index.cart.bj") }}</view>
			</view>
		</view>
		<view class="content_box">
			<checkbox-group class="block" v-if="cartList.length">
				<view class="collect-list x-start" v-for="(g, index) in cartList" :key="index">
					<view class="x-c" style="height: 200rpx;" @tap="onSel(index, g.checked)">
						<checkbox :checked="g.checked" :class="{ checked: g.checked }" class="goods-radio round orange"></checkbox>
					</view>
					<shopro-mini-card :detail="g" :sku="g.s_price" :type="'sku'">
						<block slot="goodsBottom">
							<view class="x-bc price-box">
								<view class="price1">{{$t('money.symbol')}} {{ g.s_price ? g.s_price : g.g_price }}</view>
								<view class="uni-numbox x-f">
									<view @tap.stop="changeCount(g, -1)" class="uni-numbox__minus">
										<button class=" cu-btn uni-numbox--text">
											<text class="iconfont icon-reduce-fill"></text>
										</button>
									</view>
									<input :disabled="true"  class="uni-numbox__value" type="number" v-model="g.c_num" />
									<view @tap.stop="changeCount(g, 1)" class="uni-numbox__plus">
										<button class=" cu-btn uni-numbox--text">
											<text class="iconfont icon-add-fill"></text>
										</button>
									</view>
									<!-- <uni-number-box @change="onChangeNum($event, g, index)" :value="g.c_num" :min="1"></uni-number-box> -->
								</view>
							</view>
						</block>
					</shopro-mini-card>
				</view>
			</checkbox-group>
			<view class="empty-box x-c" v-else><shopro-empty :emptyData="emptyData"></shopro-empty></view>
		</view>
		<view class="foot_box " v-if="cartList.length">
			<view class="tools-box x-bc">
				<label class="check-all x-f" @tap="onAllSel">
					<radio :checked="allSel" :class="{ checked: allSel }" class="check-all-radio orange"></radio>
					<text>{{$t("index.cart.all")}}</text>
					<text>（{{ totalCount.totalNum }}）</text>
				</label>
				<view class="x-f">
					<view class="price1" v-if="!isTool">{{$t('money.symbol')}}{{ totalCount.totalPrice.toFixed(2) }}</view>
					<button class="cu-btn pay-btn" v-show="!isTool" @tap="onPay">{{$t("index.cart.js")}}</button>
					<button class="cu-btn del-btn" v-show="isTool" @tap="goodsDelete">{{$t("index.cart.sc")}}</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import shoproMiniCard from '@/components/goods/shopro-mini-card.vue';
import uniNumberBox from '@/components/uni-number-box/uni-number-box.vue';
import shoproEmpty from '@/components/shopro-empty/shopro-empty.vue';
import { mapMutations, mapActions, mapState, mapGetters } from 'vuex';
let timer = null;
export default {
	components: {
		shoproMiniCard,
		uniNumberBox,
		shoproEmpty
	},
	data() {
		return {
			isTool: false,
			emptyData: {
				img: '/static/imgs/empty/emptyCart.png',
				tip: `${this.$t("index.cart.emptyData.tip")}~`
			},
			cartList: [],
			allSel: false,
			totalCount: {
				totalNum: 0,
				totalPrice: 0
			},
			isSel: false,
			cartId: []
		};
	},
	computed: {
		// ...mapState({
		// 	cartList: ({ cart }) => cart.cartList,
		// 	allSel: ({ cart }) => cart.allSelected
		// }),
		// ...mapGetters(['totalCount', 'isSel'])
	},
	onShow() {
		this.allSel = false;
		this.totalCount.totalNum = 0;
		this.totalCount.totalPrice = 0;
		this.getCartList();
		if(uni.removeStorageSync('couponId')){
			uni.removeStorageSync('couponId');
		}
	},
	methods: {
		// ...mapActions(['getCartList', 'changeCartList']),
		// 获取购物车信息
		getCartList() {
			var that = this;
			var data = {
				uid: uni.getStorageSync('p_uid'),
				token: uni.getStorageSync('p_token')
			};
			that.$api.cartInfo(data).then(res => {
				if (res.code === 1) {
					res.data.forEach(function(item) {
						item['checked'] = false;
					});
					that.cartList = res.data;
				}
			});
		},
		//数量加减
		changeCount(item, num){
			var that = this;
			if(num > 0){
				item.c_num++;
				var data = {
					uid: uni.getStorageSync('p_uid'),
					token: uni.getStorageSync('p_token'),
					cart_id: item.cart_id,
					num: item.c_num
				};
				that.$api.editCart(data).then(res => {
					if (res.code != 1) {
						that.$msg(res.msg)
					}
				});
			}else{
				if (item.c_num > 1) {
					item.c_num--;	
					if(item.c_num > 0){
						var data = {
							uid: uni.getStorageSync('p_uid'),
							token: uni.getStorageSync('p_token'),
							cart_id: item.cart_id,
							num: item.c_num
						};
						that.$api.editCart(data).then(res => {
							if (res.code != 1) {
								that.$msg(res.msg)
							}
						});
					}
				}
			}
			that.checkCartList();
		},
		// 路由跳转
		jump(path, parmas) {
			this.$Router.push({
				path: path,
				query: parmas
			});
		},
		// 单选
		onSel(index, flag) {
			let that = this;
			that.cartList[index].checked = !that.cartList[index].checked;
			that.checkCartList();
		},
		// 全选检测
		checkCartList() {
			var that = this;
			let all = true;
			let totalNum = 0;
			let totalPrice = 0;
			that.cartId = [];
			that.cartList.map(item => {
				if (!item.checked) {
					all = false;
				}
			});
			that.cartList.filter(item => {
				if (item.checked) {
					that.cartId.push(item.cart_id);
					totalNum += 1;
					// console.log(item)
					if (item.s_price) {
						totalPrice += item.c_num * item.s_price;
					}else{
						totalPrice += item.c_num * item.g_price;
					}
				}
			});
			that.totalCount.totalNum = totalNum;
			that.totalCount.totalPrice = totalPrice;
			that.allSel = all;
		},
		// 功能切换
		onSet() {
			this.isTool = !this.isTool;
		},
		// 全选
		onAllSel() {
			let that = this;
			that.allSel = !that.allSel;
			that.cartList.map(item => {
				item.checked = that.allSel;
			});
			that.checkCartList();
		},
		// 结算
		onPay() {
			let that = this;
			let selectedIdsArray = [];
			that.cartList.map(item => {
				if (item.checked) {
					selectedIdsArray.push(item.cart_id);
				}
			});
			if (selectedIdsArray.length == 0) {
				that.$msg(that.$t("index.cart.onPay.msg"));
				return;
			}
			// console.log(selectedIdsArray);
			uni.request({
				method: 'POST',
				url:this.global.baseUrl +  'index.php/index/main/cart_submit',
				data: {
					uid: uni.getStorageSync('p_uid'),
					token: uni.getStorageSync('p_token'),
					cart_id: selectedIdsArray
				},
				success(res) {
					if(res.data.code == 1){
						uni.setStorageSync('u_tid',res.data.u_tid);
						uni.setStorageSync('u_name',res.data.u_name);
						uni.navigateTo({
							url:'/pages/order/confirm?goodsList='+JSON.stringify(res.data.data)+'&from=cart',
						})
					}
				}
			});
			// var data = {
			// 	uid:uni.getStorageSync('p_uid'),
			// 	token:uni.getStorageSync('p_token'),
			// 	cart_id:selectedIdsArray,
			// }
			// that.$api.submitCart(data).then(res => {
			// 	if (res.code === 1) {
			// 		uni.navigateTo({
			// 			url:'/pages/order/confirm'
			// 		})
			// 	}
			// });
		},
		// 删除
		goodsDelete() {
			let that = this;
			let selectedIdsArray = [];
			that.cartList.map(item => {
				if (item.checked) {
					selectedIdsArray.push(item.cart_id);
				}
			});
			if (selectedIdsArray.length == 0) {
				that.$msg(that.$t("index.cart.goodsDelete.msg"));
				return;
			}
			// console.log(selectedIdsArray)
			var data = {
				uid: uni.getStorageSync('p_uid'),
				token: uni.getStorageSync('p_token'),
				cart_id: selectedIdsArray.join(',')
			};
			that.$api.delCart(data).then(res => {
				if (res.code === 1) {
					that.getCartList();
					that.totalCount.totalNum = 0;
					that.totalCount.totalPrice = 0;
				}
			});
			// this.changeCartList({ ids: selectedIdsArray, art: 'delete' });
		}
	}
};
</script>

<style lang="scss">
	$box-height: 35px;
	/* #ifdef APP-NVUE */
	$box-line-height: 35px;
	/* #endif */
	$box-line-height: 26px;
	$box-width: 35px;
	.iconfont {
		font-size: 50rpx;
	}
	.uni-numbox {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		height: $box-height;
		line-height: $box-height;
		.cu-btn {
			background: none;
			padding: 0;
		}
	}
	
	.uni-numbox__value {
		background-color: none;
		width: 40px;
		height: $box-height;
		text-align: center;
		font-size: 28rpx;
	}
	
	.uni-numbox__minus {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		.icon-reduce-fill {
			color: #e7e7e7;
		}
	}
	
	.uni-numbox__plus {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		.icon-add-fill {
			color: $zhuse;
		}
	}
	
	.uni-numbox--text {
		font-size: 32rpx;
		line-height: 40rpx;
		color: #fff;
	}
	
	.uni-numbox--disabled {
		color: #fff;
	}
.head_box {
	.safety-box {
		height: 80rpx;
		font-size: 24rpx;
		padding: 0 30rpx;
		background: #f7f5f6;

		.cuIcon-safe {
			font-size: 32rpx;
			margin-right: 16rpx;
		}
	}

	.tip-box {
		font-size: 26rpx;
		color: #999;
		height: 90rpx;
		padding: 0 30rpx;
		background: #fff;

		.tag {
			border: 1rpx solid rgba(168, 112, 13, 1);
			border-radius: 2rpx;
			padding: 0 10rpx;
			line-height: 40rpx;
			font-size: 26rpx;
			color: #a8700d;
			margin-right: 20rpx;
		}
	}

	.tool-box {
		height: 90rpx;
		padding: 0 30rpx;
		background: #f7f5f6;

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
			padding: 0;
		}
	}
}

// 空白页
.empty-box {
	flex: 1;
	width: 100%;
	height: 100%;
}

.collect-list {
	padding: 30rpx 20rpx;
	background: #fff;
	margin-bottom: 20rpx;

	/deep/ .goods-title {
		width: 420rpx !important;
	}

	.tag-box {
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
			border-top: 1rpx solid #f39800;
			border-right: 1rpx solid #f39800;
			border-bottom: 1rpx solid #f39800;
			display: inline-block;
			box-sizing: border-box;
		}
	}

	.goods-radio {
		transform: scale(0.7);
		margin-right: 20rpx;
		// background:  #E9B564;
	}

	.price-box {
		width: 420rpx;

		.price1 {
			color: $zhuse;
		}
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
			color: #e9b564;
		}
	}

	.price1 {
		color: $zhuse;
		font-size: 36upx;
		font-size: 500;
		margin-right: 30rpx;
	}

	.pay-btn {
		width: 200rpx;
		height: 70rpx;
		background: $zhuse;
		// background: linear-gradient(90deg, rgba(233, 180, 97, 1), rgba(238, 204, 137, 1));
		box-shadow: 0px 7rpx 6rpx 0px rgba(239, 58, 58, 0.22);
		border-radius: 35rpx;
		padding: 0;
		color: rgba(#fff, 0.9);
	}

	.del-btn {
		width: 200rpx;
		height: 70rpx;
		background: linear-gradient(90deg, rgba(244, 71, 57, 1) 0%, rgba(255, 102, 0, 1) 100%);
		border-radius: 35rpx;
		padding: 0;
		color: rgba(#fff, 0.9);
	}
}
</style>
