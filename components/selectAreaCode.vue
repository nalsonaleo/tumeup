<template>
	<view class="select-area-code">
		<view class="area-code-text" :class="{'notData': !areaCode.title}" @click="showPop()">{{areaCode.title||$t('components.selectAreaCode.qxzqh')}}
			<uni-icons type="bottom"></uni-icons>
		</view>
		<u-popup 
		v-model="show" 
		mode="bottom" 
		closeable 
		:z-index="zIndex" 
		:border-radius="10" 
		:safe-area-inset-bottom="true"
		@close="close" 
		@open="open">
			<view class="area-code-content">
				<view class="pop-title f30">{{$t('components.selectAreaCode.qxzqh')}}</view>
				<view class="area-code-search-wrap">
					<u-search 
					class="area-code-search" 
					:placeholder="$t('components.selectAreaCode.qsrdqhqh')"
					v-model="keyword" 
					:action-text="$t('components.selectAreaCode.ss')"
					@change="searchChange"
					@search="search"
					@clear="searchClear"></u-search>
				</view>
				<scroll-view 
				v-if="areaCodeList.length"
				class="area-code-scroll"
				scroll-y
				enable-flex
				:scroll-into-view="'code'+(areaCode.id-2>0?areaCode.id-2:0)"
				scroll-anchoring>
					<view 
					class="area-code-scroll-item" 
					v-for="(item, index) in areaCodeList" 
					:key="index"
					:id="'code'+item.id"
					:class="{'active': item.id == areaCode.id}"
					@click="changeAreaCode(item, index)">
						<view :class="['circle', item.id == areaCode.id?'active':'']"></view> {{item.title}}
					</view>
				</scroll-view>
				<view v-else class="area-code-scroll">
					<view class="empty-data">{{$t('components.selectAreaCode.zwsj')}}</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import localeList from '@/locale/locales.js';
	export default {
		data() {
			return {
				show: false,
				areaCodeList: [],// 区号列表
				areaCodeList_y: [],// 用于还原
				areaCode: '', // 当前区号{}
				keyword: '',
				timer: ''
			}
		},
		props: {
			value: {type: Object, default: () => {}},//
			zIndex: {type: [Number, String], default: 2000},
			isCtrlGetData: Boolean,// 是否手动获取数据
		},
		// model: {
		// 	prop: 'value', // 默认是value
		// 	event: 'change', // 默认是input
		// },
		watch: {
			areaCode: {
				handler: function(val) {
					if(val) {
						this.$emit('input',val)
					}
				},
				immediate: true,
			}
		},
		mounted() {
			if(!this.isCtrlGetData) this.getAreaCodeList();
		},
		methods: {
			showPop() {
				this.show = true
			},
			// search() {
			// 	this.$emit('input',this.keyWordValue)
			// 	this.$emit('search',this.keyWordValue)
			// },
			// 获取区号
			getAreaCodeList(obj) {
				uni.showLoading();
				this.$api.getAreaCode().then((res) => {
					let al = res.msg||[]
					this.areaCodeList = al
					this.areaCodeList_y = al
					// 设置区号，父页面通过ref传入，可与isCtrlGetData配合
					if(obj && Object.keys(obj).length) {
						for(let i=0;i<this.areaCodeList_y.length;i++) {
							let item = this.areaCodeList_y[i]
							if(item.id == obj.id) {
								this.areaCode = item
								break;
							}
						}
					}else {
						this.areaCode = al[0] || {}
					}
				})
			},
			// 区号选择
			changeAreaCode(item, idx) {
				this.areaCode = item
				this.close()
				this.$emit('change',item)
			},
			close() {
				this.show = false
			},
			open() {},
			searchChange(e) {
				this.timer && clearTimeout(this.timer)
				this.timer = setTimeout(() => {
					let al = JSON.parse((JSON.stringify(this.areaCodeList_y)))
						, list = []
					if(this.keyword) {
						al.forEach((item, index) => {
							if(item.title.toLowerCase().indexOf(this.keyword.toLowerCase()) >= 0) {
								list.push(item)
							}
						})
						this.areaCodeList = list
					}else {
						this.areaCodeList = JSON.parse(JSON.stringify(this.areaCodeList_y))
					}
				}, 500)
			},
			search() {
				this.searchChange()
			},
			searchClear() {
				this.areaCodeList = JSON.parse(JSON.stringify(this.areaCodeList_y))
			}
		},
	}
</script>

<style lang="scss" scoped>
	@import "uview-ui/index.scss";
	@import '@/static/style/common.scss';
	.area-code-text {
		padding: 4rpx 10rpx;
		min-width: 100rpx;
		min-height: 30rpx;
		color: $ct-color9;
		line-height: 1.3;
		&.notData {
			color: #999;
		}
	}
	.area-code-content {
		width: 100%;
		min-height: 500rpx;
		padding: 10rpx 20rpx 0;
		border-radius: 10rpx 10rpx 0 0;
	}
	.pop-title {
		width: 100%;
		padding: 30rpx 10rpx;
		text-align: center;
		line-height: 1.3;
		color: #000;
	}
	.area-code-search-wrap {
		width: 100%;
		padding-bottom: 20rpx;
		/deep/ {
			.u-content {
				flex: 0.95;
			}
			.u-action {
				min-width: 80rpx;
				width: auto;
			}
		}
	}

	.area-code-scroll {
		width: 100%;
		height: 700rpx;
		.area-code-scroll-item {
			border-bottom: 2rpx solid #eee;
			padding: 10rpx 0;
			padding-left: 40rpx;
			line-height: 2.4;
			position: relative;
			.circle {
				position: absolute;
				left: 0;
				top: 50%;
				width: 28rpx;
				height: 28rpx;
				border-radius: 0;
				border: 2rpx solid #ddd;
				border-radius: 50%;
				margin-top: -14rpx;
				&.active {
					background-color: $ct-color9;
					border-color: $ct-color9;
				}
			}
			&.active {
				color: $ct-color9;
			}
		}
	}
	
	.empty-data {
		padding-top: 100rpx;
		color: #999;
		text-align: center;
	}
</style>