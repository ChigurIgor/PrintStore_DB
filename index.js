const express = require("express");
const bodyParser= require("body-parser");
var qs = require('querystring');
var mongo = require('mongodb');

const PORT = process.env.PORT || 5000;

const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://madcat:masterminde+1@ds251804.mlab.com:51804/printsotre";
const mongoClient = new MongoClient(url, { useNewUrlParser: true });
// создаем объект MongoClient и передаем ему строку подключения






var app=express();
// app.use(cors());
// let server = require('http').Server(app);

// app.use(bodyParser.json());

const products=[
    {
        id:1,
        name:'phone',
        price:100
    },
    {
        id:2,
        name:'phone2',
        price:200
    },
    {
        id:3,
        name:'phone3',
        price:300
    },
    {
        id:4,
        name:'phone4',
        price:400
    }
];


app.get('/',(req,res)=>res.send("Hi4"));
app.get('/products',(req,res)=>res.json(products));
app.post('/products',(req,res)=>{
    products.push(req.body);
    res.json(req.body);
});
app.put("/products/:id",(req,res)=>{
   const product=products.find(p=>p.id=== +req.params.id);
   const productIndex= products.indexOf(product);
   const newProduct={...product,...req.body};
   products[productIndex]=newProduct;

    addItem(11,"nameph",200);
   res.json({sucsess: true});
});

app.delete("/products/:id",(req,res)=>{
    const product=products.find(p=>p.id=== +req.params.id);
    const productIndex= products.indexOf(product);
    products.splice(productIndex,1);
    res.json({sucsess: true});
});


app.listen(process.env.PORT || 5000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

// app.use(express.bodyParser());
app.use(bodyParser.json());
// -------------------------------------------------------- msgs --------------------------------------------------------------------------

app.post('/msgadd',(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    let email="";
    let name="";
    let phone ="";
    let msgtxt="";
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString(); // convert Buffer to string
    });
    req.on('end', () => {
        var post = qs.parse(body);

        console.log(body);
        email=post.email;
        name=post.name;
        phone=post.phone;
        msgtxt=post.msgtxt;
        msgAdd(email, msgtxt,name, phone);
        res.end(JSON.stringify({ msg: "OK" }));
    });

});

app.post('/msggetall',(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    let id="";

    let body = '';
    req.on('data', chunk => {
        body += chunk.toString(); // convert Buffer to string
    });
    req.on('end', () => {
        var post = qs.parse(body);

        console.log(body);
        id=post.id;

        msgGetAll(id,res);
    });

});

function msgAdd(email, msgtxt, name, phone) {

    mongoClient.connect(async function (err, client) {
        const db = client.db("printsotre");

        const collection = db.collection("msgs");
        let msg = {email: email, msgtxt: msgtxt, name: name, phone: phone};
        try {
            await collection.insertOne(msg, function (err, result) {

                if (err) {
                    return console.log(err);
                }
                console.log(result.ops);

            });
        } finally {
            if (db) db.close();
            console.log("db.close()");

        }
    });







}

function msgGetAll(id,res){

    mongoClient.connect(async function (err, client) {
        const db = client.db("printsotre");
        var answer = "0";
        var allProductsArray = db.collection("msgs").find().toArray();
        try {


            await db.collection("msgs").find().toArray(function (err, documents) {
                console.log(documents);

                res.end(JSON.stringify(documents));


            });
        } finally {
            if (db) db.close();
            console.log("db.close()");

        }

    });
}

// -------------------------------------------------------- items --------------------------------------------------------------------------

app.post('/itemadd',(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    let descr="";
    let id="";
    let name="";
    let link ="";
    let price="";
    let cat="";

        let body = '';
    req.on('data', chunk => {
        body += chunk.toString(); // convert Buffer to string
    });
    req.on('end', () => {
        var post = qs.parse(body);

        console.log(body);
        descr=post.descr;
        id=post.id;
        name=post.name;
        link=post.link;
        price=post.price;
        cat=post.cat;
        itemAdd(cat,descr, id,name, link,price);
        res.end(JSON.stringify({ msg: "OK" }));
    });

});

app.post('/itemgetall',(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");



    let id="";

    let body = '';
    req.on('data', chunk => {
        body += chunk.toString(); // convert Buffer to string
    });
    req.on('end', () => {
        var post = qs.parse(body);

        console.log(body);
        id=post.id;

        itemGetAll(id,res);
    });

});

app.post('/itemgetbyid',(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    let id="";

    let body = '';
    req.on('data', chunk => {
        body += chunk.toString(); // convert Buffer to string
    });
    req.on('end', () => {
        var post = qs.parse(body);

        console.log(body);
        id=post.id;

        itemGetById(id,res);
    });

});
app.post('/itemgetbycat',(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    let cat="";

    let body = '';
    req.on('data', chunk => {
        body += chunk.toString(); // convert Buffer to string
    });
    req.on('end', () => {
        var post = qs.parse(body);

        console.log(body);
        cat=post.cat;

        itemGetByCat(cat,res);
    });

});

function itemAdd(cat,descr, id,name, link,price) {

    mongoClient.connect(async function (err, client) {
        const db = client.db("printsotre");

        const collection = db.collection("items");
        let msg = {cat: cat, descr: descr, id: id, name: name, link: link, price: price};
        try {
            await collection.insertOne(msg, function (err, result) {

                if (err) {
                    return console.log(err);
                }
                console.log(result.ops);

            });
        } finally {
            if (db) db.close();
            console.log("db.close()");

        }
    });







}

function itemGetAll(id,res){

    mongoClient.connect(async function (err, client) {
        const db = client.db("printsotre");
        var answer = "0";
        try {


            await db.collection("items").find().toArray(function (err, documents) {
                console.log(documents);

                res.end(JSON.stringify(documents));


            });
        } finally {
            if (db) db.close();
            console.log("db.close()");

        }

    });
}

function itemGetById(id,res){

    mongoClient.connect(async function (err, client) {
        const db = client.db("printsotre");
        var answer = "0";
        // var allProductsArray = db.collection("items").find().toArray();
        try {
            let o_id = new mongo.ObjectID(id);


            await db.collection("items").find({ "_id" : o_id }).toArray(function (err, documents) {
                console.log(documents);

                res.end(JSON.stringify(documents));


            });
        } finally {
            if (db) db.close();
            console.log("db.close()");

        }

    });
}

function itemGetByCat(cat,res){

    mongoClient.connect(async function (err, client) {
        const db = client.db("printsotre");
        var answer = "0";
        // var allProductsArray = db.collection("items").find().toArray();
        try {


            await db.collection("items").find({ cat : cat }).toArray(function (err, documents) {
                console.log(documents);

                res.end(JSON.stringify(documents));


            });
        } finally {
            if (db) db.close();
            console.log("db.close()");

        }

    });
}

// -------------------------------------------------------- orders --------------------------------------------------------------------------

app.post('/orderadd',(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    let address="";
    let date="";
    let time="";
    let email="";
    let name="";
    let phone ="";
    let msgtxt="";
    let cart="";
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString(); // convert Buffer to string
    });
    req.on('end', () => {
        var post = qs.parse(body);

        console.log(body);
        address=post.address;
        date=post.date;
        time=post.time;
        email=post.email;
        name=post.name;
        phone=post.phone;
        msgtxt=post.msgtxt;
        cart=post.cart;
        orderAdd(address,date,time,email, name,phone,msgtxt,cart );
        res.end(JSON.stringify({ msg: "OK" }));
    });

});

app.post('/ordergetall',(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    let id="";

    let body = '';
    req.on('data', chunk => {
        body += chunk.toString(); // convert Buffer to string
    });
    req.on('end', () => {
        var post = qs.parse(body);

        console.log(body);
        id=post.id;

        orederGetAll(id,res);
    });

});

app.post('/ordergetbyid',(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    let id="";

    let body = '';
    req.on('data', chunk => {
        body += chunk.toString(); // convert Buffer to string
    });
    req.on('end', () => {
        var post = qs.parse(body);

        console.log(body);
        id=post.id;

        orederGetById(id,res);
    });

});


function orderAdd(address,date,time,email, name,phone,msgtxt,cart) {
      arrObj = {};
     arrObj = JSON.parse(cart);
    console.log(arrObj);
    console.log("0: "+arrObj[0]);
    console.log("1: "+JSON.parse(arrObj[1]));

    console.log();



    mongoClient.connect(async function (err, client) {
        const db = client.db("printsotre");

        const collection = db.collection("orders");
        let msg = {address: address, date: date, time: time, email: email, name: name, phone: phone, msgtxt: msgtxt, cart: cart};
        try {
            await collection.insertOne(msg, function (err, result) {

                if (err) {
                    return console.log(err);
                }
                console.log(result.ops);

            });
        } finally {
            // sendEmail(address,date,time,email, name,phone,msgtxt,cart);
            if (db) db.close();
            console.log("db.close()");

        }
    });







}

function orederGetAll(id,res){

    mongoClient.connect(async function (err, client) {
        const db = client.db("printsotre");
        var answer = "0";
        try {


            await db.collection("orders").find().toArray(function (err, documents) {
                console.log(documents);

                res.end(JSON.stringify(documents));


            });
        } finally {
            if (db) db.close();
            console.log("db.close()");

        }

    });
}

function orederGetById(id,res){

    mongoClient.connect(async function (err, client) {
        const db = client.db("printsotre");
        var answer = "0";
        // var allProductsArray = db.collection("items").find().toArray();
        try {
            let o_id = new mongo.ObjectID(id);

            await db.collection("orders").find({"_id": o_id}).toArray(function (err, documents) {
                console.log(documents);

                res.end(JSON.stringify(documents));


            });
        } finally {
            if (db) db.close();
            console.log("db.close()");

        }

    });
}


function sendEmail(address,date,time,email, name,phone,msgtxt,cart) {
console.log("SendEmail");
    var nodemailer = require('nodemailer');

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: '3dprint.str@gmail.com',
            pass: 'mandarin+1'
        }
    });
    // var arr=JSON.parse(cart);
    // console.log("cart: "+arr);

var myhtml=
    '<h1>Welcome</h1>' +
    '<p>'+address+'</p>'+
    '<p>'+date+'</p>'+
    '<p>'+time+'</p>'+
    '<p>'+email+'</p>'+
    '<p>'+name+'</p>'+
    '<p>'+phone+'</p>'+
    '<p>'+msgtxt+'</p>'+
    '<p>'+cart+'</p>'
;

    var mailOptions = {
        from: '3dprint.str@gmail.com',
        to: '3dprint.str@gmail.com',
        subject: 'New order from store!',
        text: 'New order from store!',
        html: myhtml

    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log('Email sent error: '+error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

