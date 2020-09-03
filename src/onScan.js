/*
 * @Author: Tomallv
 * @Date: 2020-08-27
 * @LastEditors: Tomallv
 * @LastEditTime: 2020-09-03
 * @Description: 机器人需要扫描二维码时监听
 */
const Qrterminal = require("qrcode-terminal");
const qrimage = require('qr-image')
const fs = require('fs')
const wechat_bot = require('./onEnterpriseWechatBot') // 企业微信机器人群发
const config = require("./config")
const path =require('path');
const defpath=path.join(__dirname,'../');
const qrcode_png_path = path.join(defpath,config.qrcode_png)
const weboot_key = config.webhook_key

module.exports = function onScan(qrcode, status) {
  Qrterminal.generate(qrcode, { small: true }) 
  const myDate = new Date()
  const current_hour = myDate.getHours();
  console.log("当前小时数： " + current_hour);
  console.log("状态码： " + status);
  // 设置早上8点到晚上24点之间才推送掉线二维码
  if (current_hour >= 8 && current_hour <=23) { 
    let link = ""
    if (status == 2){
      console.log("机器人已经下线，请重新扫描二维码登陆: " + qrcode);
      const temp_qrcode = qrimage.image(qrcode, {size :6, margin: 4}) // 生成机器人登陆二维码图片
      temp_qrcode.pipe(require('fs').createWriteStream(qrcode_png_path).on('finish', function() {
      console.log('write finished')}))
      link = '机器人掉线了，请点击如下链接查看登陆二维码:\n https://wechaty.js.org/qrcode/'+ qrcode
    } else if (status == 3) {
      link = "已扫码，请在手机端确认登陆..."
    } else if (status == 4) {
      link = "已确认,登陆成功！"
    } else if (status == 5) {
      link = "二维码已过期！"
    } else {
      link = '机器人掉线了，请点击如下链接查看登陆二维码:\n https://wechaty.js.org/qrcode/'+ qrcode
    }
    wechat_bot.send_text(link,weboot_key)
  }
}
