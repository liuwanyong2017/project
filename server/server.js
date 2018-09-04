console.log('haha')
var http = require('http')
var path = require('path')
var url = require('url')
var fs = require('fs')

var server = http.createServer(function(req,res){
   conmand(path.join(__dirname),req,res)
})  //文件路径
console.log('打开8080')
server.listen(8080)
function conmand(serverPath,req,res){
    console.log(serverPath,req.url)
    var urlObj = url.parse(req.url,true)
    console.log(urlObj) //pathname 是需要的。query是附带的那个。
    var filePath = urlObj.pathname
     
    if(urlObj.query.callback){
        var data =['hahah','你你好你','又有']
        res.setHeader('Content-Type','text/json;charset=utf-8 ')
        
        res.end(urlObj.query.callback + '('+JSON.stringify(data)+')')
    }else if(filePath === '/getWeather'){
            res.setHeader('Access-Control-Allow-Origin','http://127.0.0.1:8080')
           // res.writeHead('Content-Type','text/json;charset=utf-8')
            res.write(JSON.stringify(['哈哈',222]))
            res.end()
    }else{
        if(filePath === '/'){
            filePath = '/index.html'
        }//文件名
        filePath = path.join(serverPath,filePath)  //文件绝对路径
        console.log(filePath)
        fs.readFile(filePath,'binary',function(err,data){
            if(err){
                console.log(404)
                res.writeHead(404,'not found')
                res.end('<h1>404 not found</h1>')
            }else{
                console.log(200)
                res.writeHead(200,'ok')
                res.write(data,'binary')
                res.end()
            }
        })
    }
        
        
    
    

}
