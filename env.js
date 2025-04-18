// .env.js 文件
// 不同环境访问不同的路径
// import store from '@/common/store/index'
const ENV_API_URL = {
	development: 'http://192.168.1.192:807/', //开发环境
	production: 'http://api.7wpp.com/addons/shopro/', //生产环境
}
const ENV_BASE_URL = {
	development: 'http://192.168.1.192:807', //开发环境
	production: 'http://api.7wpp.com', //生产环境
}

export const BASE_URL = ENV_BASE_URL[process.env.NODE_ENV || 'development']; //后台根域名
export const API_URL = ENV_API_URL[process.env.NODE_ENV || 'development']; //后台接口域名
export const HAS_LIVE = false; //后台是否开通直播权限,根据情况在manifest.json中，开启注释相应组件的引入。
