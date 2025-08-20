const express = require('express');
const app = express();
const path=require("path");

//for parsing 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.set("view engine", "ejs");
app.set("views",path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname,"public")));

const port=8080;

app.listen(port,()=>{
    console.log(`server is listening at port ${port}`);
});

//basic path 
app.get("/", (req, res) => {
    res.send("server working well");
});

let posts = [
    {
        username : "sam",
        content  : "love to code",
    },
    {
        username : "samarth",
        content  : "love to create"
    },
    {
        username : "golu",
        content  : "love to play",
    }
];

app.get("/posts",(req,res)=>{
    res.render("index.ejs", { posts});
})

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});

app.post("/posts",(req,res)=>{
    let {username, content} = req.body;
    posts.push({username,content});

    res.redirect("/posts");
})