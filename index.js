const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// niroborin111
// password = RKKehb7jnj6YGwtI



// const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://niroborin111:RKKehb7jnj6YGwtI@cluster0.xceqs5c.mongodb.net/?retryWrites=true&w=majority";

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



        const userCollection = client.db('usersDB').collection('users');

        app.get('/users', async (req, res) => {
            const cursor = userCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })

        app.get('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const user = await userCollection.findOne(query);
            res.send(user);
        })

        // send data to server
        app.post('/users', async (req, res) => {
            const user = req.body;
            console.log('req.body = ' ,req.body);
            console.log('New user', user);
            // req.body === user

            // client to server
            const result = await userCollection.insertOne(user);
            res.send(result);
        });


        app.put('/users/:id', async (req, res) => {
            const id = req.params.id;
            const user = req.body;
            console.log('Updating User - ',id, user);

            const filter = { _id: new ObjectId(id) }
            const options = { upsert: true }
            const updatedUser = {
                $set: {
                    name: user.name,
                    email: user.email
                }
            }

            const result = await userCollection.updateOne(filter, updatedUser, options);
            res.send(result);
        })

        app.delete('/users/:id', async (req, res) => {
            const id = req.params.id;
            console.log('please delete from database', id);
            const query = { _id: new ObjectId(id) }

            const result = await userCollection.deleteOne(query);
            res.send(result);
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




app.get('/', (req, res) =>{
    res.send('SIMPLE CRUD IS RUNNING')
})

app.listen(port, () =>{
    console.log(`SIMPLE CRUD is running on port, ${port}`)
})




// function run() {
    
// }
// run()

// async function run() {
    
// }
// const run = async () => {

// }
// run.catch(error => console.log(error));


// try{

// }
// catch{

// }
// finally{
    
// }