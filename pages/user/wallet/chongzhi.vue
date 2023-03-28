<template>
	<view class="bank-wrap">
		<view class="form-box">
			<label>
				<view class="form-item flex align-center justify-between">
					<view class="item-title">{{$t("user.wallet.tixian.topUpAmount.money")}}:</view>
					<xfl-select
						style="border: none;"
						class="item-input flex-sub"
						:list="list"
						:clearable="false"
						:showItemNum="5"
						:isCanInput="false"
						:focusShowList="true"
						:placeholder="'placeholder'"
						:initValue="$t('user.wallet.tixian.topUpAmount.money.placeholder')"
						@change="change"
						:selectHideType="'hideAll'"
					></xfl-select>
				</view>
			</label>
			<view class="form-item flex align-center justify-between">
				<view class="x-f">
					<view class="item-title">{{$t("user.wallet.tixian.getGoldenBean")}}:</view>
					<input class="item-input flex-sub" disabled type="text" :value="score" placeholder-class="pl-input" />
				</view>
			</view>
		</view>

		<view class="btn-box flex align-center justify-center"><button class="cu-btn confirem-btn" @tap="submit">{{$t("user.wallet.chongzhi.confirm")}}</button></view>
	</view>
</template>

<script>
import xflSelect from '@/components/xfl-select/xfl-select.vue';
export default {
	components: { xflSelect },
	data() {
		return {
			list: [],
			id: '',
			money:'',
			score:0,
			price:""
		};
	},
	onLoad() {
		this.getInfo();
	},
	methods: {
		getInfo(){
			var that = this;
			that.$api.rechargeSet().then(res => {
				if(res.code == 1){
					res.data.forEach(function(item, index) {
						var obj = {};
						obj['value'] = item.r_money;
						obj['integral'] = item.r_integral;
						obj['price'] = item.r_price;
						obj['id'] = item.id;
						that.list.push(obj);
					});
				}
			});
		},
		// 选择充值金额
		change(e) {
			console.log(e)
			this.id = e.orignItem.id;
			this.score = e.orignItem.integral;
			this.money = e.orignItem.value;
			this.price = e.orignItem.price;
		},
		submit(){
			var that = this;
			if(!that.id){
				that.$msg(that.$t('user.wallet.chongzhi.confirm.qxzczje'));
				return false
			}
			uni.navigateTo({
				url: `/pages/user/wallet/method?orderId=${that.id}&money=${that.price}`
			})
		}
	}
};
</script>

<style lang="scss">
.form-box {
	background: #fff;
	.form-item {
		height: 96rpx;
		border-bottom: 1rpx solid rgba(#dfdfdf, 0.9);
		padding: 0 25rpx;
		position: relative;
		.item-title {
			color: #333;
			font-size: 28rpx;
			font-weight: 600;
		}
		.item-input {
			font-size: 28rpx;
			color: #333;
			padding-left: 20rpx;
			width: 300rpx;
		}
		.pl-input {
			color: #999;
		}
		.code-btn {
			background: none;
			font-size: 28rpx;
			color: $zhuse;
			position: absolute;
			top: 50%;
			padding: 0;
			transform: translateY(-50%);
			right: 30rpx;
		}
	}
}
.notice {
	color: #999;
	font-size: 24rpx;
	padding: 0 25rpx;
	height: 90rpx;
}
.btn-box {
	margin-top: 60rpx;
	.confirem-btn {
		width: 710rpx;
		height: 80rpx;
		background: $zhuse;
		// background: linear-gradient(90deg, rgba(233, 180, 97, 1), rgba(238, 204, 137, 1));
		border: 1rpx solid rgba(239, 58, 58, 0.22);
		border-radius: 40rpx;
		font-size: 30rpx;
		color: rgba(#fff, 0.9);
	}
}
</style>
