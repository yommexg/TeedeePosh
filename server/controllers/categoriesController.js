const Category = require("../model/Category");
const User = require("../model/User");

const fs = require("fs");

const createNewCategory = async (req, res) => {
  const { categoryName, userId, contentType } = req.body;

  // console.log(req.file);
  const categoryImg = {
    data: fs.readFileSync("categoryImgUploads/" + req?.file?.filename),
    contentType,
    filename: req?.file?.filename,
  };

  try {
    const user = await User.findOne({ _id: userId }).exec();
    if (user) {
      const duplicate = await Category.findOne({
        categoryName,
      }).exec();
      // conflict
      if (duplicate) return res.sendStatus(409);

      await Category.create({
        categoryName,
        categoryImg,
      });

      res.status(201).json({ success: `New Category ${categoryName} created` });
    } else {
      return res.status(204).json({ message: `Unauthorized User` });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

const getAllCategories = async (req, res) => {
  const categories = await Category.find();
  if (!categories)
    return res.status(204).json({ message: "No categories found" });
  res.json(categories);
};

const deleteCategory = async (req, res) => {
  const { categoryName } = req.params;

  if (!categoryName)
    return res.status(400).json({ message: "Category Name required" });

  const category = await Category.findOne({ categoryName });

  if (category) {
    const result = await Category.deleteOne({ categoryName });
    res.json(result);
  } else {
    return res
      .status(204)
      .json({ message: ` ${categoryName} category  not found` });
  }
};

const updateCategory = async (req, res) => {
  const { userId, contentType, categoryEditName } = req.body;
  const { categoryName } = req.params;
  const user = await User.findOne({ _id: userId }).exec();
  if (user) {
    // Find the category by its ID
    const category = await Category.findOne({ categoryName });
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    // Find all other categorys except the one with the specified ID
    const otherCategories = await Category.find({
      categoryName: { $ne: categoryName },
    }).exec();

    // Check for duplicates among other categorys
    const duplicateCategories = otherCategories.filter(
      (othercategory) => othercategory.categoryName === categoryEditName
    );

    if (duplicateCategories.length > 0) return res.sendStatus(409);

    category.categoryName = categoryEditName;
    category.categoryImg = {
      data: fs.readFileSync("categoryImgUploads/" + req?.file?.filename),
      contentType,
      filename: req?.file?.filename,
    };

    const result = await category.save();
    res.json(result);
  } else {
    return res
      .status(204)
      .json({ message: `No category matches the ID '${categoryEditName}'` });
  }
};

module.exports = {
  getAllCategories,
  createNewCategory,
  updateCategory,
  deleteCategory,
};
