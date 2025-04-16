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
//系统级别翻译
import uniAppEn from './uni-app.en.js'
console.log(uniAppEn)

//临时转换成多级
let outObj = {}
Object.keys(uniAppEn.common).map(key => {
	let obj = key.split(".").reverse().reduce((total, item) => {
		return {
			[item]: total
		};
	}, uniAppEn.common[key]);
	deepMerge(outObj, obj)
	return obj;
})
uniAppEn.common = outObj
// console.log(JSON.stringify(out))
fs.writeFileSync("../../locale/uni-app.en.js", JSON.stringify(uniAppEn))