const createPostCtrl = async (req, res) => {
    try {
        res.json({
            status: "success",
            data: "post created"
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