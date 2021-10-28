const express = require('express')
const { MongoClient } = require('mongodb');


const app = express(); 
const port = process.env.port ||5000


const cors= require('cors')
require('dotenv').config()

app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.m1cep.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

app.get('/user',(req,res)=>{
    res.send("I am server")
})

app.listen(port,()=>{
    console.log("listening port",port)
})






