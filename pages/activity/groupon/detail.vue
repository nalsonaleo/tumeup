<template>
	<view>
		<!-- 当前拼团 -->
		<view class="now_con">
		<div id="container" style="width: 100%;height: auto;"><div class="Rucian_NowBox">
		          <!--me-->
				<div class="Rucian_List">
					<img :src="num1_img || '../../../static/imgs/noMen.png'" alt="">
					<div>{{$t("order.groupon.text.yj")}}:{{$t('money.symbol')}}{{yuji}}</div>
					<view class="BigZt"></view>
					<div class="Rucian_Id">	Your ID : {{ num1_id }}</div>
					<div class="Rucian_Number">1</div>
				</div>
		           <!--me end-->
                           <!--leve one-->
				<div style="background-color: #0081FF; height: 110px;" v-for="(item1, index1) in list" :key="index1" v-if="index1>0 && item1.uid>0 && item1.check==1" class="Rucian_List">
						<img style="width: 25px;height: 25px" :src="item1.u_img || '../../../static/imgs/noMen.png'" alt="">
						<div>{{item1.u_name}}</div>
						<div class="Rucian_2">
							<div>{{$t("order.groupon.text.yhid")}}：{{item1.uid>0?item1.uid:'?'}}</div>
							<div>{{$t("order.groupon.text.yqr")}}：{{item1.pid>0?item1.pid:'?'}}</div>
							<div>{{$t("order.groupon.text.yj.one")}}：{{item1.uid>0?item1.yongjin:'?'}}</div>
						</div>
						<div class="Rucian_Number">{{item1.num}}</div>
				</div>
			   <!--leve one end-->
			   <!--leve tow -->
				<div style="height: 110px;" v-for="(item1, index1) in list" :key="index1" v-if="index1>0 && item1.uid>0 && item1.check!=1" class="Rucian_List">
						<img style="width: 25px;height: 25px" :src="item1.u_img || '../../../static/imgs/noMen.png'" alt="">
						<div>{{item1.u_name}}</div>
						<div class="Rucian_2">
							<div>{{$t("order.groupon.text.yhid")}}：{{item1.uid>0?item1.uid:'?'}}</div>
							<div>{{$t("order.groupon.text.yqr")}}：{{item1.pid>0?item1.pid:'?'}}</div>
							<div>{{$t("order.groupon.text.yj.one")}}：{{item1.uid>0?item1.yongjin:'?'}}</div>
						</div>
						<div class="Rucian_Number">{{item1.num}}</div>
				 </div>
			    <!--leve tow end -->
			    <!--leve three -->	     
					<div style="min-height: 110px;display: flex;justify-content: center;align-items: center;" v-for="(item1, index1) in list" :key="index1" v-if="index1>0 && item1.uid==0" class="Rucian_List">
						<div class="Rucian_2" style="display: flex;justify-content: center;align-items: center;">
							{{$t("order.groupon.text.dbw")}}
						</div>
						<div class="Rucian_Number">{{item1.num}}</div>
					</div>
			     <!--leve three end-->	  			
			</div></div>	
		</view>
		<!-- 当前拼团end -->
	</view>
</template>

<script>
export default {
	data() {
		return {
			group_id: '',
			num1_img: '',
			num1_name: '',
			num1_id: '',
			isBack:0,
			list: [],
			yuji:''
		};
	},
	onLoad(options) {
		this.group_id = options.id;
		this.getGroup();
		if(options.type){
			this.isBack = 1;
		}
	},
	mounted(){
		if(this.isBack == 1){
			document.querySelector('.uni-page-head-hd').style.display = 'none'
		}
	},
	methods: {
		getGroup() {
			var that = this;
			var data = {
				uid: uni.getStorageSync('p_uid'),
				token: uni.getStorageSync('p_token'),
				group_id: that.group_id
			};
			that.$api.groupDetail(data).then(res => {
				if (res.code == 1) {
					that.list = res.data;
					that.num1_img = res.data[0].u_img;
					that.num1_name = res.data[0].u_name;
					that.num1_id = res.data[0].uid;
					that.yuji = res.data[0].yuji;
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
	.Rucian_NowBox {
	    text-align: center;
	    display: flex;
	    flex-wrap: wrap;
	    justify-content: center;
	}
	.Rucian_NowBox .Rucian_List:nth-child(1) {
	    width: 50%;
	    padding: 3%;
	    border-color:#8B8B7A;
	    
	}
	.Rucian_NowBox .Rucian_List .BigZt {
	    font-size: 20px;
	    margin: 8px;
	}
	.Rucian_NowBox .Rucian_List .Rucian_Id {
	    width: 120px;
	    font-size: 13px;
	    margin: 0 auto;
	    background-color:  #3cb371;
	    border-radius: 10px;
	    padding: 2px 5px;
	}
	.Rucian_NowBox .Rucian_List .Rucian_Number {
	    position: absolute;
	    left: 0;
	    top: 0;
	    width: 16px;
	    line-height: 19px;
	    z-index: 8;
	    color: white;
	    font-size: 13px;
	}
	.Rucian_NowBox .Rucian_List {
	    width: 35%;
	    margin: 2%;
	    border: 2upx solid $zhuse;
	    padding: 6% 4%;
	    border-radius: 4px;
	    background-color: #07b3d1;
	    color: white;
	    position: relative;
	}
	.Rucian_NowBox .Rucian_List img {
	    width: 50px;
	    height: 50px;
	    border-radius: 50%;
	    margin-bottom: 10px;
	}
	.Rucian_NowBox .Rucian_List .Rucian_2 {
	    text-align: left;
	    font-size: 13px;
	    margin-top: 10px;
	}
	.Rucian_NowBox .Rucian_List .Rucian_Number {
	    position: absolute;
	    left: 0;
	    top: 0;
	    width: 16px;
	    line-height: 19px;
	    z-index: 8;
	    color: white;
	    font-size: 13px;
	}
page {
	background: #fff;
}
.noneImg {
	background: transparent !important;
	padding: 0 !important;
}
.one {
	text-align: center;
	margin: 30px auto;
	position: relative;
	.tx {
		width: 118upx;
		height: 118upx;
		border-radius: 100%;
		margin: 0 auto;
		padding: 2px;
		background: rgba(239, 58, 58, 0.8);
		image {
			width: 100%;
			height: 100%;
			border-radius: 100%;
			display: block;
		}
	}
	.sf {
		font-size: 22upx;
		background: rgb(242, 97, 97);
		border-radius: 20upx;
		width: 80upx;
		height: 34upx;
		margin: -20upx auto 8upx;
		position: relative;
	}
	.name {
		font-size: 32upx;
		color: #333;
	}
	.u_id {
		font-size: 26upx;
		color: #666;
	}
}
.two {
	display: flex;
	justify-content: space-around;
	width: 100%;
}
.three {
	display: flex;
	width: 100%;
	flex-wrap: wrap;
}
</style>
