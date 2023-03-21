import http from './interface'
const apiList = {
	// 小程序授权
	getAuth: (data) => {
		return http.request({
			url: 'index.php/index/index/auth',
			method: 'POST',
			data
		})
	},
	// 获取验证码
	getCode: (data) => {
		return http.request({
			url: 'index.php/index/index/get_code',
			method: 'POST',
			data
		})
	},
	// 注册
	register:(data) => {
		return http.request({
			url: 'index.php/index/index/register',
			method: 'POST',
			data
		})
	},
	// 登录
	login:(data) => {
		return http.request({
			url: 'index.php/index/index/login',
			method: 'POST',
			data
		})
	},
	// 忘记密码
	forgetPsd:(data) => {
		return http.request({
			url: 'index.php/index/index/forget_psd',
			method: 'POST',
			data
		})
	},
	// 修改密码
	editPsd:(data) => {
		return http.request({
			url: 'index.php/index/user/edit_psd',
			method: 'POST',
			data
		})
	},
	// 设置支付密码
	set_paypsd:(data) => {
		return http.request({
			url: 'index.php/index/user/set_paypsd',
			method: 'POST',
			data
		})
	},
	// 修改支付密码
	edit_paypsd:(data) => {
		return http.request({
			url: 'index.php/index/user/edit_paypsd',
			method: 'POST',
			data
		})
	},
	// 忘记支付密码
	forget_paypsd:(data) => {
		return http.request({
			url: 'index.php/index/user/forget_paypsd',
			method: 'POST',
			data
		})
	},
	// 首页
	getIndex:() => {
		return http.request({
			url: 'index.php/index/index/index',
			method: 'POST',
			// data
		})
	},
	// 拼团专区
	getGroup:() => {
		return http.request({
			url: 'index.php/index/index/group',
			method: 'POST',
			// data
		})
	},
	getCommonGroup:() => {
		return http.request({
			url: 'index.php/index/index/common_group',
			method: 'POST',
			// data
		})
	},
	// 分类
	getCate:() => {
		return http.request({
			url: 'index.php/index/goods/index',
			method: 'POST',
			// data
		})
	},
	// 分类下的商品
	getClassGoods:(data) => {
		return http.request({
			url: 'index.php/index/goods/class_goods',
			method: 'POST',
			data
		})
	},
	// 搜索、筛选商品
	getScreenGoods:(data) => {
		return http.request({
			url: 'index.php/index/goods/screen_goods',
			method: 'POST',
			data
		})
	},
	// 商品详情
	goodsInfo:(data) => {
		return http.request({
			url: 'index.php/index/goods/goods_info',
			method: 'POST',
			data
		})
	},
	// 收藏/取消收藏
	toCollect:(data) => {
		return http.request({
			url: 'index.php/index/goods/collect',
			method: 'POST',
			data
		})
	},
	// 个人信息
	userInfo:(data) => {
		return http.request({
			url: 'index.php/index/user/index',
			method: 'POST',
			data
		})
	},
	// 地址列表
	getAddress:(data) => {
		return http.request({
			url: 'index.php/index/user/address',
			method: 'POST',
			data
		})
	},
	// 收货地址详情
	addressInfo:(data) => {
		return http.request({
			url: 'index.php/index/user/address_info',
			method: 'POST',
			data
		})
	},
	
	// 收货地址详情
	defaultaddressInfo:(data) => {
		return http.request({
			url: 'index.php/index/user/default_address_info',
			method: 'POST',
			data
		})
	},
	// 添加地址
	addAddress:(data) => {
		return http.request({
			url: 'index.php/index/user/address_add',
			method: 'POST',
			data
		})
	},
	// 编辑地址
	editAddress:(data) => {
		return http.request({
			url: 'index.php/index/user/address_edit',
			method: 'POST',
			data
		})
	},
	// 删除地址
	delAddress:(data) => {
		return http.request({
			url: 'index.php/index/user/address_del',
			method: 'POST',
			data
		})
	},
	// 邀请好友二维码
	inviteCode:(data) => {
		return http.request({
			url: 'index.php/index/user/invite_user',
			method: 'POST',
			data
		})
	},
	// 保存海报
	makeImg:(data) => {
		return http.request({
			url: 'index.php/index/user/make_img',
			method: 'POST',
			data
		})
	},
	// 我的团队
	team:(data) => {
		return http.request({
			url: 'index.php/index/user/team',
			method: 'POST',
			data
		})
	},
	
	team:(data) => {
		return http.request({
			url: 'index.php/index/user/team',
			method: 'POST',
			data
		})
	},
	getwxinfo:(data) => {
		return http.request({
			url: 'index.php/index/user/getwxinfo',
			method: 'POST',
			data
		})
	},
	
	// 升级列表
	getUpgrade:(data) => {
		return http.request({
			url: 'index.php/index/user/getUpgrade',
			method: 'POST',
			data
		})
	},
	// 确认升级
	doUpgrade:(data) => {
		return http.request({
			url: 'index.php/index/user/doUpgrade',
			method: 'POST',
			data
		})
	},
	// 获取收藏/足迹
	myCollect:(data) => {
		return http.request({
			url: 'index.php/index/user/my_collect',
			method: 'POST',
			data
		})
	},
	// 删除收藏/足迹
	delCollect:(data) => {
		return http.request({
			url: 'index.php/index/user/del_collect',
			method: 'POST',
			data
		})
	},
	// 常见问题
	question:(data) => {
		return http.request({
			url: 'index.php/index/user/question',
			method: 'POST',
			data
		})
	},
	// 反馈类型
	f_type:() => {
		return http.request({
			url: 'index.php/index/user/f_type',
			method: 'POST',
			// data
		})
	},
	
	
	// 意见反馈
	feedback:(data) => {
		return http.request({
			url: 'index.php/index/user/feedback',
			method: 'POST',
			data
		})
	},
	// 我的反馈
	f_list:(data) => {
		return http.request({
			url: 'index.php/index/user/f_list',
			method: 'POST',
			data
		})
	},
	// 获取购物车信息
	cartInfo:(data) => {
		return http.request({
			url: 'index.php/index/cart/index',
			method: 'POST',
			data
		})
	},
	// 加入购物车
	addCart:(data) => {
		return http.request({
			url: 'index.php/index/cart/add_cart',
			method: 'POST',
			data
		})
	},
	// 编辑购物车
	editCart:(data) => {
		return http.request({
			url: 'index.php/index/cart/edit_cart',
			method: 'POST',
			data
		})
	},
	// 删除购物车
	delCart:(data) => {
		return http.request({
			url: 'index.php/index/cart/del_cart',
			method: 'POST',
			data
		})
	},
	// 购物车结算
	submitCart:(data) => {
		return http.request({
			url: 'index.php/index/main/cart_submit',
			method: 'POST',
			data
		})
	},
	// 商品详情-立即购买
	submitGoods:(data) => {
		return http.request({
			url: 'index.php/index/main/goods_submit',
			method: 'POST',
			data
		})
	},
	// 根据规格获取对应信息
	skuInfo:(data) => {
		return http.request({
			url: 'index.php/index/goods/sku_info',
			method: 'POST',
			data
		})
	},
	// 提交订单
	creatOrder:(data) => {
		return http.request({
			url: 'index.php/index/main/order',
			method: 'POST',
			data
		})
	},
	// 支付
	payment:(data) => {
		return http.request({
			url: 'index.php/index/main/pay',
			method: 'POST',
			data
		})
	},
	// 金豆商城
	jfShop:(data) => {
		return http.request({
			url: 'index.php/index/goods/jf_shop',
			method: 'POST',
			data
		})
	},
	
	// 我的钱包
	wallet:(data) => {
		return http.request({
			url: 'index.php/index/user/wallet',
			method: 'POST',
			data
		})
	},
	// 余额/金豆明细
	walletMx:(data) => {
		return http.request({
			url: 'index.php/index/user/mingxi',
			method: 'POST',
			data
		})
	},
	//充值设置
	rechargeSet:(data) => {
		return http.request({
			url: 'index.php/index/user/recharge_set',
			method: 'POST',
			data
		})
	},
	//余额充值
	recharge:(data) => {
		return http.request({
			url: 'index.php/index/user/recharge',
			method: 'POST',
			data
		})
	},
	//余额提现
	tixian:(data) => {
		return http.request({
			url: 'index.php/index/user/tixian',
			method: 'POST',
			data
		})
	},
	// 订单列表
	orderList:(data) => {
		return http.request({
			url: 'index.php/index/user/order_list',
			method: 'POST',
			data
		})
	},
	// 订单详情
	orderInfo:(data) => {
		return http.request({
			url: 'index.php/index/user/order_info',
			method: 'POST',
			data
		})
	},
	//查看物流
	logistics:(data) => {
		return http.request({
			url: 'index.php/index/user/logistics',
			method: 'POST',
			data
		})
	},
	//删除订单
	delOrder:(data) => {
		return http.request({
			url: 'index.php/index/user/order_del',
			method: 'POST',
			data
		})
	},
	//确认收货
	confirmOrder:(data) => {
		return http.request({
			url: 'index.php/index/user/order_confirm',
			method: 'POST',
			data
		})
	},
	//提货
	tihuo:(data) => {
		return http.request({
			url: 'index.php/index/user/tihuo',
			method: 'POST',
			data
		})
	},
	//兑换金豆
	chargeIntegral:(data) => {
		return http.request({
			url: 'index.php/index/user/chargeIntegral',
			method: 'POST',
			data
		})
	},
	
	//选择规格
	chooseSku:(data) => {
		return http.request({
			url: 'index.php/index/goods/sku_info',
			method: 'POST',
			data
		})
	},
	//当前拼团
	nowGroup:(data) => {
		return http.request({
			url: 'index.php/index/main/now_group',
			method: 'POST',
			data
		})
	},
	//历史拼团
	historyGroup:(data) => {
		return http.request({
			url: 'index.php/index/main/history_group',
			method: 'POST',
			data
		})
	},
	//拼团详情
	groupDetail:(data) => {
		return http.request({
			url: 'index.php/index/main/group_detail',
			method: 'POST',
			data
		})
	},
	//优惠券列表
	couponList:(data) => {
		return http.request({
			url: 'index.php/index/user/coupon_list',
			method: 'POST',
			data
		})
	},
	//获取优惠券
	getCoupon:(data) => {
		return http.request({
			url: 'index.php/index/main/coupon',
			method: 'POST',
			data
		})
	},
	//领取优惠券
	takeCoupon:(data) => {
		return http.request({
			url: 'index.php/index/goods/lq_coupon',
			method: 'POST',
			data
		})
	},
	//根据优惠券计算价格
	countPrice:(data) => {
		return http.request({
			url: 'index.php/index/main/count_price',
			method: 'POST',
			data
		})
	},
	//评价
	pingJia:(data) => {
		return http.request({
			url: 'index.php/index/user/ping',
			method: 'POST',
			data
		})
	},
	//获取评价
	getComment:(data) => {
		return http.request({
			url: 'index.php/index/goods/comment',
			method: 'POST',
			data
		})
	},
	// 申请退款
	refund:(data) => {
		return http.request({
			url: 'index.php/index/user/refund',
			method: 'POST',
			data
		})
	},
	//修改资料
	changeInfo:(data) => {
		return http.request({
			url: 'index.php/index/user/edit_info',
			method: 'POST',
			data
		})
	},
	//关于我们
	about:(data) => {
		return http.request({
			url: 'index.php/index/user/about',
			method: 'POST',
			data
		})
	},
	// 图片上传
	upload:(data) => {
		return http.request({
			url: 'index.php/index/home/up_img',
			method: 'POST',
			data
		})
	},
	// 获取客服信息
	kefu:(data) => {
		return http.request({
			url: 'index.php/index/user/kefu',
			method: 'POST',
			data
		})
	},
	// 核销信息
	no_order:(data) => {
		return http.request({
			url: 'index.php/index/user/no_order',
			method: 'POST',
			data
		})
	},
	// 核销
	hexiao:(data) => {
		return http.request({
			url: 'index.php/index/user/hexiao',
			method: 'POST',
			data
		})
	},
	// 门店地址
	store:() => {
		return http.request({
			url: 'index.php/index/main/store',
			method: 'POST',
			// data
		})
	},
	//下单
	doorder:(data) => {
		return http.request({
			
			
			url: 'index.php/index/main/order',
			method: 'POST',
			data
		})
	},
	// 设置自动拼团
	u_out:(data) => {
		return http.request({
			url: 'index.php/index/user/u_out',
			method: 'POST',
			data
		})
	},
	// 语言翻译
	langapiIndex:(data) => {
		return http.request({
			url: 'index.php/index/Langapi/index',
			method: 'POST',
			data
		})
	}
}
export default apiList