<template>
	<view class="page_box">
		<view class="head_box">

		</view>
		<view class="content_box">
			<view class="goods-box">
				<shopro-mini-card>
					<block slot="goodsBottom"></block>
				</shopro-mini-card>
			</view>
			<view class="goods-item x-bc" @tap="onSel(1)">
				<text class="item-title">{{$t("order.refund.hwzt")}}</text>
				<text class="cuIcon-right"></text>
			</view>
			<view class="goods-item x-bc" @tap="onSel(2)">
				<text class="item-title">{{$t("order.refund.tkyy")}}</text>
				<text class="cuIcon-right"></text>
			</view>
			<view class="goods-item x-f">
				<text class="item-title">{{$t("order.refund.tkje")}}：</text>
				<text class="price">￥16.00</text>
			</view>
			<view class="explain goods-item x-f">
				<text class="item-title">{{$t("order.refund.sm")}}：</text>
				<input class="flex-sub" value="" :placeholder="$t('order.refund.xt')" />
			</view>

			<view class="upload-img">
				<text class="upload-title">{{$t("order.refund.scpz")}}</text>
				<view class="img-box">
					<view class="preview-box" v-for="(item, index) in imgList" :key="index">
						<image class="preview-img" :src="imgList[index]" mode="aspectFill"></image>
						<text class="cuIcon-close" @tap="DelImg(index)"></text>
					</view>
					<view class="choose-img x-c" @tap="chooseImg" v-if="imgList.length < 10"><text class="cuIcon-cameraadd"></text></view>
				</view>
			</view>


		</view>
		<view class="foot_box x-c">
			<button class="cu-btn sub-btn">{{$t("order.refund.tj")}}</button>
		</view>
		<shopro-modal v-model="showModal" :modalType="'bottom-modal'">
			<block slot="modalContent">
				<view class="modal-box page_box">
					<view class="modal-head head_box x-c">
						{{modalDetail.title}}
					</view>
					<view class="modal-content content_box">
						<radio-group @tap="onRadio" class="y-f">
							<label class="sel-item x-bc" v-for="item in modalDetail.list" :key="item.id">
								<text>{{item.val}}</text>
								<radio class="brown sel-radio" :value="item.val" ></radio>
							</label>
						</radio-group>
					</view>
					<view class="modal-foot foot_box x-c">
						<button class="cu-btn close-btn" @tap="onClose">{{$t("order.refund.gb")}}</button>
					</view>
				</view>
			</block>
		</shopro-modal>
	</view>
</template>

<script>
	import shoproMiniCard from '@/components/goods/shopro-mini-card.vue'
	import shoproModal from '@/components/modal/shopro-modal.vue'
	export default {
		components: {
			shoproMiniCard,
			shoproModal

		},
		data() {
			return {
				showModal: false,
				imgList: [],
				modalDetail: {},
				goodsState: {
					title: this.$t("order.refund.hwzt.list"),
					list: [{
							id: 1,
							val: this.$t("order.refund.ysdh.list")
						},
						{
							id: 2,
							val: this.$t("order.refund.wsdh.list")
						}
					]
				},
				refundList: {
					title: this.$t("order.refund.tkyy"),
					list: [{
							id: 1,
							val: this.$t("order.refund.mjfchl")
						},
						{
							id: 2,
							val: this.$t("order.refund.tyf")
						},
						{
							id: 3,
							val: `${this.$t("order.refund.dx.id.three")}/${this.$t("order.refund.zlyspmsbf")}`
						},
						{
							id: 4,
							val: this.$t("order.refund.scrq")
						},
						{
							id: 5,
							val: this.$t("order.refund.zlwt")
						}
					]
				}
			};
		},
		computed: {},
		methods: {
			chooseImg() {
				let that = this;
				that.$tools.chooseImage(1).then(res => {
					that.imgList.push(res);
				});
			},
			DelImg(index) {
				let that = this;
				uni.showModal({
					title: that.$t("order.refund.sczp"),
					content: that.$t("order.refund.enquire.delpic"),
					cancelText: that.$t("order.refund.cancel"),
					confirmText: that.$t("order.refund.del.text"),
					success: res => {
						if (res.confirm) {
							this.imgList.splice(index, 1);
						}
					}
				});
			},
			onSel(state) {
				switch (state) {
					case 1:
						this.modalDetail = this.goodsState;
						break;
					case 2:
						this.modalDetail = this.refundList;
						break;
					default:
						break;
				}
				this.showModal = true;
			}

		},

	};
</script>

<style lang="scss">
	.goods-box {
		background: #fff;
		padding: 30rpx 25rpx;
		margin-bottom: 20rpx;
	}

	.goods-item {
		height: 95rpx;
		background: #fff;
		padding: 0 25rpx;
		margin-bottom: 20rpx;
		border-top: 1rpx solid rgba(#DFDFDF, 0.5);

		&:nth-of-type(2n) {
			margin-bottom: 0;
			border-top: 0;
		}

		.item-title {
			font-size: 28rpx;
		}

		.cuIcon-right {
			font-size: 32rpx;
		}

		.price {
			font-size: 28rpx;
			color: #A8700D;
		}
	}

	.upload-img {
		background: #fff;
		padding: 30rpx 25rpx;

		.upload-title {
			font-size: 28rpx;
		}
	}

	.img-box {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		margin-top: 20rpx;

		.choose-img,
		.preview-box {
			width: 120rpx;
			height: 120rpx;
			background: rgba(249, 250, 251, 1);
			border: 1rpx solid rgba(223, 223, 223, 1);
			margin-right: 25rpx;
			margin-bottom: 25rpx;
			position: relative;

			&:nth-child(5n) {
				margin-right: 0;
			}

			.cuIcon-cameraadd {
				font-size: 50rpx;
				color: #dfdfdf;
			}

			.preview-img {
				width: 100%;
				height: 100%;
			}

			.cuIcon-close {
				background: linear-gradient(90deg, rgba(216, 159, 100, 1), rgba(235, 193, 150, 1));
				border-radius: 50%;
				width: 40rpx;
				line-height: 40rpx;
				color: #fff;
				text-align: center;
				position: absolute;
				top: -10rpx;
				right: -10rpx;
			}
		}
	}

	.foot_box {
		.sub-btn {
			width: 710rpx;
			height: 80rpx;
			background: linear-gradient(90deg, rgba(233, 180, 97, 1), rgba(238, 204, 137, 1));
			border: 1rpx solid rgba(238, 238, 238, 1);
			border-radius: 40rpx;
			color: rgba(#fff, 0.9);
			margin-bottom: 30rpx;
		}
	}

	.modal-box {
		width: 750rpx;
		height: 680rpx;
		border-radius: 30rpx 30rpx 0 0;
		background: #fff;

		.modal-head {
			height: 100rpx;
			font-size: 30rpx;
		}

		.modal-content {
			font-size: 28rpx;

			.sel-item {
				height: 100rpx;
				width: 100%;
				padding: 0 20rpx;
				border-bottom: 1rpx solid rgba(223, 223, 223, 0.5);

				.sel-radio {
					transform: scale(0.7);
				}
			}
		}

		.modal-foot {
			.close-btn {
				width: 710rpx;
				height: 80rpx;
				background: linear-gradient(90deg, rgba(233, 180, 97, 1), rgba(238, 204, 137, 1));
				border: 1rpx solid rgba(238, 238, 238, 1);
				border-radius: 40rpx;
				color: rgba(#fff, 0.9);
			}
		}
	}
</style>
