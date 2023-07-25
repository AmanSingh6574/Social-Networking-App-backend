const express = require("express");
const cors = require("cors");
require("dotenv").config() ; 
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user");
const socialRoutes = require("./routes/social");
const profileRoutes = require("./routes/profile");
const database = require("./config/database").connect();
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const PORT = process.env.PORT || 5000  ;
const app = express();

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

// cloudinary connect
cloudinaryConnect();

// routes

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/social", socialRoutes);
app.use("/api/v1/profile", profileRoutes);

// app.get("/", (req, res) => {
//   res.send("<h1>hello</h1>");
// });

if(process.env.NODE_ENV == "production"){
  const path = require("path") ; 
  app.get("/" , (req , res) => {
    app.use(express.static(path.resolve(__dirname, "client" , 'dist' )))
    res.sendFile(path.resolve(__dirname, "client" , 'dist' , 'index.html' ));
  })
}

app.listen(PORT, (req, res) => {
  console.log("APP IS LISTING TO", PORT);
});
