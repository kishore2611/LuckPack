const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
// var fs = require('fs');
var path = require('path');
const cron = require("node-cron");


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
dotenv.config();

// const options = {
//   key: fs.readFileSync('/home/serverappsstagin/ssl/keys/c65d8_90097_a044b3f70b8e41d5f7405ebf6da70068.key'),
//   cert: fs.readFileSync('/home/serverappsstagin/ssl/certs/server_appsstaging_com_c65d8_90097_1684107424_b786b2088b61a931a5734e6357cf898f.crt'),
// };
// const server = require('https').createServer(app);


//Route Middlewares
const apiRoutes = require("./routes/api");
app.use("/api", apiRoutes);
const Content = require("./models/contentModel");

//Multer file upload
app.use("/uploads", express.static("uploads"));



const PORT = process.env.PORT || 3056;

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.DB_CONNECT, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    // useCreateIndex: true,
  })
  .then((data) =>
    console.log(`MongoDB connected with server: ${data.connection.host}`)
  )
  .catch((err) => {
    console.log(err);
  });

/** Content seeder */
const contentSeeder = [
  {
    title: "Privacy Policy",
    content:
      "Lorem ipsum dolor sit amet.Ea iste consectetur qui harum libero exercitationem harum et quam earum At cupiditate perferendis qui aspernatur vero!",
    type: "privacy_policy",
  },
  {
    title: "Terms and Conditions",
    content:
      "Lorem ipsum dolor sit amet.Ea iste consectetur qui harum libero exercitationem harum et quam earum At cupiditate perferendis qui aspernatur vero!",
    type: "terms_and_conditions",
  },
];
var abc;
const dbSeed = async () => {
  const d = await Content.find({ type: "privacy_policy" });
  if (d.length > 1 || d.length < 1) {
    await Content.deleteMany({ type: "privacy_policy" });
    await Content.insertMany(contentSeeder[0]);
  }

  const e = await Content.find({ type: "terms_and_conditions" });
  if (e.length > 1 || e.length < 1) {
    await Content.deleteMany({ type: "terms_and_conditions" });
    await Content.insertMany(contentSeeder[1]);
  }

  abc = await Content.find();
};
dbSeed()

app.set("views", "./views");
app.set("view engine", "pug");
app.get("/privacy_policy*", (req, res, next) => {
  res.render("index", {
    title: "Privacy Policy",
    heading: "Privacy Policy",
    paragraph: abc[0].content,
  });
});
app.get("/terms_and_conditions*", (req, res, next) => {
  res.render("index", {
    title: "Terms And Conditions",
    heading: "Terms And Conditions",
    paragraph: abc[1].content,
  });
});

// app.use(express.static(path.join(__dirname, "build")));
// app.get("*", function (req, res) {
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });

app.listen(PORT, () => console.log(`Server Up and Running on Port ${PORT}`));
exports.dbSeed = dbSeed;
