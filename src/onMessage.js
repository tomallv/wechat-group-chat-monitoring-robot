/*
 * @Author: Tomallv
 * @Date: 2020-08-27
 * @LastEditors: Tomallv
 * @LastEditTime: 2020-09-03
 * @Description: 消息监听回调
 */
const { Message } = require("wechaty")  
const config = require("./config")      // 配置文件
const name = config.name                // 机器人名字
const mysqldb = require("./onDatabaseOperation")   // 连接MySQL数据库

// 消息监听回调
module.exports = bot => {
  return async function onMessage(msg) {
    // 判断消息来自自己，直接return
    if (msg.self()) return

    console.log("=============================")
    console.log(`msg : ${msg}`)
    console.log(`from: ${msg.from() ? msg.from().name() : null}: ${msg.from() ? msg.from().id : null} `)
    console.log(`to: ${msg.to()}`)
    console.log(`send_time: ${msg.date()}`)
    console.log(`text: ${msg.text()} `)
    console.log(`isRoom: ${msg.room()} : ${msg.room() ? msg.room().id : null}`)
    console.log("=============================")

    // 判断此消息类型是否为群消息
    if (msg.room()) {
      const room = await msg.room() // 获取群聊
      // console.log(room)
      const room_name = `${room} `  // 获取群名称
      console.log(`群名称：` + room_name.substring(5,room_name.length-2))
      const room_id = room.id  // 获取群ID
      console.log(`群id ：` + room_id)

      let sender_alias = await room.alias(msg.from())  //获取发信人群昵称
      console.log(`发信人的群昵称：` + sender_alias)
      if (sender_alias == null){
        sender_alias = ""
      } 
      console.log(`发信人的群昵称：` + sender_alias)
      const sender_name = msg.from().name() //获取发信人微信名称
      console.log(`发信人的微信名称：` + sender_name)
      const msg_date = msg.date() // 获取消息发送时间
      console.log(`消息发送时间: ${msg.date()}`)
      const msg_type = msg.type() // 获取消息类型
      console.log(`消息类型：` + msg_type)
      var msg_content = ""  // 获取消息内容
      if (msg_type == Message.Type.Text || msg_type == Message.Type.Url){
        msg_content = msg.text()
      } else if (msg_type == Message.Type.Attachment){
        msg_content = "消息内容类型为附件"
      } else if (msg_type == Message.Type.Audio){
        msg_content = "消息内容类型为音频"
      } else if (msg_type == Message.Type.Contact){
        msg_content = "消息内容类型为联系人"
      } else if (msg_type == Message.Type.Emoticon){
        msg_content = "消息内容类型为表情包"
      } else if (msg_type == Message.Type.Image){
        msg_content = "消息内容类型为图片"
      } else if (msg_type == Message.Type.Video){
        msg_content = "消息内容类型为视频"
      } else {
        msg_content = "消息内容类型为未知"
      }
      console.log(`消息内容：` + msg_content)

      // 消息入库sql
      var sql = "insert into wechat_room_chat_record\
      (id,room_name,room_id,sender_name,sender_alias,msg_content,msg_type,issue_flag,msg_date)\
       values(?,?,?,?,?,?,?,?,?)"
      
      // 入库sql消息变量
      var sqlParams = [process.hrtime.bigint(),room_name.substring(5,room_name.length-2),
                       room_id,sender_name,sender_alias,msg_content,msg_type,0,msg_date]

      mysqldb.InsertData(sql,sqlParams)

      console.log(`入库时间戳：` + process.hrtime.bigint())

      // 收到消息，提到自己
      if (await msg.mentionSelf()) {
        // 获取提到自己的名字
        let self = await msg.to()
        self_format = "@" + self.name()

        const self_name = self.name() //获取机器人自己的微信名称
        console.log("自己的微信名称：" + self_name)
        const self_alias = await room.alias(msg.to())  //获取机器人自己的群昵称
        console.log("自己的群昵称：" + self_alias)

        // 获取消息内容，拿到整个消息文本，去掉 @+名字
        let sendText = msg.text().replace(self_format, "").substring(1,)

        // 规定回复问题反馈模版
        var report_template = "如您需要反馈问题，请按照如下模版进行拷贝填写，谢谢：\n问题反馈\n[1-问题描述]:\n[2-截图信息]:\n[3-账号信息]: \n[4-操作系统]:\n[5-浏览器]:\n[6-屏幕分辨率]:\n[7-移动设备型号(APP、小程序相关问题)]:\n[8-App、小程序版本信息(APP、小程序相关问题)]:\n[9-模块信息]: A-官网前台、B-小程序、C-APP、D-句芒后台、D-学习中心、F-CRM、G-H5网页、H-老后台、I-其他"

        console.log("自动回复内容：" + report_template)

        // 返回消息，并@来自人
        var Datetemp1= new Date();

        room.say(report_template, msg.from())

        const sql = "insert into wechat_room_chat_record\
        (id,room_name,room_id,sender_name,sender_alias,msg_content,msg_type,issue_flag,msg_date)\
        values(?,?,?,?,?,?,?,?,?)"
        
        const sqlParams = [process.hrtime.bigint(),room_name.substring(5,room_name.length-2),
        room_id,self_name,self_alias,report_template,Message.Type.Text,0,Datetemp1]
        
        mysqldb.InsertData(sql,sqlParams)

        return
      } 
    } else{
      // 非群聊不做任何处理
      return
    }
  }}
