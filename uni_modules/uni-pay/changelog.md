## 1.0.24（2021-09-23）
- 新增 微信外部浏览器支付（H5支付）
## 1.0.23（2021-09-22）
- 修复微信支付部分值被转化为NaN导致无法直接入库的错误
## 1.0.22（2021-08-26）
- 修复 支付宝用户未支付状态下查询订单状态（orderQuery）报错的Bug
## 1.0.21（2021-08-19）
- 修复1.0.18版本引出的微信退款通知验签失败的bug
## 1.0.20（2021-08-04）
- 修复1.0.19版本引出的微信支付签名错误问题
## 1.0.19（2021-08-03）
- 修复timeStamp大小写导致的微信公众号支付失败
## 1.0.18（2021-07-16）
- 通知类型不匹配时返回校验未通过
## 1.0.17（2021-07-16）
- 新增 支付宝退款通知回调 [详情](https://uniapp.dcloud.io/uniCloud/unipay?id=verify-refund-notify)
- 新增 判断通知类型接口 [详情](https://uniapp.dcloud.io/uniCloud/unipay?id=check-notify-type)
## 1.0.16（2021-07-14）
- 修复APP微信支付报签名错误的Bug
## 1.0.15（2021-07-13）
- 修复1.0.14版本引出的微信支付使用pfx时报错的Bug
## 1.0.14（2021-07-12）
- 支持使用微信子商户号，[详情](https://uniapp.dcloud.net.cn/uniCloud/unipay?id=init)，感谢[studytime](https://gitee.com/studytime)
- 修复支付宝支付传入encode后的passbackParams参数导致验签无法通过的Bug
## 1.0.13（2021-03-25）
- 修复 微信退款通知解析报错的Bug
## 1.0.12（2021-02-03）
- 调整为uni_modules目录规范
