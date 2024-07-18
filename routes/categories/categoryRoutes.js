const express = require('express');
const { createCategoryCtrl,
    singleCategoryCtrl,
    allCategoriesCtrl,
    deleteCategoryCtrl,
    updateCategoryCtrl } = require('../../controllers/categories/categoryCtrl');
const categoryRouter = express.Router();

//POST/api/v1/categories
categoryRouter.post("/", createCategoryCtrl);

//POST/api/v1/categories/:id
categoryRouter.get("/:id", singleCategoryCtrl);

//POST/api/v1/categories
categoryRouter.get("/", allCategoriesCtrl);

//DELETE/api/v1/categories/:id
categoryRouter.delete("/:id", deleteCategoryCtrl);

//PUT/api/v1/categories/:id
categoryRouter.put("/:id", updateCategoryCtrl);

module.exports = categoryRouter;