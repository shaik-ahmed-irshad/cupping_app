import express from "express";
import config from "config";
//apiRouter is the alias of the router
import apiRouter from "./controllers/api/index.js";
import taskRouter from "./controllers/tasks/index.js";

import "./dbConnect.js";

import url from "url";
import Razorpay from "razorpay";
import shortid from "shortid"
import bodyParser from "body-parser";
import crypto from "crypto"
import cors from "cors"

const __dirname = url.fileURLToPath(new URL('.',import.meta.url))

import * as dotenv from "dotenv";
dotenv.config()

const app = express();

//APP LEVEL MIDDLE WARE
app.use(express.json());

app.use(cors());
app.use(bodyParser.json());

var razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});


app.get("/", (req, res) => {
    res.status(200).json({ success: "HELLO FROM EXPRESS" });
})

app.use("/api", apiRouter);
app.use("/api/task", taskRouter);



app.get("/logo.svg", (req, res) => {
  res.sendFile(__dirname, "logo.svg");
});

app.post("/verification", (req, res) => {
  const secret = "razorpaysecret";

  console.log(req.body);

  const shasum = crypto.createHmac("sha256", secret);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest("hex");

  console.log(digest, req.headers["x-razorpay-signature"]);

  if (digest === req.headers["x-razorpay-signature"]) {
    console.log("request is legit");
    res.status(200).json({
      message: "OK",
    });
  } else {
    res.status(403).json({ message: "Invalid" });
  }
});

app.post("/razorpay", async (req, res) => {
  const payment_capture = 1;
  const amount = 500;
  const currency = "INR";

  const options = {
    amount,
    currency,
    receipt: shortid.generate(),
    payment_capture,
  };

  try {
    const response = await razorpay.orders.create(options);
    console.log(response);
    res.status(200).json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (err) {
    console.log(err);
  }
});

const PORT = process.env.PORT || 1337;

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
