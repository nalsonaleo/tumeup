<template>
	<view class="filter-box">
		<view class="mask cu-modal" :class="{ show: showSel }" style="z-index: 8;" @tap="hideModal"></view>
		<view class="navbar">
			<!-- <view class="sel-box flex flex-direction" v-show="showSel">
				<view class="sel-item" @tap="onSel(0)" :class="{ 'sel-active': defaultOrder === 0 && filterIndex === 0 }">综合推荐</view>
				<view class="sel-item" @tap="onSel(1)" :class="{ 'sel-active': defaultOrder === 1 && filterIndex === 0 }">扩展自定义排序</view>
			</view> -->
			<!-- <view class="nav-item y-f" :class="{ current: filterIndex === 0 }" @tap="tabClick(0)">
				<view class="title-box flex align-center">
					<text class="filter-title">综合推荐</text>
					<view class="p-box"><text :class="{ active: filterIndex === 0 }" class="yticon cuIcon-fold xia"></text></view>
				</view>
			</view> -->
			<view class="nav-item y-f" :class="{ current: filterIndex === 1 }" @tap="tabClick(1)">
				<view class="title-box x-f">
					<text class="filter-title">{{$t("goods.children.shFilter")}}</text>
					<view class="p-box">
						<text :class="{ active: salesOrder == 'sell_asc' && filterIndex === 1 }" class="yticon cuIcon-fold"></text>
						<text :class="{ active: salesOrder == 'sell_desc' && filterIndex === 1 }" class="yticon cuIcon-fold xia"></text>
					</view>
				</view>
				<!-- <view class="line" :class="{ 'line-active': filterIndex === 1 }"></view> -->
			</view>
			<view class="nav-item y-f" :class="{ current: filterIndex === 2 }" @tap="tabClick(2)">
				<view class="title-box x-f">
					<text class="filter-title">{{$t("goods.children.jg")}}</text>
					<view class="p-box">
						<text :class="{ active: priceOrder == 'price_asc' && filterIndex === 2 }" class="yticon cuIcon-fold"></text>
						<text :class="{ active: priceOrder == 'price_desc' && filterIndex === 2 }" class="yticon cuIcon-fold xia"></text>
					</view>
				</view>
				<!-- <view class="line" :class="{ 'line-active': filterIndex === 2 }"></view> -->
			</view>
			<view class="nav-item y-f" :class="{ current: filterIndex === 3 }" @tap="tabClick(3)">
				<view class="title-box"><text class="filter-title">{{$t("goods.children.sx")}}</text></view>
				<!-- <view class="line" :class="{ 'line-active': filterIndex === 3 }"></view> -->
			</view>
		</view>
		<!-- 筛选 -->
		<view class="cate-mask" :class="cateMaskState==0 ? 'none' : cateMaskState==1 ? 'show' : ''" @click="toggleCateMask">
			<view class="cate-content" @click.stop.prevent="stopPrevent" @touchmove.stop.prevent="stopPrevent">
				<view class="top">
					<view class="title">{{$t("goods.children.jgqj")}}</view>
					<view class="ipt">
						<input type="number" v-model="pricemin" :placeholder="$t('goods.children.jdj')" placeholder-style="color:#333;">
						<text>-</text>
						<input type="number" placeholder-style="color:#333;" :placeholder="$t('goods.children.zgj')" v-model="pricemax">
					</view>
				</view>
				<view class="btn"><view class="bg1" @click="toggleCateMask">{{$t("goods.children.cz")}}</view><view class="bg2" @click="toggleCateMask">{{$t("goods.children.qd")}}</view></view>
			</view>
		</view>
	</view>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
export default {
	components: {},
	props: {},
	data() {
		return {
			filterIndex: 0,
			showSel: false, //综合选择
			defaultOrder: 0, //综合
			priceOrder: '', //价格
			salesOrder: '', //销量
			newProdcutOrder:0,//新品优先
			cateMaskState: 0,//筛选
			pricemin:'',
			pricemax:''
		};
	},
	computed: {
		filterData() {
			const data = {
				priceOrder: this.priceOrder,
				salesOrder: this.salesOrder,
				pricemin: this.pricemin,
				pricemax: this.pricemax,
			};
			return data;
		}
	},
	onLoad() {},
	methods: {
		//筛选
		tabClick(index) {
			this.filterIndex = index;
			// if (index === 0) {
			// 	this.defaultOrder = 1;
			// } else {
			// 	this.defaultOrder = 0;
			// }
			if (index === 1) {
				this.salesOrder = this.salesOrder == 'sell_asc' ? 'sell_desc' : 'sell_asc';
				this.priceOrder = '';
				this.pricemin = '';
				this.pricemax = '';
			} else {
				this.salesOrder = '';
			}
			if (index === 2) {
				this.salesOrder = '';
				this.pricemin = '';
				this.pricemax = '';
				this.priceOrder = this.priceOrder == 'price_asc' ? 'price_desc' : 'price_asc';
			} else {
				this.priceOrder = '';
			}
			if (index === 3) {
				this.cateMaskState = 1;
			}else{
				this.cateMaskState = 0;
			}
			this.$emit('change', this.filterData);
		},
		//显示筛选面板
		toggleCateMask(type){
			var $this = this;
			let timer = type === 'show' ? 10 : 300;
			let	state = type === 'show' ? 1 : 0;
			$this.cateMaskState = 2;
			$this.priceOrder = '';
			$this.salesOrder = '';
			setTimeout(()=>{
				$this.cateMaskState = state;
				if($this.cateMaskState == 0){
					$this.$emit('change', this.filterData);
				}
			}, timer)
		},
		stopPrevent(){},
		
		onSel(dot) {
			this.defaultOrder = dot;
			this.$emit('change', this.filterData);
			this.showSel = false;
		},
		hideModal() {
			this.showSel = false;
		}
	}
};
</script>

<style lang="scss">
	/* 分类 */
	.cate-mask{
		position: fixed;
		left: 0;
		top: var(--window-top);
		bottom: 0;
		width: 100%;
		background: rgba(0,0,0,0);
		z-index: 999;
		transition: .3s;
		.cate-content{
			width: 630upx;
			height: 100%;
			background: #fff;
			float:right;
			transform: translateX(100%);
			transition: .3s;
			padding: 0 40upx;
			position: relative;
			.top{
				.title{
					margin-top: 60upx;
					font-size: 34upx;
					color: #333;
				}
				.ipt{
					display: flex;
					align-items: center;
					justify-content: space-between;
					font-size: 34upx;
					color: #000;
					margin-top: 44upx;
					input{
						width: 220upx;
						height: 70upx;
						line-height: 70upx;
						text-align: center;
						border-radius: 40upx;
						background: #f3f3f3;
						font-size: 28upx;
						color: #333;
					}
				}
			}
			.btn{
				position: absolute;
				height: 130upx;
				bottom: 0;
				left: 0;
				display: flex;
				align-items: center;
				justify-content: space-between;
				width: 100%;
				padding: 0 40upx;
				view{
					width: 236upx;
					height: 70upx;
					border-radius: 40upx;
					text-align: center;
					line-height: 70upx;
				}
				.bg1{
					background: #f3f3f3;color: #333;
				}
				.bg2{
					background: $zhuse;color: #fff;
				}
			}
		}
		&.none{
			display: none;
		}
		&.show{
			background: rgba(0,0,0,.4);
			
			.cate-content{
				transform: translateX(0);
			}
		}
	}
.sel-box {
	position: absolute;
	width: 750rpx;
	height: 140rpx;
	background: rgba(246, 246, 246, 1);
	border-radius: 0px 0px 20rpx 20rpx;
	z-index: 999;
	left: 50%;
	transform: translateX(-50%);
	bottom: -138rpx;
	transition: all ease-out 0.2s;
	.sel-item {
		color: #333;
		padding: 20rpx 40rpx 0;
		font-size: 24rpx;
		font-weight: 500;
	}
	.sel-active {
		color:$zhuse;
		font-size: 26rpx;
		font-weight: 600;
	}
}
.filter-box {
	width: 750rpx;
}
.navbar {
	display: flex;
	width: 750rpx;
	height: 95rpx;
	background: #fff;
	border-bottom: 1upx solid #e6e6e6;
	border-top: 1upx solid #e6e6e6;
	position: relative;
	z-index: 999;
	.nav-item {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		font-size: 30rpx;
		position: relative;
		.filter-title {
			font-size: 28rpx;
			color: #333;
			font-weight: 600;
		}
		.line {
			width: 110rpx;
			height: 4rpx;
			background: transparent;
			position: absolute;
			bottom: 0;
			z-index: 2;
		}

		.line-active {
			background:$zhuse;
		}

		.p-box {
			display: flex;
			flex-direction: column;

			.yticon {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 30rpx;
				line-height: 1;
				height: 14rpx;
				margin-left: 6upx;
				font-size: 22upx;
				font-weight: 600;
				color: #c4c4c4;
				padding: 0rpx 4rpx;
			}

			.xia {
				transform: scaleY(-1);
			}
		}
	}
}

.current {
	color: #d5a65a;
}
.active {
	color: $zhuse !important;
}
</style>
