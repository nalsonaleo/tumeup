<template>
	<view class="page">
		
		
		<view class="content">
			
			<view class="con">
				<view class="list" style="box-shadow:3px 3px 3px #C0C4CC;" :class="{'active':item.l_level==u_level}"  v-for="(item,index)  in list" :key='index'>
					<image :src="item.img"></image>
					<view class="right">
						<view class="text" style="color: #333;">{{item.l_name}}会员 <text  style="font-size: 28upx;margin-left: 30upx;">{{item.level_name}}</text></view>
						<view class="text" style="color: #666;font-size: 28upx;margin-top: 16upx;display: flex;justify-content: space-between;width: 15rem;">
							<view>
								<view style="color: #0081FF;">{{item.l_integral}} 金豆</view>
								<view v-if="item.l_level==u_level" style="color: white;">{{item.l_desc}}</view>
								<view v-if="item.l_level!=u_level" style="color: red;">{{item.l_desc}}</view>
								
							</view>
							<view v-if="item.l_level!=u_level && item.l_level!=1" @click="upgrade(item.id)" style="color: white;background-color: #00BFFF;height: 30px;line-height: 30px;min-width:80px; border-radius: 40px;text-align: center;">开通会员</view>
							<view v-if="item.l_level==u_level"  style="text-align: center;color: red;min-width:80px;">当前等级</view>
							
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
			layer:1,
			list:[],
			team_num:0,
			u_level:1,
			
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
		upgrade(lid){
			var that = this;
			uni.showModal({
			    title: '提示',
			    content: '确定开通会员?',
			    success: function (res) {
			        if (res.confirm) {
						var data = {
							uid:uni.getStorageSync('p_uid'),
							token:uni.getStorageSync('p_token'),
							lid:lid
						}
			           that.$api.doUpgrade(data).then(res=>{
						   if(res.code == 1){
							   that.getData();
							   uni.showToast({
							       title: '升级成功',
							       duration: 2000
							   });
							   
						   }else{
							   uni.showToast({
							       title: res.msg,
							       duration: 2000
							   });
							  
						   }
					   });
			        } else if (res.cancel) {
			           
			        }
			    }
			});
		},
		getData(){
			var that = this;
			var data = {
				uid:uni.getStorageSync('p_uid'),
				token:uni.getStorageSync('p_token'),
				layer:that.layer
			}
			that.$api.getUpgrade(data).then(res => {
				if(res.code == 1){
					that.list = res.level_list;
					that.u_level = res.u_level;
				}
			});
		},
		jump(path, query) {
			uni.navigateTo({
				url:path
			})
		},
		changeLevel(num){
			this.layer = num;
			this.list = [];
			this.getData();
		}
		
	}
};
</script>
<style lang="scss">
	.active{
		background-color: grey;
		
	}
	.whites{
		color:white
	}
	.page{width: 100%;height: 100vh;background: #f6f6f6;overflow-y: auto;}
	.top{
		width: 100%;
		padding:60upx 0;
		background: $zhuse;
		display: flex;
		align-items: center;
		justify-content: space-between;
		view{flex: 1;text{display: block;text-align: center;color: #fff;font-size: 40upx;}text:nth-child(2){font-size: 30upx;margin-top: 10upx;}}
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
	.mid{padding: 0 30upx; height: 100upx;background: #fff;border-radius: 10upx;margin: 30upx;display: flex;align-items: center;justify-content: space-between;
		.left{image{width: 44upx;height: 44upx;margin-right: 20upx;}font-size: 32upx;color: #333;flex: 1;display: flex;align-items: center;}
		.right{width: 36upx;height: 36upx;}
	}
	.content{padding: 0 30upx;margin-top: 50upx;
		.nav{
			display: flex;align-items: flex-end;
			font-size: 32upx;color: #333;
			text{margin-right: 40upx;}
		}
		.on{font-size: 36upx;color: $zhuse;}
		.con{
			margin-top: 36upx;
			.list{
				// width: 100%;
				margin-bottom: 30upx;
			
				border-radius: 10upx;
				padding: 30upx;
				display: flex;
				align-items: center;
				image{width: 100upx;height: 100upx;border-radius: 100%;}
				.right{
					font-size: 32upx;
					color: #333;
					margin-left: 30upx;
					text{color: $zhuse;}
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
