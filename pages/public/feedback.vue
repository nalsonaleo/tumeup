<template>
	<form>
		<view class="page_box">
			<view class="head_box"></view>
			<view class="content_box pad">
				<view class="form-item">
					<view class="inp-title">{{$t("public.poster.index.qxzlx")}}</view>
					<radio-group class="y-start radio-box">
						<label class="radio-item x-f" v-for="(type, index) in typeList" :key="index" @tap="changeType(index)">
							<radio class="orange radio-inp" :class="{ chekced: num == index }" :checked="num == index"></radio>
							<text class="radio-title">{{ type }}</text>
						</label>
					</radio-group>
				</view>
				<view class="form-item">
					<label>
						<view class="inp-title">{{$t("public.poster.index.xgms")}}</view>
						<view class="area-box">
							<textarea
								class="inp-area"
								v-model="f_info"
								name="message"
								:placeholder="$t('public.poster.index.kg') + '~' +$t('public.poster.index.ms')+ '~'"
								placeholder-class="pl-style"
							/>
							<view class="img-box">
								<view class="preview-box" v-for="(item, index) in imgList" :key="index">
									<image class="preview-img" :src="item" mode="aspectFill"></image>
									<text class="cuIcon-close" @tap="DelImg(index)"></text>
								</view>
								<view class="choose-img x-c" @tap="onChooseImg" v-if="imgList.length < 1"><text class="cuIcon-cameraadd"></text></view>
							</view>
						</view>
					</label>
				</view>
				<view class="form-item">
					<label>
						<view class="inp-title">{{$t("public.poster.index.lxfs")}}</view>
						<input class="inp" v-model="f_phone" name="phone" type="number" :placeholder="$t('public.poster.index.qsrndlxdh')" placeholder-class="pl-style" />
					</label>
				</view>
			</view>
			<view class="foot_box x-bc pad">
				<button class="cu-btn post-btn" @tap="addFeedback">{{$t("public.poster.index.tj")}}</button>
				<!-- <button class="cu-btn contact-btn" v-if="false">联系客服</button> -->
			</view>
		</view>
	</form>
</template>

<script>
export default {
	data() {
		return {
			num: 0,
			f_type: '',
			f_info: '',
			imgList: [], //图片
			f_phone: '', //电话
			typeList: [],
			imgId:""
		};
	},
	onLoad() {
		this.getFeedbackType();
	},
	methods: {
		// 获取意见分类
		getFeedbackType() {
			let that = this;
			that.$api.f_type().then(res => {
				if (res.code === 1) {
					that.typeList = res.data;
				}
			});
		},
		addFeedback() {
			let that = this;
			if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(that.f_phone)) {
				that.$msg(that.$t("public.poster.index.qtxzqdhhm"));
				return false;
			}
			// console.log(that.imgList[0])
			// uni.uploadFile({
			// 	url: this.global.baseUrl +  'index.php/index/user/feedback',
			// 	filePath: that.imgList[0],
			// 	name: 'f_img', 
			// 	formData: {
			// 		uid: uni.getStorageSync('p_uid'),
			// 		token: uni.getStorageSync('p_token'),
			// 		f_type: that.typeList[that.num],
			// 		f_info: that.f_info,
			// 		// f_img: that.imgList[0],
			// 		f_phone: that.f_phone
			// 	},
			// 	// header: {'Content-Type': 'multipart/form-data'},
			// 	success: res => {
			// 		// console.log(JSON.parse(res.data));
			// 		if(JSON.parse(res.data).code == 1){
			// 			that.$msg(JSON.parse(res.data).msg);
			// 			uni.navigateBack();
			// 		}
			// 	},
			// });

			var data = {
				uid: uni.getStorageSync('p_uid'),
				token: uni.getStorageSync('p_token'),
				f_type: that.typeList[that.num],
				f_info: that.f_info,
				f_img: that.imgId,
				f_phone: that.f_phone
			};
			that.$api.feedback(data).then(res => {
				that.$msg(res.msg);
				if (res.code === 1) {
					setTimeout(function(){
						uni.navigateBack();
					},800)
				}
			});
		},
		changeType(e) {
			this.num = e;
		},
		// 选择图片
		onChooseImg() {
			let that = this;
			uni.chooseImage({
				count: 1,
				sizeType: ['compressed'],
				sourceType: ['album'],
				success: chooseImageRes => {
					const tempFilePaths = chooseImageRes.tempFilePaths;
					that.imgList.push(tempFilePaths[0]);
					uni.uploadFile({
						url:this.global.baseUrl + 'index.php/index/home/up_img',
						filePath: tempFilePaths[0],
						name: 'file_name',
						success: uploadFileRes => {
							let res = JSON.parse(uploadFileRes.data);
							// console.log(res)
							if(res.code == 1){
								that.imgId = res.id;
							}
						}
					});
				}
			});
		},
		DelImg(index) {
			let that = this;
			uni.showModal({
				title: that.$t('public.poster.index.delpic'),
				content: `${that.$t('public.poster.index.qdysczzzpm')}？`,
				cancelText: that.$t("public.poster.index.cancel"),
				confirmText: that.$t("public.poster.index.del"),
				success: res => {
					if (res.confirm) {
						this.imgList.splice(index, 1);
					}
				}
			});
		}
	}
};
</script>

<style lang="scss">
.page_box {
	background: #fff;
}
.form-item {
	margin-top: 30rpx;
	.inp-title {
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(51, 51, 51, 1);
		margin-bottom: 30rpx;
	}
	.inp {
		width: 690rpx;
		height: 84rpx;
		background: rgba(249, 250, 251, 1);
		border-radius: 20rpx;
		padding: 0 30rpx;
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #333;
		margin-bottom: 38rpx;
	}
	.inp-house {
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(177, 179, 199, 1);
	}
	.area-inp {
		height: 190upx;
		padding: 30rpx;
	}
	.pl-style {
		font-size: 26rpx;
		font-family: PingFang SC;
		color: rgba(177, 179, 199, 1);
	}
}
.area-box {
	width: 690rpx;
	min-height: 306rpx;
	background: rgba(249, 250, 251, 1);
	border-radius: 20rpx;
	padding: 28rpx;
	.pl-style {
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(177, 179, 199, 1);
		line-height: 50rpx;
	}
	.inp-area {
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #333;
		line-height: 50rpx;
		width: 100%;
	}
	.img-box {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		margin-top: 20rpx;
		.choose-img,
		.preview-box {
			width: 108rpx;
			height: 108rpx;
			background: rgba(249, 250, 251, 1);
			border: 1rpx solid rgba(223, 223, 223, 1);
			margin-right: 25rpx;
			margin-bottom: 25rpx;
			position: relative;
			&:nth-child(5n) {
				margin-right: 0;
			}
			.cuIcon-cameraadd {
				font-size: 50rpx;
				color: #dfdfdf;
			}
			.preview-img {
				width: 100%;
				height: 100%;
			}
			.cuIcon-close {
				background: $zhuse;
				border-radius: 50%;
				width: 40rpx;
				line-height: 40rpx;
				color: #fff;
				text-align: center;
				position: absolute;
				top: -10rpx;
				right: -10rpx;
			}
		}
	}
}
.foot_box {
	border-top: 1rpx solid #eeeeee;
	height: 100rpx;
	.contact-btn {
		flex: 1;
		height: 70rpx;
		background: linear-gradient(90deg, rgba(103, 104, 105, 1), rgba(82, 82, 82, 1));
		box-shadow: 0px 2rpx 5rpx 0px rgba(102, 103, 104, 0.46);
		border-radius: 35rpx;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(255, 255, 255, 1);
	}
	.post-btn {
		flex: 1;
		height: 74rpx;
		background: $zhuse;
		box-shadow: 0px 7rpx 6rpx 0rpx rgba(239, 58, 58, 0.22);
		border-radius: 37rpx;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(255, 255, 255, 1);
	}
}

.radio-box {
	margin-top: 30rpx;
	.radio-item {
		margin-bottom: 40rpx;
		.radio-inp {
			transform: scale(0.7);
			margin-right: 10rpx;
		}
		.radio-title {
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: rgba(51, 51, 51, 1);
		}
	}
}
.uni-radio-input-checked {
	background-color: $zhuse !important;
	border: $zhuse !important;
}
</style>
