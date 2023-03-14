var baseUrl = ""

console.log(process.env.NODE_ENV);
if(process.env.NODE_ENV === 'production'){
	/* 生产环境 */
	baseUrl = "http://7.lazygirlshop.com/"
}else{
	/* 开发环境 */
	baseUrl = "http://7.lazygirlshop.com/"
	// baseUrl = "http://192.168.1.192:807/"
}

export default {
  baseUrl
}