const express = require("express");
const app = express();

const productRoutes = require("./api/routes/product");
const orderRoutes = require("./api/routes/order");
const userRoutes = require("./api/routes/user");

app.use(express.json());
app.use(express.static("uploads"));
app.use((request, response, next) => {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Header", "*");

  if (request.method === "OPTIONS") {
    response.header("Access-Control-Allow-Methods", "*");
  }
  next();
});

app.use("/api/v1/products", productRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/user", userRoutes);

app.use((request, response, next) => {
  const error = new Error("invalid url specified");
  error.status = 404;
});

app.use((error, request, response, next) => {
  response.status(error.status || 500);
  response.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
