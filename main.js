import Vue from 'vue'
import App from './App'
import api from '@/api'
import tool from '@/tool/tool'
import cuCustom from '@/static/colorui/components/cu-custom.vue'
// import router from '@/common/router'
// import '@/js_sdk/ican-H5Api/ican-H5Api'
import global from './api/global.js'
import config from './config'
import store from './store'
import messages from './locale/index'
import VueI18n from 'vue-i18n';
import uView from "uview-ui";
Vue.use(uView);
Vue.use(VueI18n)
let i18nConfig = {
	locale: uni.getLocale(),
	messages
}
console.log(i18nConfig)
const i18n = new VueI18n(i18nConfig)
Vue.config.productionTip = false

import {
	msg,
	success,
	loading,
	debounce,
	throttle,
	checkStr,
	prePage,
} from '@/common/common.js'

import mixin from './common/mixin/mixin'
Vue.mixin(mixin)
Vue.prototype.$config = config;
Vue.prototype.$fire = new Vue();
Vue.prototype.$store = store;
Vue.prototype.$api = {
	msg,
	success,
	debounce,
	throttle,
	loading,
	checkStr,
	prePage
};
import filter from '@/common/filter'
Vue.component('cu-custom', cuCustom);
Vue.prototype.$api = api
Vue.prototype.$msg = tool.msg
Vue.prototype.global = global
// import {
// 	RouterMount
// } from 'uni-simple-router'
App.mpType = 'app'

const app = new Vue({
		i18n,
    ...App
})
// RouterMount(app, '#app');
app.$mount()
