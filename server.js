const express = require("express");
const userRouter = require("./routes/users/userRoutes");
const postRouter = require("./routes/posts/postRoutes");
const categoryRouter = require("./routes/categories/categoryRoutes");
const commentRouter = require("./routes/comments/commentRoutes");
require("dotenv").config();
require("./config/dbConnect")
const app = express();

//_________
//middlewares
//_________
app.use(express.json()); // pass incoming payload


//_________
// routes
//_________

//users route
app.use('/api/v1/users/', userRouter);
//post routes
app.use('/api/v1/posts/', postRouter);
//Comment routes
app.use('/api/v1/comments', commentRouter);
//Categories routes
app.use('/api/v1/categories', categoryRouter);


const PORT = process.env.PORT || 9000;

app.listen(PORT, console.log(`Server is up and running on ${PORT}`));