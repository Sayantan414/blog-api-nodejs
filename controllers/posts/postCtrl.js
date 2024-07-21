const Post = require("../../model/Post/Post");
const User = require("../../model/User/User");


const createPostCtrl = async (req, res) => {
    const { title, description } = req.body;
    try {
        const author = await User.findById(req.userAuth);

        const postCreated = await Post.create({
            title,
            description,
            user: author._id
        });

        author.posts.push(postCreated);
        author.save();

        res.json({
            status: "success",
            data: postCreated
        });
    } catch (error) {
        res.json(error.message);
    }
}

const singlePostCtrl = async (req, res) => {
    try {
        res.json({
            status: "success",
            data: "post route"
        });
    } catch (error) {
        res.json(error.message);
    }
}

const allPostsCtrl = async (req, res) => {
    try {
        res.json({
            status: "success",
            data: "Posts route"
        });
    } catch (error) {
        res.json(error.message);
    }
}

const deletePostCtrl = async (req, res) => {
    try {
        res.json({
            status: "success",
            data: "delete post route"
        });
    } catch (error) {
        res.json(error.message);
    }
}

const updatePostCtrl = async (req, res) => {
    try {
        res.json({
            status: "success",
            data: "Update post route"
        });
    } catch (error) {
        res.json(error.message);
    }
}

module.exports = {
    createPostCtrl,
    singlePostCtrl,
    allPostsCtrl,
    deletePostCtrl,
    updatePostCtrl
}