/**
 * 英文做了新的翻译，这里需要同步更新到其他语言
 */
const fs = require("fs")
const dirs = fs.readdirSync("./modules")
//这里面包含了英文
let langMap = dirs.reduce((pre, e) => {
	//排除备份文件
	if (e.indexOf(".js.") == -1) {
		const moduleName = e.replace(/^(.*)\.\w+$/, '$1')
		//require会缓存内容，上边已经修改了，这里再使用，就变成了新的语言内容了
		pre[moduleName] = require(`./modules/` + e);
	}
	return pre;
}, {})
let enUs = langMap.en;
delete langMap.en;


const trans = require('./translate.js')

let translator = new trans();
translator.config = require("./config")
console.log("translator.config", translator.config)
//递归翻译每一个对象
async function translateObject(obj, old) {
	// let resultStr = await translator.translate(str)
	// console.log(resultStr);
	if (!obj) {
		return
	}
	if (obj.toString() === "[object Object]") {
		//便利keys
		let keys = Object.keys(obj)
		for (let i = 0; i < keys.length; i++) {
			let key = keys[i]
			obj[key] = await translateObject(obj[key], old && old[key] ? old[key] : null)
		}
		return obj;
	} else if (old) {
		//已翻译过
		// console.info("已翻译" + obj)
		return old;
	} else {
		//新增翻译
		console.log("新增翻译" + obj)
		return translator.translate(obj)
	}
}
//翻译整个文件
async function translateFile(baseData, name, prev) {
	let keys = Object.keys(baseData);
	//读取旧配置
	let oldData = langMap[name]
	translator.config.to = name;
	let resultData = []
	for (let i = 0; i < keys.length; i++) {
		let key = keys[i]
		let result = await translateObject(baseData[key], oldData[key])
		resultData.push(`module.exports.${key}=` + JSON.stringify(result))
	}
	fs.writeFileSync(`${prev}${name}.js`, resultData.join("\n"))
	console.log("一次写入新文件")
};



///循环其他语言
let others = Object.keys(langMap);
(async () => {
	console.log("开始更新翻译")
	for (let i = 0; i < others.length; i++) {
		let lang = others[i]
		let newData = {
			...enUs
		}
		await translateFile(newData, lang, "./modules/");
	}
})()
