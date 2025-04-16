<template>
	<view class="page">
		<view class="top">
			<view>
				<text>{{team_num}}</text>
				<text>{{$t('user.team.tdrs')}}</text>
			</view>
		</view>
		<view @tap="jump('/pages/public/poster/index')" class="mid">
			<view class="left">
				<image src="../../static/imgs/ewm.png"></image><text>{{$t('user.team.yqhy')}}</text>
			</view>
			<image class="right" src="../../static/imgs/next.png"></image>
		</view>
		<view class="content">
			<view class="nav">
				<view
					style="width: 100%;height: 4rpx;background: #dcdcdc;display: flex;align-items: flex-end;line-height：100%">

					<text :class="layer == 1?'on':''" @click="changeLevel(1)"
						style="margin-left: 20rpx;">{{$t('user.team.wdzt')}}</text>
					<text :class="layer == 2?'on':''"
						@click="changeLevel(2)">{{$t('user.team.ejcy')}}</text>
					<!-- <text :class="layer == 3?'on':''" @click="changeLevel(3)">三级成员</text> -->
				</view>
			</view>
			<view class="con" >
				<view class="list" v-for="(item,index)  in list" :key='index'>
					<image :src="item.u_img"></image>
					<view class="right">
						<view class="text" style="color: #333;">{{item.u_name || item.u_phone}}
							<text style="float:right;margin-left: 250rpx;font-size: 0.8rem; font-family: PingFang SC;">{{item.level_name}}</text>
						</view>
						<view class="text"
							style="color: #666;font-size: 28upx;margin-top: 16upx;">
							{{item.u_phone}}
						</view>
					</view>
				</view>

			</view>
		</view>

	</view>
</template>
<script>
	//高德SDK
	export default {
		data() {
			return {
				showCategoryIndex: 0,
				headerPosition: 'fixed',
				layer: 1,
				list: [],
				team_num: 0,
				// tx:tx
			};
		},
		onPageScroll(e) {
			//兼容iOS端下拉时顶部漂移
			if (e.scrollTop >= 0) {
				this.headerPosition = 'fixed';
			} else {
				this.headerPosition = 'absolute';
			}
		},
		onLoad() {
			this.getData();
		},
		methods: {
			getData() {
				var that = this;
				var data = {
					uid: uni.getStorageSync('p_uid'),
					token: uni.getStorageSync('p_token'),
					layer: that.layer,
					pageSize: 9999999999999,
				}
				that.$api.team(data).then(res => {
					if (res.code == 1) {
						that.team_num = res.team_num;
						that.list = res.data.data;
					}
				});
			},
			jump(path, query) {
				uni.navigateTo({
					url: path
				})
			},
			changeLevel(num) {
				this.layer = num;
				this.list = [];
				this.getData();
			}

		}
	};
</script>
<style lang="scss">
	.page {
		width: 100%;
		height: 100vh;
		background: #f6f6f6;
		overflow-y: auto;
	}

	.top {
		width: 100%;
		padding: 60upx 0;
		//background: $zhuse;
		background-image: url("../../static/imgs/user/user_bg.png");
		background-repeat: no-repeat;
		display: flex;
		align-items: center;
		justify-content: space-between;

		view {
			flex: 1;

			text {
				display: block;
				text-align: center;
				color: #fff;
				font-size: 40upx;
			}

			text:nth-child(2) {
				font-size: 30upx;
				margin-top: 10upx;
			}
		}
	}

	.tis {
		width: 100%;
		height: 60upx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 30upx;
		color: #666;
		margin-top: 180upx;
	}

	.mid {
		padding: 0 30upx;
		height: 100upx;
		background: #fff;
		border-radius: 10upx;
		margin: 30upx;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.left {
			image {
				width: 44upx;
				height: 44upx;
				margin-right: 20upx;
			}

			font-size: 32upx;
			color: #333;
			flex: 1;
			display: flex;
			align-items: center;
		}

		.right {
			width: 36upx;
			height: 36upx;
		}
	}

	.content {
		padding: 0 30upx;
		margin-top: 50upx;

		.nav {
			display: flex;
			align-items: flex-end;
			font-size: 1rem;
			color: #333;
			background: #fff;
			height: 70rpx;
			border-radius: 10rpx;

			text {
				margin-right: 40upx;
			}
		}

		.on {
			font-size: 1rem;
			color: $zhuse;
			border-bottom: 4rpx solid $zhuse;
		}

		.con {
			margin-top: 36upx;

			.list {
				// width: 100%;
				margin-bottom: 30upx;
				background: #fff;
				border-radius: 10upx;
				padding: 30upx;
				display: flex;
				align-items: center;

				image {
					width: 100upx;
					height: 100upx;
					border-radius: 100%;
					background-color: #c0c0c0;
				}

				.right {
					font-size: 32upx;
					color: #333;
					margin-left: 30upx;

					text {
						color: $zhuse;
					}
				}
			}
		}
	}

	.status {
		width: 100%;
		height: 0;
		position: fixed;
		z-index: 10;
		background-color: #fff;
		top: 0;
		/*  #ifdef  APP-PLUS  */
		height: var(--status-bar-height); //覆盖样式
		/*  #endif  */
	}

	.header {
		width: 92%;
		padding: 0 4%;
		height: 100upx;
		display: flex;
		align-items: center;
		position: fixed;
		top: 0;
		z-index: 10;
		background-color: #fff;
		/*  #ifdef  APP-PLUS  */
		top: var(--status-bar-height);
		/*  #endif  */

		.addr {
			width: 120upx;
			height: 60upx;
			flex-shrink: 0;
			display: flex;
			align-items: center;
			font-size: 28upx;

			.icon {
				height: 60upx;
				margin-right: 5upx;
				display: flex;
				align-items: center;
				font-size: 42upx;
				color: #ffc50a;
			}
		}

		.input-box {
			width: 100%;
			height: 60upx;
			background-color: #f5f5f5;
			border-radius: 30upx;
			position: relative;
			display: flex;
			align-items: center;

			.icon {
				display: flex;
				align-items: center;
				position: absolute;
				top: 0;
				right: 0;
				width: 60upx;
				height: 60upx;
				font-size: 34upx;
				color: #c0c0c0;
			}

			input {
				padding-left: 28upx;
				height: 28upx;
				font-size: 28upx;
			}
		}

		.icon-btn {
			width: 60upx;
			height: 60upx;
			flex-shrink: 0;
			display: flex;

			.icon {
				width: 60upx;
				height: 60upx;
				display: flex;
				justify-content: flex-end;
				align-items: center;
				font-size: 42upx;
			}
		}
	}

	.place {
		background-color: #ffffff;
		height: 100upx;
		/*  #ifdef  APP-PLUS  */
		margin-top: var(--status-bar-height);
		/*  #endif  */
	}

	.category-list {
		width: 100%;
		background-color: #fff;
		display: flex;

		.left,
		.right {
			position: absolute;

			top: 100upx;
			/*  #ifdef  APP-PLUS  */
			top: calc(100upx + var(--status-bar-height));
			/*  #endif  */
			bottom: 0upx;
		}

		.left {
			width: 24%;
			left: 0upx;
			background-color: #f2f2f2;

			.row {
				width: 100%;
				height: 90upx;
				display: flex;
				align-items: center;

				.text {
					width: 100%;
					position: relative;
					font-size: 28upx;
					display: flex;
					justify-content: center;
					color: #3c3c3c;

					.block {
						position: absolute;
						width: 0upx;
						left: 0;
					}
				}

				&.on {
					height: 100upx;
					background-color: #fff;

					.text {
						font-size: 30upx;
						font-weight: 600;
						color: #2d2d2d;

						.block {
							width: 10upx;
							height: 80%;
							top: 10%;
							background-color: $zhuse;
						}
					}
				}
			}
		}

		.right {
			width: 76%;
			left: 24%;

			.category {
				width: 94%;
				padding: 20upx 3%;

				.banner {
					width: 100%;
					height: 24.262vw;
					border-radius: 10upx;
					overflow: hidden;
					box-shadow: 0upx 5upx 20upx rgba(0, 0, 0, 0.3);

					image {
						width: 100%;
						height: 24.262vw;
					}
				}

				.list {
					margin-top: 40upx;
					width: 100%;
					display: flex;
					flex-wrap: wrap;

					.box {
						width: 100%;
						margin-bottom: 30upx;
						display: flex;
						align-items: center;
						flex-wrap: wrap;

						image {
							width: 80upx;
							height: 80upx;
							border-radius: 50%;
						}

						.text {
							flex: 1;
							margin-top: 5upx;
							font-size: 28upx;
							margin-left: 20upx;
							text-align: center;
						}

						.text-box {
							flex: 1;
							display: flex;
							justify-content: space-between;
						}
					}
				}
			}
		}
	}
</style>