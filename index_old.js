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

    var nodemailer = require('nodemailer');

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'youremail@gmail.com',
            pass: 'yourpassword'
        }
    });

    var mailOptions = {
        from: 'youremail@gmail.com',
        to: 'myfriend@yahoo.com',
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}