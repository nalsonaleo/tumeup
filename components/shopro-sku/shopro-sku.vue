<template>
	<!-- <view class="">
			<view class="size-box" @tap="showSkuModal">
			<view class="x-bc">
				<view class="x-f">
					<text class="title">规格</text>
					<text class="tip">{{ currentSkuText || '请选择规格' }}</text>
				</view>
				<text class="cuIcon-right"></text>
			</view>
		</view> -->
		<!-- 规格 -->
		<view class="cu-modal sku-modal  bottom-modal" style="z-index: 999;" :class="{ show: showModal }" @tap="hideModal" catchtouchmove="true">
			<view class="cu-dialog" @tap.stop style="background: none;">
				<view class="shop-modal page_box">
					<text class="cuIcon-roundclosefill" @tap="hideModal"></text>
					<!-- 商品信息 -->
					<view class="top x-f modal-head__box">
						<image class="shop-img" :src="goodsSrc" mode="aspectFill"></image>
						<view class="y-bc goods-box">
							<view class="goods-title more-t">{{ goodsInfo2.g_name }}</view>
							<view class="x-bc goods-bottom">
								<view class="price-box x-f">
									<view><text v-if="goodsInfo2.g_type  == 3">{{currentSkuPrice.integral || goodsInfo2.g_integral3}}{{$t("user.goods.detail.shoproSku.jd")}}+</text> {{$t('money.symbol')}}{{ currentSkuPrice.price ?currentSkuPrice.price: goodsInfo2.g_price}}</view>
									<!-- <view v-if="goodsType === 'score'">{{ currentSkuPrice.price_text || goodsInfo.price }}</view>
									<view v-else-if="grouponBuyType === 'groupon'">
										￥{{ currentSkuPrice.groupon_price || (goodsInfo.activity_type === 'groupon' ? goodsInfo.groupon_price : goodsInfo.price) }}
									</view>
									<view v-else>￥{{ currentSkuPrice.price || goodsInfo.price }}</view> -->
								</view>
								<text class="stock">{{$t("user.goods.detail.shoproSku.kc")}}{{ currentSkuPrice.stock ? currentSkuPrice.stock : goodsInfo2.g_stock }}{{$t("user.goods.detail.shoproSku.jie")}}</text>
							</view>
						</view>
					</view>
					<!-- 选择规格 -->
					<view class="content_box" >
						<!-- <view class="select-box y-start"> -->
						<view class="select-box y-start" v-if="goodsInfo2.g_more == 1" v-for="(s, x) in goodsInfo2.sku" :key="s.id">
							<view class="type-title">{{ s.a_name }}</view>
							<view class="tag-box x-f">
								<button
									class="tag cu-btn"
									v-for="(sc, y) in s.sku"
									:key="sc.id"
									:class="{ 'tag-active': currentSkuArray[sc.a_pid] == sc.id, 'tag-disabled': sc.disabled == true }"
									:disabled="sc.disabled == true"
									@tap="chooseSku(sc.a_pid, sc.id)"
								>
									{{ sc.a_name }}
								</button>
							</view>
						</view>
						<view class="buy-num-box x-bc">
							<view class="num-title">{{$t("user.goods.detail.shoproSku.gmsl")}}</view>
							<view class="uni-numbox x-f">
								<view @tap.stop="changeCount(-1)" class="uni-numbox__minus">
									<button class=" cu-btn uni-numbox--text">
										<text class="iconfont icon-reduce-fill">-</text>
									</button>
								</view>
								<input :disabled="true"  class="uni-numbox__value" type="number" v-model="goodsNum" />
								<view @tap.stop="changeCount(1)" class="uni-numbox__plus">
									<button class=" cu-btn uni-numbox--text">
										<text class="iconfont icon-add-fill">+</text>
									</button>
								</view>
							</view>
						<!-- 	<view class="num-step">
								<uni-number-box
									@change="changeNum"
									:step="1"
									:min="1"
									:currentSkuPrice.sync="currentSkuPrice"
									:goodsInfo="goodsInfo"
									:value="goodsNum"
								></uni-number-box>
							</view> -->
						</view>
					</view>
					<view class="btn-box foot_box x-bc" v-if="buyType == 'cart' || buyType == 'buy'"><button class="cu-btn  seckill-btn" @tap="confirm">{{$t("user.goods.detail.shoproSku.qr")}}</button></view>
					<view class="btn-box foot_box x-bc" v-else>
						<button class="cu-btn  cart-btn" @tap="confirmCart" v-if="goodsInfo.g_type ==2">{{$t("user.goods.detail.shoproSku.jrgwc")}}</button>
						<button class="cu-btn  buy-btn" @tap="confirmBuy" :class="goodsInfo.g_type !=2 ? 'wid100':''">{{$t("user.goods.detail.shoproSku.ljgm")}}</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import uniNumberBox from '@/components/uni-number-box/uni-number-box.vue';
import { mapMutations, mapActions, mapState } from 'vuex';
export default {
	components: {
		uniNumberBox
	},
	data() {
		return {
			skuList: [],
			currentSkuPrice: {
				stock:"",
				price:"",
				sku_id:"",
				integral:''
			},
			goodsSrc:'',
			currentSkuArray: [],
			goodsNum: 1,
			confirmGoodsInfo: {},
			type: this.buyType,
			goodsInfo2: {},
		};
	},
	props: {
		goodsInfo: {},
		value: {},
		buyType: {
			type: String,
			default: 'sku'
		},
		// goodsType: {
		// 	type: String,
		// 	default: 'goods'
		// },
		grouponBuyType: {
			type: String,
			default: 'alone'
		},
		grouponId: {
			//参加拼团的时候，传入当前团id;
			type: Number,
			default: 0
		}
	},
	watch: {
		type(nweVal, oldVal) {
			return newVal;
		},
		goodsInfo(newVal, oldVal){
			if( newVal){
				this.goodsInfo2  = newVal;
				this.currentSkuPrice.stock = this.goodsInfo2.g_stock;
				this.goodsSrc = this.goodsInfo2.g_imgs[0];
				if(this.goodsInfo2.g_integral3){
					this.currentSkuPrice.integral = this.goodsInfo2.g_integral3;
				}
			}
		}
	},
	created() {
		// this.currentSkuPrice.stock = this.goodsInfo.g_stock;
		// this.goodsSrc = this.goodsInfo.g_imgs[0];
		// if(this.goodsInfo.g_integral3){
		// 	this.currentSkuPrice.integral = this.goodsInfo.g_integral3;
		// }
		
		// this.skuList = this.goodsInfo.sku;
		// this.changeDisabled(false);
	},

	computed: {
		// skuPrice() {
		// 	return this.goodsInfo.sku_price;
		// },
		showModal: {
			get() {
				return this.value;
			},
			set(val) {
				this.$emit('input', val);
			}
		},
		
	},

	methods: {
		currentSkuText() {
			let that = this;
			let str = '';
			let currentSkuArray = this.currentSkuArray;
			currentSkuArray.forEach(v => {
				that.goodsInfo2.sku.forEach(s => {
					s.sku.forEach(u => {
						if (u.id == v) {
							str += ' ' + u.a_name;
						}
					});
				});
			});
			that.$emit('getSkuText', str);
			return str;
		},
		// 选择规格
		chooseSku(pid, skuId) {
			let that = this;
			let isChecked = true; // 选中 or 取消选中

			if (that.currentSkuArray[pid] != undefined && that.currentSkuArray[pid] == skuId) {
				// 点击已被选中的，删除并填充 ''
				isChecked = false;
				that.currentSkuArray.splice(pid, 1);
			} else {
				// 选中
				that.$set(that.currentSkuArray, pid, skuId);
			}

			let chooseSkuId = []; // 选中的规格大类
			that.currentSkuArray.forEach(sku => {
				if (sku != '') {
					// sku 为空是反选 填充的
					chooseSkuId.push(sku);
				}
			});
			
			// console.log(that.currentSkuArray)
			// 根据所选规格获取对应信息
			if(chooseSkuId.length == that.goodsInfo2.sku.length){
				var data = {
						goods_id: that.goodsInfo2.id,
						attr_id: chooseSkuId
					};
				that.$api.chooseSku(data).then(res=>{		
					if(res.code == 1){	
						if(res.data.s_integral){
							that.currentSkuPrice.integral = res.data.s_integral;
						}
						that.currentSkuPrice.stock = res.data.s_stock;
						that.currentSkuPrice.price = res.data.s_price;
						that.currentSkuPrice.sku_id = res.data.sku_id;
					}
				});
				// uni.request({
				// 	method:'POST',
				// 	url:this.global.baseUrl + 'index.php/index/goods/sku_info',
				// 	header: {
				// 		// 'Content-Type': 'application/json;charset=UTF-8'
				// 		// 'Content-Type': 'application/x-www-form-urlencoded',
				// 	},
				// 	data:{
				// 		goods_id: that.goodsInfo2.id,
				// 		attr_id: chooseSkuId
				// 	},
				// 	success:function(res) {
				// 		// console.log(res.data)
				// 		if(res.data.code == 1){
				// 			if(res.data.data.s_integral){
				// 				that.currentSkuPrice.integral = res.data.data.s_integral;
				// 			}
				// 			that.currentSkuPrice.stock = res.data.data.s_stock;
				// 			that.currentSkuPrice.price = res.data.data.s_price;
				// 			that.currentSkuPrice.sku_id = res.data.data.sku_id;
				// 		}
				// 	}
				// })
			}
			

			// // 当前所选规格下，所有可以选择的 skuPric
			// let newPrice = this.getCanUseSkuPrice();

			// // 判断所有规格大类是否选择完成
			// if (chooseSkuId.length == that.skuList.length && newPrice.length) {
			// 	that.currentSkuPrice = newPrice[0];
			// } else {
			// 	that.currentSkuPrice = {};
			// }

			// // 改变规格项禁用状态
			// this.changeDisabled(isChecked, pid, skuId);
		},
		
		//数量加减
		changeCount(num){
			var that = this;
			if(num > 0){
				if(that.goodsNum >= that.currentSkuPrice.stock){
					that.$msg(that.$t('components.shoproSku.kcbz'));
					return;
				}
				that.goodsNum ++;
			}else{
				if (that.goodsNum > 1) {
					that.goodsNum--;
				}
			}
		},
		
		// 改变禁用状态
		changeDisabled(isChecked = false, pid = 0, skuId = 0) {
			let newPrice = []; // 所有可以选择的 skuPrice

			if (isChecked) {
				// 选中规格

				// 当前点击选中规格下的 所有可用 skuPrice
				for (let price of this.skuPrice) {
					if (price.stock <= 0) {
						// this.goodsNum 不判断是否大于当前选择数量，在 uni-number-box 判断，并且 取 stock 和 goods_num 的小值
						continue;
					}
					if (price.goods_sku_id_arr.indexOf(skuId.toString()) >= 0) {
						newPrice.push(price);
					}
				}
			} else {
				// 取消选择规格

				// 当前所选规格下，所有可以选择的 skuPric
				newPrice = this.getCanUseSkuPrice();
			}

			// 所有存在并且有库存未选择的规格项 的 子项 id
			let noChooseSkuIds = [];
			for (let price of newPrice) {
				noChooseSkuIds = noChooseSkuIds.concat(price.goods_sku_id_arr);
			}

			// 去重
			noChooseSkuIds = Array.from(new Set(noChooseSkuIds));

			if (isChecked) {
				// 去除当前选中的规格项
				let index = noChooseSkuIds.indexOf(skuId.toString());
				noChooseSkuIds.splice(index, 1);
			} else {
				// 循环去除当前已选择的规格项
				this.currentSkuArray.forEach(sku => {
					if (sku.toString() != '') {
						// sku 为空是反选 填充的
						let index = noChooseSkuIds.indexOf(sku.toString());
						if (index >= 0) {
							// sku 存在于 noChooseSkuIds
							noChooseSkuIds.splice(index, 1);
						}
					}
				});
			}

			// 当前已选择的规格大类
			let chooseSkuKey = [];
			if (!isChecked) {
				// 当前已选择的规格大类
				this.currentSkuArray.forEach((sku, key) => {
					if (sku != '') {
						// sku 为空是反选 填充的
						chooseSkuKey.push(key);
					}
				});
			} else {
				// 当前点击选择的规格大类
				chooseSkuKey = [pid];
			}

			for (let i in this.skuList) {
				// 当前点击的规格，或者取消选择时候 已选中的规格 不进行处理
				if (chooseSkuKey.indexOf(this.skuList[i]['id']) >= 0) {
					continue;
				}

				for (let j in this.skuList[i]['content']) {
					// 如果当前规格项 id 不存在于有库存的规格项中，则禁用
					if (noChooseSkuIds.indexOf(this.skuList[i]['content'][j]['id'].toString()) >= 0) {
						this.skuList[i]['content'][j]['disabled'] = false;
					} else {
						this.skuList[i]['content'][j]['disabled'] = true;
					}
				}
			}
		},
		// 当前所选规格下，获取所有有库存的 skuPrice
		getCanUseSkuPrice() {
			let newPrice = [];

			for (let price of this.skuPrice) {
				if (price.stock <= 0) {
					// || price.stock < this.goodsNum		不判断是否大于当前选择数量，在 uni-number-box 判断，并且 取 stock 和 goods_num 的小值
					continue;
				}
				var isOk = true;

				this.currentSkuArray.forEach(sku => {
					// sku 不为空，并且，这个 条 skuPrice 没有被选中,则排除
					if (sku.toString() != '' && price.goods_sku_id_arr.indexOf(sku.toString()) < 0) {
						isOk = false;
					}
				});

				if (isOk) {
					newPrice.push(price);
				}
			}

			return newPrice;
		},
		
		// 弹窗显示隐藏
		showSkuModal() {
			this.$emit('changeType', 'sku');
			this.showModal = true;
		},
		hideModal() {
			this.showModal = false;
		},
		// 加入购物车确定
		confirmCart() {
			let that = this;
			var sku_id;
			if(that.goodsInfo2.g_more == 1){
				sku_id = [];
				that.currentSkuArray.forEach(function(item){
					sku_id.push(item)
				})
				if(sku_id.length != that.goodsInfo2.sku.length){
					that.$msg(that.$t('components.shoproSku.qszspgg'));
					return;
				}
			}else{
				sku_id = 0;
				that.currentSkuPrice.sku_id = 0;
			}
			// console.log( sku_id.length,that.goodsInfo.sku.length)
			
			that.currentSkuText();
			// console.log(that.currentSkuPrice)
			var data = {
				uid:uni.getStorageSync('p_uid'),
				token:uni.getStorageSync('p_token'),
				goods_id:that.goodsInfo2.id,
				sku_id:that.currentSkuPrice.sku_id,
				num:that.goodsNum,
			};
			that.$api.addCart(data).then(res => {
				if(res.code == 1){
					that.$msg(res.msg);
					that.showModal = false;
					// that.currentSkuArray = [];
					that.goodsNum = 1;
				}
			});
		},
		// 立即购买
		confirmBuy() {
			let that = this;
			var sku_id;
			if(that.goodsInfo2.g_more == 1){
				sku_id = [];
				that.currentSkuArray.forEach(function(item){
					sku_id.push(item)
				})
				if(sku_id.length != that.goodsInfo2.sku.length){
					that.$msg(that.$t('components.shoproSku.qszspgg'));
					return;
				}
			}else{
				sku_id = 0;
				that.currentSkuPrice.sku_id = 0;
			}
			// if(sku_id != 0 &&  sku_id.length != that.goodsInfo.sku.length){
			// 	that.$msg('请选择商品规格');
			// 	return;
			// }
			var data = {
				uid:uni.getStorageSync('p_uid'),
				token:uni.getStorageSync('p_token'),
				goods_id:that.goodsInfo2.id,
				sku_id:that.currentSkuPrice.sku_id,
				num:that.goodsNum,
			};
			that.$api.submitGoods(data).then(res => {
				if(res.code == 1){
					uni.navigateTo({
						url:'/pages/order/confirm?goodsList='+JSON.stringify(res.data)+'&from=goods&g_type='+res.g_type,
					})
				}
			});
		},
		// 确定
		confirm() {
			// this.confirmSku();
			switch (this.buyType) {
				case 'cart':
					this.confirmCart();
					break;
				case 'buy':
					this.confirmBuy();
					break;
				default:
			}
		},
		// 确定规格
		confirmSku() {
			let that = this;
			if (that.currentSkuPrice.stock < that.goodsNum) {
				that.$tools.toast(that.$t('components.shoproSku.kcbz'));
				return false;
			} else {
				that.currentSkuPrice.goods_num = that.goodsNum;
				that.confirmGoodsInfo = {
					goods_id: that.currentSkuPrice.goods_id,
					goods_num: that.currentSkuPrice.goods_num,
					sku_price_id: that.currentSkuPrice.id,
					goods_price: that.currentSkuPrice.price
				};
				if (!that.confirmGoodsInfo.sku_price_id) {
					that.$tools.toast(that.$t('components.shoproSku.qszspgg'));
					return false;
				} else {
					that.showModal = false;
					return true;
				}
			}
		}
	}
};
</script>

<style lang="scss">
	.wid100{width: 100%!important;}
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
		align-items: center;
		justify-content: center;
		.cu-btn {
			//background: #e7e7e7;
			padding: 0;
			
			
		}
	}
	
	.uni-numbox__value {
		background-color: none;
		width: 50px;
		height: $box-height;
		text-align: center;
		align-items: center;
		justify-content: center;
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
			color:$zhuse;
			
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
.size-box {
	line-height: 82rpx;
	background: #fff;
	padding: 0 20rpx;
	margin: 20rpx 0;
	font-size: 28rpx;

	.title {
		color: #999;
		margin-right: 20rpx;
	}

	.cuIcon-right {
		color: #bfbfbf;
		font-size: 36rpx;
	}
}

// 规格
.shop-modal {
	width: 750upx;
	height: 950upx;
	background: rgba(255, 255, 255, 1);
	border-radius: 30rpx 30rpx 0 0 !important;
	padding: 60upx 20upx 30rpx;

	.cuIcon-roundclosefill {
		font-size: 34rpx;
		color: #e0e0e0;
		position: absolute;
		top: 20rpx;
		right: 20rpx;
	}

	.top {
		margin-bottom: 50upx;

		.shop-img {
			width: 160upx;
			height: 160upx;
			border-radius: 6upx;
			margin-right: 30upx;
			background: #ccc;
		}

		.goods-box {
			height: 160upx;
			width: 490rpx;
			align-items: flex-start;

			.goods-title {
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: rgba(51, 51, 51, 1);
				line-height: 46rpx;
				text-align: left;
			}

			.goods-bottom {
				width: 100%;
			}

			.price-box {
				font-size: 36upx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #e1212b;

				.unit {
					font-size: 24upx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #e1212b;
				}
			}

			.stock {
				font-size: 26rpx;
				color: #999;
			}
		}
	}

	.select-box {
		margin-bottom: 25upx;

		.type-title {
			font-size: 26upx;
			font-family: PingFang SC;
			font-weight: 400;
			margin-bottom: 20upx;
		}
		.tag-box {
			flex-wrap: wrap;
		}
		.tag {
			line-height: 62rpx;
			background: rgba(#ddd, 0.8);
			border-radius: 31rpx;
			font-size: 28upx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #999;
			padding: 0 30upx;
			margin-bottom: 20rpx;
			margin-right: 10rpx;
		}

		.tag-active {
			background: #ef3a3a;
			// background: linear-gradient(90deg, rgba(233, 180, 97, 1), rgba(238, 204, 137, 1));
			color: rgba(#fff, 0.9);
		}

		.tag-disabled {
			background: #f5f5f5;
		}
	}

	.buy-num-box {
		.num-title {
			font-size: 26upx;
			font-family: PingFang SC;
			font-weight: 400;
			margin-bottom: 20upx;
		}
	}
}

.btn-box {
	height: 100rpx;

	.cu-btn {
		width: 340rpx;
		height: 70rpx;
		border-radius: 35rpx;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(255, 255, 255, 0.9);
		padding: 0;
	}

	.cart-btn {
		background: linear-gradient(90deg, rgba(103, 104, 105, 1), rgba(82, 82, 82, 1));
		box-shadow: 0px 2rpx 5rpx 0px rgba(102, 103, 104, 0.46);
	}

	.buy-btn {
		background: linear-gradient(90deg, rgba(233, 180, 97, 1), rgba(238, 204, 137, 1));
		box-shadow: 0px 7rpx 6rpx 0px rgba(229, 138, 0, 0.22);
	}
	.seckill-btn {
		width: 710rpx;
		height: 70rpx;
		background:#ef3a3a;
		// background: linear-gradient(90deg, rgba(233, 180, 97, 1), rgba(238, 204, 137, 1));
		// box-shadow: 0px 7rpx 6rpx 0px rgba(229, 138, 0, 0.22);
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(255, 255, 255, 1);
		border-radius: 35rpx;
		padding: 0;
	}
}
</style>
