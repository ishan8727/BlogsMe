const express=require('express');
const app=express();
const path=require('path');
const {v4:uuidv4}=require('uuid'); 

//to chnge the request we use method override
const methodOverride=require('method-override');
app.use(methodOverride("_method"));
//middleware

app.use(express.urlencoded({extended:true}));
app.use(express.json());

//ejs and public folder
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));

//posts array for storing data
let posts=[
    {
        id:uuidv4(),
        username:"Ishan",
        content:"i am a hardworking student"
    },
    {
        id:uuidv4(),
        username:"Goraksh",
        content:"i am a smartworking student"
    }
]
app.get("/",(req,res)=>{
    res.send("<h1>Welcome to Blog App</h1>");
})
//bascic routes
app.get("/posts",(req,res)=>{
   // console.log("server request")
    res.render("index.ejs",{posts});
})

//server the form
app.get('/posts/new',(req,res)=>{
    res.render("new.ejs");
})

app.post('/posts',(req,res)=>{
    let id=uuidv4();
    let {username,content}=req.body;
    posts.push({id,username,content});
    //console.log(req.body);
    //res.send("post request working");
    res.redirect('/posts');
})
//id to show the route
app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
   // console.log(id);
   let post=posts.find((p)=>id===p.id);
   // console.log(post);
    res.render("show.ejs",{post});
})
//patch request to edit a specific post
app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let nweContent=req.body.content;
    let post=posts.find((p)=>id===p.id)
    post.content=nweContent
    console.log(post);
    res.redirect('/posts');

})
//edit route
app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id)
    res.render("edit.ejs",{post});
})
//delete
app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
     posts=posts.filter((p)=>id!==p.id);
     res.redirect('/posts');
})

//port
const port=8080;

app.listen(port,()=>{
    console.log("server listening at port 8080");
})