const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cors = require("cors");
require("dotenv").config();

//cors
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.l4vpg0f.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    const ClassCollection = client.db("power-x-gym").collection("Classes");
    const PricingCollection = client.db("power-x-gym").collection("Pricings");

    //load all classes
    app.get("/classes", async (req, res) => {
      const query = {};
      const cursor = ClassCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });
    //class details by id
    app.get("/classes/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const classes = await ClassCollection.findOne(query);
      res.send(classes);
    });
    //pricing plans
    app.get("/pricings", async(req,res)=>{
      const query = {};
      const cursor = PricingCollection.find(query);
      const result = await cursor.toArray();
      res.send(result)
    })

  } finally {
  }
}
run().catch(console.dir);
app.get("/", (req, res) => {
  res.send("Hello from my power x gym!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
