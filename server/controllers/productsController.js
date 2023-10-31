const User = require("../model/User");
const fs = require("fs");
const Product = require("../model/Product");

const handleNewProduct = async (req, res) => {
  const files = req.files;

  const {
    name,
    brand,
    size,
    stock,
    price,
    category,
    details,
    discount,
    userId,
    contentType,
  } = req.body;

  const filename = files?.map((file) => {
    return file.filename;
  });

  const datas = files?.map((file) => {
    return fs.readFileSync("productsImgUploads/" + file.filename);
  });

  const productImg = datas?.map((value, index) => ({
    data: value,
    contentType: contentType[index],
    filename: filename[index],
  }));

  try {
    const user = await User.findOne({ _id: userId }).exec();

    // Function to generate the slug with number suffix
    const generateSlug = async (name) => {
      // Implement your slug generation logic here
      let slug = name.toLowerCase().replace(/\s+/g, "-");

      // Check if a product with the same slug already exists
      const slugRegex = new RegExp(`^${slug}(-[0-9]+)?$`);
      const existingProducts = await Product.find({ slug: slugRegex }).exec();

      // If a product with the same slug exists, append a number suffix
      if (existingProducts.length > 0) {
        let suffix = 1;
        let newSlug = `${slug}-${suffix}`;

        while (existingProducts.some((product) => product.slug === newSlug)) {
          suffix++;
          newSlug = `${slug}-${suffix}`;
        }

        slug = newSlug;
      }

      return slug;
    };

    if (user) {
      // Generate the slug from the name field
      const slug = await generateSlug(name);

      // Check if a product with the same slug already exists
      const existingProduct = await Product.findOne({ slug }).exec();

      if (existingProduct) {
        return res
          .status(409)
          .json({ error: "Product with the same slug already exists" });
      }
      const productResult = await Product.create({
        name,
        brand,
        discount,
        slug,
        size,
        stock,
        category,
        details,
        price,
        productImg,
      });

      res.status(201).json({ success: `New Product ${name} created` });
    } else {
      return res.status(204).json({ message: `Unauthorized User` });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

const handleGetAllProducts = async (req, res) => {
  const products = await Product.find();
  if (!products) return res.status(204).json({ message: "No Products found" });
  res.json(products);
};

const updateProduct = async (req, res) => {
  const files = req.files;
  const { productId } = req.params;
  //console.log(files)

  const {
    name,
    brand,
    size,
    price,
    stock,
    category,
    details,
    discount,
    userId,
    contentType,
  } = req.body;

  const filename = files?.map((file) => {
    return file.filename;
  });

  const datas = files?.map((file) => {
    return fs.readFileSync("productsImgUploads/" + file.filename);
  });

  const productImg = datas?.map((value, index) => ({
    data: value,
    contentType: contentType[index],
    filename: filename[index],
  }));

  const user = await User.findOne({ _id: userId }).exec();
  if (user) {
    // Find the product  by its ID
    const product = await Product.findOne({ _id: productId });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    product.name = name;
    product.brand = brand;
    product.size = size;
    product.category = category;
    product.details = details;
    product.discount = discount;
    product.price = price;
    product.stock = stock;
    product.productImg = productImg;

    const result = await product.save();
    res.json(result);
  } else {
    return res
      .status(204)
      .json({ message: `No product matches the ID '${name}'` });
  }
};

const deleteProduct = async (req, res) => {
  const { productId } = req.params;

  if (!productId)
    return res.status(400).json({ message: "Product ID required" });

  const product = await Product.findOne({ _id: productId });

  if (product) {
    const result = await Product.deleteOne({ _id: productId });
    res.json(result);
  } else {
    return res
      .status(204)
      .json({ message: ` Product with Id ${productId} not found` });
  }
};

module.exports = {
  handleNewProduct,
  handleGetAllProducts,
  deleteProduct,
  updateProduct,
};
