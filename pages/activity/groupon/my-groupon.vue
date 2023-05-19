<template>
	<view>
		<view class="head_box">
			<view class="order-nav x-f">
				<view class="nav-item y-f" v-for="nav in orderState" :key="nav.id" @tap="onNav(nav.type)">
					<view class="item-title">{{ nav.title }}</view>
					<text class="nav-line" :class="{ 'line-active': orderType == nav.type }"></text>
				</view>
			</view>
		</view>
		<!-- 当前拼团 -->
		<!-- <view class="now_con" v-if="orderType == 'now'">
			<view class="one">
				<view class="tx" :class="num1_img ? '' : 'noneImg'"><image :src="num1_img || '../../../static/imgs/noMen.png'"></image></view>
				<view class="sf">团长</view>
				<view class="name">{{ num1_name }}</view>
				<view class="u_id">ID：{{ num1_id }}</view>
			</view>
			<view class="two">
				<view class="one" v-for="(item, index) in list" :key="index">
					<view class="tx" :class="item.u_img ? '' : 'noneImg'"><image :src="item.u_img || '../../../static/imgs/noMen.png'"></image></view>
					<view class="sf" v-if="item.num">{{ item.num }}</view>
					<view  style="height: 70upx;">
						<view class="name" v-if="item.u_name">{{ item.u_name }}</view>
						<view class="u_id" v-if="item.uid">ID：{{ item.uid }}</view>
					</view>

					<view class="three">
						<view class="one" v-for="(item2, index2) in item.data" :key="index2">
							<view class="tx" :class="item2.u_img ? '' : 'noneImg'"><image :src="item2.u_img || '../../../static/imgs/noMen.png'"></image></view>
							<view class="sf" v-if="item2.num">{{ item2.num }}</view>
							<view  style="height: 70upx;">
								<view class="name" v-if="item2.u_name">{{ item2.u_name }}</view>
								<view class="u_id" v-if="item2.uid">ID：{{ item2.uid }}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view> -->
	
	<view class="now_con" v-if="orderType == 'now'">
		<scroll-view scroll-y="true" @scrolltolower="loadMore" class="scroll-box">
	<div id="container" style="width: 100%;height: auto;"><div class="Rucian_NowBox">
			<div v-if="num1_id>0" class="Rucian_List">
				<div>{{$t("order.groupon.myGroupon.yj")}}</div>
				<view class="BigZt">{{yuji}}</view>
				<div class="Rucian_Id">ID:{{ num1_id }}</div>
				<div class="Rucian_Number">1</div>
			</div>
	
			
			
				<div style="background-color: #0081FF;" v-for="(item1, index1) in list" :key="index1" v-if="index1>0 && item1.uid>0 && item1.check==1" class="Rucian_List">
					<img :src="item1.u_img || '../../../static/imgs/noMen.png'" alt="">
					<div>{{item1.u_name}}</div>
					<div class="Rucian_2">
						<div>{{$t("order.groupon.myGroupon.yjid")}}：{{item1.uid>0?item1.uid:'?'}}</div>
						<div>{{$t("order.groupon.myGroupon.yqr")}}：{{item1.pid>0?item1.pid:'?'}}</div>
						<div>{{$t("order.groupon.myGroupon.yj")}}：{{item1.uid>0?item1.yongjin:'?'}}</div>
					</div>
					<div class="Rucian_Number">{{item1.num}}</div>
				</div>
				<div  v-for="(item1, index1) in list" :key="index1" v-if="index1>0 && item1.uid>0 && item1.check!=1" class="Rucian_List">
					<img :src="item1.u_img || '../../../static/imgs/noMen.png'" alt="">
					<div>{{item1.u_name}}</div>
					<div class="Rucian_2">
						<div>{{$t("order.groupon.myGroupon.yjid")}}：{{item1.uid>0?item1.uid:'?'}}</div>
						<div>{{$t("order.groupon.myGroupon.yqr")}}：{{item1.pid>0?item1.pid:'?'}}</div>
						<div>{{$t("order.groupon.myGroupon.yj")}}：{{item1.uid>0?item1.yongjin:'?'}}</div>
					</div>
					<div class="Rucian_Number">{{item1.num}}</div>
				</div>
				
				<div style="min-height: 150px;display: flex;justify-content: center;align-items: center;" v-for="(item1, index1) in list" :key="index1" v-if="index1>0 && item1.uid==0" class="Rucian_List">
				
					
					
					<div class="Rucian_2" style="display: flex;justify-content: center;align-items: center;">
						{{$t("order.groupon.muGroupon.dbw")}}
					</div>
					<div class="Rucian_Number">{{item1.num}}</div>
				
				</div>
			
			
			
			
		</div></div>
	</scroll-view >
	</view>
		<!-- 当前拼团end -->

		<!-- 历史拼团 -->
		<view class="history_con" v-if="orderType == 'history'">
<scroll-view scroll-y="true" @scrolltolower="loadMore" class="scroll-box">
			<view class="order-list" v-for="order in orderList" :key="order.id" >
				<view class="order-head x-bc">
					<text class="no">{{ order.addtime }}</text>
					<text class="state">{{ order.is_group == 0 ? $t("order.groupon.myGroupon.ptz") : $t("order.groupon.myGroupon.yct") }}</text>
				</view>
				<view class="goods-order">
					<view class="order-content">
						<view class="goods-box x-start">
							<image class="goods-img" :src="order.g_img" mode=""></image>
							<view class="y-start">
								<view class="goods-title more-t">{{ order.g_name }}</view>
								<slot name="tipTag"></slot>
								<slot name="goodsBottom">
									<view class="price">￥{{ order.p_price }}</view>
								</slot>
								<view class="x-f" style="margin-top: 30rpx;" v-if="order.order_id == 0 && order.goods_code">
									<text style="font-size: 26rpx;">{{$t("order.groupon.myGroupon.thm")}}:{{ order.goods_code }}</text>
									<button class="cu-btn copy-btn" @tap="onCopy(order.goods_code)">{{$t("order.groupon.myGroupon.fz")}}</button>
								</view>
							</view>
						</view>

					</view>
				</view>
				<view class="order-bottom x-f">
					<view class="btn-box">
						<button class="cu-btn obtn1" v-if="order.order_id == 0 && order.goods_code" @tap="jump('/pages/huiyuan/huiyuan')">{{$t("order.groupon.myGroupon.qth")}}</button>
						<button class="cu-btn obtn1" v-if="order.order_id != 0" @tap="jump('/pages/order/ptdetail?order_id='+order.order_id)">{{$t("order.groupon.myGroupon.ddxq")}}</button>
						<button  @tap.stop="jump('/pages/activity/groupon/detail?id='+order.id)" class="cu-btn obtn2">
							{{$t("order.groupon.myGroupon.ptxq")}}
						</button>
						<button @tap.stop="onRefund(order.order_id)" class="cu-btn obtn1" v-if="order.is_group != 0">
			{{$t("order.commomPtOrder.detail.Request.refund")}}
						</button>						
					</view>
				</view>
				<view style="width: 100%;height: 20upx;background: #f6f6f6;"></view>
			</view>
			<!-- 数据加载 -->
			<uni-load-more :status='dataStatus' v-if="orderList.length"></uni-load-more>
			<!-- 空白页 -->
			<shopro-empty v-if="!orderList.length && !isLoading" :emptyData="emptyData"></shopro-empty>
			<!-- load -->
			<!-- <shoproLoad v-model="isLoading"></shoproLoad> -->
			</scroll-view>
		</view>
		
		<!-- 历史拼团end -->
	</view>

</template>


<script>
import h5Copy from '@/common/junyi-h5-copy/junyi-h5-copy.js'
import shoproLoad from '@/components/shopro-load/shopro-load.vue';
import shoproMiniCard from '@/components/goods/shopro-mini-card.vue';
import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
export default {
	components: {
		shoproMiniCard,
		shoproLoad,
		uniLoadMore,
	},
	data() {
		return {
			isLoading: true,
			orderType: 'now',
			emptyData: {
				img: '/static/imgs/empty/empty_groupon.png',
				tip: this.$t("user.order.list.tip"),
			},
			orderState: [
				{
					id: 0,
					title: this.$t("order.groupon.myGroupon.dqpt"),
					type: 'now'
				},
				{
					id: 1,
					title: this.$t("order.groupon.myGroupon.lspt"),
					type: 'history'
				}
			],
			pagination: {
				total: 0,
				pageSize: 10,
				page: 1,
			},
			page:1,
			hasMore:true,
			dataStatus: 'more',
			
			list: [],
			orderList: [],
			num1_img: '',
			num1_name: '',
			num1_id: '',
			yuji:''
		};
	},
	onShow() {
		this.getNowGroup();
	},
	methods: {
		jump(path, query) {
			uni.navigateTo({
				url: path
			});
		},
		// 申请退款
		onRefund(id) {
			let that = this;
			var data = {
				uid:uni.getStorageSync('p_uid'),
				token:uni.getStorageSync('p_token'),
				d_id:id,
			}
			that.$api.refund(data).then(res => {
				if(res.code == 1){
					that.page = 1;
					that.orderList = [];					
					that.$msg(res.msg);
					setTimeout(function(){
						that.gethistoryGroup();
					},800)
				}
			});
		},
		// 复制
		onCopy(code) {
			let that = this;
			// #ifdef H5
			 let content = code // 复制内容，必须字符串，数字需要转换为字符串
			       const result = h5Copy(content)
			       if (result === false) {
			         that.$msg(that.$t("order.groupon.myGroupon.fzsbqcs"));
			       } else {
			        that.$msg(that.$t("order.groupon.myGroupon.fzcg"));
			       }
			// #endif
			
			uni.setClipboardData({
				data: code,
				success: function(data) {
					that.$msg(that.$t("order.groupon.myGroupon.fzcg"));
				},
				fail: function(err) {},
				complete: function(res) {}
			});
		},
		// 当前拼团
		getNowGroup() {
			var that = this;
			var data = {
				uid: uni.getStorageSync('p_uid'),
				token: uni.getStorageSync('p_token')
			};
			that.$api.nowGroup(data).then(res => {
				if (res.code == 1) {
					that.list = res.data;
					that.num1_img = res.data[0].u_img;
					that.num1_name = res.data[0].u_name;
					that.num1_id = res.data[0].uid;
					that.yuji = res.data[0].yuji;
				}
			});
		},
		// 历史拼团
		gethistoryGroup() {
			var that = this;
			var data = {
				uid: uni.getStorageSync('p_uid'),
				token: uni.getStorageSync('p_token')
			};
			that.$api.historyGroup(data).then(res => {
				if (res.code == 1) {
					that.isLoading = false;					
					that.orderList = res.data;
					that.pagination.total = res.data.total;
					if(that.orderList.length >= that.pagination.total) {
						that.dataStatus = 'noMore';
					}
					if (res.data.length != 0) {
						that.hasMore = true;
						// that.loadStatus = '';
					} else {
						that.hasMore = false;
						// that.loadStatus = 'over';
					}
				}
			});
		},
		// 加载更多
		loadMore() {
			console.log("到底了");
			if (this.orderList.length < this.pagination.total) {
				this.pagination.page += 1;
				this.dataStatus = 'loading';
				this.getOrderList();
			}
		},
		onNav(id) {
			this.orderType = id;
			if (id == 'now') {
				// 当前拼团
				this.getNowGroup();
			} else {
				// 历史拼团
				this.gethistoryGroup();
			}
		}
	}
};
</script>

<style lang="scss" scoped>
	
	.Rucian_NowBox {
	    text-align: center;
	    display: flex;
	    flex-wrap: wrap;
	    justify-content: center;
	    
	}
	.Rucian_NowBox .Rucian_List:nth-child(1) {
	    width: 50%;
	    padding: 3%;
	    border-color:#8B8B7A;
	    border-radius: 20upx;
	    height: 150upx;
	}
	.Rucian_NowBox .Rucian_List .BigZt {
	    font-size: 20px;
	    margin: 8px;
	}
	.Rucian_NowBox .Rucian_List .Rucian_Id {
	    width: 70px;
	    font-size: 13px;
	    margin: 0 auto;
	    background-color: #3cb371;
	    border-radius: 10px;
	    padding: 2px 5px;
	}
	.Rucian_NowBox .Rucian_List .Rucian_Number {
	    position: absolute;
	    left: 0;
	    top: 0;
	    width: 16px;
	    line-height: 19px;
	    z-index: 8;
	    color: white;
	    font-size: 13px;
	}
	.Rucian_NowBox .Rucian_List {
	    width: 35%;
	    margin: 2%;
	    border: 2.5px solid red;
	    padding: 6% 4%;
	    border-radius: 4px;
	    background-color: #07b3d1;
	    border-color: #3cb371;
	    color: white;
	    position: relative;
	}
	.Rucian_NowBox .Rucian_List img {
	    width: 50px;
	    height: 50px;
	    border-radius: 50%;
	    margin-bottom: 10px;
	}
	.Rucian_NowBox .Rucian_List .Rucian_2 {
	    text-align: left;
	    font-size: 13px;
	    margin-top: 10px;
	}
	.Rucian_NowBox .Rucian_List .Rucian_Number {
	    position: absolute;
	    left: 0;
	    top: 0;
	    width: 16px;
	    line-height: 19px;
	    z-index: 8;
	    color: white;
	    font-size: 13px;
	}
	
page {
	background: #fff;
}
.noneImg {
	background: transparent !important;
	padding: 0 !important;
}
.copy-btn {
	width: 120rpx;
	height: 50rpx;
	padding: 0;
	background: #fff;
	color: $zhuse;
	margin-left: 40rpx;
}
.order-nav {
	background: #fff;
	height: 80rpx;
	border-bottom: 1rpx solid #f6f6f6;
	        position: absolute;
	        left: 0;
	        right: 0;
	        top: 0;
	        bottom: 0;
		z-index: 999;
	.nav-item {
		flex: 1;

		.item-title {
			font-size: 30rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: rgba(51, 51, 51, 1);
			line-height: 76rpx;
		}

		.nav-line {
			width: 100rpx;
			height: 4rpx;
			//background: #f5f5f5;
		}

		.line-active {
			background: $zhuse;
		}
	}
}
.history_con{
	margin-top: 80upx;
	display: flex;
}
.now_con{
	margin-top: 80upx;
	display: flex;
}
.one {
	text-align: center;
	margin: 30px auto;
	position: relative;
	.tx {
		width: 118upx;
		height: 118upx;
		border-radius: 100%;
		margin: 0 auto;
		padding: 2px;
		background: rgba(105,139,34, 0.8);
		image {
			width: 100%;
			height: 100%;
			border-radius: 100%;
			display: block;
		}
	}
	.sf {
		font-size: 22upx;
		background: rgb(242, 97, 97);
		border-radius: 20upx;
		width: 80upx;
		height: 34upx;
		margin: -20upx auto 8upx;
		position: relative;
	}
	.name {
		font-size: 32upx;
		color: #333;
		font-weight: 500;
		width: 100rpx;
		text-align: center;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		margin: 0 auto;
	}
	.u_id {
		font-size: 26upx;
		color: #666;
	}
}
.two {
	display: flex;
	justify-content: space-around;
	width: 100%;
}
.three {
	display: flex;
	width: 100%;
	flex-wrap: wrap;
}
.order-list {
	background: #fff;
	margin: 20rpx 0;
	.order-bottom {
		justify-content: flex-end;
		padding-bottom: 30rpx;
		.obtn1 {
			width: 160rpx;
			height: 60rpx;
			background: rgba(238, 238, 238, 1);
			border-radius: 30rpx;
			font-size: 26rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: rgba(51, 51, 51, 1);
			margin-right: 20rpx;
			padding: 0;
		}
		.obtn2 {
			width: 160rpx;
			height: 60rpx;
			background: rgba(239, 58, 58, 0.8);
			// background: linear-gradient(90deg, rgba(233, 180, 97, 1), rgba(238, 204, 137, 1));
			box-shadow: 0px 7rpx 6rpx 0px rgba(239, 58, 58, 0.22);
			border-radius: 30rpx;
			margin-right: 20rpx;
			font-size: 26rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #fff;
			padding: 0;
		}
	}
	.order-head {
		padding: 0 25rpx;
		height: 77rpx;
		border-bottom: 1rpx solid #dfdfdf;

		.no {
			font-size: 26rpx;
			color: #999;
		}

		.state {
			font-size: 26rpx;
			color: $zhuse;
		}
	}
	.goods-order {
		border-bottom: 1px solid rgba(223, 223, 223, 0.5);
		padding: 20rpx;
		margin-bottom: 20rpx;
	}

	.goods-bottom {
		background: #fff;
		padding-bottom: 30rpx;
		justify-content: flex-end;
		.btn-box {
			.btn1 {
				height: 60rpx;
				border: 1rpx solid rgba(223, 223, 223, 1);
				border-radius: 30rpx;
				font-size: 26rpx;
				background: #fff;
				padding: 0 20rpx;
				margin-right: 20rpx;
			}
			.btn2 {
				width: 160rpx;
				height: 60rpx;
				border: 1rpx solid $zhuse !important;
				border-radius: 30rpx;
				font-size: 26rpx;
				color: $zhuse !important;
				padding: 0;
				background: #fff;
				margin-right: 20rpx;
			}
		}
	}
}
.goods-box {
	position: relative;
	.goods-img {
		width: 200rpx;
		height: 200rpx;
		background-color: #ccc;
		margin-right: 25rpx;
	}
	.order-goods__tag {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 3;
		width: 60rpx;
		height: 30rpx;
	}
	.goods-title {
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(51, 51, 51, 1);
		width: 450rpx;
		line-height: 40rpx;
	}

	.size-tip {
		line-height: 40rpx;
		background: #f4f4f4;
		padding: 0 16rpx;
		font-size: 24rpx;
		color: #666;
		margin: 20rpx 0;
	}
	.sub-tip {
		width: 480rpx;
		line-height: 40rpx;
		// background: #F6F2EA;
		font-size: 24rpx;
		color: #a8700d;
		margin: 10rpx 0;
	}

	.price {
		color: #e1212b;
	}
}
</style>
