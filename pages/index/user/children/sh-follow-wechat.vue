<template>
	<view class="cu-modal" :class="[{ show: showModal }, modalType]" cathctouchmove @tap="hideModal">
		<view class="cu-dialog" @tap.stop style="background: none;overflow: visible;">
			<view class="follow-wechat__wrap y-bc">
				<view class="follow-wechat__head">{{$t('user.children.shFollowWechat.gzwxgzh')}}</view>
				<image class="follow-wechat__code" src="/static/imgs/logo/logo.png" mode="aspectFill"></image>
				<view class="follow-wechat__notice">{{$t('user.children.shFollowWechat.casbewm')}}</view>
				<button class="cu-btn save-btn" @tap="saveImage">{{$t('user.children.shFollowWechat.bcewm')}}</button>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	components: {},
	data() {
		return {};
	},
	props: {
		value: {},
		modalType: {
			type: String,
			default: ''
		}
	},
	computed: {
		showModal: {
			get() {
				return this.value;
			},
			set(val) {
				this.$emit('input', val);
			}
		}
	},
	methods: {
		hideModal() {
			this.showModal = false;
			this.$store.commit('LOGIN_TIP', false);
		},
		// 保存图片
		saveImage() {
			let that = this;
			let platform = uni.getStorageSync('platform');
			if (platform === 'wxOfficialAccount') {
				that.$tools.toast(that.$t('user.children.shFollowWechat.catpbc'));
			} else {
				uni.saveImageToPhotosAlbum({
					filePath: '/static/imgs/logo/logo.png',
					success: res => {
						that.$tools.toast(that.$t('user.children.shFollowWechat.bccg'));
					},
					fail: err => {
						that.$tools.toast(that.$t('user.children.shFollowWechat.bcsb'));
					}
				});
			}
		}
	}
};
</script>

<style lang="scss">
.follow-wechat__wrap {
	width: 612rpx;
	height: 725rpx;
	background: rgba(255, 255, 255, 1);
	border-radius: 20rpx;
	position: relative;
	left: 50%;
	transform: translateX(-50%);
	padding: 50rpx 0;
	.follow-wechat__head {
		font-size: 35rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(70, 53, 27, 1);
	}
	.follow-wechat__code {
		width: 241rpx;
		height: 241rpx;
		background: rgba(249, 241, 230, 1);
	}
	.follow-wechat__notice {
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: rgba(153, 153, 153, 1);
	}
	.save-btn {
		width: 492rpx;
		height: 70rpx;
		background: linear-gradient(90deg, rgba(233, 180, 97, 1), rgba(238, 204, 137, 1));
		box-shadow: 0px 7rpx 6rpx 0px rgba(229, 138, 0, 0.22);
		border-radius: 35rpx;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(255, 255, 255, 1);
	}
}
</style>
