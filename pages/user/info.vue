<template>
	<view class="container">
		<view class="user-list x-bc">
			<text class="list-name">{{$t('user.forgetPayPsd.tx')}}</text>
			<view class="x-f" @tap="onChooseImg">
				<image class="avatar" :src="userData.u_img" mode=""></image>
				<text class="cuIcon-right"></text>
			</view>
		</view>
		<view class="user-list x-bc">
			<text class="list-name">{{$t('user.forgetPayPsd.nc')}}</text>
			<view class="x-f">
				<input class="list-val" v-model="userData.u_name" />
				<text class="cuIcon-right"></text>
			</view>
		</view>
		<view class="user-list x-bc">
			<text class="list-name">{{$t('user.forgetPayPsd.sjh')}}</text>
			<view class="x-f">
				<text class="list-val">{{ userData.u_phone }}</text>
				<!-- <text class="cuIcon-right"></text> -->
			</view>
		</view>
		<view class="user-list x-bc">
			<text class="list-name">{{$t('pages.user.info.id')}}</text>
			<view class="x-f">
				<text class="list-val">{{ userData.id }}</text>
				<!-- <text class="cuIcon-right"></text> -->
			</view>
		</view>
		<view class="user-list x-bc">
			<text class="list-name">{{$t('user.forgetPayPsd.dj')}}</text>
			<view class="x-f">
				<text class="list-val">{{ userData.level_name }}</text>
			</view>
		</view>
		<view class="user-list x-bc">
			<text class="list-name">{{$t('user.forgetPayPsd.yqm')}}</text>
			<view class="x-f">
				<text class="list-val">{{ userData.u_code }}</text>
			</view>
		</view>
		<view class="user-list x-bc" v-if="userData.t_name">
			<text class="list-name">{{$t('user.forgetPayPsd.yqr')}}</text>
			<view class="x-f">
				<text class="list-val">{{ userData.t_name }}</text>
			</view>
		</view>
<!-- 		<view class="user-list x-bc" v-if="userData.u_tid">
			<text class="list-name">{{$t("user.forgetPayPsd.yqrId")}}</text>
			<view class="x-f">
				<text class="list-val">{{ userData.u_tid}}</text>
			</view>
		</view> -->
		<view class="btn-box flex align-center justify-center"><button class="cu-btn confirem-btn" @tap="editUserInfo">{{$t('user.forgetPayPsd.bc')}}</button></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userData: {},
				avatar:""
			};
		},
		onLoad() {
			this.userData = JSON.parse(uni.getStorageSync('p_user'));
		},
		methods: {
			// 选择日期
			onDateChange(e) {
				this.userData.birthday = e.detail.value;
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
						that.userData.u_img = tempFilePaths[0];
						that.avatar = 1;
					}
				});
			},
			editUserInfo() {
				let that = this;
				if(that.avatar == 1){
					uni.uploadFile({
						url:this.global.baseUrl +  'index.php/index/user/edit_info',
						filePath: that.userData.u_img,
						name: 'u_img', 
						formData: {
							uid: uni.getStorageSync('p_uid'),
							token: uni.getStorageSync('p_token'),
							u_name: that.userData.u_name,
						},
						// header: {'Content-Type': 'multipart/form-data'},
						success: res => {
							// console.log(JSON.parse(res.data));
							if(JSON.parse(res.data).code == 1){
								that.$msg(JSON.parse(res.data).msg);
								setTimeout(function(){
									uni.navigateBack();
								},800)
							}
						},
					});
				}else{
					var data = {
						uid: uni.getStorageSync('p_uid'),
						token: uni.getStorageSync('p_token'),
						u_name: that.userData.u_name,
					}
					that.$api.changeInfo(data).then(res => {
						if (res.code === 1) {
							that.$msg(res.msg);
							setTimeout(function(){
								uni.navigateBack();
							},800)
						}
					});
				}
				
			},
		}
	};
</script>

<style lang="scss">
	.user-list {
		background: #fff;
		height: 100rpx;
		border-bottom: 1rpx solid #f6f6f6;
		padding: 0 20rpx;

		.list-name {
			font-size: 28rpx;
		}

		.avatar {
			width: 67rpx;
			height: 67rpx;
			border-radius: 50%;
			// background: #ccc;
		}

		.cuIcon-right {
			margin-left: 25rpx;
		}

		.list-val {
			color: #999;
			font-size: 28rpxc;
			text-align: right;
		}
	}

	.btn-box {
		margin-top: 60rpx;
	
		.confirem-btn {
			width: 710rpx;
			height: 80rpx;
			background: $zhuse;
			// background: linear-gradient(90deg, rgba(233, 180, 97, 1), rgba(238, 204, 137, 1));
			border: 1rpx solid rgba(239, 58, 58, 0.22);
			border-radius: 40rpx;
			font-size: 30rpx;
			color: rgba(#fff, 0.9);
		}
	}
</style>
