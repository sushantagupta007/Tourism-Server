const express = require('express');
const app  = express(); 
const port = process.env.PORT ||5000; 

const cors = require('cors');
const MongoClient = require("mongodb").MongoClient;

const ObjectId = require('mongodb').ObjectId;

app.use(cors());
app.use(express.json())

require('dotenv').config()

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.w5u2e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run() {
    try {
      await client.connect();
      const database = client.db("Travel-Agent");
      const Services = database.collection("Services");
      const Clients = database.collection("Client Feedback");
      const users = database.collection("users")

      //Insert Data
        const myorder = database.collection("myorder");
      
        app.get('/Services',async(req,res)=>{
            const ServiceTable = await Services.find({});
            const resultServices = await ServiceTable.toArray();
            res.json(resultServices)
        })

        app.post('/users',async(req,res)=>{
            const userData = req.body
            console.log(userData)
            const userTable = await Services.insertOne(userData);
            console.log(result)
            res.json(userTable)
        })
        app.get('/users',async(req,res)=>{
            const userTable = await users.find({});
            const userService = await userTable.toArray();
            res.json(userService)
            console.log("clicked")
        })
        app.post('/Services',async(req,res)=>{
            const newService = req.body
            const result = await Services.insertOne(newService);
            console.log(result)
            res.json(result)
        })
        app.get('/Clients',async(req,res)=>{
            const ClientTable = await Clients.find({});
            const resultClients = await ClientTable.toArray();
            res.json(resultClients)
        })
        // https://radiant-everglades-28341.herokuapp.com/placeorder
        app.post('/placeorder',async(req,res)=>{
            const myorderData = req.body
            
            const result = await myorder.insertOne(myorderData);
            console.log(result)
            res.json(result)
        })
      
        app.get('/managemyorder/',async(req,res)=>{
            const myorderTable = await myorder.find({})
            const resultmyorder = await myorderTable.toArray(); 
            
            res.json(resultmyorder); 
        })

        app.get('/managemyorder/:id',async(req,res)=>{
            const id = req.params.id; 
            const query = { _id:ObjectId(id) };
            const singleOrderTable = await myorder.findOne(query)
            res.json(singleOrderTable)
            console.log(singleOrderTable);
        })

        app.put('/managemyorder/updated/:id',async(req,res)=>{
            const id = req.params.id;
            const singleOrder = req.body;
            const query = { _id:ObjectId(id) };
            const option ={upsert:true}
            const updated = {
                $set:{status:"shipped"}
            }
            const result = await myorder.updateOne(query, updated);
            res.json(result)
        })

        app.delete('/managemyorder/:_id',async(req,res)=>{
            const id = req.params._id
            console.log('deleting',id)
            

            const query = { _id:ObjectId(id) };
            const result = await myorder.deleteOne(query);
            if (result.deletedCount> 0) {
                console.log("Successfully deleted one document.");
              } else {
                console.log("No documents matched the query. Deleted 0 documents.");
              }
            res.json(result)
        })
    } finally {
    //   await client.close();
    }
  }
  run().catch();


app.get('/user',(req,res)=>{
    res.send("Hell I am server")
    console.log("from 5000")
})


app.listen(port,()=>{
    console.log("listening ", port)
})
//sushanta
//0esS1mVJHqMpY2bV