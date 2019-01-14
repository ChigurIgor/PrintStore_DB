const express = require("express");
const bodyParser= require("body-parser");
var qs = require('querystring');

const PORT = process.env.PORT || 5000;

const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://madcat:masterminde+1@ds251804.mlab.com:51804/printsotre";
const mongoClient = new MongoClient(url, { useNewUrlParser: true });
// создаем объект MongoClient и передаем ему строку подключения






const app=express();
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


app.post('/msgadd',(req,res)=>{
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

app.post('/itemadd',(req,res)=>{
    let descr="";
    let id="";
    let name="";
    let link ="";
    let price="";

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

        itemAdd(descr, id,name, link,price);
        res.end(JSON.stringify({ msg: "OK" }));
    });

});

app.post('/itemgetall',(req,res)=>{
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


function itemAdd(descr, id,name, link,price) {

    mongoClient.connect(async function (err, client) {
        const db = client.db("printsotre");

        const collection = db.collection("items");
        let msg = {descr: descr, id: id, name: name, link: link, price: price};
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
        var allProductsArray = db.collection("items").find().toArray();
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