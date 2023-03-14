import {
	cloudMall
} from '@/common/request.js';
import {
	navToGoodsItemPage,
	navToLoginPage,
	showLoginDialog,
	updateGoodsTags
} from '@/common/functions.js';
import {
	mapState,
	mapMutations
} from 'vuex';
export default {
	computed: {
		...mapState(['hasLogin', 'shopId', 'cartMap']),
		cartCount() {
			return this.$store.state.cartCount;
		}
	},
	watch: {
		cartCount(count) {
			this.resetTabCartCount();
			//console.log("watch mixin cartCount")
		}
	},
	onShow() {
		this.resetTabCartCount();
		console.log("onShow mixin")
	},
	onHide() {
		this.closeSku();
	},
	methods: {
		...mapMutations(['incrCartNumber', 'updateCartNumber', 'updateCartMap', 'setStateAttr']),
		resetTabCartCount() {
			let cartIndex = 2;
			//console.log("this.cartCount", this.cartCount)
			if (this.cartCount > 0) {
				uni.setTabBarBadge({
					index: cartIndex,
					text: '' + this.cartCount
				})
			} else {
				uni.removeTabBarBadge({
					index: cartIndex
				})
			}
			this.resetGoodsCart()
		},
		resetGoodsCart() {

		},
		closeSku() {
			if (this.closeSkuDialog) {
				this.closeSkuDialog();
			}
		},
		saveCartAmount(item, sku) {
			if (!this.hasLogin) {
				showLoginDialog();
				return;
			}
			let cart = {
				shopid: this.shopId,
				goods_id: item.id,
				sku_id: sku,
				checked: 1,
				appends: true,
				amount: 1
			};
			cloudMall("cart", "edit", cart, true).then(
				res => {
					console.log(res);
					this.$api.success(this.$t('index.added'));
					this.updateCartMap(cart);
				},
				err => {
					this.$api.msg(err.message);
				}
			);
		}
	}
}
