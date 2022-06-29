const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://groupLobtec:groupLobtec@e-commerce.pjmhya7.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);


async function run() {
    try {
      await client.connect();
      const database = client.db('E-commerce');
      //const movies = database.collection('movies');
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);