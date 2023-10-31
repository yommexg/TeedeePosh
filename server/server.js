require("dotenv").config();

const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const verifyJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");
const crendentials = require("./middleware/credentials");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");
const PORT = process.env.PORT || 5000;

// connect to mongo database
connectDB();

// custom middleware logger
app.use(logger);

// Handle option crendentials check - before CORS
// and fetch cookies crendentials requirement
app.use(crendentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware for form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

// middleware for cookies
app.use(cookieParser());

// routes
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));
app.use("/forgotPassword", require("./routes/forgotPassword"));
app.use("/getCategories", require("./routes/getCategories"));
app.use("/getBrands", require("./routes/getBrands"));
app.use("/getProducts", require("./routes/getProducts"));
app.use("/getBanner", require("./routes/getBanner"));
app.use("/payment", require("./routes/payment"));

app.use(verifyJWT);
app.use("/users", require("./routes/api/users"));
app.use("/brands", require("./routes/api/brands"));
app.use("/categories", require("./routes/api/categories"));
app.use("/products", require("./routes/api/products"));
app.use("/banner", require("./routes/api/banner"));

// error handler
app.use(errorHandler);

mongoose.set("strictQuery", false);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
