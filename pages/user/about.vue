<template>
	<view class="body">
		<view class="content">
			<view v-html="detail.content"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:0,
				detail:""
			}
		},
		onLoad() {
			this.getAbout()
		},
		methods:{
			getAbout(){
				var that = this;
				var data = {
					id:1,
				}
				that.$api.about(data).then(res => {
					if(res.code == 1){
						that.detail = res.data;
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	page,.body{
		background: #fff;
		width: 100%;
	}
	.content{padding:30upx;color: #333;font-size: 30upx;border-top: 2upx solid #f3f3f3;}
</style>
