const express = require("express");
require("dotenv").config();;

require("./config/dbConnect")
const app = express();

//-------------
//users route
//-------------

//POST/api/v1/users/register
app.post("/api/v1/users/register", async () => {
    try{
        res.json({
            status: "success",
            data: "user registered"
        });
    }catch (error){
        res.json(error.message);
    }
});

//POST/api/v1/users/login
app.post("/api/v1/users/login", async () => {
    try{
        res.json({
            status: "success",
            data: "user login"
        });
    }catch (error){
        res.json(error.message);
    }
});

//POST/api/v1/users/:id
app.get("/api/v1/users/profile/:id", async () => {
    try{
        res.json({
            status: "success",
            data: "Profile route"
        });
    }catch (error){
        res.json(error.message);
    }
});

//POST/api/v1/users
app.get("/api/v1/users", async () => {
    try{
        res.json({
            status: "success",
            data: "Users route"
        });
    }catch (error){
        res.json(error.message);
    }
});

//DELETE/api/v1/users/:id
app.delete("/api/v1/users/:id", async () => {
    try{
        res.json({
            status: "success",
            data: "Delete user route"
        });
    }catch (error){
        res.json(error.message);
    }
});

//PUT/api/v1/users/:id
app.put("/api/v1/users/:id", async () => {
    try{
        res.json({
            status: "success",
            data: "Update user route"
        });
    }catch (error){
        res.json(error.message);
    }
});


//-------------
//post routes
//-------------

//POST/api/v1/posts
app.post("/api/v1/posts", async () => {
    try{
        res.json({
            status: "success",
            data: "post created"
        });
    }catch (error){
        res.json(error.message);
    }
});


//POST/api/v1/posts/:id
app.get("/api/v1/posts/:id", async () => {
    try{
        res.json({
            status: "success",
            data: "post route"
        });
    }catch (error){
        res.json(error.message);
    }
});

//POST/api/v1/posts
app.get("/api/v1/posts", async () => {
    try{
        res.json({
            status: "success",
            data: "Posts route"
        });
    }catch (error){
        res.json(error.message);
    }
});

//DELETE/api/v1/posts/:id
app.delete("/api/v1/posts/:id", async () => {
    try{
        res.json({
            status: "success",
            data: "delete post route"
        });
    }catch (error){
        res.json(error.message);
    }
});

//PUT/api/v1/posts/:id
app.put("/api/v1/posts/:id", async () => {
    try{
        res.json({
            status: "success",
            data: "Update post route"
        });
    }catch (error){
        res.json(error.message);
    }
});


//-------------
//Comment routes
//-------------

//POST/api/v1/comments
app.post("/api/v1/comments", async () => {
    try{
        res.json({
            status: "success",
            data: "comment created"
        });
    }catch (error){
        res.json(error.message);
    }
});


//POST/api/v1/comments/:id
app.get("/api/v1/comments/:id", async () => {
    try{
        res.json({
            status: "success",
            data: "comment route"
        });
    }catch (error){
        res.json(error.message);
    }
});

//POST/api/v1/comments
app.get("/api/v1/comments", async () => {
    try{
        res.json({
            status: "success",
            data: "comments route"
        });
    }catch (error){
        res.json(error.message);
    }
});

//DELETE/api/v1/comments/:id
app.delete("/api/v1/comments/:id", async () => {
    try{
        res.json({
            status: "success",
            data: "delete comment route"
        });
    }catch (error){
        res.json(error.message);
    }
});

//PUT/api/v1/comments/:id
app.put("/api/v1/comments/:id", async () => {
    try{
        res.json({
            status: "success",
            data: "Update comment route"
        });
    }catch (error){
        res.json(error.message);
    }
});


const PORT = process.env.PORT || 9000;

app.listen(PORT, console.log(`Server is up and running on ${PORT}`));