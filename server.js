import express from "express";
import mongoose from "mongoose";
import Cards from "./dbCards.js";
import Cors from "cors";

// config
const app = express();
const port = process.env.PORT || 8001;
const connection_url =
  "mongodb+srv://admin:bkjWhLUnq42M9Bq@cluster0.yw543.mongodb.net/tinderdb?retryWrites=true&w=majority";

app.use(express.json());
app.use(Cors());
//db config
mongoose.connect(connection_url, {
  useNewUrlParser: true,
  //  useCreateIndex:true,
  useUnifiedTopology: true,
});
//api endpoint
app.get("/", (req, res) => {
  res.status(200).send("Hello Yogi");
});
app.post("/tinder/cards", (req, res) => {
  const dbCard = req.body;
  Cards.create(dbCard, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});
app.get("/tinder/cards", (req, res) => {
  const dbCard = req.body;
  Cards.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

//listener
app.listen(port, () => console.log(`listening on localhost:${port}`));
