<template>
	<view class="page_box">
		<view class="head_box"></view>
		<view class="content_box">
			<view class="address-list" v-for="address in addressList" :key="address.id" @tap="useAddress(address)">
				<view class="top x-f">
					<text class="name">{{ address.a_name }}</text>
					<text class="phone">{{ address.a_phone }}</text>
					<text class="tag" v-if="address.a_default == '1'">{{$t("user.address.default")}}</text>
				</view>
				<view class="detail">{{ address.a_province }}{{ address.a_city }}{{ address.a_area }}{{ address.a_address }}</view>
				<button class="cu-btn set-btn" @tap.stop="jump('/pages/user/address/edit', { id: address.id, from: 'edit' })">{{$t("user.address.edit")}}</button>
			</view>
		</view>
		<view class="foot_box"><button class="cu-btn add-btn" @tap="jump('/pages/user/address/edit', { id: 0, from: 'add' })">{{$t("user.address.addnewAddress")}}</button></view>
	</view>
</template>

<script>
export default {
	components: {},
	data() {
		return {
			addressList: [],
			from: ''
		};
	},
	computed: {},
	onLoad() {
		
	},
	onShow() {
		this.getAddressList();
	},
	methods: {
		
		useAddress(address) {
			let pages = getCurrentPages();

			// #ifdef MP-WEIXIN || APP-PLUS
			let currPage = pages[pages.length - 1].$vm;
			let prevPage = pages[pages.length - 2].$vm; //上一个页面
			// #endif

			// #ifdef H5
			let currPage = pages[pages.length - 1];
			let prevPage = pages[pages.length - 2]; //上一个页面
			// #endif
			prevPage.address = address;

			uni.navigateBack({
				delta: 1
			});
		},
		// 路由跳转
		jump(path, parmas) {
			uni.navigateTo({
				url:path+'?to='+JSON.stringify(parmas)
			})
		},
		getAddressList() {
			var that = this;
			var data = {
				uid:uni.getStorageSync('p_uid'),
				token:uni.getStorageSync('p_token'),
			}
			that.$api.getAddress(data).then(res => {
				if(res.code == 1){
					that.addressList = res.data;
				}
			});
		}
	}
};
</script>

<style lang="scss">
.address-list {
	padding: 40rpx;
	position: relative;
	background: #fff;
	margin-bottom: 20rpx;

	.name,
	.phone {
		font-size: 30rpx;
		font-weight: 600;
	}

	.phone {
		margin: 0 20rpx;
	}

	.tag {
		background: rgba(239, 58, 58, 0.2);
		// background: rgba(233, 191, 113, 0.2);
		border-radius: 6rpx;
		padding: 0 16rpx;
		line-height: 38rpx;
		color: $zhuse;
		font-size: 22rpx;
	}

	.detail {
		margin-top: 25rpx;
		width: 543rpx;
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: rgba(153, 153, 153, 1);
		line-height: 40rpx;
	}

	.set-btn {
		background: none;
		position: absolute;
		font-size: 26rpx;
		color: $zhuse;
		top: 40rpx;
		right: 20rpx;
	}
}

.foot_box {
	padding: 20rpx;

	.add-btn {
		width: 710rpx;
		height: 80rpx;
		background: $zhuse;
		// background: linear-gradient(90deg, rgba(233, 180, 97, 1), rgba(238, 204, 137, 1));
		// border: 1rpx solid rgba(238, 238, 238, 1);
		border-radius: 40rpx;
		color: rgba(#fff, 0.9);
	}
}
</style>
