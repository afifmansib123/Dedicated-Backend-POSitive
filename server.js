const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const logger = require("morgan");

const port = process.env.PORT || 5000;
//routes
const categoryRoute = require("./routes/categories.js");
const productRoute = require("./routes/products.js");
const billRoute = require("./routes/bills.js");
const authRoute = require("./routes/auth.js");
const userRoute = require("./routes/users.js");
const cloudinaryRoutes = require('./routes/cloudinary');
const TableRoutes = require('./routes/tables.js')
const TokenRoutes = require('./routes/tokens.js');


dotenv.config();

const connect = async () => {
  try {
    await mongoose.set("strictQuery", false);
    await mongoose.connect("mongodb+srv://afifmansib123:Ageekis0cool!@cluster0.5laae.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
  } catch (error) {
    throw error;
  }
};


app.get('/', (req,res)=>{
  res.send('hello world')
})

//middlewares
app.use(logger("dev"));
app.use(express.json());
app.use("/categories", categoryRoute);
app.use("/products", productRoute);
app.use("/bills", billRoute);
app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/tables", TableRoutes);
//app.use("/api", cloudinaryRoutes);
app.use("/tokens", TokenRoutes);

app.get('/test', (req, res) => {
  res.send('Test route is working!');
});

app.listen(port, () => {
  connect();
  console.log(port, "Server running in port..");
});

