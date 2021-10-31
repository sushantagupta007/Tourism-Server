const express = require('express')
const { MongoClient } = require('mongodb');


const app = express(); 
const port = process.env.PORT ||5000


const cors= require('cors')
require('dotenv').config()


app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.m1cep.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

console.log(uri)
async function run() {
  try{
    await client.connect();
    const database = client.db("Travel-Agent");
    const dataTable = database.collection("Services")
    const clientTable = database.collection("Client Feedback")
    const orderTable = database.collection("Order Table")

    //Table Find
   

    app.get('/Services',async(req,res)=>{
        const myDoc = await dataTable.find({});
        const result = await myDoc.toArray(); 
        res.send(result)
        console.log(result)

    })

    app.get('/Client',async(req,res)=>{
      const client = await clientTable.find({});

      const clientresult = await client.toArray(); 
      res.send(clientresult)
    })

    app.post('/Manageorder',async(req,res)=>{
      const postData= req.body 
      const result = await orderTable.insertOne(postData);
      console.log(result)
      res.json(result)
      
    })

  app.get('/Manageorder',async(req,res)=>{
        const myOrder = await orderTable.find({});  
        const result = await myOrder.toArray(); 
        res.send(result)
  })


app.delete('/Manageorder',async(req,res)=>{
  console.log(req.query)
})

  }
  finally{}
}


run().catch()



app.get('/user',(req,res)=>{
    res.send("I am server")
})


app.get('/',(req,res)=>{
  res.send("renning")
  console.log("running server")
})
app.listen(port,()=>{
    console.log("listening port",port)
})






