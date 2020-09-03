/*
 * @Author: Tomallv
 * @Date: 2020-08-28
 * @LastEditors: Tomallv
 * @LastEditTime: 2020-09-03
 * @Description: mysql数据库通用操作方法
 */

const mysql = require('mysql');
const config = require("./config")

//创建MySQL数据库链接
function createConnection() {
    const connection_int = mysql.createConnection({
        host     : config.mysql_db.host,
        port     : config.mysql_db.port,
        user     : config.mysql_db.user,
        password : config.mysql_db.password,
        database : config.mysql_db.database,
        charset  : config.mysql_db.charset,
    });
    return connection_int;
}

//MySQL数据库查询操作
exports.QueryData = function(sql){
    const connection = createConnection()
    connection.connect()
    connection.query(sql,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
       console.log('--------------------------SELECT----------------------------');
       console.log(result);
       console.log('------------------------------------------------------------\n\n');  
});
    connection.end();
}

//MySQL数据库插入操作
exports.InsertData = function(sql,sqlParams){
    const connection = createConnection()
    connection.connect()
    connection.query(sql,sqlParams,function (err, result) {
        if(err){
         console.log('[INSERT ERROR] - ',err.message);
         return;
        }      
        console.log('--------------------------INSERT----------------------------');
        //console.log('INSERT ID:',result.insertId);        
        console.log('INSERT ID:',result);        
        console.log('-----------------------------------------------------------------\n\n');  
    });

    connection.end();
}

//MySQL数据库更新操作
exports.UpdateData = function(sql,sqlParams){
    const connection = createConnection()
    connection.connect()
    connection.query(sql,sqlParams,function (err, result) {
        if(err){
            console.log('[UPDATE ERROR] - ',err.message);
            return;
      }        
      console.log('--------------------------UPDATE----------------------------');
      console.log('UPDATE affectedRows',result.affectedRows);
      console.log('-----------------------------------------------------------------\n\n');
    });

    connection.end();
}