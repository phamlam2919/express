const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

// set up server
const server = express();

const productRoutes = require("./routes/products.routes");

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(morgan("dev"));

server.use("/api/v1/products", productRoutes);

server.listen(3000, () => {
    console.log("server is running on http://localhost:3000/");
});
