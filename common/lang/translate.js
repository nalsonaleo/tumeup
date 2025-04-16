const requestPromise = require("request-promise")
const crypto = require("crypto")

/**
 * 翻译器
 */
function Translator() {
	this.data = {}
	this.config = {
		maxCount: 2,
		from: '',
		to: '',
		appKey: '',
		secretKey: '',
	}
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms))
}
/**
 * md5加密
 */
Translator.prototype.md5 = function md5(str) {
	var crypto_md5 = crypto.createHash("md5");
	crypto_md5.update(str);
	return crypto_md5.digest('hex');
}

/**
 * 生成[0,n]区间的随机整数
 * 比如生成[0,100]的闭区间随机整数，getRandomN(100)
 */
Translator.prototype.getRandomN = function getRandomN(roundTo) {
	return Math.round(Math.random() * roundTo);
}

/**
 * {a:'111',b:'222'} => a=111&b=222
 */
Translator.prototype.generateUrlParams = function generateUrlParams(_params) {
	const paramsData = [];
	for (const key in _params) {
		if (_params.hasOwnProperty(key)) {
			paramsData.push(key + '=' + _params[key]);
		}
	}
	const result = paramsData.join('&');
	return result;
}

/**
 * 进行翻译
 */
Translator.prototype.translate = async function(word) {
	let youdaoHost = 'http://openapi.youdao.com/api';
	// 在get请求中，中文需要进行uri编码
	let encodeURIWord = encodeURI(word);
	console.log("正在翻译：" + word, this.config.from, this.config.to)
	let wordKey = this.md5(encodeURIWord + "_" + this.config.to);
	//如果存在{{，则不翻译，影响效果
	if (word.indexOf("{") != -1) {
		console.error("存在变量，需要手动翻译", word)
		return word;
	}
	if (this.data[wordKey]) {
		//从内存中读取
		console.error("从内存读取", word)
		return this.data[wordKey];
	}
	// return "翻译后--" + word;
	//测试阶段限流
	if (this.maxCount && this.maxCount < Object.keys(this.data).length) {
		console.error("翻译限流，返回原文，请修改maxCount")
		return "限流:" + word;
	}
	// this.data[wordKey] = word;
	// // console.log("翻译后：", this.data)
	// return "翻译后--" + word;

	let salt = this.getRandomN(1000);
	let sign = this.md5(this.config.appKey + word + salt + this.config.secretKey);
	//繁体和简体特殊处理
	let zhongwen = {
		"zh-Hans": "zh-CHS",
		"zh-Hant": "zh-CHT",
	}

	let paramsJson = {
		q: encodeURIWord,
		from: zhongwen[this.config.from] ? zhongwen[this.config.from] : this.config.from,
		to: this.config.to,
		appKey: this.config.appKey,
		salt: salt,
		sign: sign
	}
	//限制请求速度
	await sleep(200)
	// let url = `http://openapi.youdao.com/api?q=${encodeURI(q)}&from=${from}&to=${to}&appKey=${appKey}&salt=${salt}&sign=${sign}`;
	let url = youdaoHost + '?' + this.generateUrlParams(paramsJson);
	let result = await requestPromise.get({
		url: url
	});
	result = JSON.parse(result)
	if (result.errorCode == "0") {
		this.data[wordKey] = result.translation[0];
		// console.log("翻译成功",this.data)
		return result.translation[0]
	}
	//翻译失败，返回原文
	return word;
}
module.exports = Translator;
