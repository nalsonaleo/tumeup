<template>
<view class="user-box">
<view class="head_box">
<view class="head-wrap pad">
	<view class="titleNav ">
		<view class="status-bar"></view>
	</view>
	<view class="user-head x-bc">
		<view class="x-f">
			<view class="info-box">
				<view class="x-f">
					<view class="head-img-wrap" @tap.stop="jump('/pages/user/info')">
						<image class="head-img" :src="userInfo.u_img || '/static/imgs/base_avatar.png'">
						</image>
					</view>
					<view>
						<view class="grade-tag tag-box x-f"
							style="display: flex;float: right;padding-right: 10px;">
							<image class="tag-img" src="../../static/imgs/user/level.png" mode=""></image>
							<text class="tag-title" style="color: #fff;">{{ userInfo.level_name }}</text>
						</view>
						<view class="x-f" style="margin-bottom: 0rpx;">
							<text @tap.stop="jump('/pages/user/info')" class="user-name one-t"
								style="color: #fff;display: block;margin-bottom: 0upx;height: 35rpx;">
								{{ userInfo.u_name ? userInfo.u_name : userInfo.u_phone }}
							</text>

						</view>
					</view>
				</view>
			</view>
		</view>
		<view style="width: 20%;display: flex;margin-right:15rpx;">
			<button v-if="info.s_out != 2 && userInfo.u_img" class="cu-btn code-btn"
				@tap="jump('/pages/public/poster/index')">
				<text class="cuIcon-qr_code" style="color: #fff;"></text>
			</button>
			<navigator url="/pages/user/set">
				<image src="/static/imgs/set.png" style="width:25px;height: 25px;top:7rpx" alt="">
			</navigator>
		</view>
	</view>
</view>
</view>
<view class="carousel-section">
			<!-- #ifdef APP-PLUS -->
			<view class="topPlace"></view>
			<!-- #endif -->	
<!--Head_box-->

<view class="top">
<view class="titleNview-placing"></view>
<view style="width:100%;height: 65rpx;color: white;background-color:rgba(105,105,105,0.8);border-radius: 5px;align-items:center;display: flex;">
	<view style="float: left;font-size: 0.8rem;padding-left: 20rpx;width: 85%;">
		{{$t("pages.user.switch")}} &nbsp;| &nbsp; 50% {{$t("pages.user.return")}} 
	</view>
	<view style="align-items: center;text-align: center;" v-if="info.s_out == 1">
		<switch class="olive switch" @tap="onSwitch" :class="{ checked: is_default }" :checked="is_default">
		</switch>
	</view>
</view>
</view>
</view>
<!--Head_box End-->
<!-- Teamup order -->
<view
style="position: relative;width: 100%;display: flex;flex-direction: column;left:0;top: 0;color: #000000;background-color:white;margin-top: 15rpx;z-index: 99">
<view
	style="position: relative;width: 100%;height: 60rpx;display: flex;flex-direction: column;left:0;top: 0;justify-content: center;">
	<text style="font-size: 1rem;padding-left: 25rpx;margin-top: 15rpx;">{{$t("user.groupon.user")}} </text>
</view>
<view class="wallet-box x-f">
	<view class="x-f wallet-left">
		<view class="wallet-item y-f" @tap="jump('/pages/activity/groupon/my-groupon')">
			<view class="wallet-item__detail">
				<image class="wallet-img" src="/static/imgs/user/nowteamup.png" mode="aspectFill"></image>
			</view>
			<text class="wallet-item__title">{{$t("user.groupon.mytitle")}}</text>
		</view>
		<view class="wallet-item y-f" @tap="jump('/pages/order/ptOrder')">
			<text class="wallet-item__detail">{{userInfo.month_group}} <text
					style='font-size: 16rpx;margin-left: 4rpx;'>{{$t('user.order')}}</text> </text>
			<text class="wallet-item__title">{{$t("user.mouthgroup.number")}}</text>
		</view>
		<view class="wallet-item y-f" >
		<!-- <view class="wallet-item y-f" @tap="jump('/pages/app/coupon/list')"> -->
			<text class="wallet-item__detail">{{$t('money.symbol')}}{{userInfo.fx_yj}} </text>
			<text class="wallet-item__title">{{$t("user.distribution.money")}}</text>
		</view>
	</view>
	<view class="wallet-item y-f wallet-right" @tap="jump('/pages/order/TeamupOrder')">
		<image class="cut-off--line" src="/static/imgs/user/cut_off_line.png" mode=""></image>
		<image class="wallet-img" src="/static/imgs/user/teamup.png" mode="aspectFill"></image>
		<text class="wallet-item__title">{{$t("user.groupon.order")}}</text>
	</view>
</view>
</view>
<!--Teamup order End-->
<navigator  style="margin-top:10px">
	<!-- <navigator url="/pages/user/upgrade" style="margin-top:10px"> -->
<image style='width: 100%;height: 200rpx' src="/static/imgs/tovip.png" mode='scaleToFill' alt=""></image>
</navigator>
<view class="content_box" style="">
<view
	style="position: relative;width: 100%;display: flex;flex-direction: column;left:0;top: 0;color: #000000;background-color:white;margin-top: 15rpx;z-index: 99">
	<view
		style="position: relative;width: 100%;height: 60rpx;display: flex;flex-direction: column;left:0;top: 0;justify-content: center;">
		<text
			style="font-size: 1rem;padding-left: 25rpx;margin-top: 20rpx;">{{$t("user.shopping.order")}}</text>
	</view>
</view>
<!-- 订单卡片 -->
<view class="order-wrap x-f">
	<view class="order-box x-f">
		<view class="order-item y-f" @tap="jump('/pages/order/list?type='+order.type)"
			v-for="order in orderNav" :key="order.id">
			<view class="y-f item-box">
				<image class="order-img" :src="order.img" mode=""></image>
				<text class="item-title">{{ order.title }}</text>
				<view class="cu-tag badge" v-if="orderNum[order.type]">{{ orderNum[order.type] }}</view>
			</view>
		</view>
	</view>
	<view class="order-item y-f all-order" @tap="jump('/pages/order/list?type=-1')">
		<image class="cut-off--line" src="/static/imgs/user/cut_off_line.png" mode=""></image>
		<view class="y-f item-box">
			<image class="order-img" src="/static/imgs/user/allorder.png" mode="aspectFill"></image>
			<text class="item-title">{{$t("user.index.order.all")}}</text>
			<!-- <view class="cu-tag badge" v-if="orderNum[order.type]">{{ orderNum[order.type] }}</view> -->
		</view>
	</view>
</view>

<!-- 钱包卡片 -->
<view
	style="position: relative;width: 100%;display: flex;flex-direction: column;left:0;top: 0;color: #000000;background-color:white;margin-top: 15rpx;z-index: 99">
	<view
		style="position: relative;width: 100%;height: 60rpx;display: flex;flex-direction: column;left:0;top: 0;justify-content: center;">
		<text
			style="font-size: 1rem;padding-left: 25rpx;margin-top: 20rpx;">{{$t("user.Balance.Coins")}}</text>
	</view>
</view>
<view class="wallet-box x-f">
	<view class="x-f wallet-left">
		<view class="wallet-item y-f" @tap="jump('/pages/user/wallet/index')">
			<view class="wallet-item__detail">{{$t('money.symbol')}}{{userInfo.u_money1}} <text
					style='font-size: 16rpx;margin-left: 4rpx;'></text></view>
			<text class="wallet-item__title">{{$t("user.index.accountbalance")}}</text>
		</view>
		<view class="wallet-item y-f" @tap="jump('/pages/user/wallet/chongzhi')">
			
			<image class="wallet-img" src="/static/imgs/user/Recharge.png" mode="aspectFill"></image>
			<text class="wallet-item__title">{{$t("pages.user.xianxia")}}</text>
		</view>
		<!-- <view class="wallet-item y-f" @tap="jump('/pages/user/wallet/score-balance')">
			<text class="wallet-item__detail">{{userInfo.u_money2}}<text
					style='font-size: 16rpx;margin-left: 4rpx;'>{{$t('user.ge')}}</text> </text>
			<text class="wallet-item__title">{{$t("user.index.fortunella.venosa")}}</text>
		</view> -->
		<view class="wallet-item y-f" @tap="jump('/pages/user/wallet/index')">
			<image class="wallet-img" src="/static/imgs/user/Withdraw.png" mode="aspectFill"></image>
			<text class="wallet-item__title">{{$t("user.wallet.log.tx")}}</text>
		</view>
		<!-- <view class="wallet-item y-f" @tap="jump('/pages/app/coupon/list')">
			<text class="wallet-item__detail">{{ c_num || '0' }}<text
					style='font-size: 16rpx;margin-left: 4rpx;'>{{$t('user.zhang')}}</text></text>
			<text class="wallet-item__title">{{$t("user.index.coupon")}}</text>
		</view> -->
	</view>
	<view class="wallet-item y-f wallet-right" @tap="jump('/pages/user/wallet/index')">
		<image class="cut-off--line" src="/static/imgs/user/cut_off_line.png" mode=""></image>
		<image class="wallet-img" src="/static/imgs/user/wallet.png" mode="aspectFill"></image>
		<text class="wallet-item__title">{{$t("user.my.wallet")}}</text>
	</view>
</view>
<!-- Coinsorder -->
<!-- <view
	style="position: relative;width: 100%;display: flex;flex-direction: column;left:0;top: 0;color: #000000;background-color:white;margin-top: 15rpx;z-index: 99">
	<view
		style="position: relative;width: 100%;height: 60rpx;display: flex;flex-direction: column;left:0;top: 0;justify-content: center;">
		<text
			style="font-size: 1rem;padding-left: 25rpx;margin-top: 20rpx;">{{$t("user.Coinsorder")}}</text>
	</view>
</view>
<view class="tools-box">
	<view class="tool-item y-f" @tap="jump(tool.url, tool.parmas)" v-for="tool in toolsNav"
		:key="tool.title">
		<image class="tool-img" :src="tool.img" mode=""></image>
		<text class="item-title">{{ tool.title }}</text>
	</view>
	<view class="tool-item y-f" @tap="scan()" v-if="u_type == 1">
		<image class="tool-img" src="../../static/imgs/user/list2.png" mode=""></image>
		<text class="item-title">{{$t("pages.index.hx")}}</text>
	</view>
</view> -->
<!-- Myteam -->
<view
	style="position: relative;width: 100%;display: flex;flex-direction: column;left:0;top: 0;color: #000000;background-color:white;margin-top: 15rpx;z-index: 99">
	<view
		style="position: relative;width: 100%;height: 60rpx;display: flex;flex-direction: column;left:0;top: 0;justify-content: center;">
		<text style="font-size: 1rem;padding-left: 25rpx;margin-top: 20rpx;">{{$t("user.Myteam")}}</text>
	</view>
</view>
<view class="tools-box">
	<view class="tool-item y-f" @tap="jump(Myteam.url, Myteam.parmas)" v-for="Myteam in MyteamNav"
		:key="Myteam.title">
		<image class="tool-img" :src="Myteam.img" mode=""></image>
		<text class="item-title">{{ Myteam.title }}</text>
	</view>
	<view class="tool-item y-f" @tap="scan()" v-if="u_type == 1">
		<image class="tool-img" src="../../static/imgs/user/list2.png" mode=""></image>
		<text class="item-title">{{$t("pages.index.hx")}}</text>
	</view>
</view>
<!-- Services -->
<view
	style="position: relative;width: 100%;display: flex;flex-direction: column;left:0;top: 0;color: #000000;background-color:white;margin-top: 15rpx;z-index: 99">
	<view
		style="position: relative;width: 100%;height: 60rpx;display: flex;flex-direction: column;left:0;top: 0;justify-content: center;">
		<text style="font-size: 1rem;padding-left: 25rpx;margin-top: 20rpx;">{{$t("user.Services")}}</text>
	</view>
</view>
<view class="tools-box">
	<view class="tool-item y-f" @tap="jump(Services.url, Services.parmas)" v-for="Services in ServicesNav"
		:key="Services.title">
		<image class="tool-img" :src="Services.img" mode=""></image>
		<text class="item-title">{{ Services.title }}</text>
	</view>
	<view class="tool-item y-f" @tap="scan()" v-if="u_type == 1">
		<image class="tool-img" src="../../static/imgs/user/list2.png" mode=""></image>
		<text class="item-title">{{$t("pages.index.hx")}}</text>
	</view>
</view>
</view>

</view>
</template>

<script>
import shoproGoods from '@/components/goods/shopro-goods.vue';
import shoproPopupModal from '@/components/modal/shopro-popup-modal.vue';
// import jweixin from '@/common/jweixin/index.js';
export default {
components: {
shoproGoods,
shoproPopupModal,
},
data() {
return {
	isRefresh: false, //更新
	showFollowWechat: false, //绑定公众号
	orderScrollLeft: 0, //订单卡片滑动。
	userInfo: {},
	orderNum: [],
	c_num: 0,
	u_type: 0,
	info: {},
	is_default: false,
	orderNav: [{
			id: 1,
			title: this.$t("user.index.order.nopay"),
			img: '/static/imgs/user/tab11.png',
			type: 0
		},
		{
			id: 2,
			title: this.$t("user.index.order.payment"),
			img: '/static/imgs/user/tab22.png',
			type: 1
		},
		{
			id: 3,
			title: this.$t("user.index.order.waitgoods"),
			img: '/static/imgs/user/tab33.png',
			type: 2
		}
	],
	toolsNav: [
		// {
		// 	title: '商品收藏',
		// 	img: '/static/imgs/user/list1.png',
		// 	url: '/pages/user/favorite'
		// },
		// {
		// 	title: '浏览足迹',
		// 	img: '/static/imgs/user/user_log.png',
		// 	url: '/pages/user/log'
		// },
		{
			title: this.$t("user.index.fortunella.shopping"),
			img: '/static/imgs/user/coins.png',
			url: '/pages/app/score/list'
		},
		// {
		// 	title: this.$t("user.index.grouping.order"),
		// 	img: '/static/imgs/user/cz.png',
		// 	url: '/pages/order/commonPtOrder'
		// },
		{
			title: this.$t("user.index.fortunella.order"),
			img: '/static/imgs/user/coins_order.png',
			url: '/pages/user/jfOrder'
		},
		// {
		// 	title: '我的即拼',
		// 	img: '/static/imgs/user/list5.png',
		// 	url: '/pages/activity/groupon/my-groupon'
		// },
		// {
		// 	title: this.$t("user.index.my.team"),
		// 	img: '/static/imgs/team.png',
		// 	url: '/pages/user/team'
		// },
		// {
		// 	title: '即拼订单',
		// 	img: '/static/imgs/user/list15.png',
		// 	url: '/pages/order/ptOrder'
		// },


	],
	MyteamNav: [
		// {
		// 	title: '商品收藏',
		// 	img: '/static/imgs/user/list1.png',
		// 	url: '/pages/user/favorite'
		// },
		// {
		// 	title: '浏览足迹',
		// 	img: '/static/imgs/user/user_log.png',
		// 	url: '/pages/user/log'
		// },

		{
			title: this.$t("user.index.my.team"),
			img: '/static/imgs/user/myteam.png',
			url: '/pages/user/team'
		},
		// {
		// 	title: '即拼订单',
		// 	img: '/static/imgs/user/list15.png',
		// 	url: '/pages/order/ptOrder'
		// },
		{
			title: this.$t("user.index.inviteFriend"),
			img: '/static/imgs/user/share.png',
			url: '/pages/public/poster/index',
		},

	],
	ServicesNav: [
		// {
		// 	title: '商品收藏',
		// 	img: '/static/imgs/user/list1.png',
		// 	url: '/pages/user/favorite'
		// },
		// {
		// 	title: '浏览足迹',
		// 	img: '/static/imgs/user/user_log.png',
		// 	url: '/pages/user/log'
		// },


		{
			title: this.$t("user.index.material.promotion"),
			img: '/static/imgs/user/knowln.png',
			url: '/pages/public/tuiguang'
		},
		{
			title: this.$t("user.index.online.service"),
			img: '/static/imgs/user/service.png',
			url: '/pages/user/kefu'
		},
		{
			title: this.$t("user.index.common.problem"),
			img: '/static/imgs/user/faq.png',
			url: '/pages/public/faq'
		},
		{
			title: this.$t("page.public.feedback"),
			img: '/static/imgs/user/feedback.png',
			url: '/pages/public/my_feed'
		},

	]
};
},

onLoad() {

},
onShow() {
this.getUser();
this.getInfo();
},
methods: {
getUser() {
	var that = this;
	var data = {
		uid: uni.getStorageSync('p_uid'),
		token: uni.getStorageSync('p_token'),
	}
	that.$api.userInfo(data).then(res => {
		if (res.code == 1) {
			uni.setStorageSync('p_user', JSON.stringify(res.user))
			that.userInfo = res.user;
			that.userInfo.u_money1 = parseInt(that.userInfo.u_money1)
			that.userInfo.u_money2 = parseInt(that.userInfo.u_money2)
			that.orderNum['0'] = res.daifu;
			that.orderNum['2'] = res.daishou;
			that.orderNum['3'] = res.daiping;
			that.orderNum['5'] = res.tuihuan;
			that.c_num = res.c_num;
			that.u_type = res.user.u_type;
			if (res.user.u_out == 0) {
				that.is_default = false
			} else {
				that.is_default = true
			}
			// #ifdef H5
			// console.log(ua);

			// #ifdef MP-WEIXIN

			// 检测是否为微信环境
			let ua = window.navigator.userAgent.toLowerCase();
			if (ua.indexOf('micromessenger') != -1) {

				let s = res.config;
				jweixin.config({
					debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
					appId: s.appId, // 必填，公众号的唯一标识
					timestamp: s.timestamp, // 必填，生成签名的时间戳
					nonceStr: s.nonceStr, // 必填，生成签名的随机串
					signature: s.signature, // 必填，签名
					jsApiList: ['scanQRCode'] // 必填，需要使用的JS接口列表
				});



			}
			// #endif


			//获取用户头像





			// #endif

			// console.log(that.orderNum)
		}
	});


},
getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg); //匹配目标参数
	if (r != null) return unescape(r[2]);
	return null; //返回参数值
},
getCode() {
	var appid = "wxd57af2243ce44594";
	var url = encodeURIComponent('https://sevenupshop.com/index.html#/pages/index/user');

	window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appid +
		'&response_type=code&scope=snsapi_userinfo&state=1&redirect_uri=' + url + '#wechat_redirect';
},
// 扫码核销
scan() {
	const _this = this;
	// #ifndef H5
	uni.scanCode({
		success: function(res) {
			console.log('条码内容----' + res.result);
			let str = res.result;
			var hx_code = str.split('=')[1];
			uni.navigateTo({
				url: '/pages/order/hexiao?hx_code=' + hx_code
			})
		}
	});
	// #endif
	// #ifdef H5
	// #ifdef MP-WEIXIN
	// 检测是否为微信环境
	let ua = window.navigator.userAgent.toLowerCase();
	console.log(ua);
	if (ua.indexOf('micromessenger') != -1) {
		// 微信扫一扫
		jweixin.scanQRCode({
			needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
			scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码
			success: function(res) {
				let str = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
				var hx_code = str.split('=')[1];
				uni.navigateTo({
					url: '/pages/order/hexiao?hx_code=' + hx_code
				})
			},
			fail: function(res) {
				// uni.showToast({
				// 	title:JSON.stringify( 'error:------' + res)
				// })
			},
		});
	}
	// #endif

	// #endif

},

getInfo() {
	var that = this;
	var data = {
		uid: uni.getStorageSync('p_uid'),
		token: uni.getStorageSync('p_token'),
	}
	that.$api.kefu(data).then(res => {
		if (res.code == 1) {
			that.info = res.data;
		}
	});
},

onSwitch() {
	var that = this;
	that.is_default = !that.is_default;
	var data = {
		uid: uni.getStorageSync('p_uid'),
		token: uni.getStorageSync('p_token')
	};
	that.$api.u_out(data).then(res => {
		if (res.code == 1) {
			that.$msg(res.msg)
		}
	})
},

jump(path, query) {
	uni.navigateTo({
		url: path
	})
},
zhuan(num) {
	var that = this;
	if (num / 10000 > 1) {
		return (num / 10000).toFixed(2)
	} else {
		return num
	}
},
}
};
</script>

<style lang="scss">
	.topPlace {
		width: 100%;
		height: var(--status-bar-height);
		background: $zhuse;
	}
	/* 头部 轮播图 */
	.carousel-section {
		padding-top: 50upx;
		position: relative;
		
		.top{	
			width: 100%;
			padding: 14upx 20upx;
			background: #fff;
			padding-top: 60rpx;
			//height: 150rpx;display: flex;
			// #ifdef MP-WEIXIN
			padding-top: 50upx;
			//padding-right: 28%;			
			// #endif}
		.search{
			display: flex;
			align-items: center;
			justify-content: space-between;
			.l{
				flex: 1;
				margin-right: 40upx;
				border-radius: 30upx;
				padding: 0 30upx;
				height: 60upx;
				background: rgba(255,255,255,0.1);
				display: flex;
				align-items: center;
				image{width: 28upx;height: 28upx;}
				text{font-size: 26upx;color: #fff;margin-left: 10upx;}
				input{height: 100%;color: #fff;}
			}
			.r{
				display: flex;
				flex-direction: column;
				align-items: center;
				text-align: center;
				image{
					width: 36upx;
					height: 56upx;
					display: block;
					// margin-bottom: 6upx;
				}
				text{
					font-size: 16upx;
					color: #fff;
					display: block;
				}
			}
		}
		//position: relative;
		// padding-top: 10px;
		.bot{position: relative;}
		.titleNview-placing {
			position: absolute;
			height: 40%;
			//background: $zhuse;
			width: 100%;		
		}
	}
.navbar {
width: 100vw;
padding: 0 10rpx;
box-sizing: border-box;
padding-top: var(--status-bar-height);
background: #209423;
display: flex;
justify-content: space-between;
align-items: center;
position: fixed;
top: 0;
z-index: 9999;

.navbar-left {
width: 50%;
display: flex;
justify-content: flex-start;
align-items: center;

.back-style {
	width: 50rpx;
	height: 50rpx;
}

.head-img-wrap-two {
	// width: 200rpx;
	display: flex;
	align-items: center;

	.head-img {
		width: 60rpx;
		height: 60rpx;
		border-radius: 50%;
		overflow: hidden;
		background: white;
	}

	.tag-title {
		margin-left: 10rpx;
		width: 100rpx;
		overflow: hidden;
		text-overflow: ellipsis;
	}
}

.code-btn {
	width: 45rpx;
	height: 45rpx;
	background: none;

	.cuIcon-qr_code {
		font-size: 40rpx;
	}
}
}

.navbar-right {
.set-style {
	width: 60rpx;
	height: 60rpx;
}
}
}

.user-box {
overflow-x: hidden;

}

// 微信登录蒙层
.login-box {
position: fixed;
z-index: 9999;
width: 100%;
height: 100%;
background: none;
}

.head_box {
display: flex;
align-items: center;
justify-content: space-between;
position: fixed;
width: 100vw;
background: $zhuse;
padding-top: var(--status-bar-height);
top: 0;
z-index: 9999;

// .user-bg {
// 	width: 100%;
// 	height: 100upx;
// 	background-color: $zhuse;
// }
.head-wrap {
position: absolute;
left: 50%;
transform: translateX(-50%);
background-color: $zhuse;
padding-bottom: 10rpx;
width: 100%;
z-index: 9;
top: 0;

.nav-title {
	font-size: 38rpx;
	font-family: PingFang SC;
	font-weight: 500;
	color: rgba(51, 51, 51, 1);
}

.status-bar {
	// #ifndef H5
	height: var(--status-bar-height);
	// #endif
	// #ifdef H5
	height: 25rpx;
	// #endif
	width: 750rpx;
}
}

.user-head {
padding-top: 10rpx;

.info-box {
	padding: 0 0rpx;

	.head-img-wrap {
		position: relative;

		.refresh-btn {
			position: absolute;
			padding: 0;
			background: none;
			width: 15rpx;
			height: 15rpx;
			border-radius: 50%;
			background: #c9912c;
			top: 0;
			right: 20rpx;

			.cuIcon-refresh {
				color: #fff;
				font-size: 24rpx;
			}

			.refresh-rotate {
				transform: rotate(360deg);
				transition: all 0.2s;
			}
		}
	}

	.head-img {
		width: 55rpx;
		height: 55rpx;
		border-radius: 50%;
		background: #ccc;
		margin-right: 20rpx;
		overflow: hidden;
	}

	.user-name {
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(51, 51, 51, 1);
		line-height: 30rpx;
		width: 100%;
	}
}

.tag-box {
	background: rgba(0, 0, 0, 0.2);
	border-radius: 21rpx;
	line-height: 38rpx;
	padding-right: 10rpx;
	margin-left: 10rpx;

	.cuIcon-refresh {
		color: #fff;
		margin: 0 10rpx;
	}

	.tag-img {
		width: 40rpx;
		height: 40rpx;
		margin-right: 6rpx;
		border-radius: 50%;
	}

	.tag-title {
		font-size: 20rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(255, 255, 255, 1);
		line-height: 20rpx;
	}
}

.code-btn {
	background: none;

	.cuIcon-qr_code {
		font-size: 50rpx;
	}
}
}

.wallet {
font-size: 20rpx;
padding-left: 140rpx;

.money {
	margin-right: 40rpx;
}
}
}

// 订单卡片
.order-wrap {
height: 180rpx;
background: #fff;
margin-bottom: 20rpx;

.order-box {
flex: 4;
}

.all-order {
position: relative;

.cut-off--line {
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	right: (750rpx/5) - 15rpx;
	width: 30rpx;
	height: 136rpx;
}
}

.order-item {
flex: 1;

.item-box {
	position: relative;
}

.order-img {
	width: 46rpx;
	height: 46rpx;
	// background: #ccc;
}

.item-title {
	font-size: 24rpx;
	font-family: PingFang SC;
	font-weight: 500;
	color: rgba(153, 153, 153, 1);
	line-height: 24rpx;
	padding-top: 10rpx;
	text-align: center;
}
}
}

// 绑定微信公众号
.notice-box {
width: 750rpx;
height: 70rpx;
background: rgba(253, 239, 216, 1);
padding: 0 35rpx;

.notice-detail {
font-size: 24rpx;
font-family: PingFang SC;
font-weight: 400;
color: rgba(204, 149, 59, 1);
}

.bindPhone {
width: 135rpx;
height: 52rpx;
background: linear-gradient(90deg, rgba(233, 180, 97, 1), rgba(238, 204, 137, 1));
border-radius: 26rpx;
padding: 0;
font-size: 26rpx;
font-family: PingFang SC;
font-weight: 500;
color: rgba(255, 255, 255, 1);
}
}

// 钱包卡片
.wallet-box {
background: #fff;
height: 180rpx;
margin-bottom: 20rpx;
position: relative;

.wallet-left {
flex: 4;
}

.wallet-right {
position: relative;

.cut-off--line {
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	right: (750rpx/5) - 15rpx;
	width: 30rpx;
	height: 136rpx;
}
}

.wallet-item {
flex: 1;

.wallet-img {
	width: 46rpx;
	height: 46rpx;
}

.wallet-item__detail {
	font-size: 38upx;
	font-family: PingFang SC;
	font-weight: 500;
	color: $zhuse;
}

.wallet-item__title {
	font-size: 24rpx;
	font-family: PingFang SC;
	font-weight: 400;
	color: rgba(153, 153, 153, 1);
	margin-top: 20rpx;
}

.item-balance::after {
	content: '元';
	font-size: 16rpx;
	margin-left: 4rpx;
}

.item-score::after {
	content: '个';
	font-size: 14rpx;
	margin-left: 4rpx;
}

.item-coupon::after {
	content: '张';
	font-size: 16rpx;
	margin-left: 4rpx;
}
}
}

.tools-box {
background: #fff;
display: flex;
flex-wrap: wrap;
padding-bottom: 40rpx;
margin-bottom: 20rpx;

.tool-item {
width: (750rpx/4);
padding-top: 40rpx;

.tool-img {
	width: 56rpx;
	height: 56rpx;
	// background: #ccc;
}

.item-title {
	font-size: 24rpx;
	font-family: PingFang SC;
	font-weight: 500;
	color: rgba(153, 153, 153, 1);
	line-height: 24rpx;
	padding-top: 30rpx;
	text-align: center;
}
}
}

.foot_box {
margin-top: 200rpx;
padding-bottom: var(--window-bottom);
margin-bottom: 50rpx;
}

.copyright {
color: #999;

.code1 {
font-size: 24rpx;
}

.code2 {
font-size: 20rpx;
margin-top: 10rpx;
}
}
</style>
