<template>
	<view class="" @click="navToAddress">
		<view class="titleNview-address" v-if="isSelfRaisingPoint">
			<text class="taobaofont icon-shoplight m-r"></text>
			<text>{{raisingPoint.name}}</text>
		</view>
		<view class="titleNview-address" v-else-if="address != ''">
			<text>{{ $t('index.sentTo')}}:{{ address }}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {};
		},
		props: {
			isSelfRaisingPoint: {
				type: Boolean,
				default: false
			},
			address: {
				type: String,
				default: ""
			},
			raisingPoint: {
				type: Object,
				default: {}
			}
		},
		methods: {
			navToAddress() {
				this.$emit("navToAddress")
			}
		}
	}
</script>

<style lang="scss" scoped>
	.titleNview-address {
		font-size: $font-sm;
		color: #ffffff;
		position: relative;
		padding-left: 36upx;
		padding-bottom: 12upx;
		display: flex;
		align-items: center;
	}
</style>
