/*引用模块*/
var express = require('express');
var app = express();
var url = require('url'); //url模块,对url格式的字符串进行解析，返回一个对象。根据不同的url进行处理，返回不同的数据。
var path = require('path');

var fs = require('fs');
var log = require('fs');
app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*'); //*表示可以跨域任何域名都行（包括直接存在本地的html文件）出于安全考虑最好只设置 你信任的来源也可以填域名表示只接受某个域名
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type'); //可以支持的消息首部列表
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS'); //可以支持的提交方式
    res.header('Content-Type', 'application/json;charset=utf-8'); //响应头中定义的类型
    next();
});
var data;
fs.readFile(path.join(__dirname, 'data.json'), 'utf8', function(err, data1) {
    if (err) {
        throw (err)
    };
    data = JSON.parse(data1)
});

app.get('/get', function(req, res) {
    var parseObj = url.parse(req.url, true); //对url进行解析 将第二个参数设置为true会将query属性生成为一个对象
    var queryObj = parseObj.query; //只获取参数的对象
    res.status(200);
    var name = queryObj.name; //将有必要转化的值进行转化
    var resData;

    for (var i = 0; i < data.length; i++) {
        if (data[i].ename == name) {
            console.log(name)
            resData = data[i];
            appLog(name)

            break
        }
    }
    res.json(resData); //返回一个对象数组
    //res.send();//一样的效果这个较为通用一些 不仅仅可以发送json
});

function appLog(name) {
    fs.readFile(path.join(__dirname, 'log.json'), 'utf8', function(err, data1) {
        if (err) {
            throw (err)
        };
        var data = data1;
        var index = 0;
        for (var i = 0; i < data.length; i++) {
            if (name == data[i]) {
                index++
            }
        }
        if (index == 0) {

            var obj = {
                'name': name
            };
            log.appendFile('log.json', JSON.stringify(obj), function(error) {
                if (error) return console.log("追加文件失败" + error.message);
                console.log("追加成功");
            })
        }

    });


}
var server = app.listen(3000, function() { //监听3000端口
    var port = server.address().port;
    console.log('Example app listening on port:%s', port);
});