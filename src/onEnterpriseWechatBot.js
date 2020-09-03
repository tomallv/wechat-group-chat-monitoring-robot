/*
 * @Author: Tomallv
 * @Date: 2020-08-27
 * @LastEditors: Tomallv
 * @LastEditTime: 2020-09-03
 * @Description: 企业微信群消息发送方法
 */

const http = require('http');
const readfilesync = require('./onFileIO')
const crypto = require('crypto');

// 发送图片信息
exports.send_image = function(path,webhook_key){
    let post_option = {
        host: 'qyapi.weixin.qq.com',
        path: '/cgi-bin/webhook/send?key=' + webhook_key,
        method: 'post',
        headers:{'Content-Type': 'application/json'}
    }

    let file_data = readfilesync.ReadFileSync(path)
    let file_date_base64 = Buffer.from(file_data).toString('base64')
    let md5 = crypto.createHash('md5');
    md5.update(file_data);
    file_date_md5 = md5.digest('hex');
    let post_data = {
        "msgtype": "image",
        "image": {
                 "base64": file_date_base64,
                 "md5": file_date_md5
                }
        };
    var post_req = https.request(post_option, function(res){
        res.on('data', function(buffer){
            console.log(buffer.toString());
            });
    });
    console.log(path,webhook_key)
    console.log(post_option)
    console.log(file_data)
    console.log(post_data)
    post_req.write(JSON.stringify(post_data));
    post_req.end()
}

// 发送文字信息
exports.send_text = function(content,webhook_key){
    let post_option = {
        host: 'qyapi.weixin.qq.com',
        path: '/cgi-bin/webhook/send?key=' + webhook_key,
        method: 'post',
        headers:{'Content-Type': 'application/json'}
    };

    let post_data = {
        "msgtype": "text",
        "text": {
                 "content": content
                }
        };
    var post_req = https.request(post_option, function(res){
        res.on('data', function(buffer){
            console.log(buffer.toString());
            });
    });
    post_req.write(JSON.stringify(post_data));
    post_req.end()
}