# wechat-group-chat-monitoring-robot

[![Powered by Wechaty](https://camo.githubusercontent.com/8ba82dd76414df7d7cfd7378d81276fe24531893/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f506f776572656425323042792d576563686174792d677265656e2e737667)](https://github.com/chatie/wechaty) [![Wechaty开源激励计划](https://camo.githubusercontent.com/9440ae06c9f96e91ddedb5cc05c8300976a83408/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f576563686174792d2545352542432538302545362542412539302545362542462538302545352538412542312545382541452541312545352538382539322d677265656e2e737667)](https://github.com/juzibot/Welcome/wiki/Everything-about-Wechaty)

#### 功能

- 自动聊天：群聊中通过 @[机器人]xxx, 机器人回复问题反馈模版信息 （已完成）
- 加入群聊自动欢迎：当新的小伙伴加入群聊后自动 @[新的小伙伴] 发一个文字欢迎 （已完成）
- 推送机器人登陆二维码到企业微信：机器人掉线后，自动将二维码信息推送给指定企业微信群（已完成）
- 监控群聊信息：实时将聊天记录入库 （已完成）
- 自动识别问题反馈信息：自动识别判断群聊中问题反馈类信息，并收纳入问题库 （开发中）
- 群播报功：每天下班前播报问题收纳和未关闭问题情况 （未开始）

#### 结构

```
|-- src/
|---- index.js	                 # 入口文件
|---- config.js                  # 配置文件
|---- onScan.js	                 # 机器人需要扫描二维码时监听回调
|---- onRoomJoin.js 	           # 进入房间监听回调
|---- onMessage.js	             # 消息监听回调
|---- onFriendShip.js	           # 好友添加监听回调
|---- onDatabaseOperation.js     # MySQL数据库操作回调
|---- onEnterpriseWechatBot.js   # 企业微信群消息发送回调
|---- onFileIO.js                # 文件读取回调
|-- package.json
```

#### 