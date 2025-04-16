const fs = require("fs")
//读取页面翻译的所有文件
const dirs = fs.readdirSync("./modules")
//读取基础语言，英文
const enUs = require('./modules/en');

// //前端能支持的语言
let langMap = dirs.reduce((pre, e) => {
	//排除备份文件
	if (e != "en.js" && e.indexOf(".js.") == -1) {
		const moduleName = e.replace(/^(.*)\.\w+$/, '$1')
		pre[moduleName] = require(`./modules/` + e);
	}
	return pre;
}, {})

console.log("开始生成locale翻译文件")
// //系统级暂时未翻译
const uniAppEn = require('./uniapp/uni-app.en');
const uniappDir = fs.readdirSync("./uniapp")
let appLangMap = uniappDir.reduce((pre, e) => {
	if (e != "uni-app.en.js" && e.indexOf(".js.") == -1) {
		const moduleName = e.replace(/^(.*)\.\w+$/, '$1')
		pre[moduleName] = require(`./uniapp/` + e);
	}
	return pre;
}, {})
// console.log(langMap)
//页面内容翻译
// import * as enUs from './en.js'
// import * as esAr from './es.js'
// import * as zhCn from './zh-Hans.js'

// //系统级别翻译，多级别方便阅读和书写，也可以加注释
// import uniAppEn from './uni-app.en.js'
// console.log(uniAppEn)

// //前端能支持的语言
// let langMap = {
// 	"zh-Hans": zhCn,
// 	es: esAr,
// }

// //系统级暂时未翻译
// let appLangMap = {
// 	es: {}
// }

// // //以英文为主要，写入到locale文件夹

function deepMerge(obj1, obj2) {
	let key;
	for (key in obj2) {
		// 如果target(也就是obj1[key])存在，且是对象的话再去调用deepMerge，否则就是obj1[key]里面没这个对象，需要与obj2[key]合并
		// 如果obj2[key]没有值或者值不是对象，此时直接替换obj1[key]
		obj1[key] =
			obj1[key] &&
			obj1[key].toString() === "[object Object]" && (obj2[key] && obj2[key].toString() ===
				"[object Object]") ?
			deepMerge(obj1[key], obj2[key]) : (obj1[key] = obj2[key]);
	}
	return obj1;
}

//多级对象转换成1级，pages.json中，不支持多级
function deepFormat(obj, prev = []) {
	let out = {}
	for (let key in obj) {
		let childPrevs = [...prev, key]
		if (obj[key] && obj[key].toString() === "[object Object]") {
			let child = deepFormat(obj[key], childPrevs);
			out = Object.assign(out, child)
		} else {
			out[childPrevs.join(".")] = obj[key];
		}
	}
	return out;
}


fs.writeFileSync("../../locale/en.json", JSON.stringify(deepFormat(enUs)))

//生成index文件
let indexPageArr = [
	`/**
 此文件为自动生成，请勿手动修改，
生成方法：
运行  node /common/lang/index.js
自动生成的好处：
1.根据英文词库，自动补充其他语言未翻译内容
2.兼容pages.json，转换多级对象为1级，
3.将来支持自动翻译成其他语言
*/`,
	`import en from './en.json'`
]
let perpObj = {}
Object.keys(langMap).map(key => {
	let data = {
		...enUs
	}
	fs.writeFileSync(`../../locale/${key}.json`, JSON.stringify(deepFormat(deepMerge(data, langMap[key]))));
	let key2 = key.replace(/\-/g, "_");
	indexPageArr.push(`import ${key2} from './${key}.json'`)
	perpObj[key] = key2;
})
//生成导出文件
indexPageArr.push(`export default {\n\ten,`)
Object.keys(perpObj).map(e => {
	indexPageArr.push(`\t"${e}": ${perpObj[e]},`)
})
indexPageArr.push(`}`)

// console.log(indexPageArr)
fs.writeFileSync(`../../locale/index.js`, indexPageArr.join("\n"))


console.log("开始处理系统翻译")
//////////////////////////
Object.keys(appLangMap).map(key => {
	let data = {
		...uniAppEn
	}
	deepMerge(data, appLangMap[key])
	//只转换指定级别的内容，common,ios,android
	let fields = ["common", "ios", "android", "web"]
	for (let k1 in data) {
		if (fields.indexOf(k1) != -1) {
			data[k1] = deepFormat(data[k1])
		}
	}
	fs.writeFileSync(`../../locale/uni-app.${key}.json`, JSON.stringify(data));
})
