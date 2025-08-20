const express = require('express');
const app = express();
const path=require("path");
const {v4 : uuidv4} = require('uuid');
const methodOverride = require('method-override');

// Middleware for method override
app.use(methodOverride('_method'));

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
        id       : uuidv4(),
        username : "sam",
        content  : "love to code",
    },
    {
        id       : uuidv4(),
        username : "samarth",
        content  : "love to create"
    },
    {
        id       : uuidv4(),
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
    let id = uuidv4();
    posts.push({username,content,id});

    res.redirect("/posts");
})


app.get("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=>p.id === id)
    res.render("show.ejs",{post});
});

app.patch("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p)=>p.id === id);
    post.content = newContent;
    res.redirect("/posts");
});
  

app.get("/posts/:id/edit",(req,res)=>{ 
    let {id}= req.params;
    let post = posts.find((p)=>p.id === id);
    res.render("edit.ejs", {post});
})

app.delete("/posts/:id",(req,res)=>{
    let {id} = req.params;
    posts = posts.filter((p)=>id !== p.id);
    res.redirect("/posts");
})