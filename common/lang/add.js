/**
 * 根据英文版本，翻译为其他语言
 * 从英文翻译为中文，执行命令：
 * node add.js zh-Hans Chinese
 */
const {
	exit
} = require("process")
const path = require("path")
let args = process.argv.splice(2)
//语言代码例如：es
let newLanguage = args[0]
//语言的英文名字，例如：Spanish
let languageName = args[1]
//此举动会更新以往语言的locale值，增加一个新语言，并翻译为对应的语言
if (!newLanguage || !languageName) {
	console.log("参数不足 node add.js 语言简称 语言英文全称")
	exit()
}

console.log(args)
// import fs from 'fs';
const fs = require("fs")
const enUs = require('./modules/en.js')
const uniEnUs = require('./uniapp/uni-app.en.js')

// //判断文件是否已经存在，
// if (fs.existsSync(`./modules/${newLanguage}.js`) && !isReplace) {
// 	console.log(`./modules/${newLanguage}.js` + "，文件已存在，请删除后再执行")
// 	exit()
// }
// if (isReplace) {
// 	// fs.writeFileSync(`./modules/${newLanguage}.js`)
// 	// fs.writeFileSync(`./uniapp/uni-app.${newLanguage}.js`)
// 	// console.log("删除翻译")
// 	//读取旧翻译，增量翻译
// }

const trans = require('./translate.js')

let translator = new trans();

translator.config = require("./config")
//转换后的语言简称
translator.config.to = newLanguage;
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
	} else if (old && obj != old) {
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
	let oldData = {}
	let oldExists = false;
	if (fs.existsSync(`${prev}${name}.js`)) {
		console.log("读取内容", `${prev}${name}.js`)
		try {
			oldData = require(`${prev}${name}.js`)
		} catch (e) {
			//TODO handle the exception
			console.log(e)
		}
		oldExists = true;
	}

	for (let i = 0; i < keys.length; i++) {
		let key = keys[i]
		let result = await translateObject(baseData[key], oldData[key])
		// console.log(result)
		//appendFileSync
		fs.appendFileSync(`${prev}${name}.tmp.js`, `module.exports.${key}=` + JSON.stringify(result) + "\n")
	}
	//临时文件覆盖主文件，备份源文件
	if (oldExists) {
		fs.renameSync(`${prev}${name}.js`, `${prev}${name}.js.${Date.now()}`)
		console.log("备份旧文件完成")
	}
	fs.renameSync(`${prev}${name}.tmp.js`, `${prev}${name}.js`)
	console.log("写入新文件")
};
(async () => {
	console.log("开始翻译")
	let newData = {
		...enUs
	}
	newData.locale[newLanguage] = languageName;
	await translateFile(newData, newLanguage, "./modules/");
	await translateFile(uniEnUs, newLanguage, "./uniapp/uni-app.")
	console.log("翻译新语言完成")
	//同时修改英文翻译
	//其他语言增加次语言类型，并翻译
	let out = {}
	const dirs = fs.readdirSync("./modules")
	let langMap = dirs.reduce((pre, e) => {
		//排除备份文件
		if (e != newLanguage + ".js" && e.indexOf(".js.") == -1) {
			const moduleName = e.replace(/^(.*)\.\w+$/, '$1')
			//require会缓存内容，上边已经修改了，这里再使用，就变成了新的语言内容了
			pre[moduleName] = require(`./modules/` + e);
			out[moduleName] = moduleName;
		}
		return pre;
	}, {})

	//修改locale
	let others = Object.keys(langMap);
	console.log("others ", others)
	for (let i = 0; i < others.length; i++) {
		let name = others[i]
		console.log("开始处理===>", name)
		// zh-CHS(中文) || ja(日语) || EN(英文) || fr(法语) ...
		translator.config.to = name;
		if (name != "en") {
			//其他语言需要翻译成本国语言
			langMap[name].locale[newLanguage] = await translator.translate(languageName)
		} else {
			//英文不需要翻译
			langMap[name].locale[newLanguage] = languageName;
		}
		//写入到文件
		// fs.unlinkSync(`./modules/${key}.js`)
		let result2 = []
		//此语言下的板块
		let langKeys = Object.keys(langMap[name])
		for (let j = 0; j < langKeys.length; j++) {
			let model = langKeys[j];
			console.log("开始处理板块===>", name, model)
			result2.push(`module.exports.${model}=` + JSON.stringify(langMap[name][model]))
			// fs.appendFileSync(`./modules/${key}.js`, `module.exports.${j}=` + JSON.stringify(result) + "\n")
		}
		fs.writeFileSync(`./modules/${name}.js`, result2.join("\n"))
		// console.log(result.join("\n"))
		console.log(`更新${name}语言完成,./modules/${name}.js`)
	}
	out[newLanguage] = newLanguage
	//更新/locale/locales.js
	fs.writeFileSync(path.resolve("../../locale/locales.js"), `/**此文件自动生成**/\nexport default ` + JSON.stringify(
		out))
})()
