const express = require('express');
const app = express();
const path=require("path");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views",path.join(__dirname, "views"));

app.set(express.static(path.join(__dirname,"public")));

const port=8080;

app.listen(port,()=>{
    console.log(`server is listening at port ${port}`);
});

app.get("/", (req, res) => {
    res.send("server workin well");
});