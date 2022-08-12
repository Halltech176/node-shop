const multer = require("multer");
const Product = require("../models/productModel");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString + file.originalname);
  },
});
const fileFilter = (request, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

exports.createProduct = async (request, response, next) => {
  //   console.log(request.file);
  const product = await Product.create(request.body);
  console.log(request.body);
  response.status(200).json({
    status: "success",
    data: {
      product,
    },
  });
};
exports.getAllProducts = async (request, response, next) => {
  const product = await Product.find().select("-__v");
  response.status(200).json({
    status: "success",
    data: {
      product,
    },
  });
};

exports.getProduct = async (request, response, next) => {
  const id = request.params.productId;
  const product = await Product.findById(id);

  response.status(200).json({
    status: "success",
    data: {
      product,
    },
  });
};

exports.updateProducct = async (request, response, next) => {
  try {
    const id = request.params.productId;
    console.log(id);
    const product = await Product.findByIdAndUpdate(id, {
      name: request.body.name,
    });
    response.status(200).json({
      message: "Updated product",
      product,
    });
  } catch (err) {
    status: "failed";
  }
};

exports.deleteProduct = async (request, response, next) => {
  try {
    const id = request.params.productId;
    console.log(id);
    const product = await Product.deleteOne({ _id: id });
    response.status(200).json({
      message: "delete selected product",
    });
  } catch (err) {
    response.status(500).json({
      message: "invalid product id",
    });
  }
};
