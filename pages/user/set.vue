<template>
	<view class="set-box">
		<view class="list x-bc" @tap="jump('/pages/public/my_feed')">
			<view class="title">意见反馈</view>
			<text class="cuIcon-right"></text>
		</view>
		<view class="list x-bc" @tap="jump('/pages/user/address/list')">
			<view class="title">地址管理</view>
			<text class="cuIcon-right"></text>
		</view>
		<view class="list x-bc" @tap="jump('/pages/user/edit-password')">
			<view class="title">修改登录密码</view>
			<text class="cuIcon-right"></text>
		</view>
		<view class="list x-bc" @tap="jump('/pages/user/setPayPsd')" v-if="!userInfo.u_paypsd">
			<view class="title">设置支付密码</view>
			<text class="cuIcon-right"></text>
		</view>
		<view class="list x-bc" @tap="jump('/pages/user/changePayPsd')" v-if="userInfo.u_paypsd">
			<view class="title">修改支付密码</view>
			<text class="cuIcon-right"></text>
		</view>
		<view class="list x-bc" @tap="jump('/pages/user/kefu')">
			<view class="title">联系客服</view>
			<text class="cuIcon-right"></text>
		</view>
		<view class="list x-bc" @tap="jump('/pages/user/about')">
			<view class="title">关于我们</view>
			<text class="cuIcon-right"></text>
		</view>
		
		<view class="exitBtn" @tap="outLogin">退出登录</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			userInfo:{}
		};
	},
	onShow() {
		this.getUser();
	},
	methods: {
		getUser(){
			var that = this;
			var data = {
				uid:uni.getStorageSync('p_uid'),
				token:uni.getStorageSync('p_token'),
			}
			that.$api.userInfo(data).then(res => {
				if(res.code == 1){
					that.userInfo = res.user;
				}
			});
		},
		// 路由跳转
		jump(path, parmas) {
			uni.navigateTo({
				url:path
			})
		},
		// 退出登录
		outLogin() {
			uni.removeStorageSync('p_uid');
			uni.removeStorageSync('p_token');
			uni.removeStorageSync('p_user');
			uni.removeStorageSync('u_tid');
			uni.removeStorageSync('u_name');
			// uni.removeStorageSync('orderInfo');
			uni.redirectTo({
				url:'../public/login'
			})
		},
		// 当前版本
		onVersion() {
			let version = this.initData.info.version;
			this.$tools.toast('当前版本:' + version);
		}
	}
};
</script>

<style lang="scss">
page {
	background: #fff;
}

.list {
	height: 110rpx;
	padding: 0 20rpx;
	border-bottom: 1rpx solid rgba(#dfdfdf, 0.6);

	.title {
		font-size: 28rpx;
	}

	.cuIcon-right {
		font-size: 34rpx;
		color: #999;
	}
}
.exitBtn{
	width: 93%;
	height: 90upx;
	background: #f3f3f3;
	border-radius: 12rpx;
	border: 1rpx solid #eee;
	text-align: center;
	line-height: 90upx;
	margin: 50upx auto;
}
</style>
