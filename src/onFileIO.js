/*
 * @Author: Tomallv
 * @Date: 2020-08-27
 * @LastEditors: Tomallv
 * @LastEditTime: 2020-09-03
 * @Description: 文件读取回调
 */

const fs = require("fs");

//同步读取文件
exports.ReadFileSync = function(path){
    const data = fs.readFileSync(path);
    console.log(data)
    console.log("文件读取完毕!");
    return data;
} 

//异步读取文件
exports.ReadFileAsync = function(path){
    fs.readFile(path,function(err,data){
        if(err){
            console.log("文件读取时出现错误: " + err);
        }else{
            console.log("文件读取完毕!");
            return data
        }
    });
}