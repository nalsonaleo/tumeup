<template>
	<view class="page_box">
		<view class="head_box"></view>
		<view class="content_box">
			<view class="address-item x-f">
				<label class="x-f flex-sub">
					<text class="item-title">收货人：</text>
					<input class="inp flex-sub" placeholder="请填写收货人姓名" type="text" v-model="a_name" />
				</label>
			</view>
			<view class="address-item x-f">
				<label class="x-f flex-sub">
					<text class="item-title">手机号：</text>
					<input class="inp flex-sub" placeholder="请输入收货人手机号" type="number" v-model="a_phone" />
				</label>
			</view>
			<view class="address-item x-f" @tap="chooseCity">
				<label class="x-f flex-sub">
					<text class="item-title">所在地区：</text>
					<input class="inp flex-sub" disabled type="text" placeholder="点击选择所在地区" v-model="area_text" />
				</label>
			</view>
			<view class="area-box x-f">
				<label class="x-f x-start">
					<view class="area-item"><text class="item-title">详细地址：</text></view>
					<textarea
						auto-height
						class="area-inp"
						type="text"
						placeholder="如道路、门牌号、小区、楼栋号、单元室等"
						placeholder-class="area-pl"
						v-model="a_address"
					/>
				</label>
			</view>
			<view class="default-box x-bc">
				<text class="title">设为默认地址</text>
				<switch class="olive switch" @tap="onSwitch" :class="{ checked: is_default }" :checked="is_default"></switch>
			</view>
		</view>
		<view v-if="from == 'edit'" class="foot_box x-bc">
			<button class="cu-btn delete-btn" @tap="deleteAddress">删除收货地址</button>
			<button class="cu-btn save-btn" @tap="editAddress">保存收货地址</button>
		</view>
		<view v-else class="foot_box "><button class="cu-btn add-btn" @tap="editAddress">保存收货地址</button></view>
		
		<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValue" @onCancel="onCancel" @onConfirm="onConfirm"></mpvue-city-picker>
		
		<!-- <sh-picker ref="shoproCityPicker" :pickerValueDefault="cityPickerValueDefault" @onCancel="onCancel" @onConfirm="onConfirm"></sh-picker> -->
	</view>
</template>

<script>
// import shPicker from './children/shopro-picker.vue';
import mpvueCityPicker from '@/components/mpvue-citypicker/mpvueCityPicker.vue'
export default {
	data() {
		return {
			id: 0,
			a_name: '',
			a_phone: '',
			area_id: '',
			a_address: '',
			is_default: false,
			a_default:0,
			area_text: '',
			a_province:"",
			a_city:"",
			a_area:"",
			// 城市
			cityPickerValue: [0, 0, 0],
			themeColor: '#ff4d4d',
			// cityPickerValueDefault: [0, 0, 0],
			// pickerData: {},
			from: ''
		};
	},
	components: {
		mpvueCityPicker
	},
	onLoad(options) {
		// console.log(JSON.parse(options.to) )
		let addressId = JSON.parse(options.to).id;
		this.id = JSON.parse(options.to).id;
		this.from = JSON.parse(options.to).from;
		if (this.from == 'edit') {
			this.getAddressInfo();
		}
		uni.setNavigationBarTitle({
			title: this.from == 'edit' ? '编辑收货地址' : '添加收货地址'
		});
	},
	methods: {
		onSwitch() {
			this.is_default = !this.is_default;
			if(this.is_default){
				this.a_default = 1
			}else{
				this.a_default = 0
			}
			
			
		},
		chooseCity() {
			this.$refs.mpvueCityPicker.show()
		},
		onConfirm(e) {
			var $this = this;
			$this.area_text = e.label;
			$this.cityPickerValue = e.value;
			var adsArr = e.label.split('-');
			$this.a_province = adsArr[0];
			$this.a_city = adsArr[1];
			if(adsArr.length>2){
				$this.a_area = adsArr[2];
			}
		},
		// 编辑添加地址
		editAddress() {
			let that = this;
			if(!that.a_name){
				that.$msg('请填写姓名');
				return;
			}
			if(!that.a_phone){
				that.$msg('请填写手机号');
				return;
			}
			if(!(/^1[3456789]\d{9}$/.test(that.a_phone))){
				that.$msg('请填写正确的手机号');
				return;
			}
			if(!that.area_text){
				that.$msg('请选择收货地址');
				return;
			}
			if(!that.a_address){
				that.$msg('请填写详细收货地址');
				return;
			}
			// 添加地址
			if(that.from == 'add'){
				var data = {
					uid:uni.getStorageSync('p_uid'),
					token:uni.getStorageSync('p_token'),
					a_name:that.a_name,
					a_phone:that.a_phone,
					a_province:that.a_province,
					a_city:that.a_city,
					a_area:that.a_area,
					a_address:that.a_address,
					a_default:that.a_default
				}
				that.$api.addAddress(data).then(res => {
					if(res.code == 1){
						that.$msg(res.msg);
						uni.navigateBack()
					}
				});
			}else{
				// 编辑地址
				var data = {
					id:that.id,
					uid:uni.getStorageSync('p_uid'),
					token:uni.getStorageSync('p_token'),
					a_name:that.a_name,
					a_phone:that.a_phone,
					a_province:that.a_province,
					a_city:that.a_city,
					a_area:that.a_area,
					a_address:that.a_address,
					a_default:that.a_default
				}
				that.$api.editAddress(data).then(res => {
					if(res.code == 1){
						that.$msg(res.msg);
						uni.navigateBack()
					}
				});
			}
		},
		// 地址信息
		getAddressInfo() {
			var that = this;
			var data = {
				uid:uni.getStorageSync('p_uid'),
				token:uni.getStorageSync('p_token'),
				id:that.id,
			}
			that.$api.addressInfo(data).then(res => {
				if(res.code == 1){
					let data = res.data;
					let areaText = `${data.a_province}-${data.a_city}-${data.a_area}`;
					that.is_default = data.a_default == 1 ? true : false;
					that.area_text = areaText;
					that.a_name = data.a_name;
					that.a_phone = data.a_phone;
					that.a_province = data.a_province;
					that.a_city = data.a_city;
					that.a_area = data.a_area;
					that.a_address = data.a_address;
					that.a_default = data.a_default;
				}
			});
		},
		// onConfirm(e) {
		// 	this.addressData.area_id = e.cityCode;
		// 	this.area_text = e.label;
		// },
		// onCancel(e) {
		// 	this.addressData.area_id = e.cityCode;
		// 	this.area_text = e.label;
		// },
		// 删除收货地址
		deleteAddress() {
			var that  = this;
			var data = {
				id:that.id,
				uid:uni.getStorageSync('p_uid'),
				token:uni.getStorageSync('p_token'),
			}
			that.$api.delAddress(data).then(res => {
				if(res.code == 1){
					that.$msg(res.msg);
					uni.navigateBack()
				}
			});
		}
	}
};
</script>

<style lang="scss">
.address-item {
	height: 96rpx;
	background: #fff;
	border-bottom: 1rpx solid rgba(#dfdfdf, 0.5);
	padding: 0 25rpx;

	.item-title {
		color: #333;
		font-size: 28rpx;
		white-space: nowrap;
	}
	.inp {
		color: #333;
		font-size: 28rpx;
	}
}
.area-box {
	min-height: 120rpx;
	padding-bottom: 60rpx;
	background: #fff;
	padding: 30rpx 25rpx;
	.item-title {
		font-size: 28rpx;
		white-space: nowrap;
	}
	.area-inp {
		color: #999;
		font-size: 28rpx;
	}
}
.default-box {
	height: 100rpx;
	padding: 0 25rpx;
	background: #fff;
	margin-top: 20rpx;
	.title {
		font-size: 28rpx;
	}
	.switch {
		transform: scale(0.8);
	}
}
.foot_box {
	padding: 20rpx;

	.add-btn {
		width: 710rpx;
		height: 80rpx;
		background: $zhuse;
		// border: 1rpx solid rgba(238, 238, 238, 1);
		border-radius: 40rpx;
		color: rgba(#fff, 0.9);
	}
	.delete-btn {
		width: 432rpx;
		height: 70rpx;
		background: linear-gradient(90deg, rgba(233, 180, 97, 1), rgba(238, 204, 137, 1));
		border: 1rpx solid rgba(238, 238, 238, 1);
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(255, 255, 255, 1);
		border-radius: 35rpx;
		padding: 0;
		margin-right: 20rpx;
	}
	.save-btn {
		width: 432rpx;
		height: 70rpx;
		background: $zhuse;
		// border: 1rpx solid rgba(238, 238, 238, 1);
		border-radius: 40rpx;
		color: rgba(#fff, 0.9);
	}
}
</style>
