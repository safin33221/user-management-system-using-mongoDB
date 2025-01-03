const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const app = express()
const cors = require('cors')
const port = process.env.PORT || 5000
require('dotenv').config()
// midle ware
app.use(cors())
app.use(express.json())








const uri = `mongodb+srv://${process.env.NAME_DB}:${process.env.PASS_DB}@cluster0.blz8y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        const userCollection = client.db('userMDB').collection('users')

        app.get('/users', async (req, res) => {
            const cursor = userCollection.find()
            const result = await cursor.toArray()
            res.send(result)
        })
        app.get('/users/:id', async (req, res) => {
            const id = req.params.id
            const qurey = { _id: new ObjectId(id) }
            const result = await userCollection.findOne(qurey)
            res.send(result)
        })


        app.post('/users', async (req, res) => {
            const newUser = req.body
            console.log(newUser);
            const result = await userCollection.insertOne(newUser)
            res.send(result)
        })
        app.put('/users/:id', async (req, res) => {
            const id = req.params.id
            const filter = { _id: new ObjectId(id) }
            const user = req.body
            const option = { upset: true }
            const updateUsers = {
                $set: {
                    name: user.name,
                    email: user.email,
                    gender: user.gender,
                    status: user.status,


                }
            }
            const result = await userCollection.updateOne(filter, updateUsers, option)
            res.send(result)

        })
        app.delete('/users/:id', async (req, res) => {
            const id = req.params.id
            const filter = { _id: new ObjectId(id) }
            const result = await userCollection.deleteOne(filter)
            res.send(result)
        })
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('usermanagement service site run on')
})

app.listen(port, () => {
    console.log(`usermanagement server run on ${port}`);
})