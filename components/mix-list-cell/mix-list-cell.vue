<template>
	<view class="cell-content ">
		<view class="mix-list-cell" :class="border" @click="eventClick" hover-class="cell-hover" :hover-stay-time="50">
			
			<text class="cell-tit clamp">{{ title }}</text>

			
		</view>
		<button type="default" v-if="openType!=''" :open-type="openType" class="wxOpen"></button>
	</view>
</template>

<script>
	/**
	 *  简单封装了下， 应用范围比较狭窄，可以在此基础上进行扩展使用
	 *  比如加入image， iconSize可控等
	 */
	export default {
		data() {
			return {
				typeList: {
					left: 'icon-zuo',
					right: 'icon-you',
					up: 'icon-shang',
					down: 'icon-xia',
					address: 'icon-shouhuodizhi'
				}
			};
		},
		props: {
			icon: {
				type: String,
				default: ''
			},
			title: {
				type: String,
				default: () => this.$t('components.mixlistcell.bt')
			},
			tips: {
				type: [String, Number],
				default: ''
			},
			navigateType: {
				type: String,
				default: 'right'
			},
			border: {
				type: String,
				default: 'b-b'
			},
			hoverClass: {
				type: String,
				default: 'cell-hover'
			},
			openType: {
				type: String,
				default: ''
			},
			iconColor: {
				type: String,
				default: '#333'
			}
		},
		methods: {
			eventClick() {
				this.$emit('eventClick');
			}
		}
	};
</script>

<style lang="scss" scoped>
	.cell-content {
		position: relative;

		.icon .mix-list-cell.b-b:after {
			left: 90upx;
		}

		.mix-list-cell {
			display: flex;
			align-items: center;
			padding: 20upx $page-row-spacing;
			line-height: 60upx;
			position: relative;

			&.cell-hover {
				color:#ffffff
			}

			&.b-b:after {
				left: 30upx;
			}

			.cell-icon {
				align-self: center;
				width: 56upx;
				max-height: 60upx;
				font-size: 38upx;
			}

			.cell-more {
				align-self: center;
				font-size: 30upx;
				color: $font-color-base;
				margin-left: $uni-spacing-row-sm;
			}

			.cell-tit {
				flex: 1;
				
				color: #ffffff;
				margin-right: 10upx;
			}

			.cell-tip {
				font-size: $font-sm + 2upx;
				color: $font-color-light;
				max-width: 400upx;
				text-align: right;
				line-height: 1.2;
			}
		}

		.wxOpen {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			height: 100%;
			opacity: 0;
		}
	}
</style>
