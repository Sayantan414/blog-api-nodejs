const createCategoryCtrl = async (req, res) => {
    try {
        res.json({
            status: "success",
            data: "category created"
        });
    } catch (error) {
        res.json(error.message);
    }
}

const singleCategoryCtrl = async (req, res) => {
    try {
        res.json({
            status: "success",
            data: "category route"
        });
    } catch (error) {
        res.json(error.message);
    }
}

const allCategoriesCtrl = async (req, res) => {
    try {
        res.json({
            status: "success",
            data: "categories route"
        });
    } catch (error) {
        res.json(error.message);
    }
}

const deleteCategoryCtrl = async (req, res) => {
    try {
        res.json({
            status: "success",
            data: "delete category route"
        });
    } catch (error) {
        res.json(error.message);
    }
}

const updateCategoryCtrl = async (req, res) => {
    try {
        res.json({
            status: "success",
            data: "Update category route"
        });
    } catch (error) {
        res.json(error.message);
    }
}

module.exports = {
    createCategoryCtrl,
    singleCategoryCtrl,
    allCategoriesCtrl,
    deleteCategoryCtrl,
    updateCategoryCtrl
}