/*
 * @Author: Tomallv
 * @Date: 2020-08-26
 * @LastEditors: Tomallv
 * @LastEditTime: 2020-09-03
 * @Description: 配置项
 */

module.exports = {
  // puppet_padplus Token
  token: "xxxxxxxxxx",
  // 机器人名字
  name: "xxxxxxxxxx",
  // 房间/群聊
  room: {
    // 加入房间回复
    roomJoinReply: `\n您好，欢迎您的加入，请自觉遵守群规则，文明交流！ 😊\n\n如您需要反馈问题，请按照如下模版进行拷贝填写，谢谢：\n问题反馈\n[1-问题描述]:\n[2-截图信息]:\n[3-账号信息]: \n[4-操作系统]:\n[5-浏览器]:\n[6-屏幕分辨率]:\n[7-移动设备型号(APP、小程序相关问题)]:\n[8-App、小程序版本信息(APP、小程序相关问题)]:\n[9-模块信息]: A-官网前台、B-小程序、C-APP、D-句芒后台、D-学习中心、F-CRM、G-H5网页、H-老后台、I-其他`
  },
  // 私人
  personal: {
    // 好友验证自动通过关键字
    addFriendKeywords: ["xxxxxx", "xxxxxxx"],
    // 是否开启加群
    addRoom: false
  },
  // mysql数据库配置信息
  mysql_db: {
    host: 'xxx.xxx.xxx.xxxx',
    port: '3306',
    user: 'xxxxxxxxxx',
    password: 'xxxxxxx',
    database: 'xxxxxxx',
    charset : 'xxxxxxx'
  },
  // 要推送机器人二维码登陆信息的切页微信群webhook_key
  webhook_key: "xxxxxxxxxxxxxxxxxxxxxxxxxxx",

  // 机器人登陆二维码图片文件名称
  qrcode_png: "xxxxxxx.png"
}
