const express = require("express");
const routes = require("./routes/tea");
const helmet = require("helmet");
const compression = require("compression");




const app = express();

app.use(helmet());
app.use(compression()); 
//Compress all routes

app.use("/public", express.static(process.cwd() + "/public")); 
//make public static
app.use("/uploads", express.static("./uploads")); 
// makes uploads folder available


app.use(express.json()); //parses incoming requests as JSON
app.use("/", routes);

//Index page (static HTML)
app.route("/").get(function (req, res) {
  res.sendFile(process.cwd() + "/index.html");
});

//establish connection to database
// mongoose.connect(
//   process.env.MONGODB_URI,
//   {
//     useFindAndModify: false,
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     serverSelectionTimeoutMS: 5000,
//     socketTimeoutMS: 45000
//   },
//   function (err) {
//     if (err) return console.log("Error: ", err);
//     console.log(
//       "MongoDB Connection -- Ready state is:",
//       mongoose.connection.readyState,
//     );
//   }
// );

app.listen(process.env.PORT || 3000);

module.exports = {
    mongoose
};