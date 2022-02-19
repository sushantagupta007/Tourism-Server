const express = require('express')
const app = express()
const port = process.env.PORT||5000

const cors = require('cors')


require('dotenv').config()

app.use(cors())
app.use(express.json())

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.7jwba.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
  try {
    await client.connect();
    const database = client.db("ExplorePlace");
    const places = database.collection("Description");
    const blogs = database.collection("BlogData"); 
    const subscriber = database.collection("subscriber");
    //Get API
    app.get('/places',async(req,res)=>{
      const placeData = places.find({})
      const placeArray = await placeData.toArray()
      res.send(placeArray)
    })
    app.get('/blogs',async(req,res)=>{
      const blogDes = blogs.find({})
      const blogArray = await blogDes.toArray()
      res.send(blogArray)
      
    })
    app.post('/subscriber',async(req,res)=>{
      const data = req.body
      const subscriber = database.collection("subscriber");

      const doc = {
        name: data.firstName,
        email:data.email
      }
      const result = await subscriber.insertOne(doc);
      res.send(doc)
    })
    
    app.get('/subscriber',async(req,res)=>{
        const subscriberData = subscriber.find({})
        const subscriberArray = await subscriberData.toArray()
        res.send(subscriberArray)
    })
  } finally {
    // await client.close();
  }
}

run().catch();

app.get('/user', (req, res) => {
  res.send('Hello World!')
})

app.get('/post', function (req, res) {
    res.send('Got a POST request')
  })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

//Travel
//wCKngdlWYOH0Gq9I
