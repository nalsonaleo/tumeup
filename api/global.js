var baseUrl = ""

console.log(process.env.NODE_ENV);
if(process.env.NODE_ENV === 'production'){
	/* 生产环境 */
	baseUrl = "https://sevenupshop.com/"
	// baseUrl = "http://192.168.0.94:7079/"
}else{
	/* 开发环境 */
	baseUrl = "https://sevenupshop.com/"
	// baseUrl = "http://192.168.0.94:7079/"
}

export default {
  baseUrl
}