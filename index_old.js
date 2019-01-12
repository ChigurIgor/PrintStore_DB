const http=require('http');
var url = require('url');
const PORT = process.env.PORT || 5000;

http.createServer((req,res)=>{
    console.log(req.url);
    console.log(req.method);
    console.log(req.headers);
    var q = url.parse(req.url, true).query;
    var txt = q.year + " " + q.month;
    if(q.year =="1"){
        sendEmail();
        res.end("Email sent");

    }
    else{res.writeHead(200,{"Content-Type":"text/html"});
        // res.end('<!doctype><html><head><meta charset="utf-8"><title>Osnovy Node.JS</title></head><body><h1>Osnovy node js</h1></body></html>');
        res.end(txt);
    }


}).listen(PORT,()=>console.log("server rabotaet"));

function sendEmail() {


}